/** Format minutes for queue / wait copy */
export function formatWaitMinutes(minutes: number): string {
  if (minutes < 1) {
    return 'Soon';
  }
  if (minutes < 60) {
    return `${Math.round(minutes)} min`;
  }
  const h = Math.floor(minutes / 60);
  const m = Math.round(minutes % 60);
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
}

export function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n));
}
