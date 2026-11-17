/**
 * accentTheme.js
 * Manages the dual-colour accent theme system via CSS custom properties.
 * Supports any custom hex pair or quick-pick presets.
 */

const STORAGE_KEY_FROM = 'gate_accent_from';
const STORAGE_KEY_TO   = 'gate_accent_to';

const DEFAULT = { from: '#4263d7', to: '#4263d7' };
const validHex=value=>/^#[0-9a-f]{6}$/i.test(value);
export function contrastRatio(a,b){const luminance=hex=>hexToRgb(hex).map(v=>{const n=v/255;return n<=0.04045?n/12.92:((n+0.055)/1.055)**2.4;}).reduce((sum,n,i)=>sum+n*[.2126,.7152,.0722][i],0);const x=luminance(a),y=luminance(b);return (Math.max(x,y)+.05)/(Math.min(x,y)+.05);}
export function readableAccent(color,background){let result=color;for(let i=0;i<60&&contrastRatio(result,background)<4.5;i++){const dark=contrastRatio('#000000',background)>contrastRatio('#ffffff',background);result=rgbToHex(...hexToRgb(result).map(v=>v+(dark?-v:255-v)*.12));}return result;}


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
  const savedFrom=localStorage.getItem(STORAGE_KEY_FROM);const from=validHex(savedFrom)?savedFrom:DEFAULT.from;
  const savedTo=localStorage.getItem(STORAGE_KEY_TO);const to=validHex(savedTo)?savedTo:DEFAULT.to;
  const [r, g, b] = hexToRgb(from);
  const [r2, g2, b2] = hexToRgb(to);
  const mid = rgbToHex((r + r2) / 2, (g + g2) / 2, (b + b2) / 2);
  return { id: 'custom', name: 'Custom', from, to, mid, glow: `rgba(${r}, ${g}, ${b}, 0.25)` };
}

export function applyAccentPalette(palette) {
  if(!validHex(palette.from)||!validHex(palette.to))return;
  const root = document.documentElement;
  root.style.setProperty('--accent-on',contrastRatio(palette.from,'#ffffff')>=4.5?'#ffffff':'#000000');
  root.style.setProperty('--accent-link-light',readableAccent(palette.from,'#ffffff'));
  root.style.setProperty('--accent-link-dark',readableAccent(palette.from,'#191f2c'));

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
