'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getCoursListe } from '@/lib/supabase'

const couleurs: Record<string, { bg: string, text: string, border: string }> = {
  "IA":            { bg: "bg-blue-50", text: "text-blue-600", border: "border-blue-100" },
  "Programmation": { bg: "bg-green-50", text: "text-green-600", border: "border-green-100" },
  "IOT":           { bg: "bg-amber-50", text: "text-amber-600", border: "border-amber-100" },
  "Robotique":     { bg: "bg-purple-50", text: "text-purple-600", border: "border-purple-100" },
  "Juridique":     { bg: "bg-red-50", text: "text-red-600", border: "border-red-100" },
  "Langue":        { bg: "bg-teal-50", text: "text-teal-600", border: "border-teal-100" },
  "Sécurité":      { bg: "bg-orange-50", text: "text-orange-600", border: "border-orange-100" },
  "Data Science":  { bg: "bg-indigo-50", text: "text-indigo-600", border: "border-indigo-100" }
}

const niveauConfig: Record<string, { bg: string, text: string, label: string }> = {
  "débutant":      { bg: "bg-green-50", text: "text-green-700", label: "Débutant" },
  "intermédiaire": { bg: "bg-amber-50", text: "text-amber-700", label: "Intermédiaire" },
  "avancé":        { bg: "bg-red-50", text: "text-red-700", label: "Avancé" }
}

