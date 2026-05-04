'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getCoursListe } from '@/lib/supabase'

const couleurs: Record<string, string> = {
  "IA":            "bg-blue-50 text-blue-600 border-blue-100",
  "Programmation": "bg-green-50 text-green-600 border-green-100",
  "IOT":           "bg-amber-50 text-amber-600 border-amber-100",
  "Robotique":     "bg-purple-50 text-purple-600 border-purple-100",
  "Juridique":     "bg-red-50 text-red-600 border-red-100",
  "Langue":        "bg-teal-50 text-teal-600 border-teal-100",
  "Sécurité":      "bg-orange-50 text-orange-600 border-orange-100"
}

const niveauCouleur: Record<string, string> = {
  "débutant":      "bg-green-50 text-green-600",
  "intermédiaire": "bg-amber-50 text-amber-600",
  "avancé":        "bg-red-50 text-red-600"
}

export default function Academie() {
  const [cours, setCours] = useState<any[]>([])
  const [chargement, setChargement] = useState(true)
  const [filtre, setFiltre] = useState('Tous')

  useEffect(() => {
    getCoursListe()
      .then(data => {
        setCours(data)
        setChargement(false)
      })
      .catch(err => {
        console.error(err)
        setChargement(false)
      })
  }, [])

  const domaines = ['Tous', ...Array.from(new Set(cours.map(c => c.domaine).filter(Boolean)))]
  const coursFiltres = filtre === 'Tous' ? cours : cours.filter(c => c.domaine === filtre)

  return (
    <main className="min-h-screen bg-white">

      {/* Header */}
      <div className="bg-gray-50 border-b border-gray-100 px-8 py-12">
        <div className="max-w-6xl mx-auto">
          <Link href="/" className="text-sm text-blue-600 hover:underline mb-4 inline-block">
            ← Retour à l'accueil
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Novi Académie</h1>
          <p className="text-gray-500">
            {chargement ? 'Chargement...' : `${cours.length} cours certifiés`} · Projets pratiques · Examens oraux · Certifications NOVI
          </p>

          {/* Filtres */}
          {!chargement && (
            <div className="flex items-center gap-3 mt-6 flex-wrap">
              {domaines.map(f => (
                <button
                  key={f}
                  onClick={() => setFiltre(f)}
                  className={`text-sm px-4 py-1.5 rounded-full border transition-colors ${
                    filtre === f
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'border-gray-200 text-gray-600 hover:border-blue-300 hover:text-blue-600'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Liste des cours */}
      <section className="px-8 py-12">
        <div className="max-w-6xl mx-auto">

          {chargement ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
            </div>
          ) : coursFiltres.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400 mb-2">Aucun cours disponible.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {coursFiltres.map(c => (
                <Link key={c.id} href={`/academie/${c.id}`}>
                  <div className="bg-white border border-gray-100 rounded-2xl p-6 hover:border-blue-200 hover:shadow-sm transition-all cursor-pointer h-full flex flex-col">

                    {/* Domaine + Niveau */}
                    <div className="flex items-center justify-between mb-4">
                      <span className={`text-xs font-medium px-3 py-1 rounded-full border ${couleurs[c.domaine] || 'bg-gray-50 text-gray-600 border-gray-100'}`}>
                        {c.domaine || 'Général'}
                      </span>
                      <span className={`text-xs font-medium px-3 py-1 rounded-full ${niveauCouleur[c.niveau] || 'bg-gray-50 text-gray-500'}`}>
                        {c.niveau ? c.niveau.charAt(0).toUpperCase() + c.niveau.slice(1) : 'Débutant'}
                      </span>
                    </div>

                    {/* Titre + Description */}
                    <h2 className="font-semibold text-gray-900 mb-2 leading-snug">{c.titre}</h2>
                    <p className="text-sm text-gray-500 leading-relaxed flex-1">
                      {c.description
                        ? c.description.slice(0, 120) + '...'
                        : 'Cours complet avec projets pratiques et certification NOVI.'}
                    </p>

                    {/* Infos */}
                    <div className="flex items-center gap-4 mt-4 text-xs text-gray-400">
                      <span>{c.duree_estimee || '10 heures'}</span>
                      <span>·</span>
                      <span>Score {c.score_qualite || 85}/100</span>
                    </div>

                    {/* Certification */}
                    {c.certification && (
                      <div className="mt-4 pt-4 border-t border-gray-50">
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                          </svg>
                          <span className="text-xs text-blue-600 font-medium">Certificat NOVI inclus</span>
                        </div>
                      </div>
                    )}

                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

    </main>
  )
}