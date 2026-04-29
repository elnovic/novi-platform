'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const apprenant = {
  nom: "Amadou Diallo",
  niveau: "Débutant",
  domaines: ["Intelligence Artificielle", "IOT", "Robotique"],
  parcours: "Débutant vers Expert en IA et IOT",
  progression_globale: 35
}

const coursEnCours = [
  {
    id: "intro-ia",
    titre: "Introduction à l'Intelligence Artificielle",
    progression: 60,
    chapitre_actuel: 3,
    total_chapitres: 5,
    domaine: "IA",
    duree_restante: "5h"
  }
]

const coursAFaire = [
  {
    id: "python-data",
    titre: "Python pour la Data Science",
    niveau: "Débutant",
    duree: "10h",
    domaine: "Programmation"
  },
  {
    id: "intro-iot",
    titre: "Introduction à l'IOT",
    niveau: "Débutant",
    duree: "8h",
    domaine: "IOT"
  }
]

const certifications = [
  {
    titre: "Certificat NOVI — Introduction à l'IA",
    mention: "Très Bien",
    date: "En cours",
    statut: "en_cours"
  }
]

const activiteRecente = [
  { action: "Chapitre 2 terminé", cours: "Introduction à l'IA", temps: "Il y a 2h" },
  { action: "Quiz réussi 100%", cours: "Introduction à l'IA", temps: "Il y a 2h" },
  { action: "Chapitre 1 terminé", cours: "Introduction à l'IA", temps: "Hier" },
]

export default function Dashboard() {
  const [onglet, setOnglet] = useState<'parcours' | 'certifications' | 'activite'>('parcours')

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
              {apprenant.nom.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <span className="text-sm text-gray-700 font-medium">{apprenant.nom}</span>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-8 py-10">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Bonjour, {apprenant.nom.split(' ')[0]} 👋
          </h1>
          <p className="text-gray-500 mt-1">
            Parcours : <span className="text-blue-600 font-medium">{apprenant.parcours}</span>
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-5 border border-gray-100">
            <p className="text-2xl font-bold text-blue-600">35%</p>
            <p className="text-xs text-gray-500 mt-1">Progression globale</p>
            <div className="w-full h-1.5 bg-gray-100 rounded-full mt-3 overflow-hidden">
              <div className="h-full bg-blue-600 rounded-full" style={{ width: '35%' }} />
            </div>
          </div>
          <div className="bg-white rounded-2xl p-5 border border-gray-100">
            <p className="text-2xl font-bold text-green-600">1</p>
            <p className="text-xs text-gray-500 mt-1">Cours en cours</p>
          </div>
          <div className="bg-white rounded-2xl p-5 border border-gray-100">
            <p className="text-2xl font-bold text-amber-600">0</p>
            <p className="text-xs text-gray-500 mt-1">Certifications obtenues</p>
          </div>
          <div className="bg-white rounded-2xl p-5 border border-gray-100">
            <p className="text-2xl font-bold text-purple-600">3</p>
            <p className="text-xs text-gray-500 mt-1">Cours recommandés</p>
          </div>
        </div>

        {/* Cours en cours */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
          <h2 className="font-semibold text-gray-900 mb-4">Continuer l'apprentissage</h2>
          {coursEnCours.map(c => (
            <div key={c.id} className="flex items-center justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full">{c.domaine}</span>
                  <span className="text-xs text-gray-400">Chapitre {c.chapitre_actuel}/{c.total_chapitres}</span>
                </div>
                <h3 className="font-medium text-gray-900 mb-2">{c.titre}</h3>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600 rounded-full transition-all"
                      style={{ width: `${c.progression}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-500 flex-shrink-0">{c.progression}%</span>
                </div>
                <p className="text-xs text-gray-400 mt-1">{c.duree_restante} restantes</p>
              </div>
              <Link
                href={`/academie/${c.id}/chapitre/${c.chapitre_actuel}`}
                className="bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors flex-shrink-0"
              >
                Continuer →
              </Link>
            </div>
          ))}
        </div>

        {/* Onglets */}
        <div className="flex gap-1 bg-gray-100 rounded-xl p-1 mb-6 w-fit">
          {[
            { key: 'parcours', label: 'Mon parcours' },
            { key: 'certifications', label: 'Certifications' },
            { key: 'activite', label: 'Activité récente' }
          ].map(o => (
            <button
              key={o.key}
              onClick={() => setOnglet(o.key as any)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                onglet === o.key
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {o.label}
            </button>
          ))}
        </div>

        {/* Contenu onglets */}
        {onglet === 'parcours' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {coursAFaire.map(c => (
              <Link key={c.id} href={`/academie/${c.id}`}>
                <div className="bg-white border border-gray-100 rounded-2xl p-5 hover:border-blue-200 transition-colors">
                  <span className="text-xs bg-gray-50 text-gray-500 px-2 py-0.5 rounded-full border border-gray-100">
                    {c.domaine}
                  </span>
                  <h3 className="font-medium text-gray-900 mt-3 mb-1">{c.titre}</h3>
                  <p className="text-xs text-gray-400">{c.niveau} · {c.duree}</p>
                  <div className="mt-3 text-xs text-blue-600 font-medium">Commencer →</div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {onglet === 'certifications' && (
          <div className="space-y-4">
            {certifications.map((cert, i) => (
              <div key={i} className="bg-white border border-gray-100 rounded-2xl p-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    cert.statut === 'obtenu' ? 'bg-green-50' : 'bg-blue-50'
                  }`}>
                    <svg className={`w-6 h-6 ${cert.statut === 'obtenu' ? 'text-green-500' : 'text-blue-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{cert.titre}</h3>
                    <p className="text-xs text-gray-400 mt-0.5">Mention : {cert.mention} · {cert.date}</p>
                  </div>
                </div>
                <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                  cert.statut === 'obtenu'
                    ? 'bg-green-50 text-green-600'
                    : 'bg-blue-50 text-blue-600'
                }`}>
                  {cert.statut === 'obtenu' ? 'Obtenu' : 'En cours'}
                </span>
              </div>
            ))}
          </div>
        )}

        {onglet === 'activite' && (
          <div className="bg-white border border-gray-100 rounded-2xl divide-y divide-gray-50">
            {activiteRecente.map((a, i) => (
              <div key={i} className="flex items-center justify-between px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{a.action}</p>
                    <p className="text-xs text-gray-400">{a.cours}</p>
                  </div>
                </div>
                <span className="text-xs text-gray-400">{a.temps}</span>
              </div>
            ))}
          </div>
        )}

      </div>
    </main>
  )
}