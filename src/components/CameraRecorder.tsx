'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { X, FlipVertical } from 'lucide-react';

interface Props {
  onRecorded: (videoBlob: Blob, thumbnailUrl: string) => void;
  onCancel: () => void;
}

function getSupportedMimeType(): string {
  const types = [
    'video/webm;codecs=vp9,opus',
    'video/webm;codecs=vp8,opus',
    'video/webm',
    'video/mp4',
  ];
  for (const type of types) {
    if (typeof MediaRecorder !== 'undefined' && MediaRecorder.isTypeSupported(type)) {
      return type;
    }
  }
  return '';
}

export default function CameraRecorder({ onRecorded, onCancel }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const videoStreamRef = useRef<MediaStream | null>(null);
  const audioStreamRef = useRef<MediaStream | null>(null);
  const recordStreamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const animFrameRef = useRef<number>(0);

  const [recording, setRecording] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user');
  const [error, setError] = useState('');

  // Draw the video element onto the canvas continuously
  const drawToCanvas = useCallback(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas || video.readyState < 2) {
      animFrameRef.current = requestAnimationFrame(drawToCanvas);
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Draw video frame to canvas (handles the flip via CSS on video, canvas gets raw feed)
    ctx.save();
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    ctx.restore();

    animFrameRef.current = requestAnimationFrame(drawToCanvas);
  }, []);

  const switchVideoStream = useCallback(async (facing: 'user' | 'environment') => {
    // Stop existing video tracks only
    if (videoStreamRef.current) {
      videoStreamRef.current.getTracks().forEach(t => t.stop());
    }

    try {
      // Probe native capabilities
      let targetWidth = 720;
      let targetHeight = 1280;

      try {
        const probeStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: facing },
          audio: false,
        });
        const probeTrack = probeStream.getVideoTracks()[0];
        const caps = probeTrack.getCapabilities?.() as Record<string, unknown> | undefined;
        const settings = probeTrack.getSettings();
        const nativeW = (caps?.width as { max?: number })?.max || settings.width || 640;
        const nativeH = (caps?.height as { max?: number })?.max || settings.height || 480;
        probeStream.getTracks().forEach(t => t.stop());

        const maxDim = Math.max(nativeW, nativeH);
        const minDim = Math.min(nativeW, nativeH);
        targetWidth = minDim;
        targetHeight = Math.round(minDim * 16 / 9);
        if (targetHeight > maxDim) {
          targetHeight = maxDim;
          targetWidth = Math.round(maxDim * 9 / 16);
        }
      } catch {
        // Probe failed, use defaults
      }

      // Get video-only stream
      const videoStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: facing,
          width: { ideal: targetWidth, max: targetWidth },
          height: { ideal: targetHeight, max: targetHeight },
          aspectRatio: { ideal: 9 / 16 },
        },
        audio: false,
      });

      // Set zoom to minimum
      const videoTrack = videoStream.getVideoTracks()[0];
      const realCaps = videoTrack.getCapabilities?.() as Record<string, unknown> | undefined;
      if (realCaps?.zoom) {
        const zoomRange = realCaps.zoom as { min: number };
        try {
          await videoTrack.applyConstraints({
            advanced: [{ zoom: zoomRange.min } as MediaTrackConstraintSet],
          });
        } catch { /* */ }
      }

      videoStreamRef.current = videoStream;

      // Feed to video element for preview
      if (videoRef.current) {
        videoRef.current.srcObject = videoStream;
      }

      // Set canvas size to match
      if (canvasRef.current) {
        const s = videoTrack.getSettings();
        canvasRef.current.width = s.width || targetWidth;
        canvasRef.current.height = s.height || targetHeight;
      }

      setError('');
    } catch {
      setError('Camera access denied. Please allow camera permissions.');
    }
  }, []);

  // Initialize: get audio once, get video, start canvas draw loop
  useEffect(() => {
    let mounted = true;

    const init = async () => {
      // Get audio stream (keep for entire session)
      try {
        const audio = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
        if (mounted) audioStreamRef.current = audio;
      } catch {
        // No audio, continue without
      }

      if (mounted) {
        await switchVideoStream(facingMode);
        animFrameRef.current = requestAnimationFrame(drawToCanvas);
      }
    };

    init();

    return () => {
      mounted = false;
      cancelAnimationFrame(animFrameRef.current);
      videoStreamRef.current?.getTracks().forEach(t => t.stop());
      audioStreamRef.current?.getTracks().forEach(t => t.stop());
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const handleFlip = async () => {
    const newFacing = facingMode === 'user' ? 'environment' : 'user';
    setFacingMode(newFacing);
    // Just switch the video preview — the canvas-based recorder keeps running
    await switchVideoStream(newFacing);
  };

  const startRecording = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Create a stream from the canvas
    const canvasStream = canvas.captureStream(30);

    // Add audio track if available
    if (audioStreamRef.current) {
      const audioTrack = audioStreamRef.current.getAudioTracks()[0];
      if (audioTrack) {
        canvasStream.addTrack(audioTrack);
      }
    }

    recordStreamRef.current = canvasStream;
    chunksRef.current = [];

    const mimeType = getSupportedMimeType();
    const options: MediaRecorderOptions = {};
    if (mimeType) options.mimeType = mimeType;

    const mr = new MediaRecorder(canvasStream, options);
    mr.ondataavailable = (e) => {
      if (e.data.size > 0) chunksRef.current.push(e.data);
    };
    mr.onstop = () => {
      const mType = getSupportedMimeType() || 'video/webm';
      const blob = new Blob(chunksRef.current, { type: mType });

      // Generate thumbnail from the last canvas frame
      let thumbnailUrl = '';
      if (canvasRef.current) {
        thumbnailUrl = canvasRef.current.toDataURL('image/jpeg', 0.6);
      }

      // Stop camera streams
      videoStreamRef.current?.getTracks().forEach(t => t.stop());
      audioStreamRef.current?.getTracks().forEach(t => t.stop());
      cancelAnimationFrame(animFrameRef.current);

      onRecorded(blob, thumbnailUrl);
    };
    mr.start(1000); // Collect data every second
    mediaRecorderRef.current = mr;
    setRecording(true);
    setElapsed(0);

    timerRef.current = setInterval(() => {
      setElapsed(prev => prev + 1);
    }, 1000);
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && recording) {
      mediaRecorderRef.current.stop();
      setRecording(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
  };

  const handleCancel = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.onstop = null;
      mediaRecorderRef.current.stop();
    }
    videoStreamRef.current?.getTracks().forEach(t => t.stop());
    audioStreamRef.current?.getTracks().forEach(t => t.stop());
    cancelAnimationFrame(animFrameRef.current);
    if (timerRef.current) clearInterval(timerRef.current);
    onCancel();
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-[70] bg-black flex flex-col">
      {/* Hidden canvas for recording */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Camera feed */}
      <div className="flex-1 relative overflow-hidden">
        {error ? (
          <div className="flex flex-col items-center justify-center h-full px-xl text-center">
            <p className="text-white text-[16px] font-bold mb-sm">Camera Unavailable</p>
            <p className="text-text-muted text-[14px] mb-xl">{error}</p>
            <button
              onClick={handleCancel}
              className="px-xl py-md rounded-[8px] bg-bg-tertiary text-white text-[14px] font-semibold"
            >
              Go Back
            </button>
          </div>
        ) : (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="absolute inset-0 w-full h-full object-cover"
            style={{ transform: facingMode === 'user' ? 'scaleX(-1)' : 'none' }}
          />
        )}

        {/* Top controls */}
        <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-lg pt-[52px]">
          <button
            onClick={handleCancel}
            className="w-[44px] h-[44px] rounded-full flex items-center justify-center"
            style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)' }}
            aria-label="Cancel recording"
          >
            <X size={24} color="white" />
          </button>

          {recording && (
            <div className="flex items-center gap-sm px-lg py-[6px] rounded-full" style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)' }}>
              <div className="w-[8px] h-[8px] rounded-full bg-[#EF4444] animate-pulse" />
              <span className="text-white text-[14px] font-bold font-mono">{formatTime(elapsed)}</span>
            </div>
          )}

          <button
            onClick={handleFlip}
            className="w-[44px] h-[44px] rounded-full flex items-center justify-center"
            style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)' }}
            aria-label="Flip camera"
          >
            <FlipVertical size={20} color="white" />
          </button>
        </div>
      </div>

      {/* Bottom controls */}
      <div className="shrink-0 flex flex-col items-center pb-xl pt-lg" style={{ background: 'linear-gradient(transparent, rgba(0,0,0,0.9))' }}>
        {!recording ? (
          <>
            <button
              onClick={startRecording}
              className="w-[72px] h-[72px] rounded-full border-[4px] border-white flex items-center justify-center mb-md"
              aria-label="Start recording"
            >
              <div className="w-[56px] h-[56px] rounded-full bg-[#EF4444]" />
            </button>
            <p className="text-text-muted text-[12px]">Tap to record</p>
          </>
        ) : (
          <>
            <button
              onClick={stopRecording}
              className="w-[72px] h-[72px] rounded-full border-[4px] border-white flex items-center justify-center mb-md"
              aria-label="Stop recording"
            >
              <div className="w-[28px] h-[28px] rounded-[6px] bg-[#EF4444]" />
            </button>
            <p className="text-text-muted text-[12px]">Tap to stop</p>
          </>
        )}
      </div>
    </div>
  );
}
