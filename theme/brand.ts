export const BRAND_GRADIENT =
  'linear-gradient(90deg, #ec4899, #d946ef, #a855f7, #6366f1, #3b82f6)';

// Primary accent used for icons, borders, and highlights.
export const BRAND_ACCENT = '#a855f7';

// Used for glow/shadows (matches existing main sections styling).
const BRAND_GLOW_RGB = '139, 92, 246';

export function brandRgba(alpha: number): string {
  const clamped = Math.min(1, Math.max(0, alpha));
  return `rgba(${BRAND_GLOW_RGB}, ${clamped})`;
}
