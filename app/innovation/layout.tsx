import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Novi Innovation — Carte mondiale des évolutions tech',
  description: 'Explore les évolutions technologiques de 195 pays. Startups, investissements, projets phares et veille IA en temps réel.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}