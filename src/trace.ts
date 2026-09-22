export interface TraceOptions {
  colors: number;
  blurRadius: number;
}

export const DEFAULT_OPTIONS: TraceOptions = { colors: 16, blurRadius: 1 };

export const MAX_FILE_BYTES = 8 * 1024 * 1024;
export const MAX_DIMENSION_PX = 4096;

export function validatePng(file: File): string | null {
  if (file.type !== 'image/png') return 'Only PNG files are accepted.';
  if (file.size > MAX_FILE_BYTES) return 'File too large (max 8 MB).';
  return null;
}

export function clampOptions(o: TraceOptions): TraceOptions {
  return {
    colors: Math.min(64, Math.max(2, Math.round(o.colors))),
    blurRadius: Math.min(5, Math.max(0, Math.round(o.blurRadius))),
  };
}

export function svgFilename(pngName: string): string {
  return pngName.replace(/\.png$/i, '') + '.svg';
}
