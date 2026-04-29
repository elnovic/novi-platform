'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function CreerProfil() {
  const [etape, setEtape] = useState(1)
  const [form, setForm] = useState({
    nom: '', prenom: '', titre: '', ville: '', bio: '',
    competences: [] as string[],
    domaines: [] as string[],
    objectifs: [] as string[],
    langues: [] as string[],
    linkedin: '', github: ''
  })
  const [competenceInput, setCompetenceInput] = useState('')
  const [erreur, setErreur] = useState('')

  const inputClass = "w-full px-3 py-2.5 border-2 border-gray-400 rounded-lg text-sm focus:outline-none focus:border-blue-500 bg-white text-gray-900 placeholder-gray-400"

  const domainesListe = ["IA", "IOT", "Robotique", "Programmation", "Droit numérique", "Recherche", "Data Science", "Cybersécurité"]
  const objectifsListe = ["Stage", "CDI", "Freelance", "Partenariat", "Collaboration recherche", "Publication"]
  const languesListe = ["Français", "Anglais", "Arabe", "Espagnol", "Portugais", "Allemand", "Chinois"]

  const toggleItem = (liste: string[], item: string, champ: string) => {
    const nouvelle = liste.includes(item) ? liste.filter(i => i !== item) : [...liste, item]
    setForm(prev => ({ ...prev, [champ]: nouvelle }))
  }

  const ajouterCompetence = () => {
    if (competenceInput.trim() && !form.competences.includes(competenceInput.trim())) {
      setForm(prev => ({ ...prev, competences: [...prev.competences, competenceInput.trim()] }))
      setCompetenceInput('')
    }
  }

  const validerEtape1 = () => {
    if (!form.nom || !form.prenom || !form.titre || !form.ville) {
      setErreur('Remplis tous les champs obligatoires.')
      return
    }
    setErreur('')
    setEtape(2)
  }

  const validerEtape2 = () => {
    if (form.domaines.length === 0 || form.competences.length === 0) {
      setErreur('Ajoute au moins un domaine et une compétence.')
      return
    }
    setErreur('')
    setEtape(3)
  }

  const soumettre = () => {
    if (form.objectifs.length === 0) {
      setErreur('Choisis au moins un objectif.')
      return
    }
    setErreur('')
    setEtape(4)
  }

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-12">

      <Link href="/" className="flex items-center gap-2 mb-8">
        <Image src="/logo.png" alt="NOVI" width={36} height={36} />
        <div>
          <span className="text-lg font-bold text-blue-600 tracking-widest">NOVi</span>
          <p className="text-xs text-gray-400 tracking-widest uppercase leading-none">Opportunity</p>
        </div>
      </Link>

      <div className="bg-white rounded-2xl border border-gray-100 p-8 w-full max-w-lg">

        {etape < 4 && (
          <div className="flex items-center gap-2 mb-8">
            {[1, 2, 3].map(n => (
              <div key={n} className="flex items-center gap-2 flex-1">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                  n < etape ? 'bg-green-500 text-white' :
                  n === etape ? 'bg-blue-600 text-white' :
                  'bg-gray-100 text-gray-400'
                }`}>
                  {n < etape ? '✓' : n}
                </div>
                {n < 3 && <div className={`flex-1 h-0.5 ${n < etape ? 'bg-green-500' : 'bg-gray-100'}`} />}
              </div>
            ))}
          </div>
        )}

        {/* ÉTAPE 1 */}
        {etape === 1 && (
          <div className="space-y-4">
            <div>
              <h1 className="text-xl font-bold text-gray-900">Crée ton profil</h1>
              <p className="text-sm text-gray-500 mt-1">Visible par les entreprises et partenaires NOVI</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-gray-600 mb-1 block">Prénom *</label>
                <input type="text" placeholder="Jean" value={form.prenom}
                  onChange={e => setForm(p => ({ ...p, prenom: e.target.value }))} className={inputClass} />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600 mb-1 block">Nom *</label>
                <input type="text" placeholder="Dupont" value={form.nom}
                  onChange={e => setForm(p => ({ ...p, nom: e.target.value }))} className={inputClass} />
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600 mb-1 block">Titre professionnel *</label>
              <input type="text" placeholder="Ex: Étudiant en IA & Data Science" value={form.titre}
                onChange={e => setForm(p => ({ ...p, titre: e.target.value }))} className={inputClass} />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600 mb-1 block">Ville, Pays *</label>
              <input type="text" placeholder="Ex: Casablanca, Maroc" value={form.ville}
                onChange={e => setForm(p => ({ ...p, ville: e.target.value }))} className={inputClass} />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600 mb-1 block">Bio</label>
              <textarea placeholder="Présente-toi en quelques phrases..." value={form.bio}
                onChange={e => setForm(p => ({ ...p, bio: e.target.value }))}
                className={`${inputClass} h-24 resize-none`} />
            </div>
            {erreur && <p className="text-xs text-red-500">{erreur}</p>}
            <button onClick={validerEtape1}
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors text-sm">
              Continuer →
            </button>
          </div>
        )}

        {/* ÉTAPE 2 */}
        {etape === 2 && (
          <div className="space-y-5">
            <div>
              <h1 className="text-xl font-bold text-gray-900">Compétences & Domaines</h1>
              <p className="text-sm text-gray-500 mt-1">Ce que tu sais faire</p>
            </div>

            <div>
              <p className="text-xs font-medium text-gray-600 mb-2">Domaines *</p>
              <div className="flex flex-wrap gap-2">
                {domainesListe.map(d => (
                  <button key={d} onClick={() => toggleItem(form.domaines, d, 'domaines')}
                    className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                      form.domaines.includes(d) ? 'bg-blue-600 text-white border-blue-600' : 'border-gray-200 text-gray-600 hover:border-blue-300'
                    }`}>
                    {d}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-medium text-gray-600 mb-2">Compétences techniques *</p>
              <div className="flex gap-2 mb-2">
                <input type="text" placeholder="Ex: Python, TensorFlow..." value={competenceInput}
                  onChange={e => setCompetenceInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && ajouterCompetence()}
                  className={inputClass} />
                <button onClick={ajouterCompetence}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors flex-shrink-0">
                  +
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {form.competences.map(c => (
                  <span key={c} className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full flex items-center gap-1">
                    {c}
                    <button onClick={() => setForm(p => ({ ...p, competences: p.competences.filter(x => x !== c) }))}
                      className="text-blue-400 hover:text-blue-700">×</button>
                  </span>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-medium text-gray-600 mb-2">Langues</p>
              <div className="flex flex-wrap gap-2">
                {languesListe.map(l => (
                  <button key={l} onClick={() => toggleItem(form.langues, l, 'langues')}
                    className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                      form.langues.includes(l) ? 'bg-blue-600 text-white border-blue-600' : 'border-gray-200 text-gray-600 hover:border-blue-300'
                    }`}>
                    {l}
                  </button>
                ))}
              </div>
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

        {/* ÉTAPE 3 */}
        {etape === 3 && (
          <div className="space-y-5">
            <div>
              <h1 className="text-xl font-bold text-gray-900">Objectifs & Réseaux</h1>
              <p className="text-sm text-gray-500 mt-1">Ce que tu recherches</p>
            </div>

            <div>
              <p className="text-xs font-medium text-gray-600 mb-2">Je recherche *</p>
              <div className="flex flex-wrap gap-2">
                {objectifsListe.map(o => (
                  <button key={o} onClick={() => toggleItem(form.objectifs, o, 'objectifs')}
                    className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                      form.objectifs.includes(o) ? 'bg-blue-600 text-white border-blue-600' : 'border-gray-200 text-gray-600 hover:border-blue-300'
                    }`}>
                    {o}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-gray-600 mb-1 block">LinkedIn (optionnel)</label>
              <input type="url" placeholder="https://linkedin.com/in/..." value={form.linkedin}
                onChange={e => setForm(p => ({ ...p, linkedin: e.target.value }))} className={inputClass} />
            </div>

            <div>
              <label className="text-xs font-medium text-gray-600 mb-1 block">GitHub (optionnel)</label>
              <input type="url" placeholder="https://github.com/..." value={form.github}
                onChange={e => setForm(p => ({ ...p, github: e.target.value }))} className={inputClass} />
            </div>

            {erreur && <p className="text-xs text-red-500">{erreur}</p>}
            <div className="flex gap-3">
              <button onClick={() => setEtape(2)}
                className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-600 text-sm hover:bg-gray-50">
                ← Retour
              </button>
              <button onClick={soumettre}
                className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 text-sm">
                Créer mon profil
              </button>
            </div>
          </div>
        )}

        {/* ÉTAPE 4 — Succès */}
        {etape === 4 && (
          <div className="text-center space-y-6 py-4">
            <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto">
              <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Profil créé !</h1>
              <p className="text-sm text-gray-500 mt-2">
                Ton profil {form.prenom} {form.nom} est maintenant visible sur Novi Opportunity.
              </p>
            </div>
            <div className="bg-blue-50 rounded-xl p-4 text-left space-y-1">
              <p className="text-xs text-blue-600">Titre : {form.titre}</p>
              <p className="text-xs text-blue-600">Ville : {form.ville}</p>
              <p className="text-xs text-blue-600">Domaines : {form.domaines.join(', ')}</p>
              <p className="text-xs text-blue-600">Compétences : {form.competences.join(', ')}</p>
            </div>
            <Link href="/opportunity"
              className="block w-full bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors text-sm">
              Voir Novi Opportunity →
            </Link>
          </div>
        )}

      </div>
    </main>
  )
}