'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const pathname = usePathname()

  const liens = [
    { href: '/academie', label: 'Académie' },
    { href: '/opportunity', label: 'Opportunity' },
    { href: '/research', label: 'Research' },
    { href: '/innovation', label: 'Innovation' }
  ]

  // Ne pas afficher la navbar sur login/register
  if (pathname === '/login' || pathname === '/register' ||
      pathname === '/opportunity/profil/creer') return null

  return (
    <nav className="bg-white border-b border-gray-100 px-8 py-4 flex items-center justify-between sticky top-0 z-40">
      <Link href="/" className="flex items-center gap-3">
        <Image src="/logo.png" alt="NOVI" width={44} height={44} />
        <div>
          <span className="text-lg font-bold text-blue-600 tracking-widest">NOVi</span>
          <p className="text-xs text-gray-400 tracking-widest uppercase leading-none">Ecosystem</p>
        </div>
      </Link>

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

      <div className="flex items-center gap-3">
        <Link href="/dashboard"
          className="text-sm text-gray-600 hover:text-blue-600 transition-colors font-medium">
          Mon espace
        </Link>
        <Link href="/login"
          className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
          Connexion
        </Link>
        <Link href="/register"
          className="text-sm bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
          Commencer
        </Link>
      </div>
    </nav>
  )
}