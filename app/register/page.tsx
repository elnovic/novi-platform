'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { inscrireUtilisateur } from '@/lib/supabase'

export default function Register() {
  const [etape, setEtape] = useState(1)
  const [form, setForm] = useState({
    nom: '', prenom: '', email: '', motdepasse: '', confirmation: '',
    niveau: '', objectifs: [] as string[], domaines: [] as string[]
  })
  const [erreur, setErreur] = useState('')
  const [chargement, setChargement] = useState(false)

  const niveaux = ["Débutant complet", "Quelques bases", "Intermédiaire", "Avancé"]
  const objectifsListe = ["Travailler dans la tech", "Créer mes propres projets", "Obtenir des certifications", "Changer de carrière", "Approfondir mes connaissances", "Trouver des opportunités"]
  const domainesListe = ["Intelligence Artificielle", "IOT", "Robotique", "Programmation", "Droit numérique", "Recherche & Développement", "Anglais technique"]
  const inputClass = "w-full px-3 py-2.5 border-2 border-gray-400 rounded-lg text-sm focus:outline-none focus:border-blue-500 bg-white text-gray-900 placeholder-gray-400"

  const toggleItem = (liste: string[], item: string, champ: 'objectifs' | 'domaines') => {
    const nouvelle = liste.includes(item) ? liste.filter(i => i !== item) : [...liste, item]
    setForm(prev => ({ ...prev, [champ]: nouvelle }))
  }

  const validerEtape1 = () => {
    if (!form.nom || !form.prenom || !form.email || !form.motdepasse || !form.confirmation) {
      setErreur('Tous les champs sont obligatoires.'); return
    }
    if (form.motdepasse !== form.confirmation) {
      setErreur('Les mots de passe ne correspondent pas.'); return
    }
    if (form.motdepasse.length < 8) {
      setErreur('Le mot de passe doit contenir au moins 8 caractères.'); return
    }
    setErreur(''); setEtape(2)
  }

  const validerEtape2 = () => {
    if (!form.niveau) { setErreur('Choisis ton niveau.'); return }
    setErreur(''); setEtape(3)
  }

  const soumettre = async () => {
    if (form.objectifs.length === 0 || form.domaines.length === 0) {
      setErreur('Choisis au moins un objectif et un domaine.'); return
    }
    setErreur(''); setChargement(true)
    try {
      await inscrireUtilisateur({
        nom: form.nom, prenom: form.prenom, email: form.email,
        motdepasse: form.motdepasse, niveau: form.niveau,
        objectifs: form.objectifs, domaines: form.domaines
      })
      setEtape(4)
    } catch (e: any) {
      setErreur(e.message || 'Erreur lors de la création du compte.')
    } finally {
      setChargement(false)
    }
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

      <div className="bg-white rounded-2xl border border-gray-100 p-8 w-full max-w-md">
        {etape < 4 && (
          <div className="flex items-center gap-2 mb-8">
            {[1, 2, 3].map(n => (
              <div key={n} className="flex items-center gap-2 flex-1">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                  n < etape ? 'bg-green-500 text-white' : n === etape ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-400'
                }`}>
                  {n < etape ? '✓' : n}
                </div>
                {n < 3 && <div className={`flex-1 h-0.5 ${n < etape ? 'bg-green-500' : 'bg-gray-100'}`} />}
              </div>
            ))}
          </div>
        )}

        {etape === 1 && (
          <div className="space-y-5">
            <div>
              <h1 className="text-xl font-bold text-gray-900">Crée ton compte</h1>
              <p className="text-sm text-gray-500 mt-1">Rejoins NOVI Ecosystem gratuitement</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-gray-600 mb-1 block">Prénom</label>
                <input type="text" placeholder="Jean" value={form.prenom}
                  onChange={e => setForm(p => ({ ...p, prenom: e.target.value }))} className={inputClass} />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600 mb-1 block">Nom</label>
                <input type="text" placeholder="Dupont" value={form.nom}
                  onChange={e => setForm(p => ({ ...p, nom: e.target.value }))} className={inputClass} />
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600 mb-1 block">Email</label>
              <input type="email" placeholder="jean@exemple.com" value={form.email}
                onChange={e => setForm(p => ({ ...p, email: e.target.value }))} className={inputClass} />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600 mb-1 block">Mot de passe</label>
              <input type="password" placeholder="Minimum 8 caractères" value={form.motdepasse}
                onChange={e => setForm(p => ({ ...p, motdepasse: e.target.value }))} className={inputClass} />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600 mb-1 block">Confirmer</label>
              <input type="password" placeholder="Répète ton mot de passe" value={form.confirmation}
                onChange={e => setForm(p => ({ ...p, confirmation: e.target.value }))} className={inputClass} />
            </div>
            {erreur && <p className="text-xs text-red-500">{erreur}</p>}
            <button onClick={validerEtape1}
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 text-sm">
              Continuer →
            </button>
            <p className="text-center text-xs text-gray-400">
              Déjà un compte ?{' '}
              <Link href="/login" className="text-blue-600 hover:underline">Se connecter</Link>
            </p>
          </div>
        )}

        {etape === 2 && (
          <div className="space-y-5">
            <div>
              <h1 className="text-xl font-bold text-gray-900">Quel est ton niveau ?</h1>
              <p className="text-sm text-gray-500 mt-1">On adapte ton parcours à ton profil</p>
            </div>
            <div className="space-y-3">
              {niveaux.map(n => (
                <button key={n} onClick={() => setForm(p => ({ ...p, niveau: n }))}
                  className={`w-full text-left px-4 py-3.5 rounded-xl border text-sm transition-all ${
                    form.niveau === n
                      ? 'border-2 border-blue-500 bg-blue-50 text-blue-700 font-medium'
                      : 'border border-gray-200 text-gray-700 hover:border-blue-300'
                  }`}>
                  {n}
                </button>
              ))}
            </div>
            {erreur && <p className="text-xs text-red-500">{erreur}</p>}
            <div className="flex gap-3">
              <button onClick={() => setEtape(1)}
                className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-600 text-sm hover:bg-gray-50">
                ← Retour
              </button>
              <button onClick={validerEtape2}
                className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 text-sm">
                Continuer →
              </button>
            </div>
          </div>
        )}

        {etape === 3 && (
          <div className="space-y-5">
            <div>
              <h1 className="text-xl font-bold text-gray-900">Tes objectifs</h1>
              <p className="text-sm text-gray-500 mt-1">Choisis ce qui te correspond</p>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-600 mb-2">Objectifs professionnels</p>
              <div className="flex flex-wrap gap-2">
                {objectifsListe.map(obj => (
                  <button key={obj} onClick={() => toggleItem(form.objectifs, obj, 'objectifs')}
                    className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                      form.objectifs.includes(obj)
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'border-gray-200 text-gray-600 hover:border-blue-300'
                    }`}>
                    {obj}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-600 mb-2">Domaines d'intérêt</p>
              <div className="flex flex-wrap gap-2">
                {domainesListe.map(dom => (
                  <button key={dom} onClick={() => toggleItem(form.domaines, dom, 'domaines')}
                    className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                      form.domaines.includes(dom)
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'border-gray-200 text-gray-600 hover:border-blue-300'
                    }`}>
                    {dom}
                  </button>
                ))}
              </div>
            </div>
            {erreur && <p className="text-xs text-red-500">{erreur}</p>}
            <div className="flex gap-3">
              <button onClick={() => setEtape(2)}
                className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-600 text-sm hover:bg-gray-50">
                ← Retour
              </button>
              <button onClick={soumettre} disabled={chargement}
                className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 text-sm disabled:opacity-60">
                {chargement ? 'Création...' : 'Créer mon compte'}
              </button>
            </div>
          </div>
        )}

        {etape === 4 && (
          <div className="text-center space-y-6 py-4">
            <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto">
              <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Bienvenue, {form.prenom} !</h1>
              <p className="text-sm text-gray-500 mt-2">Ton compte NOVI a été créé avec succès.</p>
            </div>
            <div className="bg-blue-50 rounded-xl p-4 text-left">
              <p className="text-xs font-medium text-blue-700 mb-2">Ton profil :</p>
              <p className="text-xs text-blue-600">Niveau : {form.niveau}</p>
              <p className="text-xs text-blue-600 mt-1">Domaines : {form.domaines.join(', ')}</p>
            </div>
            <Link href="/dashboard"
              className="block w-full bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 text-sm">
              Accéder à mon tableau de bord →
            </Link>
          </div>
        )}
      </div>
    </main>
  )
}