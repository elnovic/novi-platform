'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getUtilisateurConnecte, deconnecterUtilisateur, getProgression, getCertifications } from '@/lib/supabase'

export default function Dashboard() {
  const [apprenant, setApprenant] = useState<any>(null)
  const [progression, setProgression] = useState<any[]>([])
  const [certifications, setCertifications] = useState<any[]>([])
  const [chargement, setChargement] = useState(true)
  const [onglet, setOnglet] = useState<'parcours' | 'certifications' | 'activite'>('parcours')

  useEffect(() => {
    async function chargerDonnees() {
      try {
        const user = await getUtilisateurConnecte()
        if (!user) {
          window.location.href = '/login'
          return
        }
        setApprenant(user)

        const [prog, certs] = await Promise.all([
          getProgression(user.id),
          getCertifications(user.id)
        ])
        setProgression(prog)
        setCertifications(certs)
      } catch (e) {
        console.error(e)
      } finally {
        setChargement(false)
      }
    }
    chargerDonnees()
  }, [])

  const seDeconnecter = async () => {
    await deconnecterUtilisateur()
    window.location.href = '/'
  }

  if (chargement) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
      </main>
    )
  }

  if (!apprenant) return null

  const coursEnCours = progression.filter(p => !p.completed && p.pourcentage > 0)
  const progressionGlobale = progression.length > 0
    ? Math.round(progression.reduce((acc, p) => acc + p.pourcentage, 0) / progression.length)
    : 0

  return (
    <main className="min-h-screen bg-gray-50">

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-100 px-8 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="NOVI" width={36} height={36} />
          <div>
            <span className="text-lg font-bold text-blue-600 tracking-widest">NOVi</span>
            <p className="text-xs text-gray-400 tracking-widest uppercase leading-none">Ecosystem</p>
          </div>
        </Link>
        <div className="flex items-center gap-6 text-sm text-gray-600">
          <Link href="/academie" className="hover:text-blue-600 transition-colors">Académie</Link>
          <Link href="/opportunity" className="hover:text-blue-600 transition-colors">Opportunity</Link>
          <Link href="/research" className="hover:text-blue-600 transition-colors">Research</Link>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">
              {apprenant.prenom?.[0]}{apprenant.nom?.[0]}
            </span>
          </div>
          <span className="text-sm text-gray-700 font-medium">
            {apprenant.prenom} {apprenant.nom}
          </span>
          <button
            onClick={seDeconnecter}
            className="text-xs text-gray-400 hover:text-red-500 transition-colors"
          >
            Déconnexion
          </button>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-8 py-10">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Bonjour, {apprenant.prenom} 👋
          </h1>
          <p className="text-gray-500 mt-1">
            Niveau : <span className="text-blue-600 font-medium">{apprenant.niveau}</span>
            {apprenant.domaines?.length > 0 && (
              <> · Domaines : <span className="text-blue-600 font-medium">{apprenant.domaines.join(', ')}</span></>
            )}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-5 border border-gray-100">
            <p className="text-2xl font-bold text-blue-600">{progressionGlobale}%</p>
            <p className="text-xs text-gray-500 mt-1">Progression globale</p>
            <div className="w-full h-1.5 bg-gray-100 rounded-full mt-3 overflow-hidden">
              <div className="h-full bg-blue-600 rounded-full" style={{ width: `${progressionGlobale}%` }} />
            </div>
          </div>
          <div className="bg-white rounded-2xl p-5 border border-gray-100">
            <p className="text-2xl font-bold text-green-600">{coursEnCours.length}</p>
            <p className="text-xs text-gray-500 mt-1">Cours en cours</p>
          </div>
          <div className="bg-white rounded-2xl p-5 border border-gray-100">
            <p className="text-2xl font-bold text-amber-600">{certifications.length}</p>
            <p className="text-xs text-gray-500 mt-1">Certifications obtenues</p>
          </div>
          <div className="bg-white rounded-2xl p-5 border border-gray-100">
            <p className="text-2xl font-bold text-purple-600">{apprenant.domaines?.length || 0}</p>
            <p className="text-xs text-gray-500 mt-1">Domaines suivis</p>
          </div>
        </div>

        {/* Cours en cours */}
        {coursEnCours.length > 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
            <h2 className="font-semibold text-gray-900 mb-4">Continuer l'apprentissage</h2>
            <div className="space-y-4">
              {coursEnCours.map(c => (
                <div key={c.id} className="flex items-center justify-between gap-6">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 mb-2">{c.cours_id}</h3>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-600 rounded-full" style={{ width: `${c.pourcentage}%` }} />
                      </div>
                      <span className="text-xs text-gray-500">{c.pourcentage}%</span>
                    </div>
                  </div>
                  <Link
                    href={`/academie/${c.cours_id}/chapitre/${c.chapitre_actuel}`}
                    className="bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors"
                  >
                    Continuer →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Message si pas de cours */}
        {coursEnCours.length === 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 p-8 mb-6 text-center">
            <p className="text-gray-500 mb-4">Tu n'as pas encore commencé de cours.</p>
            <Link href="/academie"
              className="inline-block bg-blue-600 text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors">
              Explorer les cours →
            </Link>
          </div>
        )}

        {/* Onglets */}
        <div className="flex gap-1 bg-gray-100 rounded-xl p-1 mb-6 w-fit">
          {[
            { key: 'parcours', label: 'Mon parcours' },
            { key: 'certifications', label: 'Certifications' },
            { key: 'activite', label: 'Profil' }
          ].map(o => (
            <button key={o.key} onClick={() => setOnglet(o.key as any)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                onglet === o.key ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}>
              {o.label}
            </button>
          ))}
        </div>

        {/* Contenu onglets */}
        {onglet === 'parcours' && (
          <div className="bg-white border border-gray-100 rounded-2xl p-6">
            <h2 className="font-semibold text-gray-900 mb-4">Cours recommandés pour toi</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { id: "intro-ia", titre: "Introduction à l'IA", niveau: "Débutant", duree: "12h", domaine: "IA" },
                { id: "python-data", titre: "Python pour la Data Science", niveau: "Débutant", duree: "10h", domaine: "Programmation" },
                { id: "intro-iot", titre: "Introduction à l'IOT", niveau: "Débutant", duree: "8h", domaine: "IOT" }
              ].map(c => (
                <Link key={c.id} href={`/academie/${c.id}`}>
                  <div className="border border-gray-100 rounded-xl p-4 hover:border-blue-200 transition-colors">
                    <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full">{c.domaine}</span>
                    <h3 className="font-medium text-gray-900 mt-2 mb-1 text-sm">{c.titre}</h3>
                    <p className="text-xs text-gray-400">{c.niveau} · {c.duree}</p>
                    <p className="text-xs text-blue-600 mt-2 font-medium">Commencer →</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {onglet === 'certifications' && (
          <div className="space-y-4">
            {certifications.length === 0 ? (
              <div className="bg-white border border-gray-100 rounded-2xl p-8 text-center">
                <p className="text-gray-500 mb-4">Tu n'as pas encore de certifications.</p>
                <Link href="/academie"
                  className="inline-block bg-blue-600 text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors">
                  Commencer un cours →
                </Link>
              </div>
            ) : (
              certifications.map((cert, i) => (
                <div key={i} className="bg-white border border-gray-100 rounded-2xl p-6 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{cert.titre}</h3>
                      <p className="text-xs text-gray-400 mt-0.5">
                        Mention {cert.mention} · Score {cert.score}/100 · {new Date(cert.date_obtention).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                  </div>
                  <Link href={`/academie/${cert.cours_id}/certificat`}
                    className="text-xs text-blue-600 border border-blue-200 px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-colors">
                    Voir →
                  </Link>
                </div>
              ))
            )}
          </div>
        )}

        {onglet === 'activite' && (
          <div className="bg-white border border-gray-100 rounded-2xl p-6">
            <h2 className="font-semibold text-gray-900 mb-4">Mon profil NOVI</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xl font-bold">
                    {apprenant.prenom?.[0]}{apprenant.nom?.[0]}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{apprenant.prenom} {apprenant.nom}</p>
                  <p className="text-sm text-gray-500">{apprenant.email}</p>
                  <p className="text-xs text-blue-600 mt-1">{apprenant.niveau}</p>
                </div>
              </div>
              {apprenant.objectifs?.length > 0 && (
                <div>
                  <p className="text-xs font-medium text-gray-500 mb-2">Objectifs</p>
                  <div className="flex flex-wrap gap-2">
                    {apprenant.objectifs.map((o: string) => (
                      <span key={o} className="text-xs bg-gray-50 text-gray-600 px-2 py-1 rounded border border-gray-100">{o}</span>
                    ))}
                  </div>
                </div>
              )}
              {apprenant.domaines?.length > 0 && (
                <div>
                  <p className="text-xs font-medium text-gray-500 mb-2">Domaines</p>
                  <div className="flex flex-wrap gap-2">
                    {apprenant.domaines.map((d: string) => (
                      <span key={d} className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full">{d}</span>
                    ))}
                  </div>
                </div>
              )}
              <Link href="/opportunity/profil/creer"
                className="inline-block mt-2 text-sm text-blue-600 border border-blue-200 px-4 py-2 rounded-xl hover:bg-blue-50 transition-colors">
                Créer mon profil Opportunity →
              </Link>
            </div>
          </div>
        )}

      </div>
    </main>
  )
}