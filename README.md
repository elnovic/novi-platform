# NOVI Platform

The web platform for NOVI Ecosystem, an independent initiative working to make artificial intelligence more accessible and useful through learning, opportunities, research, and innovation.

## Technology

- Next.js 16 and React 19
- TypeScript
- Supabase
- Tailwind CSS
- Leaflet and React Leaflet

## Getting started

### Requirements

- Node.js (current LTS recommended)
- npm

### Install dependencies

```bash
npm install
```

### Configure environment

Create a local `.env.local` file and provide the Supabase settings required by the application. Use the variable names referenced in the source code. Never commit real credentials.

### Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the local development server |
| `npm run build` | Build the production application |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint |

## Project structure

- `app/` — Next.js routes and pages
- `components/` — reusable interface components
- `lib/` — shared application utilities
- `public/` — static assets

## Development notes

- Keep environment variables and private keys out of version control.
- Prefer reusable components and typed interfaces.
- Validate changes with linting and a production build before deployment.

## Status

This repository contains the NOVI Platform application. Refer to the source code and deployment configuration for the current implementation details.
