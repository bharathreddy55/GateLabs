/**
 * accentTheme.js
 * Manages user-selectable dual-color accent theme system.
 * Each palette is a gradient blend of 2 curated colors applied via CSS custom properties.
 */

export const ACCENT_PALETTES = [
  {
    id: 'emerald-teal',
    name: 'Emerald & Teal',
    from: '#10b981',
    to: '#14b8a6',
    mid: '#0d9488',
    glow: 'rgba(16, 185, 129, 0.25)',
  },
  {
    id: 'violet-indigo',
    name: 'Violet & Indigo',
    from: '#8b5cf6',
    to: '#6366f1',
    mid: '#7c3aed',
    glow: 'rgba(139, 92, 246, 0.25)',
  },
  {
    id: 'rose-pink',
    name: 'Rose & Pink',
    from: '#f43f5e',
    to: '#ec4899',
    mid: '#e11d48',
    glow: 'rgba(244, 63, 94, 0.25)',
  },
  {
    id: 'amber-orange',
    name: 'Amber & Orange',
    from: '#f59e0b',
    to: '#f97316',
    mid: '#d97706',
    glow: 'rgba(245, 158, 11, 0.25)',
  },
  {
    id: 'sky-blue',
    name: 'Sky & Blue',
    from: '#0ea5e9',
    to: '#3b82f6',
    mid: '#0284c7',
    glow: 'rgba(14, 165, 233, 0.25)',
  },
  {
    id: 'cyan-teal',
    name: 'Cyan & Teal',
    from: '#06b6d4',
    to: '#14b8a6',
    mid: '#0891b2',
    glow: 'rgba(6, 182, 212, 0.25)',
  },
  {
    id: 'purple-pink',
    name: 'Purple & Pink',
    from: '#a855f7',
    to: '#ec4899',
    mid: '#9333ea',
    glow: 'rgba(168, 85, 247, 0.25)',
  },
  {
    id: 'lime-green',
    name: 'Lime & Green',
    from: '#84cc16',
    to: '#22c55e',
    mid: '#65a30d',
    glow: 'rgba(132, 204, 22, 0.25)',
  },
  {
    id: 'red-orange',
    name: 'Red & Amber',
    from: '#ef4444',
    to: '#f59e0b',
    mid: '#dc2626',
    glow: 'rgba(239, 68, 68, 0.25)',
  },
  {
    id: 'slate-blue',
    name: 'Slate & Blue',
    from: '#64748b',
    to: '#3b82f6',
    mid: '#475569',
    glow: 'rgba(100, 116, 139, 0.25)',
  },
  {
    id: 'fuchsia-violet',
    name: 'Fuchsia & Violet',
    from: '#d946ef',
    to: '#8b5cf6',
    mid: '#c026d3',
    glow: 'rgba(217, 70, 239, 0.25)',
  },
  {
    id: 'gold-amber',
    name: 'Gold & Amber',
    from: '#eab308',
    to: '#f97316',
    mid: '#ca8a04',
    glow: 'rgba(234, 179, 8, 0.25)',
  },
];

const STORAGE_KEY = 'gate_accent_palette';

export function getSavedPalette() {
  const savedId = localStorage.getItem(STORAGE_KEY);
  return ACCENT_PALETTES.find(p => p.id === savedId) || ACCENT_PALETTES[0];
}

export function applyAccentPalette(palette) {
  const root = document.documentElement;
  root.style.setProperty('--accent-from', palette.from);
  root.style.setProperty('--accent-to', palette.to);
  root.style.setProperty('--accent-mid', palette.mid);
  root.style.setProperty('--accent-glow', palette.glow);
  root.style.setProperty('--accent-soft', palette.glow.replace('0.25)', '0.12)'));
  root.style.setProperty('--accent-border', palette.glow.replace('0.25)', '0.30)'));
  root.style.setProperty('--accent-text', palette.from);

  localStorage.setItem(STORAGE_KEY, palette.id);
}

export function initAccentPalette() {
  const palette = getSavedPalette();
  applyAccentPalette(palette);
  return palette;
}
