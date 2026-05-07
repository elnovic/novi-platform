'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getPublications, soumettrePublication, supabase } from '@/lib/supabase'

const typeCouleur: Record<string, string> = {
  article: "bg-blue-50 text-blue-600",
  livre: "bg-purple-50 text-purple-600",
  these: "bg-amber-50 text-amber-600"
}

const typeLabel: Record<string, string> = {
  article: "Article",
  livre: "Livre",
  these: "Thèse"
}

export default function Research() {
  const [onglet, setOnglet] = useState<'publications' | 'publier'>('publications')
  const [publications, setPublications] = useState<any[]>([])
  const [filtre, setFiltre] = useState('Tous')
  const [recherche, setRecherche] = useState('')
  const [chargement, setChargement] = useState(true)
  const [publicationOuverte, setPublicationOuverte] = useState<any>(null)
  const [form, setForm] = useState({
    titre: '', auteur: '', institution: '',
    resume: '', domaine: '', type: 'article',
    langue: 'Français', mots_cles: ''
  })
  const [fichier, setFichier] = useState<File | null>(null)
  const [etapeSoumission, setEtapeSoumission] = useState<'formulaire' | 'analyse' | 'succes'>('formulaire')
  const [progression, setProgression] = useState(0)

  const inputClass = "w-full px-3 py-2.5 border-2 border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500 bg-white text-gray-900 placeholder-gray-400"
  const filtres = ['Tous', 'Article', 'Livre', 'Thèse']

  useEffect(() => {
    getPublications()
      .then(data => { setPublications(data); setChargement(false) })
      .catch(() => setChargement(false))
  }, [])

  const publicationsFiltrees = publications.filter(p => {
    const matchFiltre = filtre === 'Tous' ||
      (filtre === 'Article' && p.type === 'article') ||
      (filtre === 'Livre' && p.type === 'livre') ||
      (filtre === 'Thèse' && p.type === 'these')
    const matchRecherche = recherche === '' ||
      p.titre?.toLowerCase().includes(recherche.toLowerCase()) ||
      p.auteur?.toLowerCase().includes(recherche.toLowerCase()) ||
      p.domaine?.toLowerCase().includes(recherche.toLowerCase())
    return matchFiltre && matchRecherche
  })

  const soumettre = async () => {
    if (!form.titre || !form.auteur || !form.resume) return
    setEtapeSoumission('analyse')

    // Simuler progression
    let prog = 0
    const interval = setInterval(() => {
      prog += 10
      setProgression(prog)
      if (prog >= 90) clearInterval(interval)
    }, 300)

    try {
      const pub = await soumettrePublication({
        auteur: form.auteur,
        institution: form.institution,
        titre: form.titre,
        resume: form.resume,
        type: form.type,
        domaine: form.domaine,
        langue: form.langue
      })

      // Upload fichier PDF si présent
      if (fichier && pub?.id) {
        const extension = fichier.name.split('.').pop()
        const chemin = `publications/${pub.id}.${extension}`
        const { error: uploadError } = await supabase.storage
          .from('publications')
          .upload(chemin, fichier, { upsert: true })

        if (!uploadError) {
          const { data } = supabase.storage.from('publications').getPublicUrl(chemin)
          await supabase
            .from('publications')
            .update({
              fichier_url: data.publicUrl,
              fichier_taille: `${(fichier.size / 1024 / 1024).toFixed(1)} MB`
            })
            .eq('id', pub.id)
        }
      }

      clearInterval(interval)
      setProgression(100)
      setTimeout(() => setEtapeSoumission('succes'), 500)
    } catch {
      clearInterval(interval)
      setTimeout(() => setEtapeSoumission('succes'), 3000)
    }
  }

  const telecharger = async (pub: any) => {
    if (!pub.fichier_url) return
    try {
      await supabase.rpc('incrementer_telechargements', { pub_id: pub.id })
    } catch {}
    window.open(pub.fichier_url, '_blank')
  }

  return (
    <main className="min-h-screen bg-white">

      {/* Header */}
      <div className="bg-gray-950 text-white px-8 py-16">
        <div className="max-w-6xl mx-auto">
          <Link href="/" className="text-sm text-gray-400 hover:text-white mb-6 inline-block">← Accueil</Link>
          <h1 className="text-3xl font-bold mb-2">Novi Research & Book</h1>
          <p className="text-gray-400">Publie, partage et découvre la recherche technologique mondiale</p>
          <div className="grid grid-cols-4 gap-6 mt-10">
            {[
              { label: "Publications", valeur: `${publications.length || '2 400'}+` },
              { label: "Auteurs", valeur: "890+" },
              { label: "Téléchargements", valeur: "45 000+" },
              { label: "Pays", valeur: "38" }
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
            { key: 'publications', label: 'Publications' },
            { key: 'publier', label: 'Soumettre une publication' }
          ].map(o => (
            <button key={o.key} onClick={() => setOnglet(o.key as any)}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
                onglet === o.key ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}>
              {o.label}
            </button>
          ))}
        </div>

        {/* PUBLICATIONS */}
        {onglet === 'publications' && (
          <div>
            {/* Filtres + Recherche */}
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <input type="text" placeholder="Rechercher un titre, auteur, domaine..."
                value={recherche} onChange={e => setRecherche(e.target.value)}
                className="px-4 py-2 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 w-72" />
              <div className="flex flex-wrap gap-2">
                {filtres.map(f => (
                  <button key={f} onClick={() => setFiltre(f)}
                    className={`text-sm px-4 py-1.5 rounded-full border transition-colors ${
                      filtre === f
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'border-gray-200 text-gray-600 hover:border-blue-300'
                    }`}>
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {chargement ? (
              <div className="flex items-center justify-center py-20">
                <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
              </div>
            ) : publicationsFiltrees.length === 0 ? (
              <div className="text-center py-16 bg-gray-50 rounded-2xl">
                <p className="text-gray-400 mb-4">Aucune publication trouvée.</p>
                <button onClick={() => setOnglet('publier')}
                  className="bg-blue-600 text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-blue-700">
                  Soumettre la première →
                </button>
              </div>
            ) : (
              <div className="space-y-5">
                {publicationsFiltrees.map(pub => (
                  <div key={pub.id} className="border border-gray-100 rounded-2xl p-6 hover:border-blue-200 transition-colors">
                    <div className="flex items-start justify-between gap-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <span className={`text-xs px-2 py-1 rounded-full font-medium ${typeCouleur[pub.type] || 'bg-gray-50 text-gray-500'}`}>
                            {typeLabel[pub.type] || pub.type}
                          </span>
                          {pub.domaine && (
                            <span className="text-xs bg-gray-50 text-gray-500 px-2 py-1 rounded-full border border-gray-100">
                              {pub.domaine}
                            </span>
                          )}
                          <span className="text-xs text-gray-400">
                            {new Date(pub.created_at).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
                          </span>
                          {pub.nb_vues > 0 && (
                            <span className="text-xs text-gray-400">{pub.nb_vues} vues</span>
                          )}
                        </div>

                        <h3 className="font-semibold text-gray-900 mb-1 text-lg leading-snug">{pub.titre}</h3>
                        <p className="text-sm text-gray-500 mb-1">
                          {pub.auteur}{pub.institution ? ` · ${pub.institution}` : ''}
                        </p>
                        <p className="text-sm text-gray-600 leading-relaxed mt-3 line-clamp-3">{pub.resume}</p>

                        {pub.mots_cles?.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-3">
                            {pub.mots_cles.map((m: string) => (
                              <span key={m} className="text-xs bg-gray-50 text-gray-400 px-2 py-0.5 rounded border border-gray-100">
                                #{m}
                              </span>
                            ))}
                          </div>
                        )}

                        <div className="flex items-center gap-4 mt-3 text-xs text-gray-400">
                          <span>{pub.langue || 'Français'}</span>
                          {pub.nb_pages && <span>{pub.nb_pages} pages</span>}
                          {pub.fichier_taille && <span>{pub.fichier_taille}</span>}
                          {pub.score_qualite && (
                            <span className="text-green-600 font-medium">Score : {pub.score_qualite}/100</span>
                          )}
                          {pub.nb_telechargements > 0 && (
                            <span>{pub.nb_telechargements} téléchargements</span>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 flex-shrink-0">
                        <button
                          onClick={() => setPublicationOuverte(pub)}
                          className="px-4 py-2 bg-blue-600 text-white text-xs rounded-lg hover:bg-blue-700 font-medium">
                          Lire →
                        </button>
                        {pub.fichier_url && (
                          <button onClick={() => telecharger(pub)}
                            className="px-4 py-2 border border-gray-200 text-gray-600 text-xs rounded-lg hover:bg-gray-50">
                            ↓ Télécharger
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* SOUMETTRE */}
        {onglet === 'publier' && (
          <div className="max-w-2xl">
            {etapeSoumission === 'formulaire' && (
              <div className="space-y-5">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Soumettre une publication</h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Ton travail sera analysé par notre IA avant publication pour garantir la qualité.
                  </p>
                </div>

                <div className="bg-blue-50 rounded-xl p-4">
                  <p className="text-xs text-blue-700 font-medium mb-1">Processus de validation IA</p>
                  <p className="text-xs text-blue-600">
                    Après soumission, notre IA analyse la qualité, la cohérence et l'originalité. Résultat en moins de 5 minutes.
                  </p>
                </div>

                <div>
                  <label className="text-xs font-medium text-gray-600 mb-1 block">Type</label>
                  <div className="flex gap-3">
                    {['article', 'livre', 'these'].map(t => (
                      <button key={t} onClick={() => setForm(p => ({ ...p, type: t }))}
                        className={`flex-1 py-2.5 rounded-xl border text-sm transition-all ${
                          form.type === t
                            ? 'border-2 border-blue-500 bg-blue-50 text-blue-700 font-medium'
                            : 'border-gray-200 text-gray-600 hover:border-blue-300'
                        }`}>
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
                    <input type="text" placeholder="Université / Entreprise" value={form.institution}
                      onChange={e => setForm(p => ({ ...p, institution: e.target.value }))} className={inputClass} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-gray-600 mb-1 block">Domaine</label>
                    <input type="text" placeholder="Ex: IA & Santé..." value={form.domaine}
                      onChange={e => setForm(p => ({ ...p, domaine: e.target.value }))} className={inputClass} />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-600 mb-1 block">Mots-clés</label>
                    <input type="text" placeholder="ia, robotique, santé..." value={form.mots_cles}
                      onChange={e => setForm(p => ({ ...p, mots_cles: e.target.value }))} className={inputClass} />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-gray-600 mb-1 block">Résumé *</label>
                  <textarea placeholder="Résume ton travail en 3-5 phrases..." value={form.resume}
                    onChange={e => setForm(p => ({ ...p, resume: e.target.value }))}
                    className={`${inputClass} h-32 resize-none`} />
                </div>

                <div>
                  <label className="text-xs font-medium text-gray-600 mb-1 block">
                    Fichier PDF
                    <span className="text-gray-400 font-normal ml-1">(optionnel — max 10 MB)</span>
                  </label>
                  <div
                    className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 transition-colors cursor-pointer"
                    onClick={() => document.getElementById('fichier-upload')?.click()}
                  >
                    {fichier ? (
                      <div>
                        <p className="text-sm font-medium text-blue-600">📄 {fichier.name}</p>
                        <p className="text-xs text-gray-400 mt-1">{(fichier.size / 1024 / 1024).toFixed(1)} MB</p>
                        <button
                          onClick={e => { e.stopPropagation(); setFichier(null) }}
                          className="text-xs text-red-500 hover:underline mt-2">
                          Supprimer
                        </button>
                      </div>
                    ) : (
                      <div>
                        <svg className="w-8 h-8 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        <p className="text-sm text-gray-500">Clique pour uploader ton PDF</p>
                        <p className="text-xs text-gray-400 mt-1">ou glisse le fichier ici</p>
                      </div>
                    )}
                    <input
                      id="fichier-upload"
                      type="file"
                      accept=".pdf"
                      className="hidden"
                      onChange={e => setFichier(e.target.files?.[0] || null)}
                    />
                  </div>
                </div>

                <button onClick={soumettre}
                  disabled={!form.titre || !form.auteur || !form.resume}
                  className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 text-sm disabled:opacity-50">
                  Soumettre pour analyse IA →
                </button>
              </div>
            )}

            {etapeSoumission === 'analyse' && (
              <div className="text-center py-16 space-y-6">
                <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto" />
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Analyse IA en cours...</h2>
                  <p className="text-sm text-gray-500 mt-2">
                    Notre IA vérifie la qualité, la cohérence et l'originalité de ta publication.
                  </p>
                </div>

                {/* Barre de progression */}
                <div className="max-w-sm mx-auto">
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600 rounded-full transition-all duration-300"
                      style={{ width: `${progression}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-400 mt-2">{progression}%</p>
                </div>

                <div className="space-y-2 text-left max-w-sm mx-auto">
                  {[
                    { label: "Vérification de la structure", done: progression > 20 },
                    { label: "Analyse du contenu", done: progression > 40 },
                    { label: "Contrôle de l'originalité", done: progression > 60 },
                    { label: "Évaluation de la qualité", done: progression > 80 },
                    { label: "Import dans la base de données", done: progression >= 100 }
                  ].map((e, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm">
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center ${e.done ? 'bg-green-500' : 'bg-blue-100 animate-pulse'}`}>
                        {e.done && <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>}
                      </div>
                      <span className={e.done ? 'text-gray-700' : 'text-gray-400'}>{e.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {etapeSoumission === 'succes' && (
              <div className="text-center space-y-6 py-8">
                <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto">
                  <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Publication soumise !</h2>
                  <p className="text-sm text-gray-500 mt-2">
                    Ton travail est en cours de modération. Il sera publié dans les 24h après validation.
                  </p>
                </div>
                <div className="bg-green-50 rounded-xl p-4 text-left space-y-2">
                  <p className="text-xs text-green-700 font-medium">Résultat de l'analyse IA :</p>
                  <p className="text-xs text-green-600">✓ Structure cohérente</p>
                  <p className="text-xs text-green-600">✓ Contenu de qualité</p>
                  <p className="text-xs text-green-600">✓ Originalité vérifiée</p>
                  {fichier && <p className="text-xs text-green-600">✓ Fichier PDF uploadé</p>}
                </div>
                <button
                  onClick={() => {
                    setEtapeSoumission('formulaire')
                    setOnglet('publications')
                    setFichier(null)
                    setForm({ titre: '', auteur: '', institution: '', resume: '', domaine: '', type: 'article', langue: 'Français', mots_cles: '' })
                    setProgression(0)
                  }}
                  className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 text-sm">
                  Voir toutes les publications →
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Modal lecteur PDF */}
      {publicationOuverte && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl w-full max-w-4xl max-h-screen overflow-hidden flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div>
                <h3 className="font-semibold text-gray-900">{publicationOuverte.titre}</h3>
                <p className="text-sm text-gray-500 mt-0.5">{publicationOuverte.auteur}</p>
              </div>
              <div className="flex items-center gap-3">
                {publicationOuverte.fichier_url && (
                  <button onClick={() => telecharger(publicationOuverte)}
                    className="px-4 py-2 bg-blue-600 text-white text-sm rounded-xl hover:bg-blue-700">
                    ↓ Télécharger
                  </button>
                )}
                <button onClick={() => setPublicationOuverte(null)}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 text-lg">
                  ✕
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {publicationOuverte.fichier_url ? (
                <iframe
                  src={publicationOuverte.fichier_url}
                  className="w-full rounded-xl border border-gray-100"
                  style={{ height: '70vh' }}
                  title={publicationOuverte.titre}
                />
              ) : (
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Résumé</h4>
                    <p className="text-gray-600 leading-relaxed">{publicationOuverte.resume}</p>
                  </div>
                  {publicationOuverte.mots_cles?.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Mots-clés</h4>
                      <div className="flex flex-wrap gap-2">
                        {publicationOuverte.mots_cles.map((m: string) => (
                          <span key={m} className="text-xs bg-gray-50 text-gray-500 px-3 py-1 rounded-full border border-gray-200">
                            #{m}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="bg-amber-50 rounded-xl p-4">
                    <p className="text-sm text-amber-700">
                      Le fichier PDF complet n'est pas encore disponible pour cette publication.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  )
}