'use client'

import Link from 'next/link'
import { use } from 'react'

export default function ProfilDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-xl font-bold text-gray-900 mb-4">Profil #{id}</h1>
        <Link href="/opportunity" className="text-blue-600 hover:underline text-sm">
          ← Retour aux opportunités
        </Link>
      </div>
    </main>
  )
}