'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { use } from 'react'
import { getCours } from '@/lib/supabase'

export default function CoursDétail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [cours, setCours] = useState<any>(null)
  const [chargement, setChargement] = useState(true)

  useEffect(() => {
    getCours(id).then(data => { setCours(data); setChargement(false) })
      .catch(() => setChargement(false))
  }, [id])

  if (chargement) return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
    </main>
  )

  if (!cours) return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Cours introuvable</h1>
        <Link href="/academie" className="text-blue-600 hover:underline">Retour à l'académie</Link>
      </div>
    </main>
  )

  const contenu = cours.contenu || cours
  const chapitres = contenu.chapitres || []
  const objectifs = contenu.objectifs || []

  return (
    <main className="min-h-screen bg-white">
      <div className="bg-gray-950 text-white px-8 py-16">
        <div className="max-w-5xl mx-auto">
          <Link href="/academie" className="text-sm text-gray-400 hover:text-white mb-6 inline-block">← Novi Académie</Link>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs bg-blue-600 px-3 py-1 rounded-full">{cours.domaine}</span>
            <span className="text-xs bg-gray-800 px-3 py-1 rounded-full">{cours.niveau}</span>
            <span className="text-xs bg-gray-800 px-3 py-1 rounded-full">Score {cours.score_qualite}/100</span>
          </div>
          <h1 className="text-3xl font-bold mb-4">{cours.titre}</h1>
          <p className="text-gray-400 max-w-2xl mb-8">{cours.description}</p>
          <div className="flex items-center gap-6 text-sm text-gray-400">
            <span>{cours.duree_estimee}</span>
            <span>·</span>
            <span>{chapitres.length} chapitres</span>
            <span>·</span>
            <span>1 projet final</span>
            <span>·</span>
            <span>1 examen oral</span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-8 py-12 grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-10">
          {objectifs.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Ce que tu vas apprendre</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {objectifs.map((obj: string, i: number) => (
                  <div key={i} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-gray-600">{obj}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Programme</h2>
            <div className="space-y-3">
              {chapitres.map((ch: any, i: number) => (
                <Link key={i} href={`/academie/${id}/chapitre/${ch.numero}`}>
                  <div className="flex items-start gap-4 p-4 border border-gray-100 rounded-xl hover:border-blue-200 transition-colors">
                    <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-blue-600">{ch.numero}</span>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">{ch.titre}</h3>
                      {ch.contenu && <p className="text-xs text-gray-500 mt-1">{ch.contenu.slice(0, 80)}...</p>}
                    </div>
                  </div>
                </Link>
              ))}

              <div className="flex items-start gap-4 p-4 border border-gray-100 rounded-xl bg-gray-50">
                <div className="w-8 h-8 bg-amber-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Projet final</h3>
                  <p className="text-xs text-gray-500 mt-1">{contenu.projet_final?.titre || 'Projet pratique complet'}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 border border-gray-100 rounded-xl bg-gray-50">
                <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Examen oral IA</h3>
                  <p className="text-xs text-gray-500 mt-1">{contenu.examen_oral?.questions?.length || 5} questions évaluées par l'IA</p>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <div className="border border-gray-100 rounded-2xl p-6 sticky top-24">
            <div className="text-center mb-6">
              <p className="text-3xl font-bold text-gray-900">Gratuit</p>
              <p className="text-sm text-gray-500 mt-1">Accès complet</p>
            </div>
            <Link href={`/academie/${id}/chapitre/1`}
              className="block w-full bg-blue-600 text-white text-center py-3 rounded-xl hover:bg-blue-700 transition-colors font-medium mb-2">
              Commencer le cours
            </Link>
            <Link href={`/academie/${id}/examen`}
              className="block w-full border border-purple-200 text-purple-600 text-center py-3 rounded-xl hover:bg-purple-50 transition-colors font-medium text-sm">
              Passer l'examen oral
            </Link>
            <div className="space-y-3 mt-6 text-sm text-gray-500">
              {[`${cours.duree_estimee} de contenu`, 'Quiz interactifs', 'Projet final guidé', 'Examen oral IA', 'Accès à vie'].map(item => (
                <div key={item} className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="border border-blue-100 rounded-2xl p-6 bg-blue-50">
            <h3 className="font-semibold text-blue-900 mb-2">Certificat NOVI Académie</h3>
            <p className="text-xs text-blue-700 mb-1">Score qualité : <strong>{cours.score_qualite}/100</strong></p>
            <p className="text-xs text-blue-500">Valide 2 ans</p>
          </div>
        </div>
      </div>
    </main>
  )
}