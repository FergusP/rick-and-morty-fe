# Rick & Morty Explorer

A Next.js application to explore characters and episodes from the Rick and Morty universe.

## Live Demo

[https://rickandmorty.ferguspatricio.workers.dev/](https://rickandmorty.ferguspatricio.workers.dev/)

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS 4
- **State Management:** Zustand
- **Animations:** GSAP, Framer Motion
- **Testing:** Vitest, React Testing Library
- **Deployment:** Cloudflare Workers (via OpenNext)

## Features

- Browse 826+ characters with search and filters (status, species, gender)
- View all 51 episodes with search
- Character and episode detail pages
- Favorites system (persisted in localStorage)
- Dark/Light theme toggle
- Responsive design (mobile-first)
- GSAP-powered landing page animations

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended)

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd rick-and-morty-fe

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Scripts

| Command             | Description                  |
| ------------------- | ---------------------------- |
| `pnpm dev`          | Start development server     |
| `pnpm build`        | Build for production         |
| `pnpm build:worker` | Build for Cloudflare Workers |
| `pnpm test`         | Run tests in watch mode      |
| `pnpm test:run`     | Run tests once               |
| `pnpm lint`         | Run ESLint                   |

## Project Structure

```
src/
├── app/                  # Next.js App Router pages
│   ├── api/              # API proxy routes
│   ├── characters/       # Characters list & detail
│   ├── episodes/         # Episodes list
│   └── episode/          # Episode detail
├── components/           # React components
│   ├── characters/       # Character-related components
│   ├── episodes/         # Episode-related components
│   ├── layout/           # Header, layout components
│   └── ui/               # Reusable UI components
├── hooks/                # Custom React hooks
├── lib/                  # API functions
├── stores/               # Zustand stores
├── test/                 # Test setup
└── types/                # TypeScript types
```

## Time Log

| Task           | Time    |
| -------------- | ------- |
| Setup          | 15min   |
| Character List | 1.5h    |
| Search/Filters | 1.5h    |
| Pagination     | 1h      |
| Detail Page    | 1.5h    |
| Styling        | 1.5h    |
| Bonus          | 2h      |
| Deploy         | 45min   |
| **Total**      | **10h** |
