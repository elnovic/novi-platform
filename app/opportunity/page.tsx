'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getProfilsOpportunity, getOpportunites } from '@/lib/supabase'

const typeCouleur: Record<string, string> = {
  'Stage': 'bg-blue-50 text-blue-600',
  'CDI': 'bg-green-50 text-green-600',
  'Partenariat': 'bg-purple-50 text-purple-600',
  'Freelance': 'bg-amber-50 text-amber-600'
}

export default function Opportunity() {
  const [profils, setProfils] = useState<any[]>([])
  const [opportunites, setOpportunites] = useState<any[]>([])
  const [chargement, setChargement] = useState(true)
  const [onglet, setOnglet] = useState<'opportunites' | 'talents'>('opportunites')
  const [filtreDomaine, setFiltreDomaine] = useState('Tous')
  const [filtreType, setFiltreType] = useState('Tous')
  const [recherche, setRecherche] = useState('')

  useEffect(() => {
    Promise.all([getProfilsOpportunity(), getOpportunites()])
      .then(([p, o]) => { setProfils(p); setOpportunites(o); setChargement(false) })
      .catch(() => setChargement(false))
  }, [])

  const domaines = ['Tous', ...Array.from(new Set([
    ...opportunites.map(o => o.domaine),
    ...profils.flatMap(p => p.domaines || [])
  ].filter(Boolean)))]

  const types = ['Tous', 'Stage', 'CDI', 'Freelance', 'Partenariat']

  const opportunitesFiltrees = opportunites.filter(op => {
    const matchDomaine = filtreDomaine === 'Tous' || op.domaine === filtreDomaine
    const matchType = filtreType === 'Tous' || op.type === filtreType
    const matchRecherche = recherche === '' ||
      op.titre?.toLowerCase().includes(recherche.toLowerCase()) ||
      op.entreprise?.toLowerCase().includes(recherche.toLowerCase())
    return matchDomaine && matchType && matchRecherche
  })

  const profilsFiltres = profils.filter(p => {
    const matchDomaine = filtreDomaine === 'Tous' || p.domaines?.includes(filtreDomaine)
    const matchRecherche = recherche === '' ||
      p.titre?.toLowerCase().includes(recherche.toLowerCase()) ||
      p.ville?.toLowerCase().includes(recherche.toLowerCase())
    return matchDomaine && matchRecherche
  })

  return (
    <main className="min-h-screen bg-white">

      {/* Header */}
      <div className="bg-gray-950 text-white px-8 py-16">
        <div className="max-w-6xl mx-auto">
          <Link href="/" className="text-sm text-gray-400 hover:text-white mb-6 inline-block">← Accueil</Link>
          <div className="flex items-start justify-between gap-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">Novi Opportunity</h1>
              <p className="text-gray-400 max-w-xl">
                Connecte talent, entreprises et chercheurs du monde entier. Trouve ton opportunité ou fais-toi trouver.
              </p>
            </div>
            <Link href="/opportunity/profil/creer"
              className="flex-shrink-0 bg-blue-600 text-white px-6 py-3 rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors">
              + Créer mon profil
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
            {[
              { label: "Talents", valeur: profils.length > 0 ? profils.length : '1 200+' },
              { label: "Opportunités", valeur: opportunites.length > 0 ? opportunites.length : '340+' },
              { label: "Entreprises", valeur: "85+" },
              { label: "Pays", valeur: "42" }
            ].map(s => (
              <div key={s.label} className="bg-gray-900 rounded-xl p-4">
                <p className="text-2xl font-bold text-blue-400">{s.valeur}</p>
                <p className="text-xs text-gray-400 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-8 py-10">

        {/* Onglets */}
        <div className="flex gap-1 bg-gray-100 rounded-xl p-1 mb-8 w-fit">
          {[
            { key: 'opportunites', label: `Opportunités (${opportunites.length})` },
            { key: 'talents', label: `Talents (${profils.length})` }
          ].map(o => (
            <button key={o.key} onClick={() => setOnglet(o.key as any)}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
                onglet === o.key ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}>
              {o.label}
            </button>
          ))}
        </div>

        {/* Filtres */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <input type="text" placeholder="Rechercher..." value={recherche}
            onChange={e => setRecherche(e.target.value)}
            className="px-4 py-2 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 w-48" />

          <div className="flex flex-wrap gap-2">
            {domaines.slice(0, 6).map(d => (
              <button key={d} onClick={() => setFiltreDomaine(d)}
                className={`text-sm px-3 py-1.5 rounded-full border transition-colors ${
                  filtreDomaine === d
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'border-gray-200 text-gray-600 hover:border-blue-300'
                }`}>
                {d}
              </button>
            ))}
          </div>

          {onglet === 'opportunites' && (
            <div className="flex flex-wrap gap-2">
              {types.map(t => (
                <button key={t} onClick={() => setFiltreType(t)}
                  className={`text-sm px-3 py-1.5 rounded-full border transition-colors ${
                    filtreType === t
                      ? 'bg-gray-900 text-white border-gray-900'
                      : 'border-gray-200 text-gray-600 hover:border-gray-300'
                  }`}>
                  {t}
                </button>
              ))}
            </div>
          )}
        </div>

        {chargement ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
          </div>
        ) : (
          <>
            {/* OPPORTUNITÉS */}
            {onglet === 'opportunites' && (
              <div>
                {opportunitesFiltrees.length === 0 ? (
                  <div className="text-center py-16 bg-gray-50 rounded-2xl">
                    <p className="text-gray-400">Aucune opportunité trouvée.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {opportunitesFiltrees.map(op => (
                      <div key={op.id} className="border border-gray-100 rounded-2xl p-6 hover:border-blue-200 hover:shadow-sm transition-all">
                        <div className="flex items-start justify-between mb-3">
                          <span className={`text-xs px-2 py-1 rounded-full font-medium ${typeCouleur[op.type] || 'bg-gray-50 text-gray-600'}`}>
                            {op.type}
                          </span>
                          <span className="text-xs text-gray-400">{op.lieu}</span>
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-1">{op.titre}</h3>
                        <p className="text-sm text-blue-600 font-medium mb-2">{op.entreprise}</p>
                        <p className="text-xs text-gray-500 leading-relaxed mb-4">{op.description}</p>
                        {op.competences && (
                          <div className="flex flex-wrap gap-1 mb-4">
                            {op.competences.slice(0, 4).map((c: string) => (
                              <span key={c} className="text-xs bg-gray-50 text-gray-500 px-2 py-0.5 rounded border border-gray-100">
                                {c}
                              </span>
                            ))}
                          </div>
                        )}
                        <button className="w-full text-sm text-blue-600 border border-blue-200 py-2 rounded-lg hover:bg-blue-50 transition-colors font-medium">
                          Postuler →
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TALENTS */}
            {onglet === 'talents' && (
              <div>
                {profilsFiltres.length === 0 ? (
                  <div className="text-center py-16 bg-gray-50 rounded-2xl border border-gray-100">
                    <p className="text-gray-500 mb-4">Aucun profil disponible.</p>
                    <Link href="/opportunity/profil/creer"
                      className="inline-block bg-blue-600 text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-blue-700">
                      Créer le premier profil →
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {profilsFiltres.map(p => (
                      <div key={p.id} className="border border-gray-100 rounded-2xl p-6 hover:border-blue-200 hover:shadow-sm transition-all">
                        <div className="flex items-start gap-4 mb-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-white font-bold text-sm">{p.titre?.charAt(0) || 'N'}</span>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h3 className="font-semibold text-gray-900 text-sm">{p.titre}</h3>
                              <span className={`w-2 h-2 rounded-full flex-shrink-0 ${p.disponible ? 'bg-green-400' : 'bg-gray-300'}`} />
                            </div>
                            <p className="text-xs text-gray-400 mt-0.5">{p.ville}</p>
                          </div>
                        </div>

                        {p.bio && (
                          <p className="text-xs text-gray-500 leading-relaxed mb-3 line-clamp-2">{p.bio}</p>
                        )}

                        {p.domaines?.length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-3">
                            {p.domaines.slice(0, 3).map((d: string) => (
                              <span key={d} className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full">{d}</span>
                            ))}
                          </div>
                        )}

                        {p.competences?.length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-3">
                            {p.competences.slice(0, 4).map((c: string) => (
                              <span key={c} className="text-xs bg-gray-50 text-gray-500 px-2 py-0.5 rounded border border-gray-100">{c}</span>
                            ))}
                          </div>
                        )}

                        {p.langues?.length > 0 && (
                          <p className="text-xs text-gray-400 mb-4">🌍 {p.langues.join(' · ')}</p>
                        )}

                        {p.objectifs?.length > 0 && (
                          <div className="border-t border-gray-50 pt-3 mb-4">
                            <p className="text-xs text-gray-400 mb-1">Recherche</p>
                            <div className="flex flex-wrap gap-1">
                              {p.objectifs.map((o: string) => (
                                <span key={o} className="text-xs bg-green-50 text-green-600 px-2 py-0.5 rounded-full">{o}</span>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="flex gap-2 mt-4">
                          {p.linkedin && (
                            <a href={p.linkedin} target="_blank"
                              className="flex-1 text-xs text-center py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50">
                              LinkedIn
                            </a>
                          )}
                          {p.github && (
                            <a href={p.github} target="_blank"
                              className="flex-1 text-xs text-center py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50">
                              GitHub
                            </a>
                          )}
                          <Link href={`/opportunity/profil/${p.id}`}
                            className="flex-1 text-xs py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-center font-medium">
                            Voir profil
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </main>
  )
}