# Week 2 - Interactive UI Component

## Project: Accessible FAQ Accordion

This project is an interactive FAQ accordion built from scratch using **HTML5, CSS3 and vanilla JavaScript**.

The component is designed to be reusable, responsive, keyboard-friendly and accessible without using external libraries or frameworks.

## Features

- Expand/collapse FAQ items
- One-at-a-time accordion behavior
- Expand All / Collapse All control
- Smooth open/close animation
- Responsive layout for desktop and mobile
- Semantic HTML structure
- ARIA attributes: `aria-expanded`, `aria-controls`, `aria-labelledby`
- `role="region"` for content panels
- Keyboard navigation with:
  - Tab
  - Enter / Space (native button behavior)
  - Arrow Up / Arrow Down
  - Home / End
- Visible keyboard focus states
- `prefers-reduced-motion` support
- No-JavaScript fallback keeps the FAQ content readable
- JavaScript error handling with a readable fallback
- No external dependencies

## Files

- `index.html` - Semantic page and accordion structure
- `style.css` - Component styling, responsive design and animations
- `script.js` - DOM manipulation, events, keyboard navigation and error handling

## How to Run

1. Download or clone this folder.
2. Keep all three files in the same folder.
3. Open `index.html` in a browser.

For development, the folder can also be opened in VS Code and run with Live Server.

## How to Test

### Mouse / Touch
- Click an FAQ question to open it.
- Click the open question to close it.
- Open another question to see the previous one close.
- Use **Expand all** to open every item.
- Use **Collapse all** to close every item.

### Keyboard
1. Press Tab until an accordion button receives focus.
2. Press Enter or Space to open/close it.
3. Press Arrow Down / Arrow Up to move between accordion buttons.
4. Press Home to move to the first button.
5. Press End to move to the last button.

### Responsive Test
Use browser developer tools and switch between desktop and mobile widths.

### Accessibility Test
- Keyboard-only navigation
- Visible focus indicator
- Screen-reader-friendly button names and ARIA states
- Reduced-motion preference

### Fallback Test
Temporarily disable JavaScript in the browser. The FAQ content remains readable instead of becoming inaccessible.

## Implementation Notes

The JavaScript uses small reusable functions such as `setPanelState()` and `updateToggleAllButton()` instead of repeating the same DOM logic for every item.

The component also checks for missing required DOM elements. If initialization fails, it exposes the FAQ content rather than leaving the page unusable.

## Technologies

- HTML5
- CSS3
- Vanilla JavaScript (ES6+)
