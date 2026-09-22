import ImageTracer from 'imagetracerjs';
import { clampOptions, svgFilename, validatePng, type TraceOptions } from './trace';
import './style.css';

const dropzone = document.getElementById('dropzone')!;
const fileInput = document.getElementById('file') as HTMLInputElement;
const colorsInput = document.getElementById('colors') as HTMLInputElement;
const blurInput = document.getElementById('blur') as HTMLInputElement;
const downloadBtn = document.getElementById('download') as HTMLButtonElement;
const before = document.getElementById('before') as HTMLImageElement;
const after = document.getElementById('after')!;
const status = document.getElementById('status')!;

let svgText = '';
let pngName = 'image.png';

function readOptions(): TraceOptions {
  return clampOptions({
    colors: Number(colorsInput.value),
    blurRadius: Number(blurInput.value),
  });
}

async function handleFile(file: File): Promise<void> {
  const err = validatePng(file);
  if (err) {
    status.textContent = err;
    return;
  }
  pngName = file.name;
  status.textContent = 'Tracing…';
  downloadBtn.disabled = true;
  const url = URL.createObjectURL(file);
  try {
    before.src = url;
    await before.decode();
    const opts = readOptions();
    svgText = await traceImage(before, opts);
    after.innerHTML = svgText;
    status.textContent = `Done (${svgText.length} bytes SVG).`;
    downloadBtn.disabled = false;
  } catch (e) {
    status.textContent = e instanceof Error ? e.message : 'Trace failed.';
  }
}

function traceImage(img: HTMLImageElement, opts: TraceOptions): Promise<string> {
  return new Promise((resolve, reject) => {
    try {
      const svg = ImageTracer.imagedataToSVG(
        getImageData(img),
        { numberofcolors: opts.colors, blurradius: opts.blurRadius },
      );
      resolve(typeof svg === 'string' ? svg : String(svg));
    } catch (e) {
      reject(e instanceof Error ? e : new Error('Trace failed.'));
    }
  });
}

function getImageData(img: HTMLImageElement): ImageData {
  const canvas = document.createElement('canvas');
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  const ctx = canvas.getContext('2d', { willReadFrequently: true })!;
  ctx.drawImage(img, 0, 0);
  return ctx.getImageData(0, 0, canvas.width, canvas.height);
}

dropzone.addEventListener('click', () => fileInput.click());
dropzone.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') fileInput.click();
});
dropzone.addEventListener('dragover', (e) => e.preventDefault());
dropzone.addEventListener('drop', (e) => {
  e.preventDefault();
  const f = e.dataTransfer?.files[0];
  if (f) void handleFile(f);
});
fileInput.addEventListener('change', () => {
  const f = fileInput.files?.[0];
  if (f) void handleFile(f);
});
downloadBtn.addEventListener('click', () => {
  const blob = new Blob([svgText], { type: 'image/svg+xml' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = svgFilename(pngName);
  a.click();
  URL.revokeObjectURL(a.href);
});
