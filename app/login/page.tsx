'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { connecterUtilisateur } from '@/lib/supabase'

export default function Login() {
  const [form, setForm] = useState({ email: '', motdepasse: '' })
  const [erreur, setErreur] = useState('')
  const [chargement, setChargement] = useState(false)

  const inputClass = "w-full px-3 py-2.5 border-2 border-gray-400 rounded-lg text-sm focus:outline-none focus:border-blue-500 bg-white text-gray-900 placeholder-gray-400"

  const soumettre = async () => {
    if (!form.email || !form.motdepasse) {
      setErreur('Remplis tous les champs.')
      return
    }
    setErreur('')
    setChargement(true)
    try {
      await connecterUtilisateur(form.email, form.motdepasse)
      const params = new URLSearchParams(window.location.search)
      const redirect = params.get('redirect') || '/dashboard'
      window.location.href = redirect
    } catch (e: any) {
      setErreur(e.message || 'Email ou mot de passe incorrect.')
    } finally {
      setChargement(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') soumettre()
  }

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-12">

      <Link href="/" className="flex items-center gap-2 mb-8">
        <Image src="/logo.png" alt="NOVI" width={36} height={36} />
        <div>
          <span className="text-lg font-bold text-blue-600 tracking-widest">NOVi</span>
          <p className="text-xs text-gray-400 tracking-widest uppercase leading-none">Ecosystem</p>
        </div>
      </Link>

      <div className="bg-white rounded-2xl border border-gray-100 p-8 w-full max-w-md space-y-5">

        <div>
          <h1 className="text-xl font-bold text-gray-900">Connexion</h1>
          <p className="text-sm text-gray-500 mt-1">Bon retour sur NOVI Ecosystem</p>
        </div>

        <div>
          <label className="text-xs font-medium text-gray-600 mb-1 block">Adresse email</label>
          <input
            type="email"
            placeholder="jean@exemple.com"
            value={form.email}
            onChange={e => setForm(prev => ({ ...prev, email: e.target.value }))}
            onKeyDown={handleKeyDown}
            className={inputClass}
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs font-medium text-gray-600">Mot de passe</label>
          </div>
          <input
            type="password"
            placeholder="Ton mot de passe"
            value={form.motdepasse}
            onChange={e => setForm(prev => ({ ...prev, motdepasse: e.target.value }))}
            onKeyDown={handleKeyDown}
            className={inputClass}
          />
        </div>

        {erreur && (
          <div className="bg-red-50 border border-red-100 rounded-xl px-4 py-3">
            <p className="text-xs text-red-500">{erreur}</p>
          </div>
        )}

        <button
          onClick={soumettre}
          disabled={chargement}
          className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors text-sm disabled:opacity-60"
        >
          {chargement ? (
            <span className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Connexion...
            </span>
          ) : 'Se connecter'}
        </button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-100" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white px-3 text-xs text-gray-400">ou</span>
          </div>
        </div>

        <p className="text-center text-xs text-gray-400">
          Pas encore de compte ?{' '}
          <Link href="/register" className="text-blue-600 hover:underline font-medium">
            Créer un compte gratuitement
          </Link>
        </p>

      </div>

      <p className="text-xs text-gray-400 mt-6 text-center max-w-sm">
        En te connectant, tu acceptes les conditions d'utilisation de NOVI Ecosystem.
      </p>

    </main>
  )
}