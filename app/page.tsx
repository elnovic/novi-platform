import Image from 'next/image'

export default function Home() {
  return (
    <main className="min-h-screen bg-white">

      {/* Navigation */}
      

      {/* Hero */}
      <section className="flex flex-col items-center text-center px-8 py-24 max-w-4xl mx-auto">
        <div className="inline-block bg-blue-50 text-blue-600 text-xs font-medium px-3 py-1 rounded-full mb-6">
          Plateforme technologique mondiale
        </div>
        <h1 className="text-5xl font-bold text-gray-900 leading-tight mb-6">
          Learn. Build.<br />
          <span className="text-blue-600">Get Opportunities.</span>
        </h1>
        <p className="text-lg text-gray-500 max-w-2xl mb-10 leading-relaxed">
          NOVI Ecosystem réunit l'apprentissage technologique, les opportunités professionnelles,
          la recherche et la veille mondiale en une seule plateforme intelligente.
        </p>
        <div className="flex items-center gap-4">
          <a href="/academie" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
            Explorer les cours
          </a>
          <a href="/register" className="text-gray-600 border border-gray-200 px-6 py-3 rounded-lg hover:border-blue-300 transition-colors font-medium">
            Créer un compte
          </a>
        </div>

        {/* Slogan icons */}
        <div className="flex items-center gap-12 mt-16 text-sm text-gray-400">
          <div className="flex flex-col items-center gap-2">
            <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <span className="font-medium text-gray-600">LEARN</span>
            <span>New Skills</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
            <span className="font-medium text-gray-600">BUILD</span>
            <span>Real Projects</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
            <span className="font-medium text-gray-600">GET OPPORTUNITIES</span>
            <span>Advance Your Future</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
            </svg>
            <span className="font-medium text-gray-600">JOIN A GLOBAL</span>
            <span>Tech Community</span>
          </div>
        </div>
      </section>

      {/* 4 Plateformes */}
      <section className="px-8 py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
            Un écosystème, quatre plateformes
          </h2>
          <p className="text-gray-500 text-center mb-12">
            Tout ce dont tu as besoin pour évoluer dans le monde technologique
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

            <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-blue-200 transition-colors">
              <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Novi Académie</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Cours IA, IOT, Robotique, Droit numérique. Certifications reconnues, projets pratiques et examens oraux.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-blue-200 transition-colors">
              <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Novi Opportunity</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Profils professionnels, matching entreprises et talents, partenariats et opportunités mondiales.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-blue-200 transition-colors">
              <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Novi Research</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Publication d'articles et livres technologiques, contrôle qualité IA et réseau de diffusion mondial.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-blue-200 transition-colors">
              <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Novi Innovation</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Carte mondiale des évolutions technologiques, veille IA en temps réel et tendances globales.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="px-8 py-16">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <p className="text-3xl font-bold text-blue-600">100+</p>
            <p className="text-sm text-gray-500 mt-1">Cours disponibles</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-blue-600">IA</p>
            <p className="text-sm text-gray-500 mt-1">Générée & certifiée</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-blue-600">24/7</p>
            <p className="text-sm text-gray-500 mt-1">Plateforme disponible</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-blue-600">Global</p>
            <p className="text-sm text-gray-500 mt-1">Communauté mondiale</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-8 py-8 border-t border-gray-100 text-center">
        <p className="text-sm text-gray-400">
          © 2026 NOVI Ecosystem — Learn. Build. Get Opportunities.
        </p>
      </footer>

    </main>
  )
}