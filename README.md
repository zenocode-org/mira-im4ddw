# MIRA Spectacle Slide Decks

Slide decks for the IM4DDW Développement Web module, built with [Spectacle](https://nearform.com/open-source/spectacle/).

## Structure

```
mira/
├── slides/
│   ├── components/          # Shared MIRA template components
│   │   ├── theme.js         # MIRA/AFLOKKAT color palette
│   │   ├── MiraSlide.jsx    # Title & content slide layouts
│   │   ├── MiraTemplate.jsx # Alternative template layouts
│   │   ├── decorations.jsx  # Geometric patterns (hexagons, waves)
│   │   └── HtmlPreview.jsx  # Live HTML/CSS preview (iframe)
│   ├── seance-01/           # Session 1 decks
│   │   ├── presentation-module.jsx
│   │   └── cours-html-css.jsx
│   └── main.jsx             # Deck selector + router
├── index.html
├── package.json
└── vite.config.js
```

## Getting Started

```bash
npm install
npm run dev
```

Then open:
- **http://localhost:3000** — Deck selector (groupé par séance avec dates)
- **http://localhost:3000?deck=seance-01-module** — Présentation du Module (inclut projets finaux)
- **http://localhost:3000?deck=seance-01-html-css** — Cours HTML/CSS (avec live preview)

## Features

- **MIRA/AFLOKKAT template** — School branding with teal/cyan, dark gray, geometric patterns
- **Live HTML preview** — The HTML/CSS course displays executed HTML in slides via `HtmlPreview` component
- **Reusable components** — `MiraTitleSlide`, `MiraContentSlide`, `MiraTitle`, `MiraSubtitle`, `HtmlPreview` for future decks

## Adding New Decks

1. Create a new deck file in `slides/seance-XX/deck-name.jsx`
2. Export a default component that returns `<Deck theme={theme}>...</Deck>`
3. Register in `slides/main.jsx` in the `SESSIONS` array — add a deck to an existing session or create a new session with `id`, `title`, `date` and `decks`
4. Use `MiraTitleSlide` and `MiraContentSlide` for consistent branding

## Spectacle Controls

- **←/→** or **Space** — Navigate slides
- **F** — Fullscreen
- **P** — Presenter mode (notes, timer)
- **O** — Overview mode
