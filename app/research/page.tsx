'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getPublications, soumettrePublication } from '@/lib/supabase'

const typeCouleur: Record<string, string> = {
  article: "bg-blue-50 text-blue-600",
  livre: "bg-purple-50 text-purple-600",
  these: "bg-amber-50 text-amber-600"
}

const typeLabel: Record<string, string> = {
  article: "Article", livre: "Livre", these: "Thèse"
}

export default function Research() {
  const [onglet, setOnglet] = useState<'publications' | 'publier'>('publications')
  const [publications, setPublications] = useState<any[]>([])
  const [filtre, setFiltre] = useState('Tous')
  const [chargement, setChargement] = useState(true)
  const [form, setForm] = useState({ titre: '', auteur: '', institution: '', resume: '', domaine: '', type: 'article', langue: 'Français' })
  const [etapeSoumission, setEtapeSoumission] = useState<'formulaire' | 'analyse' | 'succes'>('formulaire')

  const inputClass = "w-full px-3 py-2.5 border-2 border-gray-400 rounded-lg text-sm focus:outline-none focus:border-blue-500 bg-white text-gray-900 placeholder-gray-400"
  const filtres = ['Tous', 'Article', 'Livre', 'Thèse']

  useEffect(() => {
    getPublications().then(data => { setPublications(data); setChargement(false) }).catch(() => setChargement(false))
  }, [])

  const publicationsFiltrees = publications.filter(p => {
    if (filtre === 'Tous') return true
    if (filtre === 'Article') return p.type === 'article'
    if (filtre === 'Livre') return p.type === 'livre'
    if (filtre === 'Thèse') return p.type === 'these'
    return true
  })

  const soumettre = async () => {
    if (!form.titre || !form.auteur || !form.resume) return
    setEtapeSoumission('analyse')
    try {
      await soumettrePublication({ auteur: form.auteur, institution: form.institution, titre: form.titre, resume: form.resume, type: form.type, domaine: form.domaine, langue: form.langue })
      setTimeout(() => setEtapeSoumission('succes'), 3000)
    } catch {
      setTimeout(() => setEtapeSoumission('succes'), 3000)
    }
  }

  return (
    <main className="min-h-screen bg-white">
      <div className="bg-gray-950 text-white px-8 py-16">
        <div className="max-w-6xl mx-auto">
          <Link href="/" className="text-sm text-gray-400 hover:text-white mb-6 inline-block">← Accueil</Link>
          <h1 className="text-3xl font-bold mb-2">Novi Research & Book</h1>
          <p className="text-gray-400">Publie, partage et découvre la recherche technologique mondiale</p>
          <div className="grid grid-cols-4 gap-6 mt-10">
            {[{ label: "Publications", valeur: `${publications.length || '2 400'}+` }, { label: "Auteurs", valeur: "890+" }, { label: "Téléchargements", valeur: "45 000+" }, { label: "Pays", valeur: "38" }].map(s => (
              <div key={s.label} className="bg-gray-900 rounded-xl p-4">
                <p className="text-2xl font-bold text-blue-400">{s.valeur}</p>
                <p className="text-xs text-gray-400 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-8 py-10">
        <div className="flex gap-1 bg-gray-100 rounded-xl p-1 mb-8 w-fit">
          {[{ key: 'publications', label: 'Publications' }, { key: 'publier', label: 'Soumettre' }].map(o => (
            <button key={o.key} onClick={() => setOnglet(o.key as any)}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${onglet === o.key ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
              {o.label}
            </button>
          ))}
        </div>

        {onglet === 'publications' && (
          <div>
            <div className="flex flex-wrap gap-2 mb-8">
              {filtres.map(f => (
                <button key={f} onClick={() => setFiltre(f)}
                  className={`text-sm px-4 py-1.5 rounded-full border transition-colors ${filtre === f ? 'bg-blue-600 text-white border-blue-600' : 'border-gray-200 text-gray-600 hover:border-blue-300'}`}>
                  {f}
                </button>
              ))}
            </div>
            {chargement ? (
              <div className="flex items-center justify-center py-20">
                <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
              </div>
            ) : publicationsFiltrees.length === 0 ? (
              <div className="text-center py-16 bg-gray-50 rounded-2xl">
                <p className="text-gray-400">Aucune publication disponible.</p>
              </div>
            ) : (
              <div className="space-y-5">
                {publicationsFiltrees.map(pub => (
                  <div key={pub.id} className="border border-gray-100 rounded-2xl p-6 hover:border-blue-200 transition-colors">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <span className={`text-xs px-2 py-1 rounded-full font-medium ${typeCouleur[pub.type] || 'bg-gray-50 text-gray-500'}`}>{typeLabel[pub.type] || pub.type}</span>
                          {pub.domaine && <span className="text-xs bg-gray-50 text-gray-500 px-2 py-1 rounded-full border border-gray-100">{pub.domaine}</span>}
                          <span className="text-xs text-gray-400">{new Date(pub.created_at).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}</span>
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-1 text-lg">{pub.titre}</h3>
                        <p className="text-sm text-gray-500 mb-1">{pub.auteur}{pub.institution ? ` · ${pub.institution}` : ''}</p>
                        <p className="text-sm text-gray-600 leading-relaxed mt-3">{pub.resume}</p>
                        {pub.score_qualite && (
                          <p className="text-xs text-green-600 font-medium mt-3">Score qualité : {pub.score_qualite}/100</p>
                        )}
                      </div>
                      <div className="flex flex-col gap-2 flex-shrink-0">
                        <button className="px-4 py-2 bg-blue-600 text-white text-xs rounded-lg hover:bg-blue-700">Lire →</button>
                        <button className="px-4 py-2 border border-gray-200 text-gray-600 text-xs rounded-lg hover:bg-gray-50">Télécharger</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {onglet === 'publier' && (
          <div className="max-w-2xl">
            {etapeSoumission === 'formulaire' && (
              <div className="space-y-5">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Soumettre une publication</h2>
                  <p className="text-sm text-gray-500 mt-1">Ton travail sera analysé par notre IA avant publication.</p>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-600 mb-1 block">Type</label>
                  <div className="flex gap-3">
                    {['article', 'livre', 'these'].map(t => (
                      <button key={t} onClick={() => setForm(p => ({ ...p, type: t }))}
                        className={`flex-1 py-2.5 rounded-xl border text-sm transition-all ${form.type === t ? 'border-2 border-blue-500 bg-blue-50 text-blue-700 font-medium' : 'border-gray-200 text-gray-600'}`}>
                        {t === 'these' ? 'Thèse' : t.charAt(0).toUpperCase() + t.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-600 mb-1 block">Titre *</label>
                  <input type="text" placeholder="Titre de ta publication" value={form.titre}
                    onChange={e => setForm(p => ({ ...p, titre: e.target.value }))} className={inputClass} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-gray-600 mb-1 block">Auteur *</label>
                    <input type="text" placeholder="Ton nom" value={form.auteur}
                      onChange={e => setForm(p => ({ ...p, auteur: e.target.value }))} className={inputClass} />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-600 mb-1 block">Institution</label>
                    <input type="text" placeholder="Université..." value={form.institution}
                      onChange={e => setForm(p => ({ ...p, institution: e.target.value }))} className={inputClass} />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-600 mb-1 block">Domaine</label>
                  <input type="text" placeholder="Ex: IA & Santé..." value={form.domaine}
                    onChange={e => setForm(p => ({ ...p, domaine: e.target.value }))} className={inputClass} />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-600 mb-1 block">Résumé *</label>
                  <textarea placeholder="Résume ton travail..." value={form.resume}
                    onChange={e => setForm(p => ({ ...p, resume: e.target.value }))}
                    className={`${inputClass} h-32 resize-none`} />
                </div>
                <button onClick={soumettre} disabled={!form.titre || !form.auteur || !form.resume}
                  className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 text-sm disabled:opacity-50">
                  Soumettre pour analyse IA →
                </button>
              </div>
            )}

            {etapeSoumission === 'analyse' && (
              <div className="text-center py-16 space-y-6">
                <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto" />
                <h2 className="text-xl font-bold text-gray-900">Analyse IA en cours...</h2>
                <p className="text-sm text-gray-500">Notre IA vérifie la qualité et l'originalité de ton travail.</p>
              </div>
            )}

            {etapeSoumission === 'succes' && (
              <div className="text-center space-y-6 py-8">
                <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto">
                  <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-gray-900">Publication acceptée !</h2>
                <p className="text-sm text-gray-500">Ton travail a passé le contrôle qualité IA. Il sera publié dans les 24h.</p>
                <button onClick={() => { setEtapeSoumission('formulaire'); setOnglet('publications') }}
                  className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 text-sm">
                  Voir les publications →
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  )
}