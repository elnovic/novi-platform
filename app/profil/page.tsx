'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getUtilisateurConnecte, supabase } from '@/lib/supabase'

export default function MonProfil() {
  const [utilisateur, setUtilisateur] = useState<any>(null)
  const [form, setForm] = useState({
    prenom: '', nom: '', bio: '', titre_poste: '',
    entreprise: '', experience: '', formation: '',
    site_web: '', twitter: '', linkedin: '', github: '',
    niveau: '', objectifs: [] as string[], domaines: [] as string[]
  })
  const [avatar, setAvatar] = useState<File | null>(null)
  const [aperçuAvatar, setAperçuAvatar] = useState<string | null>(null)
  const [chargement, setChargement] = useState(true)
  const [sauvegarde, setSauvegarde] = useState(false)
  const [succes, setSucces] = useState(false)
  const [onglet, setOnglet] = useState<'infos' | 'experience' | 'reseaux'>('infos')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const inputClass = "w-full px-3 py-2.5 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 bg-white text-gray-900 placeholder-gray-400"
  const textareaClass = `${inputClass} resize-none`

  const domainesListe = ["Intelligence Artificielle", "IOT", "Robotique", "Programmation", "Droit numérique", "Recherche & Développement", "Anglais technique", "Cybersécurité", "Data Science"]
  const objectifsListe = ["Travailler dans la tech", "Créer mes propres projets", "Obtenir des certifications", "Changer de carrière", "Approfondir mes connaissances", "Trouver des opportunités"]

  useEffect(() => {
    chargerProfil()
  }, [])

  const chargerProfil = async () => {
    const user = await getUtilisateurConnecte()
    if (!user) { window.location.href = '/login'; return }
    setUtilisateur(user)
    setForm({
      prenom: user.prenom || '',
      nom: user.nom || '',
      bio: user.bio || '',
      titre_poste: user.titre_poste || '',
      entreprise: user.entreprise || '',
      experience: user.experience || '',
      formation: user.formation || '',
      site_web: user.site_web || '',
      twitter: user.twitter || '',
      linkedin: user.linkedin || '',
      github: user.github || '',
      niveau: user.niveau || '',
      objectifs: user.objectifs || [],
      domaines: user.domaines || []
    })
    if (user.avatar_url) setAperçuAvatar(user.avatar_url)
    setChargement(false)
  }

  const handleAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fichier = e.target.files?.[0]
    if (!fichier) return
    setAvatar(fichier)
    setAperçuAvatar(URL.createObjectURL(fichier))
  }

  const toggleItem = (liste: string[], item: string, champ: 'objectifs' | 'domaines') => {
    const nouvelle = liste.includes(item) ? liste.filter(i => i !== item) : [...liste, item]
    setForm(prev => ({ ...prev, [champ]: nouvelle }))
  }

  const sauvegarder = async () => {
    if (!utilisateur) return
    setSauvegarde(true)
    try {
      let avatarUrl = utilisateur.avatar_url

      // Upload avatar si nouveau
      if (avatar) {
        const extension = avatar.name.split('.').pop()
        const chemin = `avatars/${utilisateur.id}.${extension}`
        const { error: uploadError } = await supabase.storage
          .from('avatars')
          .upload(chemin, avatar, { upsert: true })
        if (!uploadError) {
          const { data } = supabase.storage.from('avatars').getPublicUrl(chemin)
          avatarUrl = data.publicUrl
        }
      }

      // Mettre à jour le profil
      await supabase
        .from('utilisateurs')
        .update({
          prenom: form.prenom,
          nom: form.nom,
          bio: form.bio,
          titre_poste: form.titre_poste,
          entreprise: form.entreprise,
          experience: form.experience,
          formation: form.formation,
          site_web: form.site_web,
          twitter: form.twitter,
          linkedin: form.linkedin,
          github: form.github,
          niveau: form.niveau,
          objectifs: form.objectifs,
          domaines: form.domaines,
          avatar_url: avatarUrl
        })
        .eq('id', utilisateur.id)

      setSucces(true)
      setTimeout(() => setSucces(false), 3000)
    } catch (e) {
      console.error(e)
    } finally {
      setSauvegarde(false)
    }
  }

  if (chargement) return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
    </main>
  )

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-8 py-10">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Mon profil</h1>
            <p className="text-gray-500 text-sm mt-1">Complète ton profil pour être visible sur Novi Opportunity</p>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="text-sm text-gray-500 hover:text-blue-600">← Dashboard</Link>
            <button onClick={sauvegarder} disabled={sauvegarde}
              className="bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-blue-700 disabled:opacity-60">
              {sauvegarde ? 'Sauvegarde...' : succes ? '✓ Sauvegardé !' : 'Sauvegarder'}
            </button>
          </div>
        </div>

        {/* Avatar */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full overflow-hidden bg-blue-600 flex items-center justify-center">
                {aperçuAvatar ? (
                  <Image src={aperçuAvatar} alt="Avatar" width={96} height={96} className="object-cover w-full h-full" />
                ) : (
                  <span className="text-white text-3xl font-bold">{form.prenom?.[0]}{form.nom?.[0]}</span>
                )}
              </div>
              <button onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 shadow-lg">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
              <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleAvatar} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{form.prenom} {form.nom}</h2>
              <p className="text-gray-500 text-sm">{utilisateur?.email}</p>
              {form.titre_poste && <p className="text-blue-600 text-sm mt-1">{form.titre_poste}</p>}
              <p className="text-xs text-gray-400 mt-2">Clique sur l'icône pour changer ta photo</p>
            </div>
          </div>
        </div>

        {/* Onglets */}
        <div className="flex gap-1 bg-gray-100 rounded-xl p-1 mb-6 w-fit">
          {[
            { key: 'infos', label: 'Informations' },
            { key: 'experience', label: 'Expérience & Formation' },
            { key: 'reseaux', label: 'Réseaux & Liens' }
          ].map(o => (
            <button key={o.key} onClick={() => setOnglet(o.key as any)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                onglet === o.key ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}>
              {o.label}
            </button>
          ))}
        </div>

        {/* INFORMATIONS */}
        {onglet === 'infos' && (
          <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-gray-600 mb-1 block">Prénom</label>
                <input type="text" value={form.prenom}
                  onChange={e => setForm(p => ({ ...p, prenom: e.target.value }))} className={inputClass} />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600 mb-1 block">Nom</label>
                <input type="text" value={form.nom}
                  onChange={e => setForm(p => ({ ...p, nom: e.target.value }))} className={inputClass} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-gray-600 mb-1 block">Titre du poste</label>
                <input type="text" placeholder="Ex: Ingénieur IA" value={form.titre_poste}
                  onChange={e => setForm(p => ({ ...p, titre_poste: e.target.value }))} className={inputClass} />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600 mb-1 block">Entreprise / Université</label>
                <input type="text" placeholder="Ex: Google, MIT..." value={form.entreprise}
                  onChange={e => setForm(p => ({ ...p, entreprise: e.target.value }))} className={inputClass} />
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-gray-600 mb-1 block">Bio</label>
              <textarea placeholder="Présente-toi en quelques phrases..." value={form.bio}
                onChange={e => setForm(p => ({ ...p, bio: e.target.value }))}
                className={`${textareaClass} h-28`} />
            </div>

            <div>
              <label className="text-xs font-medium text-gray-600 mb-2 block">Niveau</label>
              <div className="grid grid-cols-2 gap-2">
                {["Débutant complet", "Quelques bases", "Intermédiaire", "Avancé"].map(n => (
                  <button key={n} onClick={() => setForm(p => ({ ...p, niveau: n }))}
                    className={`py-2.5 px-4 rounded-xl border text-sm transition-all text-left ${
                      form.niveau === n
                        ? 'border-2 border-blue-500 bg-blue-50 text-blue-700 font-medium'
                        : 'border border-gray-200 text-gray-600 hover:border-blue-300'
                    }`}>
                    {n}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-gray-600 mb-2 block">Domaines d'intérêt</label>
              <div className="flex flex-wrap gap-2">
                {domainesListe.map(d => (
                  <button key={d} onClick={() => toggleItem(form.domaines, d, 'domaines')}
                    className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                      form.domaines.includes(d)
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'border-gray-200 text-gray-600 hover:border-blue-300'
                    }`}>
                    {d}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-gray-600 mb-2 block">Objectifs</label>
              <div className="flex flex-wrap gap-2">
                {objectifsListe.map(o => (
                  <button key={o} onClick={() => toggleItem(form.objectifs, o, 'objectifs')}
                    className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                      form.objectifs.includes(o)
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'border-gray-200 text-gray-600 hover:border-blue-300'
                    }`}>
                    {o}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* EXPÉRIENCE & FORMATION */}
        {onglet === 'experience' && (
          <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
            <div>
              <label className="text-xs font-medium text-gray-600 mb-1 block">Expérience professionnelle</label>
              <textarea
                placeholder={`Ex:\n2023 - Présent : Ingénieur IA chez TechCorp\n- Développement de modèles ML\n- Gestion de projets IA\n\n2021 - 2023 : Développeur Python chez StartupX`}
                value={form.experience}
                onChange={e => setForm(p => ({ ...p, experience: e.target.value }))}
                className={`${textareaClass} h-48`} />
            </div>

            <div>
              <label className="text-xs font-medium text-gray-600 mb-1 block">Formation académique</label>
              <textarea
                placeholder={`Ex:\n2020 - 2023 : Master IA — Université de Paris\n2017 - 2020 : Licence Informatique — Université de Casablanca`}
                value={form.formation}
                onChange={e => setForm(p => ({ ...p, formation: e.target.value }))}
                className={`${textareaClass} h-36`} />
            </div>
          </div>
        )}

        {/* RÉSEAUX & LIENS */}
        {onglet === 'reseaux' && (
          <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
            <div>
              <label className="text-xs font-medium text-gray-600 mb-1 block">LinkedIn</label>
              <input type="url" placeholder="https://linkedin.com/in/..." value={form.linkedin}
                onChange={e => setForm(p => ({ ...p, linkedin: e.target.value }))} className={inputClass} />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600 mb-1 block">GitHub</label>
              <input type="url" placeholder="https://github.com/..." value={form.github}
                onChange={e => setForm(p => ({ ...p, github: e.target.value }))} className={inputClass} />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600 mb-1 block">Twitter / X</label>
              <input type="url" placeholder="https://twitter.com/..." value={form.twitter}
                onChange={e => setForm(p => ({ ...p, twitter: e.target.value }))} className={inputClass} />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600 mb-1 block">Site web / Portfolio</label>
              <input type="url" placeholder="https://monsite.com" value={form.site_web}
                onChange={e => setForm(p => ({ ...p, site_web: e.target.value }))} className={inputClass} />
            </div>

            <div className="bg-blue-50 rounded-xl p-4">
              <p className="text-xs text-blue-700 font-medium mb-1">Profil Opportunity</p>
              <p className="text-xs text-blue-600 mb-3">
                Ton profil professionnel visible par les entreprises et recruteurs NOVI.
              </p>
              <Link href="/opportunity/profil/creer"
                className="text-xs bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 inline-block">
                Créer / Modifier mon profil Opportunity →
              </Link>
            </div>
          </div>
        )}

        {/* Bouton sauvegarder bas */}
        <div className="mt-6 flex justify-end">
          <button onClick={sauvegarder} disabled={sauvegarde}
            className="bg-blue-600 text-white px-8 py-3 rounded-xl text-sm font-medium hover:bg-blue-700 disabled:opacity-60">
            {sauvegarde ? 'Sauvegarde...' : succes ? '✓ Profil sauvegardé !' : 'Sauvegarder les modifications'}
          </button>
        </div>
      </div>
    </main>
  )
}