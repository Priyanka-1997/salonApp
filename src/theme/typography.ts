/**
 * Typography — Poppins (headings & buttons), Inter (body), Noto Sans Devanagari (Hindi).
 */
import { fonts } from './tokens';

export const typography = {
  h1: {
    fontFamily: fonts.poppinsSemiBold,
    fontSize: 28,
    lineHeight: 34,
    fontWeight: 'normal' as const,
    letterSpacing: -0.5,
  },
  h2: {
    fontFamily: fonts.poppinsSemiBold,
    fontSize: 22,
    lineHeight: 28,
    fontWeight: 'normal' as const,
  },
  h3: {
    fontFamily: fonts.poppinsSemiBold,
    fontSize: 18,
    lineHeight: 24,
    fontWeight: 'normal' as const,
  },
  body: {
    fontFamily: fonts.interRegular,
    fontSize: 16,
    lineHeight: 22,
    fontWeight: 'normal' as const,
  },
  bodySmall: {
    fontFamily: fonts.interRegular,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: 'normal' as const,
  },
  caption: {
    fontFamily: fonts.interRegular,
    fontSize: 12,
    fontWeight: 'normal' as const,
  },
  label: {
    fontFamily: fonts.interMedium,
    fontSize: 12,
    fontWeight: 'normal' as const,
  },
  button: {
    fontFamily: fonts.poppinsSemiBold,
    fontSize: 16,
    fontWeight: 'normal' as const,
  },
  hindi: {
    fontFamily: fonts.notoSansDevanagari,
    fontSize: 16,
    fontWeight: 'normal' as const,
  },
} as const;
