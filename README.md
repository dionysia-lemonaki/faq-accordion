# Frontend Mentor – FAQ Accordion

An accessible FAQ accordion built with React, TypeScript, and Tailwind CSS - focusing on correct ARIA patterns, semantic HTML, and keyboard/screen reader support.

## 🔗 Links

|           |                                                                                                |
| --------- | ---------------------------------------------------------------------------------------------- |
| Solution  | [Frontend Mentor submission](https://www.frontendmentor.io/solutions/faq-accordion-UpxpjZ19Rb) |
| Live site | [View live ](https://faq-accordion-dionysialemonaki.vercel.app/)                               |

## ✅ Acceptance Criteria

Users should be able to:

- Hide/Show the answer to a question when the question is clicked
- Navigate the questions and hide/show answers using keyboard navigation alone
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page

## 📸 Screenshots

Mobile:

![mobile screenshot](/src/assets/images/screenshots/mobile-screenshot.jpeg)

Desktop:

![desktop screenshot](/src/assets/images/screenshots/desktop-screenshot.jpeg)

## 🏗️ Built With

- React 19
- TypeScript
- Tailwind CSS v4
- Vite
- Semantic HTML
- WAI-ARIA Accordion Pattern

## 🎨 What I Focused On

### Following the WAI-ARIA Accordion Pattern

Before writing any code, I read through the [official APG accordion pattern](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/).

My first instinct was to wrap each FAQ item in an `li`, since a list of questions and answers feels list-like. The APG pattern doesn't recommend that, though - a `ul`/`li` wrapper adds a "list, N items" announcement that doesn't give a screen reader user any useful information. The heading structure already lets users jump between questions with their heading shortcuts, which does that job better. Each item is a `div` instead, with the question marked up as `h3 > button` so it's part of the page's heading outline.

### ARIA Relationships Generated from a Single `useId`

The button and its panel reference each other and both need unique, stable ids. Rather than hardcoding ids or calling `useId` twice, I derived both from one call:

```jsx
const baseId = useId();

const buttonId = `${baseId}-button`;
const panelId = `${baseId}-panel`;
```

The button gets `aria-expanded` (reflecting open/closed state) and `aria-controls={panelId}`. The panel gets `role="region"` and `aria-labelledby={buttonId}`. `role="region"` is optional per the APG pattern and only recommended for six or fewer panels - this challenge has four, so it's appropriate here. A region role with no accessible name is just noise to a screen reader, so pairing it with `aria-labelledby` is what makes it meaningful.

### Decorative Icons

The plus/minus toggle icons are `<img>` elements with `alt=""`. The open/closed state is already communicated through `aria-expanded`, so the icon doesn't need its own accessible name - giving it one would be redundant.

### Typed Data File

`data.ts` is typed as `QuestionAndAnswer[]`, so TypeScript validates every object in the array at write time:

```ts
export interface QuestionAndAnswer {
  id: number;
  question: string;
  answer: string;
}

const data: QuestionAndAnswer[] = [
  {
    id: 1,
    question: "What is Frontend Mentor, and how will it help me?",
    answer: "Frontend Mentor offers realistic coding challenges...",
  },
  // ...
];
```

### Omit to Avoid Duplicating Types

`AccordionItem` doesn't need the id field - it generates its own ids via `useId` rather than relying on the data's id. Instead of writing a second, near-identical interface, I derived its props type from the shared `QuestionAndAnswer`:

```ts
type AccordionItemProps = Omit<QuestionAndAnswer, "id">;
```

This keeps a single source of truth for the data shape. If `QuestionAndAnswer` changes, `AccordionItemProps` updates automatically.

## Component Architecture

The app follows a clear, unidirectional data flow:

```
App
├── reads data.ts
└── Accordion (receives data)
└── AccordionItem × 4 (receives question, answer)
```

## Accessibility

- Decorative icons have empty `alt=""` attributes so screen readers skip them
- Each question is an `h3 > butto`n, placing it in the page's heading outline for easy navigation
- `aria-expanded`, `aria-controls`, and `aria-labelledby` correctly link each button to its panel
- Visible, high-contrast `focus-visible` outlines (not just default browser focus) on all interactive elements
- Manually tested with VoiceOver on macOS to confirm tab order, expanded/collapsed announcements, and that panel content is reachable and read correctly

## 🚧 Known Limitation

The design's background graphic (which the card overlaps) isn't implemented. I got CSS Grid stacking mostly working, but didn't fully understand the technique I'd landed on and it started to feel like a hack rather than a deliberate decision - so I chose not to ship it. The accordion itself is fully functional and accessible without it. I plan to revisit this once I understand the underlying grid behaviour properly, rather than shipping a fix I can't explain.