export default function Academie() {
  const [cours, setCours] = useState<any[]>([])
  const [chargement, setChargement] = useState(true)
  const [filtre, setFiltre] = useState('Tous')
  const [recherche, setRecherche] = useState('')
  const [niveauFiltre, setNiveauFiltre] = useState('Tous')

  useEffect(() => {
    getCoursListe()
      .then(data => { setCours(data); setChargement(false) })
      .catch(() => setChargement(false))
  }, [])

  const domaines = ['Tous', ...Array.from(new Set(cours.map(c => c.domaine).filter(Boolean)))]
  const niveaux = ['Tous', 'débutant', 'intermédiaire', 'avancé']

  const coursFiltres = cours.filter(c => {
    const matchDomaine = filtre === 'Tous' || c.domaine === filtre
    const matchNiveau = niveauFiltre === 'Tous' || c.niveau === niveauFiltre
    const matchRecherche = recherche === '' ||
      c.titre?.toLowerCase().includes(recherche.toLowerCase()) ||
      c.description?.toLowerCase().includes(recherche.toLowerCase())
    return matchDomaine && matchNiveau && matchRecherche
  })

  return (
    <main className="min-h-screen bg-white">

      {/* Header */}
      <div className="bg-gray-950 text-white px-8 py-16">
        <div className="max-w-6xl mx-auto">
          <Link href="/" className="text-sm text-gray-400 hover:text-white mb-6 inline-block">← Accueil</Link>
          <h1 className="text-3xl font-bold mb-2">Novi Académie</h1>
          <p className="text-gray-400">
            {chargement ? 'Chargement...' : `${cours.length} cours certifiés`} · Projets pratiques · Examens oraux · Certifications NOVI
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {[
              { label: "Cours disponibles", valeur: chargement ? '...' : cours.length },
              { label: "Certifiés NOVI", valeur: chargement ? '...' : cours.filter(c => c.certification).length },
              { label: "Domaines", valeur: chargement ? '...' : new Set(cours.map(c => c.domaine).filter(Boolean)).size },
              { label: "Score moyen", valeur: chargement ? '...' : cours.length > 0 ? Math.round(cours.reduce((acc, c) => acc + (c.score_qualite || 0), 0) / cours.length) + '/100' : '0' }
            ].map(s => (
              <div key={s.label} className="bg-gray-900 rounded-xl p-4">
                <p className="text-2xl font-bold text-blue-400">{s.valeur}</p>
                <p className="text-xs text-gray-400 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filtres */}
      <div className="border-b border-gray-100 px-8 py-5 bg-gray-50">
        <div className="max-w-6xl mx-auto space-y-4">

          {/* Recherche */}
          <input type="text" placeholder="Rechercher un cours..."
            value={recherche} onChange={e => setRecherche(e.target.value)}
            className="w-full max-w-md px-4 py-2.5 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500" />

          {/* Filtres domaines */}
          <div className="flex flex-wrap gap-2">
            {domaines.map(d => (
              <button key={d} onClick={() => setFiltre(d)}
                className={`text-sm px-4 py-1.5 rounded-full border transition-all font-medium ${
                  filtre === d
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                    : 'border-gray-200 text-gray-600 hover:border-blue-300 hover:text-blue-600 bg-white'
                }`}>
                {d}
              </button>
            ))}
          </div>

          {/* Filtres niveaux */}
          <div className="flex flex-wrap gap-2">
            {niveaux.map(n => (
              <button key={n} onClick={() => setNiveauFiltre(n)}
                className={`text-xs px-3 py-1 rounded-full border transition-all ${
                  niveauFiltre === n
                    ? 'bg-gray-900 text-white border-gray-900'
                    : 'border-gray-200 text-gray-500 hover:border-gray-400 bg-white'
                }`}>
                {n === 'Tous' ? 'Tous niveaux' : n.charAt(0).toUpperCase() + n.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Liste cours */}
      <section className="px-8 py-12">
        <div className="max-w-6xl mx-auto">

          {chargement ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-64 bg-gray-100 rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : coursFiltres.length === 0 ? (
            <div className="text-center py-20 bg-gray-50 rounded-2xl">
              <p className="text-gray-400 mb-2">Aucun cours trouvé.</p>
              <button onClick={() => { setFiltre('Tous'); setNiveauFiltre('Tous'); setRecherche('') }}
                className="text-sm text-blue-600 hover:underline">
                Réinitialiser les filtres
              </button>
            </div>
          ) : (
            <>
              <p className="text-sm text-gray-400 mb-6">{coursFiltres.length} cours trouvé(s)</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {coursFiltres.map(c => {
                  const couleur = couleurs[c.domaine] || { bg: "bg-gray-50", text: "text-gray-600", border: "border-gray-100" }
                  const niveau = niveauConfig[c.niveau] || { bg: "bg-gray-50", text: "text-gray-500", label: "Débutant" }
                  return (
                    <Link key={c.id} href={`/academie/${c.id}`}>
                      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:border-blue-200 hover:shadow-md transition-all cursor-pointer group h-full flex flex-col">

                        {/* Bande colorée en haut */}
                        <div className={`h-1.5 ${couleur.bg} border-b ${couleur.border}`} />

                        <div className="p-6 flex flex-col flex-1">
                          {/* Tags */}
                          <div className="flex items-center justify-between mb-4">
                            <span className={`text-xs font-semibold px-3 py-1 rounded-full ${couleur.bg} ${couleur.text}`}>
                              {c.domaine || 'Général'}
                            </span>
                            <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${niveau.bg} ${niveau.text}`}>
                              {niveau.label}
                            </span>
                          </div>

                          {/* Titre */}
                          <h2 className="font-bold text-gray-900 mb-2 leading-snug group-hover:text-blue-600 transition-colors text-lg">
                            {c.titre}
                          </h2>

                          {/* Description */}
                          <p className="text-sm text-gray-500 leading-relaxed flex-1 line-clamp-3">
                            {c.description || 'Cours complet avec projets pratiques et certification NOVI.'}
                          </p>

                          {/* Footer */}
                          <div className="mt-4 pt-4 border-t border-gray-50">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3 text-xs text-gray-400">
                                <span>⏱ {c.duree_estimee || '10h'}</span>
                                <span>⭐ {c.score_qualite || 85}/100</span>
                              </div>
                              {c.certification && (
                                <div className="flex items-center gap-1">
                                  <svg className="w-3.5 h-3.5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                  </svg>
                                  <span className="text-xs text-blue-600 font-medium">Certifié</span>
                                </div>
                              )}
                            </div>
                            <div className="mt-3">
                              <span className="text-xs text-blue-600 font-medium group-hover:translate-x-1 transition-transform inline-block">
                                Commencer le cours →
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  )
}