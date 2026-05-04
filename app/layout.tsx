import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: {
    default: 'NOVI Ecosystem — Learn. Build. Get Opportunities.',
    template: '%s | NOVI Ecosystem'
  },
  description: 'Plateforme technologique mondiale combinant apprentissage IA, opportunités professionnelles, recherche et veille mondiale.',
  keywords: ['IA', 'intelligence artificielle', 'cours en ligne', 'certifications', 'IOT', 'robotique'],
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    siteName: 'NOVI Ecosystem',
    title: 'NOVI Ecosystem — Learn. Build. Get Opportunities.',
    description: 'Plateforme technologique mondiale.'
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Navbar />
        {children}
      </body>
    </html>
  )
}