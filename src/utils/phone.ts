/** Strip to digits; keep last 10 for Indian mobile */
export function normalizeIndianMobile(input: string): string {
  const digits = input.replace(/\D/g, '');
  if (digits.length <= 10) {
    return digits;
  }
  return digits.slice(-10);
}

/** Display: +91 98765 43210 */
export function formatIndianMobile(digits: string): string {
  const d = normalizeIndianMobile(digits);
  if (d.length <= 5) {
    return d ? `+91 ${d}` : '+91 ';
  }
  return `+91 ${d.slice(0, 5)} ${d.slice(5)}`;
}

export function isValidIndianMobile(digits: string): boolean {
  return normalizeIndianMobile(digits).length === 10;
}
