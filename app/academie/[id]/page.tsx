import Link from 'next/link'

const cours: Record<string, any> = {
  "intro-ia": {
    id: "intro-ia",
    titre: "Introduction à l'Intelligence Artificielle",
    description: "Comprends les bases de l'IA, le machine learning et le deep learning avec des projets concrets.",
    niveau: "Débutant",
    duree: "12 heures",
    domaine: "IA",
    score: 92,
    certification: {
      titre: "Certificat NOVI Académie",
      mention: "Très Bien",
      competences: ["Bases de l'IA", "Machine Learning", "Deep Learning", "Applications pratiques"],
      valide_pour: "2 ans"
    },
    objectifs: [
      "Comprendre ce qu'est l'IA et son histoire",
      "Distinguer les types d'IA et leurs applications",
      "Utiliser les outils TensorFlow et PyTorch",
      "Comprendre le machine learning et deep learning",
      "Créer un projet IA concret"
    ],
    chapitres: [
      { numero: 1, titre: "Introduction aux fondements de l'IA", duree: "2h", description: "Histoire, définitions et concepts fondamentaux de l'IA." },
      { numero: 2, titre: "Types d'IA : faible, forte et superintelligence", duree: "2h", description: "Comprendre les différentes catégories et leurs implications." },
      { numero: 3, titre: "Outils et bibliothèques : TensorFlow, PyTorch", duree: "2h30", description: "Prise en main des outils professionnels de l'IA." },
      { numero: 4, titre: "Apprentissage automatique et deep learning", duree: "3h", description: "Les algorithmes qui font apprendre les machines." },
      { numero: 5, titre: "Applications pratiques de l'IA", duree: "2h30", description: "Reconnaissance d'images, traitement du langage et plus." }
    ],
    projet_final: "Créer un système de reconnaissance d'images simple avec TensorFlow",
    examen_oral: "5 questions sur les concepts fondamentaux de l'IA"
  }
}

export default async function CoursDétail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const c = cours[id]

  if (!c) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Cours introuvable</h1>
          <Link href="/academie" className="text-blue-600 hover:underline">
            Retour à l'académie
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-white">

      {/* Header du cours */}
      <div className="bg-gray-950 text-white px-8 py-16">
        <div className="max-w-5xl mx-auto">
          <Link href="/academie" className="text-sm text-gray-400 hover:text-white mb-6 inline-block">
            ← Novi Académie
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs bg-blue-600 px-3 py-1 rounded-full">{c.domaine}</span>
            <span className="text-xs bg-gray-800 px-3 py-1 rounded-full">{c.niveau}</span>
            <span className="text-xs bg-gray-800 px-3 py-1 rounded-full">Score {c.score}/100</span>
          </div>
          <h1 className="text-3xl font-bold mb-4 leading-tight">{c.titre}</h1>
          <p className="text-gray-400 max-w-2xl leading-relaxed mb-8">{c.description}</p>
          <div className="flex items-center gap-6 text-sm text-gray-400">
            <span>{c.duree} de contenu</span>
            <span>·</span>
            <span>{c.chapitres.length} chapitres</span>
            <span>·</span>
            <span>1 projet final</span>
            <span>·</span>
            <span>1 examen oral</span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-8 py-12 grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* Contenu principal */}
        <div className="lg:col-span-2 space-y-10">

          {/* Objectifs */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Ce que tu vas apprendre</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {c.objectifs.map((obj: string, i: number) => (
                <div key={i} className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-gray-600">{obj}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Programme */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Programme du cours</h2>
            <div className="space-y-3">
              {c.chapitres.map((ch: any) => (
                <Link key={ch.numero} href={`/academie/${id}/chapitre/${ch.numero}`}>
                  <div className="flex items-start gap-4 p-4 border border-gray-100 rounded-xl hover:border-blue-200 transition-colors cursor-pointer">
                    <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-blue-600">{ch.numero}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium text-gray-900">{ch.titre}</h3>
                        <span className="text-xs text-gray-400">{ch.duree}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{ch.description}</p>
                    </div>
                  </div>
                </Link>
              ))}

              {/* Projet final */}
              <div className="flex items-start gap-4 p-4 border border-gray-100 rounded-xl bg-gray-50">
                <div className="w-8 h-8 bg-amber-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Projet final</h3>
                  <p className="text-xs text-gray-500 mt-1">{c.projet_final}</p>
                </div>
              </div>

              {/* Examen oral */}
              <div className="flex items-start gap-4 p-4 border border-gray-100 rounded-xl bg-gray-50">
                <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Examen oral IA</h3>
                  <p className="text-xs text-gray-500 mt-1">{c.examen_oral}</p>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">

          {/* CTA */}
          <div className="border border-gray-100 rounded-2xl p-6 sticky top-24">
            <div className="text-center mb-6">
              <p className="text-3xl font-bold text-gray-900">Gratuit</p>
              <p className="text-sm text-gray-500 mt-1">Accès complet au cours</p>
            </div>

            <Link
              href={`/academie/${id}/chapitre/1`}
              className="block w-full bg-blue-600 text-white text-center py-3 rounded-xl hover:bg-blue-700 transition-colors font-medium mb-2"
            >
              Commencer le cours
            </Link>

            <Link
              href={`/academie/${id}/examen`}
              className="block w-full border border-purple-200 text-purple-600 text-center py-3 rounded-xl hover:bg-purple-50 transition-colors font-medium text-sm"
            >
              Passer l'examen oral
            </Link>

            <div className="space-y-3 mt-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>{c.duree} de contenu</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Quiz interactifs</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Projet final guidé</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Examen oral corrigé par IA</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Accès à vie</span>
              </div>
            </div>
          </div>

          {/* Certification */}
          <div className="border border-blue-100 rounded-2xl p-6 bg-blue-50">
            <div className="flex items-center gap-2 mb-3">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
              <h3 className="font-semibold text-blue-900">{c.certification.titre}</h3>
            </div>
            <p className="text-xs text-blue-700 mb-3">
              Mention : <strong>{c.certification.mention}</strong>
            </p>
            <p className="text-xs text-blue-600 mb-3">Compétences certifiées :</p>
            <ul className="space-y-1">
              {c.certification.competences.map((comp: string, i: number) => (
                <li key={i} className="text-xs text-blue-700 flex items-center gap-2">
                  <span className="w-1 h-1 bg-blue-400 rounded-full"></span>
                  {comp}
                </li>
              ))}
            </ul>
            <p className="text-xs text-blue-500 mt-3">Valide {c.certification.valide_pour}</p>
          </div>

        </div>
      </div>
    </main>
  )
}