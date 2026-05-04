import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="min-h-screen bg-white">

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
          <Link href="/academie" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
            Explorer les cours
          </Link>
          <Link href="/register" className="text-gray-600 border border-gray-200 px-6 py-3 rounded-lg hover:border-blue-300 transition-colors font-medium">
            Créer un compte
          </Link>
        </div>

        <div className="flex items-center gap-12 mt-16 text-sm text-gray-400">
          {[
            { icon: "📚", label: "LEARN", sub: "New Skills" },
            { icon: "💻", label: "BUILD", sub: "Real Projects" },
            { icon: "⭐", label: "GET OPPORTUNITIES", sub: "Advance Your Future" },
            { icon: "🌐", label: "JOIN A GLOBAL", sub: "Tech Community" }
          ].map(item => (
            <div key={item.label} className="flex flex-col items-center gap-2">
              <span className="text-2xl">{item.icon}</span>
              <span className="font-medium text-gray-600">{item.label}</span>
              <span>{item.sub}</span>
            </div>
          ))}
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
            {[
              { href: "/academie", titre: "Novi Académie", desc: "Cours IA, IOT, Robotique. Certifications reconnues, projets pratiques et examens oraux.", couleur: "blue" },
              { href: "/opportunity", titre: "Novi Opportunity", desc: "Profils professionnels, matching entreprises et talents, partenariats et opportunités mondiales.", couleur: "green" },
              { href: "/research", titre: "Novi Research", desc: "Publication d'articles et livres technologiques, contrôle qualité IA et réseau de diffusion mondial.", couleur: "purple" },
              { href: "/innovation", titre: "Novi Innovation", desc: "Carte mondiale des évolutions technologiques, veille IA en temps réel et tendances globales.", couleur: "amber" }
            ].map(p => (
              <Link key={p.href} href={p.href}>
                <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-blue-200 transition-colors h-full">
                  <h3 className="font-semibold text-gray-900 mb-2">{p.titre}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{p.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="px-8 py-16">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { valeur: "100+", label: "Cours disponibles" },
            { valeur: "IA", label: "Générée & certifiée" },
            { valeur: "24/7", label: "Plateforme disponible" },
            { valeur: "Global", label: "Communauté mondiale" }
          ].map(s => (
            <div key={s.label}>
              <p className="text-3xl font-bold text-blue-600">{s.valeur}</p>
              <p className="text-sm text-gray-500 mt-1">{s.label}</p>
            </div>
          ))}
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