import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Novi Opportunity — Opportunités tech mondiales',
  description: 'Connecte-toi avec des entreprises tech du monde entier.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}