import { describe, expect, it } from 'vitest';
import { checkDimensions, clampOptions, svgFilename, validatePng } from '../src/trace';

const png = (size: number, type = 'image/png') =>
  new File([new Uint8Array(size)], 'a.png', { type });

describe('validatePng', () => {
  it('accepts png', () => expect(validatePng(png(10))).toBeNull());
  it('rejects non-png', () =>
    expect(validatePng(png(10, 'image/jpeg'))).toBe('Only PNG files are accepted.'));
  it('rejects oversize', () =>
    expect(validatePng(png(9 * 1024 * 1024))).toBe('File too large (max 8 MB).'));
});

describe('clampOptions', () => {
  it('clamps colors to 2..64', () => {
    expect(clampOptions({ colors: 1, blurRadius: 1 }).colors).toBe(2);
    expect(clampOptions({ colors: 100, blurRadius: 1 }).colors).toBe(64);
  });
  it('clamps blur to 0..5', () => {
    expect(clampOptions({ colors: 16, blurRadius: -1 }).blurRadius).toBe(0);
    expect(clampOptions({ colors: 16, blurRadius: 9 }).blurRadius).toBe(5);
  });
  it('falls back on NaN', () => {
    expect(clampOptions({ colors: NaN, blurRadius: NaN })).toEqual({ colors: 16, blurRadius: 1 });
  });
});

describe('checkDimensions', () => {
  it('accepts within cap', () => expect(checkDimensions(800, 600)).toBeNull());
  it('rejects oversize side', () =>
    expect(checkDimensions(5000, 100)).toBe('Image too large (max 4096px per side).'));
});

describe('svgFilename', () => {
  it('swaps extension', () => expect(svgFilename('logo.png')).toBe('logo.svg'));
  it('appends when no ext', () => expect(svgFilename('logo')).toBe('logo.svg'));
});
