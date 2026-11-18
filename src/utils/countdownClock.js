// Published dates and personal targets use midnight in India, not a guessed exam session time.
export function remainingTime(date, now = Date.now()) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date || '')) return null;
  const deadline = Date.parse(date + 'T00:00:00+05:30');
  if (!Number.isFinite(deadline)) return null;
  const totalSeconds = Math.max(0, Math.ceil((deadline - Number(now)) / 1000));
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor(totalSeconds / 3600) % 24,
    minutes: Math.floor(totalSeconds / 60) % 60,
    seconds: totalSeconds % 60,
    totalSeconds,
  };
}
