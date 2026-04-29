import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Novi Académie — Cours IA, IOT, Robotique certifiés',
  description: 'Découvre des cours de haute qualité sur l\'IA, l\'IOT, la robotique et plus. Certifications reconnues, projets pratiques et examens oraux corrigés par l\'IA.',
}
import Link from 'next/link'

const cours = [
  {
    id: "intro-ia",
    titre: "Introduction à l'Intelligence Artificielle",
    description: "Comprends les bases de l'IA, le machine learning et le deep learning avec des projets concrets.",
    niveau: "Débutant",
    duree: "12 heures",
    chapitres: 5,
    domaine: "IA",
    certification: "Certificat NOVI — Mention Très Bien",
    score: 92,
    couleur: "blue"
  },
  {
    id: "python-data",
    titre: "Python pour la Data Science",
    description: "Maîtrise Python, Pandas et NumPy pour analyser et visualiser des données réelles.",
    niveau: "Débutant",
    duree: "10 heures",
    chapitres: 5,
    domaine: "Programmation",
    certification: "Certificat NOVI — Mention Bien",
    score: 88,
    couleur: "green"
  },
  {
    id: "intro-iot",
    titre: "Introduction à l'IOT",
    description: "Découvre les capteurs, Arduino et Raspberry Pi pour créer tes premiers objets connectés.",
    niveau: "Débutant",
    duree: "8 heures",
    chapitres: 5,
    domaine: "IOT",
    certification: "Certificat NOVI — Mention Bien",
    score: 86,
    couleur: "amber"
  },
  {
    id: "robotique",
    titre: "Robotique et Automatisation",
    description: "Apprends à programmer des robots avec ROS, la vision artificielle et le contrôle moteur.",
    niveau: "Intermédiaire",
    duree: "15 heures",
    chapitres: 5,
    domaine: "Robotique",
    certification: "Certificat NOVI — Mention Excellent",
    score: 90,
    couleur: "purple"
  },
  {
    id: "droit-numerique",
    titre: "Droit du Numérique",
    description: "Comprends le RGPD, la propriété intellectuelle et la cybersécurité juridique.",
    niveau: "Débutant",
    duree: "6 heures",
    chapitres: 5,
    domaine: "Juridique",
    certification: "Certificat NOVI — Mention Bien",
    score: 84,
    couleur: "red"
  },
  {
    id: "anglais-tech",
    titre: "Anglais Technique pour la Tech",
    description: "Maîtrise le vocabulaire technique en anglais pour lire la documentation et collaborer.",
    niveau: "Débutant",
    duree: "8 heures",
    chapitres: 5,
    domaine: "Langue",
    certification: "Certificat NOVI — Mention Bien",
    score: 87,
    couleur: "teal"
  }
]

const couleurs: Record<string, string> = {
  blue:   "bg-blue-50 text-blue-600 border-blue-100",
  green:  "bg-green-50 text-green-600 border-green-100",
  amber:  "bg-amber-50 text-amber-600 border-amber-100",
  purple: "bg-purple-50 text-purple-600 border-purple-100",
  red:    "bg-red-50 text-red-600 border-red-100",
  teal:   "bg-teal-50 text-teal-600 border-teal-100"
}

const niveauCouleur: Record<string, string> = {
  "Débutant":      "bg-green-50 text-green-600",
  "Intermédiaire": "bg-amber-50 text-amber-600",
  "Avancé":        "bg-red-50 text-red-600"
}

export default function Academie() {
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
            Cours certifiés générés par IA · Projets pratiques · Examens oraux
          </p>

          {/* Filtres */}
          <div className="flex items-center gap-3 mt-6 flex-wrap">
            {["Tous", "IA", "Programmation", "IOT", "Robotique", "Juridique", "Langue"].map(f => (
              <button
                key={f}
                className="text-sm px-4 py-1.5 rounded-full border border-gray-200 text-gray-600 hover:border-blue-300 hover:text-blue-600 transition-colors"
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Liste des cours */}
      <section className="px-8 py-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cours.map(c => (
            <Link key={c.id} href={`/academie/${c.id}`}>
              <div className="bg-white border border-gray-100 rounded-2xl p-6 hover:border-blue-200 hover:shadow-sm transition-all cursor-pointer h-full flex flex-col">

                {/* Domaine + Niveau */}
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-xs font-medium px-3 py-1 rounded-full border ${couleurs[c.couleur]}`}>
                    {c.domaine}
                  </span>
                  <span className={`text-xs font-medium px-3 py-1 rounded-full ${niveauCouleur[c.niveau]}`}>
                    {c.niveau}
                  </span>
                </div>

                {/* Titre + Description */}
                <h2 className="font-semibold text-gray-900 mb-2 leading-snug">{c.titre}</h2>
                <p className="text-sm text-gray-500 leading-relaxed flex-1">{c.description}</p>

                {/* Infos */}
                <div className="flex items-center gap-4 mt-4 text-xs text-gray-400">
                  <span>{c.duree}</span>
                  <span>·</span>
                  <span>{c.chapitres} chapitres</span>
                  <span>·</span>
                  <span>Score {c.score}/100</span>
                </div>

                {/* Certification */}
                <div className="mt-4 pt-4 border-t border-gray-50">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                    <span className="text-xs text-blue-600 font-medium">{c.certification}</span>
                  </div>
                </div>

              </div>
            </Link>
          ))}
        </div>
      </section>

    </main>
  )
}