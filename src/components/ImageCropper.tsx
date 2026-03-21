'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { X, ZoomIn, ZoomOut } from 'lucide-react';

interface Props {
  imageSrc: string;
  onCrop: (croppedDataUrl: string) => void;
  onCancel: () => void;
}

export default function ImageCropper({ imageSrc, onCrop, onCancel }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [imgSize, setImgSize] = useState({ w: 0, h: 0 });
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [offsetStart, setOffsetStart] = useState({ x: 0, y: 0 });

  const CROP_SIZE = 280;
  const OUTPUT_SIZE = 400;

  // Load image dimensions
  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setImgSize({ w: img.width, h: img.height });
      // Reset position
      setOffset({ x: 0, y: 0 });
      setZoom(1);
    };
    img.src = imageSrc;
  }, [imageSrc]);

  // Calculate display size: fit image so its smallest side fills the crop area
  const getDisplaySize = useCallback(() => {
    if (!imgSize.w || !imgSize.h) return { w: CROP_SIZE, h: CROP_SIZE };
    const aspect = imgSize.w / imgSize.h;
    let w: number, h: number;
    if (aspect > 1) {
      h = CROP_SIZE * zoom;
      w = h * aspect;
    } else {
      w = CROP_SIZE * zoom;
      h = w / aspect;
    }
    return { w, h };
  }, [imgSize, zoom]);

  // Clamp offset so image always covers the crop circle
  const clampOffset = useCallback((ox: number, oy: number) => {
    const { w, h } = getDisplaySize();
    const maxX = Math.max(0, (w - CROP_SIZE) / 2);
    const maxY = Math.max(0, (h - CROP_SIZE) / 2);
    return {
      x: Math.max(-maxX, Math.min(maxX, ox)),
      y: Math.max(-maxY, Math.min(maxY, oy)),
    };
  }, [getDisplaySize]);

  // Mouse/touch drag handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    setDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
    setOffsetStart({ ...offset });
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragging) return;
    const dx = e.clientX - dragStart.x;
    const dy = e.clientY - dragStart.y;
    setOffset(clampOffset(offsetStart.x + dx, offsetStart.y + dy));
  };

  const handlePointerUp = () => {
    setDragging(false);
  };

  // Zoom change
  const handleZoom = (newZoom: number) => {
    const clamped = Math.max(1, Math.min(3, newZoom));
    setZoom(clamped);
    // Re-clamp offset at new zoom
    setTimeout(() => {
      setOffset(prev => clampOffset(prev.x, prev.y));
    }, 0);
  };

  // Crop and output
  const handleConfirm = () => {
    const img = new Image();
    img.onload = () => {
      const { w, h } = getDisplaySize();

      // Map the crop area back to source image coordinates
      const scaleX = img.width / w;
      const scaleY = img.height / h;

      // Center of display image relative to crop area
      const cropCenterX = w / 2 + offset.x;
      const cropCenterY = h / 2 + offset.y;

      // The crop area is centered in the container, so it starts at (w/2 - CROP_SIZE/2, h/2 - CROP_SIZE/2)
      // relative to the image display origin. But offset moves the image, so:
      const srcX = ((w - CROP_SIZE) / 2 - offset.x) * scaleX;
      const srcY = ((h - CROP_SIZE) / 2 - offset.y) * scaleY;
      const srcSize = CROP_SIZE * scaleX;

      const canvas = document.createElement('canvas');
      canvas.width = OUTPUT_SIZE;
      canvas.height = OUTPUT_SIZE;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.drawImage(img, srcX, srcY, srcSize, srcSize, 0, 0, OUTPUT_SIZE, OUTPUT_SIZE);
      onCrop(canvas.toDataURL('image/jpeg', 0.8));
    };
    img.src = imageSrc;
  };

  const displaySize = getDisplaySize();

  return (
    <div className="fixed inset-0 z-[70] flex flex-col bg-[#0A0A0A] animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between px-lg h-[56px] shrink-0">
        <button
          onClick={onCancel}
          className="w-[44px] h-[44px] flex items-center justify-center rounded-full hover:bg-bg-hover"
          aria-label="Cancel cropping"
        >
          <X size={24} color="white" />
        </button>
        <h3 className="text-[16px] font-bold text-white">Adjust Photo</h3>
        <button
          onClick={handleConfirm}
          className="px-xl py-[6px] rounded-full text-[14px] font-semibold text-white min-h-[36px]"
          style={{ background: 'linear-gradient(135deg, #D946EF, #A855F7)' }}
        >
          Done
        </button>
      </div>

      {/* Crop area */}
      <div className="flex-1 flex items-center justify-center overflow-hidden">
        <div
          ref={containerRef}
          className="relative select-none"
          style={{ width: CROP_SIZE, height: CROP_SIZE, cursor: dragging ? 'grabbing' : 'grab' }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          {/* Image */}
          <img
            src={imageSrc}
            alt="Crop preview"
            draggable={false}
            className="absolute pointer-events-none"
            style={{
              width: displaySize.w,
              height: displaySize.h,
              left: (CROP_SIZE - displaySize.w) / 2 + offset.x,
              top: (CROP_SIZE - displaySize.h) / 2 + offset.y,
            }}
          />

          {/* Dark overlay with circular cutout using CSS mask */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'rgba(0,0,0,0.6)',
              maskImage: `radial-gradient(circle ${CROP_SIZE / 2}px at center, transparent ${CROP_SIZE / 2 - 1}px, black ${CROP_SIZE / 2}px)`,
              WebkitMaskImage: `radial-gradient(circle ${CROP_SIZE / 2}px at center, transparent ${CROP_SIZE / 2 - 1}px, black ${CROP_SIZE / 2}px)`,
            }}
          />

          {/* Circle border */}
          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{ border: '2px solid rgba(255,255,255,0.4)' }}
          />
        </div>
      </div>

      {/* Zoom controls */}
      <div className="flex items-center justify-center gap-lg px-xl pb-xl pt-md shrink-0">
        <button
          onClick={() => handleZoom(zoom - 0.2)}
          className="w-[44px] h-[44px] flex items-center justify-center rounded-full bg-bg-tertiary"
          aria-label="Zoom out"
        >
          <ZoomOut size={20} color="white" />
        </button>
        <input
          type="range"
          min={1}
          max={3}
          step={0.05}
          value={zoom}
          onChange={(e) => handleZoom(parseFloat(e.target.value))}
          className="flex-1 max-w-[200px] h-[4px] appearance-none rounded-full outline-none"
          style={{
            background: `linear-gradient(to right, #D946EF ${((zoom - 1) / 2) * 100}%, #333 ${((zoom - 1) / 2) * 100}%)`,
          }}
          aria-label="Zoom level"
        />
        <button
          onClick={() => handleZoom(zoom + 0.2)}
          className="w-[44px] h-[44px] flex items-center justify-center rounded-full bg-bg-tertiary"
          aria-label="Zoom in"
        >
          <ZoomIn size={20} color="white" />
        </button>
      </div>

      {/* Hint */}
      <p className="text-[12px] text-text-muted text-center pb-xl">Drag to reposition. Use slider to zoom.</p>
    </div>
  );
}
