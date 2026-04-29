import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Novi Research & Book — Publications technologiques',
  description: 'Publie et découvre des articles, livres et thèses technologiques. Contrôle qualité IA et diffusion mondiale.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}