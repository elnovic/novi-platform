import Link from 'next/link'
import { use } from 'react'

const profils: Record<string, any> = {
  "amadou-diallo": {
    nom: "Amadou Diallo",
    titre: "Étudiant en IA & Data Science",
    niveau: "Débutant",
    domaines: ["IA", "Python", "Machine Learning"],
    certifications: [
      { titre: "Introduction à l'IA", mention: "Très Bien", score: 92, date: "Avril 2026" }
    ],
    disponible: true,
    ville: "Dakar, Sénégal",
    bio: "Passionné par l'IA et ses applications en Afrique. Je cherche des opportunités de stage ou de collaboration pour mettre en pratique mes compétences en machine learning.",
    competences: ["Python", "TensorFlow", "Scikit-learn", "Data Analysis", "Machine Learning"],
    langues: ["Français", "Anglais", "Wolof"],
    objectifs: ["Stage en IA", "Collaboration sur projets", "Recherche"],
    reseaux: { linkedin: "#", github: "#" }
  },
  "sofia-martin": {
    nom: "Sofia Martin",
    titre: "Développeuse Full Stack",
    niveau: "Intermédiaire",
    domaines: ["Programmation", "IOT", "Robotique"],
    certifications: [
      { titre: "Python Data Science", mention: "Bien", score: 88, date: "Mars 2026" },
      { titre: "Introduction IOT", mention: "Bien", score: 86, date: "Février 2026" }
    ],
    disponible: true,
    ville: "Paris, France",
    bio: "Développeuse full stack avec une passion pour l'IOT et les systèmes embarqués. Je cherche à collaborer sur des projets innovants combinant software et hardware.",
    competences: ["React", "Node.js", "Python", "Arduino", "Raspberry Pi", "Docker"],
    langues: ["Français", "Anglais", "Espagnol"],
    objectifs: ["CDI", "Freelance", "Partenariat"],
    reseaux: { linkedin: "#", github: "#" }
  },
  "youssef-khalil": {
    nom: "Youssef Khalil",
    titre: "Chercheur en Robotique",
    niveau: "Avancé",
    domaines: ["Robotique", "IA", "Recherche"],
    certifications: [
      { titre: "Robotique & Automatisation", mention: "Excellent", score: 97, date: "Janvier 2026" }
    ],
    disponible: false,
    ville: "Casablanca, Maroc",
    bio: "Docteur en robotique, je mène des recherches sur les systèmes autonomes et la vision artificielle. Ouvert aux collaborations académiques et industrielles.",
    competences: ["ROS", "Python", "C++", "Computer Vision", "Deep Learning", "SLAM"],
    langues: ["Français", "Anglais", "Arabe"],
    objectifs: ["Collaboration recherche", "Publication", "Partenariat industriel"],
    reseaux: { linkedin: "#", github: "#" }
  }
}

export default async function ProfilPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const p = profils[id]

  if (!p) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4">Profil introuvable</p>
          <Link href="/opportunity" className="text-blue-600 hover:underline text-sm">
            Retour à Opportunity
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-8 py-4">
        <Link href="/opportunity" className="text-sm text-gray-500 hover:text-blue-600">
          ← Novi Opportunity
        </Link>
      </div>

      <div className="max-w-4xl mx-auto px-8 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Sidebar profil */}
        <div className="space-y-5">

          {/* Carte identité */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6 text-center">
            <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl font-bold">
                {p.nom.split(' ').map((n: string) => n[0]).join('')}
              </span>
            </div>
            <h1 className="font-bold text-gray-900 text-lg">{p.nom}</h1>
            <p className="text-sm text-gray-500 mt-1">{p.titre}</p>
            <p className="text-xs text-gray-400 mt-1">{p.ville}</p>
            <div className="flex items-center justify-center gap-2 mt-3">
              <span className={`w-2 h-2 rounded-full ${p.disponible ? 'bg-green-400' : 'bg-gray-300'}`} />
              <span className={`text-xs ${p.disponible ? 'text-green-600' : 'text-gray-400'}`}>
                {p.disponible ? 'Disponible' : 'Non disponible'}
              </span>
            </div>
            <button className="w-full mt-4 bg-blue-600 text-white py-2.5 rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors">
              Contacter
            </button>
          </div>

          {/* Compétences */}
          <div className="bg-white border border-gray-100 rounded-2xl p-5">
            <h3 className="font-semibold text-gray-900 mb-3 text-sm">Compétences</h3>
            <div className="flex flex-wrap gap-2">
              {p.competences.map((c: string) => (
                <span key={c} className="text-xs bg-gray-50 text-gray-600 px-2 py-1 rounded border border-gray-100">
                  {c}
                </span>
              ))}
            </div>
          </div>

          {/* Langues */}
          <div className="bg-white border border-gray-100 rounded-2xl p-5">
            <h3 className="font-semibold text-gray-900 mb-3 text-sm">Langues</h3>
            <div className="space-y-1">
              {p.langues.map((l: string) => (
                <p key={l} className="text-sm text-gray-600">{l}</p>
              ))}
            </div>
          </div>

          {/* Objectifs */}
          <div className="bg-white border border-gray-100 rounded-2xl p-5">
            <h3 className="font-semibold text-gray-900 mb-3 text-sm">Je recherche</h3>
            <div className="flex flex-wrap gap-2">
              {p.objectifs.map((o: string) => (
                <span key={o} className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full">
                  {o}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Contenu principal */}
        <div className="lg:col-span-2 space-y-6">

          {/* Bio */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6">
            <h2 className="font-semibold text-gray-900 mb-3">À propos</h2>
            <p className="text-sm text-gray-600 leading-relaxed">{p.bio}</p>
          </div>

          {/* Domaines */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6">
            <h2 className="font-semibold text-gray-900 mb-3">Domaines d'expertise</h2>
            <div className="flex flex-wrap gap-2">
              {p.domaines.map((d: string) => (
                <span key={d} className="text-sm bg-blue-50 text-blue-600 px-3 py-1.5 rounded-full font-medium">
                  {d}
                </span>
              ))}
            </div>
          </div>

          {/* Certifications NOVI */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6">
            <h2 className="font-semibold text-gray-900 mb-4">Certifications NOVI</h2>
            <div className="space-y-3">
              {p.certifications.map((cert: any, i: number) => (
                <div key={i} className="flex items-center justify-between p-4 bg-blue-50 rounded-xl border border-blue-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-blue-900">{cert.titre}</p>
                      <p className="text-xs text-blue-600">Mention {cert.mention} · {cert.date}</p>
                    </div>
                  </div>
                  <span className="text-lg font-bold text-blue-700">{cert.score}/100</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </main>
  )
}