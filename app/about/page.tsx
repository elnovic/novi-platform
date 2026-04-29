import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'À propos — NOVI Ecosystem',
  description: 'Découvrez NOVI Ecosystem, la plateforme technologique mondiale qui connecte apprenants, entreprises et chercheurs autour de la technologie.',
}
import Link from 'next/link'
import Image from 'next/image'

export default function About() {
  return (
    <main className="min-h-screen bg-white">

      {/* Hero */}
      <section className="bg-gray-950 text-white px-8 py-24">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-8">
            <Image src="/logo.png" alt="NOVI" width={80} height={80} />
          </div>
          <h1 className="text-4xl font-bold mb-6 leading-tight">
            NOVI Ecosystem —<br />
            <span className="text-blue-400">L'avenir de l'apprentissage technologique</span>
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed max-w-2xl mx-auto mb-10">
            Une plateforme mondiale qui connecte apprenants, entreprises et chercheurs autour de la technologie. Apprends, construis et trouve ta place dans l'économie numérique mondiale.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link href="/register"
              className="bg-blue-600 text-white px-8 py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors">
              Rejoindre NOVI gratuitement
            </Link>
            <Link href="/academie"
              className="border border-gray-600 text-gray-300 px-8 py-3 rounded-xl font-medium hover:border-gray-400 transition-colors">
              Explorer les cours
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="px-8 py-16 bg-blue-600">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
          {[
            { valeur: "100+", label: "Cours certifiés" },
            { valeur: "50+", label: "Pays représentés" },
            { valeur: "24/7", label: "Disponibilité" },
            { valeur: "IA", label: "Générée & vérifiée" }
          ].map(s => (
            <div key={s.label}>
              <p className="text-4xl font-bold mb-2">{s.valeur}</p>
              <p className="text-blue-200 text-sm">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Les 4 plateformes */}
      <section className="px-8 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Un écosystème, quatre plateformes</h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Chaque plateforme répond à un besoin précis. Ensemble, elles forment un écosystème complet pour ton évolution technologique.
            </p>
          </div>

          <div className="space-y-16">

            {/* Novi Académie */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div>
                <span className="text-xs font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">Plateforme 1</span>
                <h3 className="text-2xl font-bold text-gray-900 mt-3 mb-4">Novi Académie</h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Des cours de haute qualité générés et vérifiés par l'IA sur l'intelligence artificielle, l'IOT, la robotique, le droit numérique et plus. Chaque cours inclut des quiz interactifs, des projets pratiques et un examen oral corrigé par l'IA.
                </p>
                <ul className="space-y-2 mb-6">
                  {["Cours adaptatifs générés par IA", "Quiz et exercices interactifs style FreeCodeCamp", "Examen oral avec transcription Whisper", "Certifications reconnues à valeur internationale"].map(item => (
                    <li key={item} className="flex items-center gap-2 text-sm text-gray-600">
                      <svg className="w-4 h-4 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
                <Link href="/academie" className="text-blue-600 font-medium hover:underline text-sm">
                  Explorer Novi Académie →
                </Link>
              </div>
              <div className="bg-blue-50 rounded-2xl p-8 text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <p className="text-4xl font-bold text-blue-600 mb-1">100+</p>
                <p className="text-sm text-gray-500">Cours disponibles</p>
                <div className="mt-6 grid grid-cols-2 gap-3 text-left">
                  {["IA & Machine Learning", "IOT & Embarqué", "Robotique", "Droit numérique", "Python & Data", "Anglais Tech"].map(d => (
                    <span key={d} className="text-xs bg-white text-gray-600 px-3 py-1.5 rounded-lg border border-blue-100">{d}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="border-t border-gray-100" />

            {/* Novi Opportunity */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div className="bg-green-50 rounded-2xl p-8 text-center order-2 md:order-1">
                <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-4xl font-bold text-green-600 mb-1">340+</p>
                <p className="text-sm text-gray-500">Opportunités actives</p>
                <div className="mt-6 space-y-2 text-left">
                  {[
                    { type: "Stage", label: "Stage IA — Computer Vision", lieu: "Remote" },
                    { type: "CDI", label: "Développeur IOT Junior", lieu: "Casablanca" },
                    { type: "Partenariat", label: "Recherche NLP", lieu: "Paris" }
                  ].map(op => (
                    <div key={op.label} className="bg-white rounded-xl p-3 border border-green-100">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-medium text-gray-900">{op.label}</p>
                        <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full">{op.type}</span>
                      </div>
                      <p className="text-xs text-gray-400 mt-0.5">{op.lieu}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="order-1 md:order-2">
                <span className="text-xs font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full">Plateforme 2</span>
                <h3 className="text-2xl font-bold text-gray-900 mt-3 mb-4">Novi Opportunity</h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Un réseau professionnel dédié à la tech. Crée ton profil certifié NOVI, connecte-toi avec des entreprises du monde entier et trouve des opportunités correspondant exactement à tes compétences.
                </p>
                <ul className="space-y-2 mb-6">
                  {["Profil professionnel avec certifications NOVI", "Matching intelligent entreprises ↔ talents", "Opportunités de partenariat pour PhD et chercheurs", "Réseau de startups et grandes entreprises tech"].map(item => (
                    <li key={item} className="flex items-center gap-2 text-sm text-gray-600">
                      <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
                <Link href="/opportunity" className="text-green-600 font-medium hover:underline text-sm">
                  Explorer Novi Opportunity →
                </Link>
              </div>
            </div>

            <div className="border-t border-gray-100" />

            {/* Novi Research */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div>
                <span className="text-xs font-medium text-purple-600 bg-purple-50 px-3 py-1 rounded-full">Plateforme 3</span>
                <h3 className="text-2xl font-bold text-gray-900 mt-3 mb-4">Novi Research & Book</h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Publie tes recherches et tes livres technologiques. Notre IA analyse et certifie la qualité avant publication, puis diffuse ton travail à travers le réseau mondial NOVI.
                </p>
                <ul className="space-y-2 mb-6">
                  {["Publication d'articles, livres et thèses", "Contrôle qualité IA avant publication", "Diffusion mondiale via le réseau NOVI", "Connexion entre chercheurs et apprenants"].map(item => (
                    <li key={item} className="flex items-center gap-2 text-sm text-gray-600">
                      <svg className="w-4 h-4 text-purple-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
                <Link href="/research" className="text-purple-600 font-medium hover:underline text-sm">
                  Explorer Novi Research →
                </Link>
              </div>
              <div className="bg-purple-50 rounded-2xl p-8 text-center">
                <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <p className="text-4xl font-bold text-purple-600 mb-1">2 400+</p>
                <p className="text-sm text-gray-500">Publications indexées</p>
                <div className="mt-6 space-y-2">
                  {["Articles scientifiques", "Livres technologiques", "Thèses de doctorat"].map(t => (
                    <div key={t} className="bg-white rounded-xl px-4 py-2 text-xs text-gray-600 border border-purple-100">{t}</div>
                  ))}
                </div>
              </div>
            </div>

            <div className="border-t border-gray-100" />

            {/* Novi Innovation */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div className="bg-amber-50 rounded-2xl p-8 text-center order-2 md:order-1">
                <div className="w-16 h-16 bg-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
                  </svg>
                </div>
                <p className="text-4xl font-bold text-amber-600 mb-1">195</p>
                <p className="text-sm text-gray-500">Pays suivis en temps réel</p>
                <div className="mt-6 grid grid-cols-3 gap-2">
                  {["🇺🇸", "🇨🇳", "🇫🇷", "🇩🇪", "🇯🇵", "🇲🇦"].map(flag => (
                    <span key={flag} className="text-2xl text-center">{flag}</span>
                  ))}
                </div>
                <p className="text-xs text-gray-400 mt-3">Et 189 autres pays...</p>
              </div>
              <div className="order-1 md:order-2">
                <span className="text-xs font-medium text-amber-600 bg-amber-50 px-3 py-1 rounded-full">Plateforme 4</span>
                <h3 className="text-2xl font-bold text-gray-900 mt-3 mb-4">Novi Innovation</h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Une carte mondiale interactive pour suivre les évolutions technologiques de chaque pays. Startups, investissements, projets phares et tendances — tout en temps réel grâce à la veille IA.
                </p>
                <ul className="space-y-2 mb-6">
                  {["Carte interactive de 195 pays", "Scores d'innovation par pays", "Projets tech et startups phares", "Veille IA mise à jour en continu"].map(item => (
                    <li key={item} className="flex items-center gap-2 text-sm text-gray-600">
                      <svg className="w-4 h-4 text-amber-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
                <Link href="/innovation" className="text-amber-600 font-medium hover:underline text-sm">
                  Explorer Novi Innovation →
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Moteur IA */}
      <section className="px-8 py-20 bg-gray-950 text-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Propulsé par une IA autonome</h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-12">
            Le cœur de NOVI est un moteur IA qui génère, vérifie et personnalise chaque expérience d'apprentissage en temps réel.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { titre: "AI Course Generator", desc: "Génère des cours complets avec chapitres, quiz, projets et examens oraux en quelques minutes.", icon: "⚡" },
              { titre: "AI Course Manager", desc: "Analyse et améliore chaque cours avant publication. Score de qualité garanti supérieur à 85/100.", icon: "🎯" },
              { titre: "AI Recommendation Engine", desc: "Crée un parcours personnalisé pour chaque apprenant selon son profil, niveau et objectifs.", icon: "🧭" }
            ].map(module => (
              <div key={module.titre} className="bg-gray-900 rounded-2xl p-6 text-left">
                <span className="text-3xl mb-4 block">{module.icon}</span>
                <h3 className="font-semibold text-white mb-2">{module.titre}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{module.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partenaires */}
      <section className="px-8 py-20">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Futurs partenaires</h2>
          <p className="text-gray-500 mb-12 max-w-xl mx-auto">
            NOVI Ecosystem est en cours de développement de partenariats avec des acteurs majeurs de la tech, de l'éducation et de l'entreprise mondiale.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { nom: "Universités Tech", desc: "Partenariats académiques pour valider les certifications", icon: "🎓" },
              { nom: "Startups Tech", desc: "Accès privilégié aux talents certifiés NOVI", icon: "🚀" },
              { nom: "Grandes Entreprises", desc: "Recrutement et formation continue de leurs équipes", icon: "🏢" },
              { nom: "Laboratoires R&D", desc: "Publication et diffusion de leurs recherches", icon: "🔬" }
            ].map(p => (
              <div key={p.nom} className="border border-gray-100 rounded-2xl p-6 hover:border-blue-200 transition-colors">
                <span className="text-3xl mb-3 block">{p.icon}</span>
                <h3 className="font-semibold text-gray-900 text-sm mb-2">{p.nom}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 bg-blue-50 rounded-2xl p-8">
            <h3 className="font-semibold text-blue-900 mb-2">Tu veux devenir partenaire NOVI ?</h3>
            <p className="text-sm text-blue-600 mb-4">Rejoins l'écosystème et accède à une communauté mondiale de talents tech certifiés.</p>
            <Link href="/register"
              className="inline-block bg-blue-600 text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors">
              Nous contacter →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="px-8 py-20 bg-blue-600 text-white text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Prêt à rejoindre NOVI ?</h2>
          <p className="text-blue-200 mb-8 text-lg">
            Commence gratuitement aujourd'hui. Apprends, construis et trouve ta place dans l'économie technologique mondiale.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link href="/register"
              className="bg-white text-blue-600 px-8 py-3 rounded-xl font-bold hover:bg-blue-50 transition-colors">
              Commencer gratuitement
            </Link>
            <Link href="/academie"
              className="border border-blue-400 text-white px-8 py-3 rounded-xl font-medium hover:border-white transition-colors">
              Voir les cours
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-8 py-10 border-t border-gray-100">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt="NOVI" width={36} height={36} />
            <div>
              <span className="font-bold text-blue-600 tracking-widest">NOVi</span>
              <p className="text-xs text-gray-400 tracking-widest uppercase leading-none">Ecosystem</p>
            </div>
          </div>
          <div className="flex items-center gap-8 text-sm text-gray-500">
            <Link href="/academie" className="hover:text-blue-600 transition-colors">Académie</Link>
            <Link href="/opportunity" className="hover:text-blue-600 transition-colors">Opportunity</Link>
            <Link href="/research" className="hover:text-blue-600 transition-colors">Research</Link>
            <Link href="/innovation" className="hover:text-blue-600 transition-colors">Innovation</Link>
            <Link href="/about" className="hover:text-blue-600 transition-colors">À propos</Link>
          </div>
          <p className="text-xs text-gray-400">© 2026 NOVI Ecosystem — Learn. Build. Get Opportunities.</p>
        </div>
      </footer>

    </main>
  )
}