# Smile Hunter - Project Context

## Overview
Smile Hunter is a web-based cognitive training game based on Attention Bias Modification (ABM) research. Users find smiling faces in a 3x3 grid of neutral expressions to retrain attention patterns toward positivity.

**Live:** https://smilehunter.app
**Deployment:** Cloudflare Pages

## Tech Stack
- **Framework:** Preact (not React) - uses `preact/hooks`
- **Language:** TypeScript 5.9.x
- **Build:** Vite 6.4.x
- **Styling:** Tailwind CSS 3.x
- **State:** Jotai (atomic state management)
- **Charts:** Recharts
- **Package Manager:** pnpm

## Project Structure
```
src/
├── app.tsx              # Main app, view routing via switch on ActiveView enum
├── main.tsx             # Entry point, renders to #app
├── state/state.ts       # Jotai atoms: activeViewAtom, gameStatsAtom
├── store/statsStore.ts  # localStorage persistence (last 10 results per round count)
├── utils/math.ts        # Helpers: range(), shuffle(), choose()
├── views/
│   ├── start-view/      # Welcome screen with Instagram footer
│   ├── ConfigureGameView.tsx  # Round selector (5/10/15)
│   ├── GameView.tsx     # Main game logic, face grid, image preloading
│   └── ResultsView.tsx  # Results display, charts, Buy Me a Coffee footer
└── components/
    ├── block/           # Face tile with shake animation on wrong click
    ├── pagination-dots/ # Round progress indicator
    ├── toggle/          # Round count selector
    └── loading-dialog/  # Image preload progress
```

## Key Patterns

### View Navigation
Views are controlled via `activeViewAtom` enum:
```typescript
enum ActiveView {
    START_VIEW,
    CONFIGURE_GAME_VIEW,
    GAME_VIEW,
    RESULT_VIEW,
}
```
Switch between views: `setActiveView(ActiveView.GAME_VIEW)`

### Game State
`gameStatsAtom` tracks current game:
```typescript
interface GameStats {
    numberOfRounds: number;  // 5, 10, or 15
    startTime: number;       // timestamp
    endTime: number;         // timestamp
    totalFaces: number;      // rounds * 9
    erroneousSmiles: number; // wrong clicks
}
```

### Face Assets
Images hosted on GitHub:
- Normal faces: 153 images at `https://raw.githubusercontent.com/zjor/assets/.../normal/{1-153}.jpg`
- Smiling faces: 26 images at `https://raw.githubusercontent.com/zjor/assets/.../smiling/{1-26}.jpg`

Each round: 8 random normal + 1 random smiling face, shuffled into 3x3 grid.

### Results Persistence
`statsStore.ts` saves to localStorage:
- Key format: `{numberOfRounds}:time` and `{numberOfRounds}:accuracy`
- Keeps last 10 entries per round count (MAX_LENGTH = 10)

## Build Commands
```bash
pnpm dev      # Start dev server (--host for network access)
pnpm build    # TypeScript check + Vite build
pnpm preview  # Preview production build
```

## Important Notes

### TypeScript Strictness
Cloudflare builds from scratch without cache. Ensure all types are correct - `tickFormatter` in Recharts must return `string`, not `number`:
```typescript
tickFormatter={(value: number) => String(Math.round(value))}
```

### SVG Imports
SVGs are imported as URLs and used in `<img src={...}>`:
```typescript
import InstagramIcon from "../assets/instagram.svg"
// Usage: <img src={InstagramIcon} className="w-4 h-4"/>
```

### CSS
- Global styles in `src/index.css` (includes Tailwind directives)
- Component-specific CSS files alongside components
- Custom button class: `nb-btn` (neubrutalism style)
- Custom font: `font-baloo` for headings

## Planned TODOs (from README)
- Track total face picking time per round
- Track precision metrics
- Add faces with different emotions
- Visit tracker / analytics
- About section
- Allow custom round counts beyond 5/10/15
- Better face designs

## External Links
- Instagram: https://www.instagram.com/sergey.royz (StartView footer)
- Buy Me a Coffee: https://buymeacoffee.com/zjor (ResultsView footer)
