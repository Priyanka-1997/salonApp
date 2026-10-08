/** Basic format check — use your API for real validation. */
export function isValidEmail(value: string): boolean {
  const s = value.trim();
  if (s.length < 5) {
    return false;
  }
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}
