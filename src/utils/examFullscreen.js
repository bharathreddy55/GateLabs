import { icon } from '../config/navigation.js';

export function enterExamFullscreen() {
  const app = document.getElementById('app');
  if (!document.fullscreenEnabled || document.fullscreenElement || !app?.requestFullscreen) return;
  // The app root stays mounted when the runner replaces a question.
  try {
    Promise.resolve(app.requestFullscreen()).then(() => {
      if (!app.querySelector('[data-exam-session]')) leaveExamFullscreen();
    }).catch(() => {});
  } catch {
    // The viewport layout also works when the browser declines fullscreen.
  }
}

export function leaveExamFullscreen() {
  if (document.fullscreenElement?.id === 'app') document.exitFullscreen().catch(() => {});
}

export function fullscreenButton() {
  return document.fullscreenEnabled
    ? `<button type="button" class="test-room-expand" data-exam-fullscreen aria-label="Full screen" title="Full screen">
      ${icon('expand')}
      <span>Full screen</span></button>`
    : '';
}
