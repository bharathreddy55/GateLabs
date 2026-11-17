import {escapeHtml} from './examEngine.js';
// Deliberately limited Markdown: HTML and links remain text, never executable markup.
export function renderStudyText(value){return escapeHtml(value).replace(/```(?:\w+)?\n([\s\S]*?)```/g,'<pre><code>$1</code></pre>').replace(/\*\*([^*\n]+)\*\*/g,'<strong>$1</strong>').replace(/`([^`\n]+)`/g,'<code>$1</code>').replace(/\n/g,'<br>');}
