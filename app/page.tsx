import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="min-h-screen bg-white">

      {/* Hero */}
      <section className="relative bg-gray-950 text-white overflow-hidden">
        {/* Fond animé */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-96 h-96 bg-blue-600 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-400 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-6xl mx-auto px-8 py-28 flex flex-col items-center text-center">

          {/* Logo */}
          <div className="flex items-center gap-4 mb-10">
            <Image src="/logo.png" alt="NOVI" width={80} height={80} />
            <div className="text-left">
              <h1 className="text-5xl font-black tracking-widest text-white">NOVi</h1>
              <p className="text-blue-400 tracking-widest uppercase text-sm font-medium">Ecosystem</p>
            </div>
          </div>

          {/* Slogan */}
          <h2 className="text-4xl md:text-6xl font-bold leading-tight mb-6 max-w-4xl">
            <span className="text-white">Learn. Build.</span><br />
            <span className="text-blue-400">Get Opportunities.</span>
          </h2>

          <p className="text-gray-400 text-lg max-w-2xl mb-10 leading-relaxed">
            La première plateforme africaine et mondiale qui connecte apprenants,
            entreprises et chercheurs autour de la technologie.
          </p>

          {/* CTA */}
          <div className="flex items-center gap-4 mb-16">
            <Link href="/register"
              className="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-500 transition-all text-sm shadow-lg shadow-blue-900">
              Commencer gratuitement →
            </Link>
            <Link href="/academie"
              className="border border-gray-700 text-gray-300 px-8 py-4 rounded-xl font-medium hover:border-gray-500 transition-all text-sm">
              Explorer les cours
            </Link>
          </div>

          {/* 4 valeurs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-3xl">
            {[
              { icon: "📚", label: "LEARN", sub: "New Skills" },
              { icon: "💻", label: "BUILD", sub: "Real Projects" },
              { icon: "⭐", label: "GET OPPORTUNITIES", sub: "Advance Your Future" },
              { icon: "🌐", label: "JOIN A GLOBAL", sub: "Tech Community" }
            ].map(item => (
              <div key={item.label} className="flex flex-col items-center gap-2 p-4 rounded-2xl border border-gray-800 hover:border-blue-600 transition-colors">
                <span className="text-3xl">{item.icon}</span>
                <span className="text-xs font-bold text-white tracking-wider">{item.label}</span>
                <span className="text-xs text-gray-500">{item.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-blue-600 px-8 py-12">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
          {[
            { valeur: "100+", label: "Cours certifiés" },
            { valeur: "50+", label: "Pays représentés" },
            { valeur: "24/7", label: "Disponibilité" },
            { valeur: "IA", label: "Générée & vérifiée" }
          ].map(s => (
            <div key={s.label}>
              <p className="text-4xl font-black mb-1">{s.valeur}</p>
              <p className="text-blue-200 text-sm">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4 Plateformes */}
      <section className="px-8 py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Un écosystème, quatre plateformes</h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Tout ce dont tu as besoin pour évoluer dans le monde technologique mondial
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                href: "/academie",
                titre: "Novi Académie",
                desc: "Cours certifiés en IA, IOT, Robotique et plus. Quiz interactifs, projets pratiques et examens oraux.",
                couleur: "blue",
                icon: "📚",
                features: ["Cours certifiés NOVI", "Quiz & exercices pratiques", "Examen oral IA", "Certificats téléchargeables"]
              },
              {
                href: "/opportunity",
                titre: "Novi Opportunity",
                desc: "Réseau professionnel tech. Connecte-toi avec des entreprises du monde entier.",
                couleur: "green",
                icon: "💼",
                features: ["Profil professionnel", "Chat temps réel", "Offres de stage & CDI", "Partenariats recherche"]
              },
              {
                href: "/research",
                titre: "Novi Research & Book",
                desc: "Publie et découvre des articles, livres et thèses technologiques validés par l'IA.",
                couleur: "purple",
                icon: "📄",
                features: ["Upload PDF", "Lecteur intégré", "Validation IA", "Diffusion mondiale"]
              },
              {
                href: "/innovation",
                titre: "Novi Innovation",
                desc: "Carte mondiale des évolutions technologiques. Startups, investissements et tendances en temps réel.",
                couleur: "amber",
                icon: "🌍",
                features: ["Carte interactive", "Actualités en direct", "Scores d'innovation", "Veille IA"]
              }
            ].map(p => (
              <Link key={p.href} href={p.href}>
                <div className="bg-white rounded-2xl p-8 border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all group cursor-pointer h-full">
                  <div className="flex items-start gap-4 mb-4">
                    <span className="text-4xl">{p.icon}</span>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{p.titre}</h3>
                      <p className="text-gray-500 text-sm mt-1 leading-relaxed">{p.desc}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    {p.features.map(f => (
                      <div key={f} className="flex items-center gap-2">
                        <svg className="w-3 h-3 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-xs text-gray-500">{f}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-50">
                    <span className="text-sm text-blue-600 font-medium group-hover:translate-x-1 transition-transform inline-block">
                      Explorer →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Pourquoi NOVI */}
      <section className="px-8 py-20 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Pourquoi NOVI Ecosystem ?</h2>
          <p className="text-gray-500 mb-14 max-w-xl mx-auto">
            NOVI est conçu pour les talents tech africains et mondiaux qui veulent apprendre, créer et trouver leur place dans l'économie numérique.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "🤖",
                titre: "Propulsé par l'IA",
                desc: "Cours générés et validés par notre moteur IA. Chaque contenu est vérifié avec un score de qualité minimum de 85/100."
              },
              {
                icon: "🌍",
                titre: "Communauté mondiale",
                desc: "Rejoins des milliers d'apprenants et de professionnels tech de plus de 50 pays à travers le monde."
              },
              {
                icon: "🎓",
                titre: "Certifications reconnues",
                desc: "Nos certifications NOVI attestent de tes compétences et sont visibles par les entreprises partenaires."
              }
            ].map(r => (
              <div key={r.titre} className="text-center p-6 rounded-2xl border border-gray-100 hover:border-blue-200 transition-colors">
                <span className="text-5xl block mb-4">{r.icon}</span>
                <h3 className="font-bold text-gray-900 mb-2">{r.titre}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="px-8 py-20 bg-gray-950 text-white text-center">
        <div className="max-w-3xl mx-auto">
          <Image src="/logo.png" alt="NOVI" width={64} height={64} className="mx-auto mb-6" />
          <h2 className="text-4xl font-bold mb-4">Prêt à rejoindre NOVI ?</h2>
          <p className="text-gray-400 mb-8 text-lg">
            Commence gratuitement aujourd'hui. Apprends, construis et trouve ta place dans l'économie technologique mondiale.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link href="/register"
              className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-500 transition-colors text-sm">
              Créer mon compte gratuitement
            </Link>
            <Link href="/about"
              className="border border-gray-700 text-gray-300 px-8 py-4 rounded-xl font-medium hover:border-gray-500 transition-colors text-sm">
              En savoir plus
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-8 py-10 border-t border-gray-100 bg-white">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt="NOVI" width={36} height={36} />
            <div>
              <span className="font-bold text-blue-600 tracking-widest">NOVi</span>
              <p className="text-xs text-gray-400 tracking-widest uppercase leading-none">Ecosystem</p>
            </div>
          </div>
          <div className="flex items-center gap-8 text-sm text-gray-500">
            {[
              { href: "/academie", label: "Académie" },
              { href: "/opportunity", label: "Opportunity" },
              { href: "/research", label: "Research" },
              { href: "/innovation", label: "Innovation" },
              { href: "/about", label: "À propos" }
            ].map(l => (
              <Link key={l.href} href={l.href} className="hover:text-blue-600 transition-colors">{l.label}</Link>
            ))}
          </div>
          <p className="text-xs text-gray-400">© 2026 NOVI Ecosystem — Learn. Build. Get Opportunities.</p>
        </div>
      </footer>

    </main>
  )
}