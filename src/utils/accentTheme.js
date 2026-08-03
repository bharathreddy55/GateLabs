/**
 * accentTheme.js
 * Manages the dual-colour accent theme system via CSS custom properties.
 * Supports any custom hex pair or quick-pick presets.
 */

const STORAGE_KEY_FROM = 'gate_accent_from';
const STORAGE_KEY_TO   = 'gate_accent_to';

const DEFAULT = { from: '#6366f1', to: '#a855f7' };

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return [r, g, b];
}

function rgbToHex(r, g, b) {
  return '#' + [r, g, b].map(v => Math.round(v).toString(16).padStart(2, '0')).join('');
}

export function getSavedPalette() {
  const from = localStorage.getItem(STORAGE_KEY_FROM) || DEFAULT.from;
  const to   = localStorage.getItem(STORAGE_KEY_TO)   || DEFAULT.to;
  const [r, g, b] = hexToRgb(from);
  const [r2, g2, b2] = hexToRgb(to);
  const mid = rgbToHex((r + r2) / 2, (g + g2) / 2, (b + b2) / 2);
  return { id: 'custom', name: 'Custom', from, to, mid, glow: `rgba(${r}, ${g}, ${b}, 0.25)` };
}

export function applyAccentPalette(palette) {
  const root = document.documentElement;
  root.style.setProperty('--accent-from',   palette.from);
  root.style.setProperty('--accent-to',     palette.to);
  root.style.setProperty('--accent-mid',    palette.mid);
  root.style.setProperty('--accent-glow',   palette.glow);
  root.style.setProperty('--accent-soft',   palette.glow.replace('0.25)', '0.12)'));
  root.style.setProperty('--accent-border', palette.glow.replace('0.25)', '0.30)'));
  root.style.setProperty('--accent-text',   palette.from);

  localStorage.setItem(STORAGE_KEY_FROM, palette.from);
  localStorage.setItem(STORAGE_KEY_TO,   palette.to);
}

export function initAccentPalette() {
  const palette = getSavedPalette();
  applyAccentPalette(palette);
  return palette;
}
