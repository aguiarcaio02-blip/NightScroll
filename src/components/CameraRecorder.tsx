'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { X, FlipVertical, Circle, Square } from 'lucide-react';

interface Props {
  onRecorded: () => void;
  onCancel: () => void;
}

export default function CameraRecorder({ onRecorded, onCancel }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const [recording, setRecording] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user');
  const [error, setError] = useState('');

  const startCamera = useCallback(async (facing: 'user' | 'environment') => {
    // Stop any existing stream
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
    }

    try {
      const isFront = facing === 'user';
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: facing,
          aspectRatio: { ideal: 9 / 16 },
          // Front cameras have a narrower FOV — requesting high res causes digital zoom.
          // Use lower constraints for front camera to avoid cropping.
          ...(isFront
            ? { width: { ideal: 480 }, height: { ideal: 854 } }
            : { width: { ideal: 1080 }, height: { ideal: 1920 } }
          ),
        },
        audio: true,
      });

      // Try to set zoom to minimum if supported
      const videoTrack = stream.getVideoTracks()[0];
      const capabilities = videoTrack.getCapabilities?.() as Record<string, unknown> | undefined;
      if (capabilities?.zoom) {
        const zoomRange = capabilities.zoom as { min: number };
        try {
          await videoTrack.applyConstraints({ advanced: [{ zoom: zoomRange.min } as MediaTrackConstraintSet] });
        } catch { /* zoom not adjustable */ }
      }
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setError('');
    } catch {
      setError('Camera access denied. Please allow camera permissions.');
    }
  }, []);

  useEffect(() => {
    startCamera(facingMode);

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(t => t.stop());
      }
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const handleFlip = async () => {
    const newFacing = facingMode === 'user' ? 'environment' : 'user';
    setFacingMode(newFacing);
    await startCamera(newFacing);
  };

  const startRecording = () => {
    if (!streamRef.current) return;

    chunksRef.current = [];
    const mr = new MediaRecorder(streamRef.current, { mimeType: 'video/webm' });
    mr.ondataavailable = (e) => {
      if (e.data.size > 0) chunksRef.current.push(e.data);
    };
    mr.onstop = () => {
      // Recording complete — in a real app, we'd save the blob
      // For the prototype, just move to the next step
      onRecorded();
    };
    mr.start();
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
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
    }
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    onCancel();
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-[70] bg-black flex flex-col">
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

          {/* Timer */}
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
