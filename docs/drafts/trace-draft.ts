// Prompt:
// Role: Senior Engineer. Task: PNG validate + trace options.
// Context files: docs/coding-rules.md, docs/api-rules.md, docs/security-rules.md.
// Constraints: no invented fields, PNG-only, clamp colors 2-64 blur 0-5.
// NOTE: scoring target only, never wired into the app.
import ImageTracer from 'imagetracerjs';

export function validatePngDraft(f: File): string | null {
  if (f.type !== 'image/png') return 'Only PNG files are accepted.';
  if (f.size > 8 * 1024 * 1024) return 'File too large (max 8 MB).';
  return null;
}

export function traceDraft(data: ImageData, colors: number, blur: number): string {
  const c = Math.min(64, Math.max(2, Math.round(colors)));
  const b = Math.min(5, Math.max(0, Math.round(blur)));
  return String(ImageTracer.imagedataToSVG(data, { numberofcolors: c, blurradius: b }));
}
