import { useEffect, useMemo, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react';
import { Check, Crop, Image as ImageIcon, RotateCcw, X } from 'lucide-react';
import { Button } from '../ui/Button';

type CropRatio = 'original' | '1:1' | '4:3' | '16:10' | '16:9' | '3:2';
type Handle = 'n' | 's' | 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw' | 'move';
interface CropRect { x: number; y: number; w: number; h: number }
interface DragState { handle: Handle; startX: number; startY: number; rect: CropRect }

interface ImageProcessingDialogProps {
  file: File;
  onUse: (file: File) => Promise<void> | void;
  onCancel: () => void;
  title?: string;
}

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
const ratioValue = (ratio: CropRatio, width: number, height: number) => {
  if (ratio === 'original') return width / Math.max(1, height);
  const [w, h] = ratio.split(':').map(Number);
  return w / h;
};

function initialRect(sourceAspect: number, targetAspect: number): CropRect {
  const normalizedRatio = targetAspect / sourceAspect;
  let w = 92;
  let h = w / normalizedRatio;
  if (h > 92) { h = 92; w = h * normalizedRatio; }
  return { x: (100 - w) / 2, y: (100 - h) / 2, w, h };
}

export function ImageProcessingDialog({ file, onUse, onCancel, title = 'Prepare image' }: ImageProcessingDialogProps) {
  const [mode, setMode] = useState<'original' | 'crop'>('original');
  const [ratio, setRatio] = useState<CropRatio>('original');
  const [rect, setRect] = useState<CropRect>({ x: 2, y: 2, w: 96, h: 96 });
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [drag, setDrag] = useState<DragState | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const previewUrl = useMemo(() => URL.createObjectURL(file), [file]);
  const sourceAspect = dimensions.width / Math.max(1, dimensions.height);
  const targetAspect = ratioValue(ratio, dimensions.width || 16, dimensions.height || 10);
  const normalizedRatio = targetAspect / (sourceAspect || 1);

  useEffect(() => {
    const image = new window.Image();
    image.onload = () => {
      const size = { width: image.naturalWidth, height: image.naturalHeight };
      setDimensions(size);
      setRect(initialRect(size.width / size.height, size.width / size.height));
    };
    image.onerror = () => setError('This image could not be previewed. You can still keep the original file.');
    image.src = previewUrl;
    return () => URL.revokeObjectURL(previewUrl);
  }, [previewUrl]);

  useEffect(() => {
    if (!dimensions.width) return;
    const nextAspect = ratioValue(ratio, dimensions.width, dimensions.height);
    setRect(initialRect(sourceAspect, nextAspect));
  }, [ratio, dimensions.width, dimensions.height, sourceAspect]);

  useEffect(() => {
    if (!drag) return;
    const move = (event: PointerEvent) => {
      const bounds = stageRef.current?.getBoundingClientRect();
      if (!bounds) return;
      const dx = ((event.clientX - drag.startX) / bounds.width) * 100;
      const dy = ((event.clientY - drag.startY) / bounds.height) * 100;
      const { x, y, w, h } = drag.rect;
      const handle = drag.handle;
      const minSize = 8;
      let next: CropRect;

      if (handle === 'move') {
        next = { x: clamp(x + dx, 0, 100 - w), y: clamp(y + dy, 0, 100 - h), w, h };
      } else {
        const left = handle.includes('w');
        const right = handle.includes('e');
        const top = handle.includes('n');
        const bottom = handle.includes('s');
        const centerX = x + w / 2;
        const centerY = y + h / 2;
        const anchorX = left ? x + w : right ? x : centerX;
        const anchorY = top ? y + h : bottom ? y : centerY;
        let nextW = w;
        let nextH = h;
        if ((left || right) && (top || bottom)) {
          const widthCandidate = Math.max(minSize, w + (right ? dx : -dx));
          const heightCandidate = Math.max(minSize, h + (bottom ? dy : -dy));
          if (Math.abs(widthCandidate - w) >= Math.abs(heightCandidate - h) * normalizedRatio) {
            nextW = widthCandidate;
            nextH = nextW / normalizedRatio;
          } else {
            nextH = heightCandidate;
            nextW = nextH * normalizedRatio;
          }
        } else if (left || right) {
          nextW = Math.max(minSize, w + (right ? dx : -dx));
          nextH = nextW / normalizedRatio;
        } else {
          nextH = Math.max(minSize, h + (bottom ? dy : -dy));
          nextW = nextH * normalizedRatio;
        }
        const maxW = left || right ? (left ? anchorX : 100 - anchorX) : 2 * Math.min(anchorX, 100 - anchorX);
        const maxH = top || bottom ? (top ? anchorY : 100 - anchorY) : 2 * Math.min(anchorY, 100 - anchorY);
        const scale = Math.min(1, maxW / Math.max(nextW, 1), maxH / Math.max(nextH, 1));
        nextW = Math.max(minSize, nextW * scale);
        nextH = Math.max(minSize, nextH * scale);
        const nextX = left ? anchorX - nextW : right ? anchorX : anchorX - nextW / 2;
        const nextY = top ? anchorY - nextH : bottom ? anchorY : anchorY - nextH / 2;
        next = { x: clamp(nextX, 0, 100 - nextW), y: clamp(nextY, 0, 100 - nextH), w: nextW, h: nextH };
      }
      setRect(next);
    };
    const stop = () => setDrag(null);
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', stop);
    window.addEventListener('pointercancel', stop);
    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', stop);
      window.removeEventListener('pointercancel', stop);
    };
  }, [drag, normalizedRatio]);

  const beginDrag = (event: ReactPointerEvent, handle: Handle) => {
    event.preventDefault();
    event.stopPropagation();
    setDrag({ handle, startX: event.clientX, startY: event.clientY, rect: { ...rect } });
  };

  const handleUse = async () => {
    setBusy(true);
    setError('');
    try {
      if (mode === 'original') {
        await onUse(file);
        return;
      }
      if (!dimensions.width || !dimensions.height) throw new Error('Wait for the image preview to load, then try cropping again.');
      const sx = dimensions.width * rect.x / 100;
      const sy = dimensions.height * rect.y / 100;
      const cropWidth = dimensions.width * rect.w / 100;
      const cropHeight = dimensions.height * rect.h / 100;
      const outputWidth = Math.min(2400, Math.max(1, Math.round(cropWidth)));
      const outputHeight = Math.max(1, Math.round(outputWidth * cropHeight / cropWidth));
      const canvas = document.createElement('canvas');
      canvas.width = outputWidth;
      canvas.height = outputHeight;
      const context = canvas.getContext('2d');
      if (!context) throw new Error('Your browser could not prepare the cropped image.');
      const image = new window.Image();
      image.src = previewUrl;
      await new Promise<void>((resolve, reject) => {
        if (image.complete && image.naturalWidth) resolve();
        else { image.onload = () => resolve(); image.onerror = () => reject(new Error('Could not load the image for cropping.')); }
      });
      context.drawImage(image, sx, sy, cropWidth, cropHeight, 0, 0, outputWidth, outputHeight);
      const outputType = file.type === 'image/jpeg' || file.type === 'image/webp' || file.type === 'image/png' ? file.type : 'image/png';
      const blob = await new Promise<Blob>((resolve, reject) => canvas.toBlob((value) => value ? resolve(value) : reject(new Error('Could not create the cropped image.')), outputType, 0.92));
      const extension = outputType === 'image/jpeg' ? '.jpg' : outputType === 'image/webp' ? '.webp' : '.png';
      const outputName = file.name.replace(/\.[^.]+$/, '') + '-cropped' + extension;
      await onUse(new File([blob], outputName, { type: outputType, lastModified: Date.now() }));
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Could not prepare this image.');
    } finally {
      setBusy(false);
    }
  };

  const resetCrop = () => { setRatio('original'); setRect(initialRect(sourceAspect || 1, sourceAspect || 1)); };

  const handlePositions: { key: Handle; className: string }[] = [
    { key: 'nw', className: '-left-2 -top-2 cursor-nwse-resize' },
    { key: 'n', className: 'left-1/2 -top-2 -translate-x-1/2 cursor-ns-resize' },
    { key: 'ne', className: '-right-2 -top-2 cursor-nesw-resize' },
    { key: 'e', className: '-right-2 top-1/2 -translate-y-1/2 cursor-ew-resize' },
    { key: 'se', className: '-bottom-2 -right-2 cursor-nwse-resize' },
    { key: 's', className: '-bottom-2 left-1/2 -translate-x-1/2 cursor-ns-resize' },
    { key: 'sw', className: '-bottom-2 -left-2 cursor-nesw-resize' },
    { key: 'w', className: '-left-2 top-1/2 -translate-y-1/2 cursor-ew-resize' },
  ];

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center overflow-y-auto bg-black/70 p-3 backdrop-blur-sm sm:p-6" role="dialog" aria-modal="true" aria-label={title}>
      <div className="my-auto w-full max-w-5xl overflow-hidden rounded-2xl border border-line bg-bg shadow-2xl">
        <header className="flex items-start justify-between gap-4 border-b border-line px-5 py-4 sm:px-6">
          <div><h2 className="text-lg font-semibold">{title}</h2><p className="mt-1 text-sm text-content-secondary">Keep the original or crop precisely. Drag the frame to move it and pull any edge or corner handle to resize.</p></div>
          <button type="button" onClick={onCancel} disabled={busy} aria-label="Close image editor" className="rounded-lg p-2 text-content-muted hover:bg-surface-raised"><X size={18}/></button>
        </header>
        <div className="grid gap-5 p-4 sm:p-6 lg:grid-cols-[minmax(0,1fr)_260px]">
          <div className="min-w-0">
            <div className="flex min-h-64 max-h-[62vh] items-center justify-center overflow-auto rounded-xl border border-line bg-neutral-950 p-3">
              {mode === 'original' ? (
                <img src={previewUrl} alt="Original image preview" className="max-h-[58vh] max-w-full object-contain"/>
              ) : (
                <div ref={stageRef} className="relative inline-block max-h-[58vh] max-w-full select-none">
                  <img src={previewUrl} alt="Crop source" draggable={false} className="block max-h-[58vh] max-w-full object-contain pointer-events-none"/>
                  <div
                    className="absolute border-2 border-white shadow-[0_0_0_9999px_rgba(0,0,0,.58)]"
                    style={{ left: rect.x + '%', top: rect.y + '%', width: rect.w + '%', height: rect.h + '%', touchAction: 'none' }}
                    onPointerDown={(event) => beginDrag(event, 'move')}
                    role="group"
                    aria-label="Crop frame. Drag to reposition."
                  >
                    <div className="pointer-events-none absolute inset-0 grid grid-cols-3 grid-rows-3 opacity-70">
                      <span className="border-b border-r border-white/70"/><span className="border-b border-r border-white/70"/><span className="border-b border-white/70"/>
                      <span className="border-b border-r border-white/70"/><span className="border-b border-r border-white/70"/><span className="border-b border-white/70"/>
                      <span className="border-r border-white/70"/><span className="border-r border-white/70"/><span/>
                    </div>
                    {handlePositions.map(({ key, className }) => (
                      <button key={key} type="button" aria-label={'Resize crop ' + key} onPointerDown={(event) => beginDrag(event, key)} className={'absolute z-10 h-5 w-5 rounded-sm border-2 border-accent bg-white shadow-md ' + className}/>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <p className="mt-2 truncate text-xs text-content-muted">{file.name} · {(file.size / 1024 / 1024).toFixed(2)} MB{dimensions.width ? ' · ' + dimensions.width + ' × ' + dimensions.height + ' px' : ''}</p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-2">
              <button type="button" onClick={() => setMode('original')} className={'rounded-xl border p-3 text-left transition ' + (mode === 'original' ? 'border-accent bg-accent/10' : 'border-line hover:bg-surface-raised')}><ImageIcon size={17} className="mb-2"/><span className="block text-sm font-semibold">Keep original</span><span className="mt-1 block text-xs text-content-muted">No crop or resize</span></button>
              <button type="button" onClick={() => setMode('crop')} className={'rounded-xl border p-3 text-left transition ' + (mode === 'crop' ? 'border-accent bg-accent/10' : 'border-line hover:bg-surface-raised')}><Crop size={17} className="mb-2"/><span className="block text-sm font-semibold">Crop image</span><span className="mt-1 block text-xs text-content-muted">Drag to frame</span></button>
            </div>
            {mode === 'crop' && <>
              <label className="flex flex-col gap-2 text-sm font-medium">Crop shape<select value={ratio} onChange={(event) => setRatio(event.target.value as CropRatio)} className="w-full rounded-lg border border-line bg-bg px-3 py-2.5 text-sm text-content"><option value="original">Original proportions</option><option value="1:1">Square (1:1)</option><option value="4:3">Landscape (4:3)</option><option value="16:10">Project card (16:10)</option><option value="16:9">Wide (16:9)</option><option value="3:2">Photo (3:2)</option></select></label>
              <div className="rounded-lg bg-surface-raised p-3 text-xs leading-relaxed text-content-secondary"><strong className="text-content">Crop controls</strong><p className="mt-1">Drag inside the frame to reposition. Use the eight white handles to resize the crop area. Preset ratios stay proportional.</p></div>
              <button type="button" onClick={resetCrop} className="inline-flex items-center gap-2 self-start text-xs text-content-secondary hover:text-content"><RotateCcw size={13}/> Reset crop</button>
            </>}
            <div className="rounded-lg border border-line p-3 text-xs leading-relaxed text-content-secondary">Your original file stays unchanged. Cropping creates a new image before it is sent to the existing image host.</div>
          </div>
        </div>
        {error && <p className="mx-5 mb-3 rounded-lg bg-state-danger/10 p-3 text-sm text-state-danger" role="alert">{error}</p>}
        <footer className="flex flex-col-reverse gap-2 border-t border-line px-5 py-4 sm:flex-row sm:justify-end sm:px-6">
          <Button type="button" variant="ghost" onClick={onCancel} disabled={busy}>Cancel</Button>
          <Button type="button" onClick={() => void handleUse()} loading={busy} disabled={busy || (mode === 'crop' && !dimensions.width)}><Check size={16}/>{mode === 'original' ? 'Use original image' : 'Use cropped image'}</Button>
        </footer>
      </div>
    </div>
  );
}