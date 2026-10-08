# Design system – Salon App

One **color theme**, **typography stack**, and **usage rules** for the whole product (mobile, web, and marketing where relevant).

**Tone:** friendly, modern, readable.

---

## Typography

| Role | Font | Use for |
|------|------|--------|
| **Headings** | **Poppins** | Screen titles, section titles, card titles, buttons (when title-sized) |
| **Body** | **Inter** | Paragraphs, labels, inputs, lists, metadata |
| **Hindi / Devanagari** | **Noto Sans** (Noto Sans Devanagari where available) | Any UI copy in Hindi; fallback to system UI font if script not loaded |

### Rules

- Prefer **Poppins SemiBold or Bold** for H1–H2; **Poppins Medium** for H3 and large labels.
- Body default: **Inter Regular**; secondary text: **Inter Regular** at smaller size or lower opacity (see `textSecondary` token).
- When mixing English and Hindi in one screen, set the text component’s `fontFamily` per locale string, or use a wrapper that picks **Noto Sans** for Hindi segments.

### Loading fonts

- **React Native:** bundle font files (or use a loader such as `@expo-google-fonts/poppins` if you move to Expo). Register families as `Poppins`, `Inter`, `Noto Sans` (match `src/theme/tokens.ts`).
- **Web (Next.js):** use `next/font/google` for Poppins, Inter, and Noto Sans Devanagari; apply via CSS variables aligned with the same token names.

Until fonts are bundled, the app may fall back to system fonts; keep token names consistent so swapping in real faces is one place.

---

## Color tokens

Use **semantic names** in code (`primary`, `background`, …), not raw hex in scattered files.

### Light

| Token | Hex | Role |
|-------|-----|------|
| `primary` | `#E85D4A` | Main actions and key CTAs |
| `primaryDark` | `#C94738` | Darker primary emphasis and pressed states |
| `accent` | `#F4B860` | Highlights, secondary CTAs, badges |
| `success` | `#22A06B` | Confirmed and successful states |
| `background` | `#FAF8F6` | Screen background |
| `card` | `#FFFFFF` | Cards, sheets, modals |
| `textPrimary` | `#1C1917` | Main text |
| `textSecondary` | `#78716C` | Captions and hints |
| `placeholder` | `#A8A29E` | Input placeholder text (lighter than `textSecondary`) |
| `border` | `#E7E1DC` | Dividers, input borders |

### Dark

| Token | Hex | Role |
|-------|-----|------|
| `primary` | `#E85D4A` | Main actions and key CTAs |
| `primaryDark` | `#C94738` | Darker primary emphasis and pressed states |
| `accent` | `#F4B860` | Highlights, secondary CTAs, badges |
| `success` | `#22A06B` | Confirmed and successful states |
| `background` | `#1C1917` | Screen background |
| `card` | `#292524` | Cards, elevated surfaces |
| `textPrimary` | `#FAF8F6` | Main text |
| `textSecondary` | `#A8A29E` | Secondary text |
| `placeholder` | `#78716C` | Input placeholder text |
| `border` | `#44403C` | Dividers, borders |

### Usage

- **Primary coral:** primary buttons, links, and active tab indicators.
- **Accent gold:** highlights and secondary emphasis; use sparingly.
- **Success green:** confirmed queue and completed states.
- **Do not** introduce extra brand colors for MVP; use opacity or `textSecondary` for hierarchy.

---

## JSON reference (copy for other tools)

```json
{
  "light": {
    "primary": "#E85D4A",
    "primaryDark": "#C94738",
    "accent": "#F4B860",
    "success": "#22A06B",
    "background": "#FAF8F6",
    "card": "#FFFFFF",
    "textPrimary": "#1C1917",
    "textSecondary": "#78716C",
    "placeholder": "#A8A29E",
    "border": "#E7E1DC"
  },
  "dark": {
    "primary": "#E85D4A",
    "primaryDark": "#C94738",
    "accent": "#F4B860",
    "success": "#22A06B",
    "background": "#1C1917",
    "card": "#292524",
    "textPrimary": "#FAF8F6",
    "textSecondary": "#A8A29E",
    "placeholder": "#78716C",
    "border": "#44403C"
  }
}
```

---

## Layout & components (baseline)

- **Corner radius:** 12px cards, 10px buttons (adjust per platform density).
- **Spacing scale:** 4 / 8 / 12 / 16 / 24 / 32 (multiples of 4).
- **Elevation:** light mode uses subtle shadow on cards; dark mode uses slightly lighter `card` vs `background` instead of heavy shadow.

---

## Source of truth in code

Colors and font family names are exported from **`src/theme/tokens.ts`**. Update that file and this doc together when the palette changes.
