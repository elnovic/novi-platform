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
  description: 'Plateforme technologique mondiale combinant apprentissage IA, opportunités professionnelles, recherche et veille mondiale. Cours certifiés, projets pratiques, examens oraux.',
  keywords: [
    'IA', 'intelligence artificielle', 'cours en ligne', 'certifications',
    'IOT', 'robotique', 'apprentissage technologique', 'opportunités tech',
    'NOVI', 'formation IA', 'machine learning', 'data science'
  ],
  authors: [{ name: 'NOVI Ecosystem' }],
  creator: 'NOVI Ecosystem',
  publisher: 'NOVI Ecosystem',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://noviEcosystem.com',
    siteName: 'NOVI Ecosystem',
    title: 'NOVI Ecosystem — Learn. Build. Get Opportunities.',
    description: 'Plateforme technologique mondiale combinant apprentissage IA, opportunités professionnelles, recherche et veille mondiale.',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'NOVI Ecosystem'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NOVI Ecosystem — Learn. Build. Get Opportunities.',
    description: 'Plateforme technologique mondiale combinant apprentissage IA, opportunités professionnelles, recherche et veille mondiale.',
    images: ['/logo.png'],
  },
  alternates: {
    canonical: 'https://noviEcosystem.com'
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