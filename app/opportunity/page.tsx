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

  useEffect(() => {
    Promise.all([getProfilsOpportunity(), getOpportunites()])
      .then(([p, o]) => { setProfils(p); setOpportunites(o); setChargement(false) })
      .catch(() => setChargement(false))
  }, [])

  return (
    <main className="min-h-screen bg-white">
      <div className="bg-gray-950 text-white px-8 py-16">
        <div className="max-w-6xl mx-auto">
          <Link href="/" className="text-sm text-gray-400 hover:text-white mb-6 inline-block">← Accueil</Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Novi Opportunity</h1>
              <p className="text-gray-400">Connecte talent, entreprises et chercheurs du monde entier</p>
            </div>
            <Link href="/opportunity/profil/creer" className="bg-blue-600 text-white px-6 py-3 rounded-xl text-sm font-medium hover:bg-blue-700">
              Créer mon profil
            </Link>
          </div>
          <div className="grid grid-cols-4 gap-6 mt-10">
            {[{ label: "Talents", valeur: "1 200+" }, { label: "Entreprises", valeur: "85+" }, { label: "Opportunités", valeur: "340+" }, { label: "Pays", valeur: "42" }].map(s => (
              <div key={s.label} className="bg-gray-900 rounded-xl p-4">
                <p className="text-2xl font-bold text-blue-400">{s.valeur}</p>
                <p className="text-xs text-gray-400 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-8 py-12">
        {chargement ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
          </div>
        ) : (
          <>
            <section className="mb-14">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Opportunités récentes <span className="text-sm font-normal text-gray-400">({opportunites.length})</span></h2>
              </div>
              {opportunites.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-2xl">
                  <p className="text-gray-400">Aucune opportunité disponible.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {opportunites.map(op => (
                    <div key={op.id} className="border border-gray-100 rounded-2xl p-6 hover:border-blue-200 transition-colors">
                      <div className="flex items-start justify-between mb-3">
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${typeCouleur[op.type] || 'bg-gray-50 text-gray-600'}`}>{op.type}</span>
                        <span className="text-xs text-gray-400">{op.lieu}</span>
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-1">{op.titre}</h3>
                      <p className="text-sm text-gray-500 mb-3">{op.entreprise}</p>
                      {op.competences && (
                        <div className="flex flex-wrap gap-1 mb-4">
                          {op.competences.map((c: string) => (
                            <span key={c} className="text-xs bg-gray-50 text-gray-500 px-2 py-0.5 rounded border border-gray-100">{c}</span>
                          ))}
                        </div>
                      )}
                      <button className="w-full text-sm text-blue-600 border border-blue-200 py-2 rounded-lg hover:bg-blue-50">Postuler →</button>
                    </div>
                  ))}
                </div>
              )}
            </section>

            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Talents certifiés NOVI <span className="text-sm font-normal text-gray-400">({profils.length})</span></h2>
                <Link href="/opportunity/profil/creer" className="text-sm text-blue-600 hover:underline">Créer mon profil →</Link>
              </div>
              {profils.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-2xl border border-gray-100">
                  <p className="text-gray-500 mb-4">Aucun profil disponible.</p>
                  <Link href="/opportunity/profil/creer" className="inline-block bg-blue-600 text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-blue-700">
                    Être le premier →
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {profils.map(p => (
                    <div key={p.id} className="border border-gray-100 rounded-2xl p-6 hover:border-blue-200 transition-colors">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-bold text-sm">{p.titre?.charAt(0) || 'N'}</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-gray-900 text-sm">{p.titre}</h3>
                            <span className={`w-2 h-2 rounded-full ${p.disponible ? 'bg-green-400' : 'bg-gray-300'}`} />
                          </div>
                          <p className="text-xs text-gray-400 mt-0.5">{p.ville}</p>
                        </div>
                      </div>
                      {p.domaines?.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-3">
                          {p.domaines.slice(0, 3).map((d: string) => (
                            <span key={d} className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full">{d}</span>
                          ))}
                        </div>
                      )}
                      {p.objectifs?.length > 0 && (
                        <div className="border-t border-gray-50 pt-3">
                          <p className="text-xs text-gray-400 mb-1">Recherche</p>
                          <div className="flex flex-wrap gap-1">
                            {p.objectifs.slice(0, 2).map((o: string) => (
                              <span key={o} className="text-xs text-gray-500">{o}</span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </section>
          </>
        )}
      </div>
    </main>
  )
}