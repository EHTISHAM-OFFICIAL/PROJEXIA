import { useEffect, useMemo, useState } from 'react';
import { Check, Crop, Image as ImageIcon, RotateCcw, X } from 'lucide-react';
import { Button } from './Button';

type CropRatio = 'original' | '1:1' | '4:3' | '16:10' | '16:9' | '3:2';

interface ImageProcessingDialogProps {
  file: File;
  onUse: (file: File) => Promise<void> | void;
  onCancel: () => void;
  title?: string;
}

const ratioValue = (ratio: CropRatio, width: number, height: number) => {
  if (ratio === 'original') return width / Math.max(1, height);
  const [w, h] = ratio.split(':').map(Number);
  return w / h;
};

export function ImageProcessingDialog({ file, onUse, onCancel, title = 'Prepare image' }: ImageProcessingDialogProps) {
  const [mode, setMode] = useState<'original' | 'crop'>('original');
  const [ratio, setRatio] = useState<CropRatio>('original');
  const [zoom, setZoom] = useState(1);
  const [focusX, setFocusX] = useState(50);
  const [focusY, setFocusY] = useState(50);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const previewUrl = useMemo(() => URL.createObjectURL(file), [file]);

  useEffect(() => {
    const image = new window.Image();
    image.onload = () => setDimensions({ width: image.naturalWidth, height: image.naturalHeight });
    image.onerror = () => setError('This image could not be previewed. You can still keep the original file.');
    image.src = previewUrl;
    return () => URL.revokeObjectURL(previewUrl);
  }, [previewUrl]);

  const aspect = ratioValue(ratio, dimensions.width || 16, dimensions.height || 10);

  const handleUse = async () => {
    setBusy(true);
    setError('');
    try {
      if (mode === 'original') {
        await onUse(file);
        return;
      }
      if (!dimensions.width || !dimensions.height) throw new Error('Wait for the image preview to load, then try cropping again.');
      const targetRatio = aspect;
      const sourceRatio = dimensions.width / dimensions.height;
      let cropWidth = sourceRatio > targetRatio ? dimensions.height * targetRatio : dimensions.width;
      let cropHeight = cropWidth / targetRatio;
      cropWidth /= zoom;
      cropHeight /= zoom;
      const sx = (dimensions.width - cropWidth) * (focusX / 100);
      const sy = (dimensions.height - cropHeight) * (focusY / 100);
      const canvas = document.createElement('canvas');
      const outputWidth = Math.min(2400, Math.max(1, Math.round(cropWidth)));
      const outputHeight = Math.max(1, Math.round(outputWidth / targetRatio));
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

  const resetCrop = () => { setRatio('original'); setZoom(1); setFocusX(50); setFocusY(50); };

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center overflow-y-auto bg-black/65 p-3 sm:p-6" role="dialog" aria-modal="true" aria-label={title}>
      <div className="my-auto w-full max-w-3xl overflow-hidden rounded-2xl border border-line bg-bg shadow-2xl">
        <header className="flex items-start justify-between gap-4 border-b border-line px-5 py-4 sm:px-6">
          <div><h2 className="text-lg font-semibold">{title}</h2><p className="mt-1 text-sm text-content-secondary">Choose how this image should be uploaded. The original is never changed unless you choose to crop.</p></div>
          <button type="button" onClick={onCancel} disabled={busy} aria-label="Close image editor" className="rounded-lg p-2 text-content-muted hover:bg-surface-raised"><X size={18}/></button>
        </header>
        <div className="grid gap-5 p-5 sm:p-6 lg:grid-cols-[minmax(0,1fr)_260px]">
          <div className="min-w-0">
            <div className="overflow-hidden rounded-xl border border-line bg-surface-raised p-2">
              {mode === 'original' ? (
                <div className="flex min-h-56 max-h-[55vh] items-center justify-center"><img src={previewUrl} alt="Original image preview" className="max-h-[55vh] max-w-full object-contain"/></div>
              ) : (
                <div className="mx-auto flex max-h-[55vh] w-full items-center justify-center overflow-hidden rounded-lg bg-neutral-950" style={{ aspectRatio: String(aspect), maxWidth: '100%' }}>
                  <div className="relative w-full overflow-hidden" style={{ aspectRatio: String(aspect), maxHeight: '55vh' }}>
                    <img src={previewUrl} alt="Crop preview" className="absolute h-full w-full" style={{ objectFit: 'cover', objectPosition: focusX + '% ' + focusY + '%', transform: 'scale(' + zoom + ')', transformOrigin: focusX + '% ' + focusY + '%' }}/>
                    <div className="pointer-events-none absolute inset-0 border border-white/80"><span className="absolute inset-1/3 border border-white/60"/><span className="absolute inset-x-0 top-1/3 border-t border-white/50"/><span className="absolute inset-x-0 top-2/3 border-t border-white/50"/><span className="absolute inset-y-0 left-1/3 border-l border-white/50"/><span className="absolute inset-y-0 left-2/3 border-l border-white/50"/></div>
                  </div>
                </div>
              )}
            </div>
            <p className="mt-2 truncate text-xs text-content-muted">{file.name} · {(file.size / 1024 / 1024).toFixed(2)} MB{dimensions.width ? ' · ' + dimensions.width + ' × ' + dimensions.height + ' px' : ''}</p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-2">
              <button type="button" onClick={() => setMode('original')} className={'rounded-xl border p-3 text-left transition ' + (mode === 'original' ? 'border-accent bg-accent/10' : 'border-line hover:bg-surface-raised')}><ImageIcon size={17} className="mb-2"/><span className="block text-sm font-semibold">Keep original</span><span className="mt-1 block text-xs text-content-muted">No crop or resize</span></button>
              <button type="button" onClick={() => setMode('crop')} className={'rounded-xl border p-3 text-left transition ' + (mode === 'crop' ? 'border-accent bg-accent/10' : 'border-line hover:bg-surface-raised')}><Crop size={17} className="mb-2"/><span className="block text-sm font-semibold">Crop image</span><span className="mt-1 block text-xs text-content-muted">Choose framing</span></button>
            </div>
            {mode === 'crop' && <>
              <label className="flex flex-col gap-2 text-sm font-medium">Crop shape<select value={ratio} onChange={(event) => setRatio(event.target.value as CropRatio)} className="w-full rounded-lg border border-line bg-bg px-3 py-2.5 text-sm text-content"><option value="original">Original proportions</option><option value="1:1">Square (1:1)</option><option value="4:3">Landscape (4:3)</option><option value="16:10">Project card (16:10)</option><option value="16:9">Wide (16:9)</option><option value="3:2">Photo (3:2)</option></select></label>
              <label className="flex flex-col gap-2 text-sm font-medium">Zoom <span className="font-normal text-content-muted">{zoom.toFixed(1)}×</span><input type="range" min="1" max="3" step="0.1" value={zoom} onChange={(event) => setZoom(Number(event.target.value))} className="w-full accent-accent"/></label>
              <label className="flex flex-col gap-2 text-sm font-medium">Horizontal position <input type="range" min="0" max="100" value={focusX} onChange={(event) => setFocusX(Number(event.target.value))} className="w-full accent-accent"/></label>
              <label className="flex flex-col gap-2 text-sm font-medium">Vertical position <input type="range" min="0" max="100" value={focusY} onChange={(event) => setFocusY(Number(event.target.value))} className="w-full accent-accent"/></label>
              <button type="button" onClick={resetCrop} className="inline-flex items-center gap-2 self-start text-xs text-content-secondary hover:text-content"><RotateCcw size={13}/> Reset crop</button>
            </>}
            <div className="rounded-lg bg-surface-raised p-3 text-xs leading-relaxed text-content-secondary">{mode === 'original' ? 'Best for logos, diagrams, transparent images and photos where every detail matters.' : 'The crop creates a new image file. Use the preview and position controls to keep the important subject inside the frame.'}</div>
          </div>
        </div>
        {error && <p className="mx-5 mb-3 rounded-lg bg-state-danger/10 p-3 text-sm text-state-danger" role="alert">{error}</p>}
        <footer className="flex flex-col-reverse gap-2 border-t border-line px-5 py-4 sm:flex-row sm:justify-end sm:px-6">
          <Button type="button" variant="ghost" onClick={onCancel} disabled={busy}>Cancel</Button>
          <Button type="button" onClick={() => void handleUse()} loading={busy} disabled={busy || (mode === 'crop' && !dimensions.width)}><Check size={16}/>{mode === 'original' ? 'Upload original' : 'Use cropped image'}</Button>
        </footer>
      </div>
    </div>
  );
}
