'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { getUtilisateurConnecte, deconnecterUtilisateur } from '@/lib/supabase'

export default function Navbar() {
  const pathname = usePathname()
  const [utilisateur, setUtilisateur] = useState<any>(null)

  useEffect(() => {
    getUtilisateurConnecte().then(setUtilisateur).catch(() => setUtilisateur(null))
  }, [pathname])

  const seDeconnecter = async () => {
    await deconnecterUtilisateur()
    setUtilisateur(null)
    window.location.href = '/'
  }

  const liens = [
    { href: '/academie', label: 'Académie' },
    { href: '/opportunity', label: 'Opportunity' },
    { href: '/research', label: 'Research' },
    { href: '/innovation', label: 'Innovation' },
    { href: '/about', label: 'À propos' }
  ]

  if (
    pathname === '/login' ||
    pathname === '/register' ||
    pathname === '/opportunity/profil/creer'
  ) return null

  return (
    <nav className="bg-white border-b border-gray-100 px-8 py-4 flex items-center justify-between sticky top-0 z-40">

      {/* Logo */}
      <Link href="/" className="flex items-center gap-3">
        <Image src="/logo.png" alt="NOVI" width={52} height={52} />
        <div>
          <span className="text-lg font-bold text-blue-600 tracking-widest">NOVi</span>
          <p className="text-xs text-gray-400 tracking-widest uppercase leading-none">Ecosystem</p>
        </div>
      </Link>

      {/* Liens */}
      <div className="flex items-center gap-6 text-sm">
        {liens.map(lien => (
          <Link
            key={lien.href}
            href={lien.href}
            className={`transition-colors font-medium ${
              pathname.startsWith(lien.href)
                ? 'text-blue-600'
                : 'text-gray-600 hover:text-blue-600'
            }`}
          >
            {lien.label}
          </Link>
        ))}
      </div>

      {/* Auth */}
      <div className="flex items-center gap-3">
        {utilisateur ? (
          <>
            <Link href="/profil" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <div className="w-8 h-8 rounded-full overflow-hidden bg-blue-600 flex items-center justify-center flex-shrink-0">
                {utilisateur.avatar_url ? (
                  <img src={utilisateur.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-white text-xs font-bold">
                    {utilisateur.prenom?.[0]}{utilisateur.nom?.[0]}
                  </span>
                )}
              </div>
              <span className="text-sm text-gray-700 font-medium">{utilisateur.prenom}</span>
            </Link>
            <Link href="/dashboard" className="text-sm text-gray-500 hover:text-blue-600 transition-colors">
              Dashboard
            </Link>
            <button onClick={seDeconnecter} className="text-xs text-gray-400 hover:text-red-500 transition-colors">
              Déconnexion
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="text-sm text-gray-600 hover:text-blue-600 transition-colors font-medium">
              Connexion
            </Link>
            <Link href="/register" className="text-sm bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
              Commencer
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}