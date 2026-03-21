'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { X, FlipVertical } from 'lucide-react';

interface Props {
  onRecorded: (videoBlob: Blob, thumbnailUrl: string) => void;
  onCancel: () => void;
}

function getSupportedMimeType(): string {
  const types = [
    'video/mp4',
    'video/webm;codecs=vp9,opus',
    'video/webm;codecs=vp8,opus',
    'video/webm',
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
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const [recording, setRecording] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('environment');
  const [error, setError] = useState('');

  const startCamera = useCallback(async (facing: 'user' | 'environment') => {
    // Stop existing stream
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
    }

    try {
      // Request camera with high quality but let the browser pick native resolution
      // Don't force aspect ratio — let object-cover handle framing
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: facing },
          width: { ideal: 1920 },
          height: { ideal: 1080 },
        },
        audio: true,
      });

      // Set zoom to minimum to prevent digital zoom on front camera
      const videoTrack = stream.getVideoTracks()[0];
      try {
        const caps = videoTrack.getCapabilities?.() as Record<string, unknown> | undefined;
        if (caps?.zoom) {
          const zoomRange = caps.zoom as { min: number };
          await videoTrack.applyConstraints({
            advanced: [{ zoom: zoomRange.min } as MediaTrackConstraintSet],
          });
        }
      } catch { /* zoom not supported */ }

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      setError('');
    } catch {
      setError('Camera access denied. Please allow camera permissions.');
    }
  }, []);

  // Initialize camera
  useEffect(() => {
    let mounted = true;

    const init = async () => {
      if (mounted) {
        await startCamera(facingMode);
      }
    };

    init();

    return () => {
      mounted = false;
      streamRef.current?.getTracks().forEach(t => t.stop());
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const handleFlip = async () => {
    const newFacing = facingMode === 'user' ? 'environment' : 'user';
    setFacingMode(newFacing);

    if (recording) {
      // During recording: stop current recorder, save chunks, switch camera, start new recorder
      const mr = mediaRecorderRef.current;
      if (mr && mr.state !== 'inactive') {
        // Request any pending data
        mr.requestData();
        mr.stop();
      }

      await startCamera(newFacing);

      // Start a new recorder on the new stream
      if (streamRef.current) {
        startRecorderOnStream(streamRef.current);
      }
    } else {
      await startCamera(newFacing);
    }
  };

  const startRecorderOnStream = (stream: MediaStream) => {
    const mimeType = getSupportedMimeType();
    const options: MediaRecorderOptions = {};
    if (mimeType) options.mimeType = mimeType;

    // Request higher bitrate for better quality
    options.videoBitsPerSecond = 5000000; // 5 Mbps

    const mr = new MediaRecorder(stream, options);
    mr.ondataavailable = (e) => {
      if (e.data.size > 0) chunksRef.current.push(e.data);
    };
    mr.onstop = () => {
      // Only finalize if we're actually stopping (not flipping)
    };
    mr.start(500);
    mediaRecorderRef.current = mr;
  };

  const startRecording = () => {
    if (!streamRef.current) return;

    chunksRef.current = [];
    startRecorderOnStream(streamRef.current);

    setRecording(true);
    setElapsed(0);

    timerRef.current = setInterval(() => {
      setElapsed(prev => prev + 1);
    }, 1000);
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && recording) {
      const mr = mediaRecorderRef.current;

      mr.onstop = () => {
        const mType = getSupportedMimeType() || 'video/webm';
        const blob = new Blob(chunksRef.current, { type: mType });

        // Generate thumbnail from the video element
        let thumbnailUrl = '';
        const video = videoRef.current;
        const canvas = canvasRef.current;
        if (video && canvas) {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            thumbnailUrl = canvas.toDataURL('image/jpeg', 0.8);
          }
        }

        // Stop camera
        streamRef.current?.getTracks().forEach(t => t.stop());

        onRecorded(blob, thumbnailUrl);
      };

      mr.stop();
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
    streamRef.current?.getTracks().forEach(t => t.stop());
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
      {/* Hidden canvas for thumbnail generation */}
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
