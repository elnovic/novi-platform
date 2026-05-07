'use client'

import { useState, useEffect, use } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getUtilisateurConnecte, demanderConnexion, getStatutConnexion, envoyerMessage } from '@/lib/supabase'
import { supabase } from '@/lib/supabase'

export default function ProfilDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [profil, setProfil] = useState<any>(null)
  const [utilisateur, setUtilisateur] = useState<any>(null)
  const [statutConnexion, setStatutConnexion] = useState<any>(null)
  const [chargement, setChargement] = useState(true)
  const [messageOuvert, setMessageOuvert] = useState(false)
  const [messageTexte, setMessageTexte] = useState('')
  const [messagEnvoye, setMessageEnvoye] = useState(false)

  useEffect(() => {
    async function charger() {
      const [user, profilData] = await Promise.all([
        getUtilisateurConnecte(),
        supabase.from('profils_opportunity').select('*, utilisateurs(*)').eq('id', id).single()
      ])
      setUtilisateur(user)
      setProfil(profilData.data)

      if (user && profilData.data?.utilisateur_id) {
        const statut = await getStatutConnexion(user.id, profilData.data.utilisateur_id)
        setStatutConnexion(statut)
      }
      setChargement(false)
    }
    charger()
  }, [id])

  const seConnecter = async () => {
    if (!utilisateur || !profil) return
    try {
      await demanderConnexion(utilisateur.id, profil.utilisateur_id)
      setStatutConnexion({ statut: 'en_attente' })
    } catch (e) {
      console.error(e)
    }
  }

  const envoyerMsg = async () => {
    if (!utilisateur || !profil || !messageTexte.trim()) return
    try {
      await envoyerMessage(utilisateur.id, profil.utilisateur_id, messageTexte)
      setMessageTexte('')
      setMessageEnvoye(true)
      setTimeout(() => { setMessageOuvert(false); setMessageEnvoye(false) }, 2000)
    } catch (e) {
      console.error(e)
    }
  }

  if (chargement) return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
    </main>
  )

  if (!profil) return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="text-gray-500 mb-4">Profil introuvable</p>
        <Link href="/opportunity" className="text-blue-600 hover:underline">← Retour</Link>
      </div>
    </main>
  )

  const estMonProfil = utilisateur?.id === profil.utilisateur_id

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-8 py-10">
        <Link href="/opportunity" className="text-sm text-gray-500 hover:text-blue-600 mb-6 inline-block">
          ← Retour aux profils
        </Link>

        {/* Carte principale */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden mb-6">
          {/* Bannière */}
          <div className="h-24 bg-gradient-to-r from-blue-600 to-blue-800" />

          <div className="px-8 pb-8">
            {/* Avatar */}
            <div className="flex items-end justify-between -mt-10 mb-6">
              <div className="w-20 h-20 rounded-full border-4 border-white bg-blue-600 flex items-center justify-center overflow-hidden">
                {profil.avatar_url ? (
                  <Image src={profil.avatar_url} alt={profil.titre} width={80} height={80} className="object-cover" />
                ) : (
                  <span className="text-white text-2xl font-bold">{profil.titre?.charAt(0)}</span>
                )}
              </div>
              <div className="flex gap-3 mb-2">
                {estMonProfil ? (
                  <Link href="/opportunity/profil/modifier"
                    className="px-4 py-2 border border-gray-200 text-gray-600 text-sm rounded-xl hover:bg-gray-50">
                    Modifier le profil
                  </Link>
                ) : (
                  <>
                    {!statutConnexion && utilisateur && (
                      <button onClick={seConnecter}
                        className="px-4 py-2 bg-blue-600 text-white text-sm rounded-xl hover:bg-blue-700 font-medium">
                        + Se connecter
                      </button>
                    )}
                    {statutConnexion?.statut === 'en_attente' && (
                      <span className="px-4 py-2 bg-gray-100 text-gray-500 text-sm rounded-xl">
                        Demande envoyée
                      </span>
                    )}
                    {statutConnexion?.statut === 'acceptee' && (
                      <span className="px-4 py-2 bg-green-50 text-green-600 text-sm rounded-xl font-medium">
                        ✓ Connecté
                      </span>
                    )}
                    {utilisateur && (
                      <button onClick={() => setMessageOuvert(true)}
                        className="px-4 py-2 border border-blue-200 text-blue-600 text-sm rounded-xl hover:bg-blue-50">
                        Envoyer un message
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>

            <h1 className="text-2xl font-bold text-gray-900 mb-1">{profil.titre}</h1>
            {profil.titre_poste && (
              <p className="text-blue-600 font-medium mb-1">{profil.titre_poste}</p>
            )}
            {profil.entreprise_actuelle && (
              <p className="text-gray-500 text-sm mb-2">{profil.entreprise_actuelle}</p>
            )}
            <p className="text-gray-400 text-sm mb-4">📍 {profil.ville}</p>

            {profil.bio && (
              <p className="text-gray-600 leading-relaxed mb-6">{profil.bio}</p>
            )}

            <div className="flex flex-wrap gap-2">
              {profil.disponible && (
                <span className="text-xs bg-green-50 text-green-600 px-3 py-1 rounded-full font-medium border border-green-100">
                  ✓ Disponible
                </span>
              )}
              {profil.langues?.map((l: string) => (
                <span key={l} className="text-xs bg-gray-50 text-gray-500 px-3 py-1 rounded-full border border-gray-100">
                  {l}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">

            {/* Domaines */}
            {profil.domaines?.length > 0 && (
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h2 className="font-semibold text-gray-900 mb-4">Domaines d'expertise</h2>
                <div className="flex flex-wrap gap-2">
                  {profil.domaines.map((d: string) => (
                    <span key={d} className="text-sm bg-blue-50 text-blue-600 px-3 py-1.5 rounded-full font-medium">{d}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Compétences */}
            {profil.competences?.length > 0 && (
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h2 className="font-semibold text-gray-900 mb-4">Compétences techniques</h2>
                <div className="flex flex-wrap gap-2">
                  {profil.competences.map((c: string) => (
                    <span key={c} className="text-sm bg-gray-50 text-gray-700 px-3 py-1.5 rounded-lg border border-gray-200">{c}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Expérience */}
            {profil.experience && (
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h2 className="font-semibold text-gray-900 mb-4">Expérience</h2>
                <p className="text-gray-600 leading-relaxed whitespace-pre-line">{profil.experience}</p>
              </div>
            )}

            {/* Formation */}
            {profil.formation && (
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h2 className="font-semibold text-gray-900 mb-4">Formation</h2>
                <p className="text-gray-600 leading-relaxed whitespace-pre-line">{profil.formation}</p>
              </div>
            )}

            {/* Certifications NOVI */}
            {profil.certifications_novi?.length > 0 && (
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h2 className="font-semibold text-gray-900 mb-4">Certifications NOVI</h2>
                <div className="space-y-2">
                  {profil.certifications_novi.map((cert: string, i: number) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                      </svg>
                      <span className="text-sm text-blue-700 font-medium">{cert}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Objectifs */}
            {profil.objectifs?.length > 0 && (
              <div className="bg-white rounded-2xl border border-gray-100 p-5">
                <h3 className="font-semibold text-gray-900 mb-3 text-sm">Recherche</h3>
                <div className="space-y-2">
                  {profil.objectifs.map((o: string) => (
                    <span key={o} className="block text-xs bg-green-50 text-green-600 px-3 py-1.5 rounded-full text-center">{o}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Liens */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-3">
              <h3 className="font-semibold text-gray-900 text-sm mb-3">Liens</h3>
              {profil.linkedin && (
                <a href={profil.linkedin} target="_blank"
                  className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600">
                  <span>💼</span> LinkedIn
                </a>
              )}
              {profil.github && (
                <a href={profil.github} target="_blank"
                  className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
                  <span>💻</span> GitHub
                </a>
              )}
              {profil.portfolio_url && (
                <a href={profil.portfolio_url} target="_blank"
                  className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600">
                  <span>🌐</span> Portfolio
                </a>
              )}
              {!profil.linkedin && !profil.github && !profil.portfolio_url && (
                <p className="text-xs text-gray-400">Aucun lien renseigné</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal message */}
      {messageOuvert && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">Envoyer un message</h3>
              <button onClick={() => setMessageOuvert(false)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
            <p className="text-sm text-gray-500">À : {profil.titre}</p>
            {messagEnvoye ? (
              <div className="text-center py-6">
                <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-sm text-green-600 font-medium">Message envoyé !</p>
              </div>
            ) : (
              <>
                <textarea
                  placeholder="Écris ton message..."
                  value={messageTexte}
                  onChange={e => setMessageTexte(e.target.value)}
                  className="w-full px-3 py-2.5 border-2 border-gray-300 rounded-xl text-sm focus:outline-none focus:border-blue-500 h-32 resize-none"
                />
                <div className="flex gap-3">
                  <button onClick={() => setMessageOuvert(false)}
                    className="flex-1 py-2.5 border border-gray-200 text-gray-600 text-sm rounded-xl hover:bg-gray-50">
                    Annuler
                  </button>
                  <button onClick={envoyerMsg} disabled={!messageTexte.trim()}
                    className="flex-1 py-2.5 bg-blue-600 text-white text-sm rounded-xl hover:bg-blue-700 font-medium disabled:opacity-50">
                    Envoyer
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </main>
  )
}