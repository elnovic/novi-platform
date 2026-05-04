import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'À propos — NOVI Ecosystem',
  description: 'Découvrez NOVI Ecosystem, la plateforme technologique mondiale.',
}

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
            Une plateforme mondiale qui connecte apprenants, entreprises et chercheurs autour de la technologie.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link href="/register" className="bg-blue-600 text-white px-8 py-3 rounded-xl font-medium hover:bg-blue-700">Rejoindre NOVI gratuitement</Link>
            <Link href="/academie" className="border border-gray-600 text-gray-300 px-8 py-3 rounded-xl font-medium hover:border-gray-400">Explorer les cours</Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="px-8 py-16 bg-blue-600">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
          {[{ valeur: "100+", label: "Cours certifiés" }, { valeur: "50+", label: "Pays représentés" }, { valeur: "24/7", label: "Disponibilité" }, { valeur: "IA", label: "Générée & vérifiée" }].map(s => (
            <div key={s.label}>
              <p className="text-4xl font-bold mb-2">{s.valeur}</p>
              <p className="text-blue-200 text-sm">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4 Plateformes */}
      <section className="px-8 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Un écosystème, quatre plateformes</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { href: "/academie", titre: "Novi Académie", couleur: "blue", desc: "Cours IA, IOT, Robotique. Certifications reconnues, projets pratiques et examens oraux corrigés par l'IA.", features: ["Cours adaptatifs générés par IA", "Quiz et exercices interactifs", "Examen oral avec Whisper", "Certifications reconnues"] },
              { href: "/opportunity", titre: "Novi Opportunity", couleur: "green", desc: "Un réseau professionnel dédié à la tech. Connecte talents et entreprises du monde entier.", features: ["Profil professionnel certifié NOVI", "Matching entreprises ↔ talents", "Opportunités pour PhD", "Réseau mondial"] },
              { href: "/research", titre: "Novi Research & Book", couleur: "purple", desc: "Publie tes recherches et livres technologiques. Contrôle qualité IA avant publication.", features: ["Publication articles, livres, thèses", "Contrôle qualité IA", "Diffusion mondiale", "Connexion chercheurs"] },
              { href: "/innovation", titre: "Novi Innovation", couleur: "amber", desc: "Carte mondiale des évolutions technologiques. Veille IA en temps réel par pays.", features: ["Carte interactive 195 pays", "Scores d'innovation", "Projets tech phares", "Veille IA continue"] }
            ].map(p => (
              <div key={p.href} className="border border-gray-100 rounded-2xl p-8 hover:border-blue-200 transition-colors">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{p.titre}</h3>
                <p className="text-gray-600 leading-relaxed mb-4">{p.desc}</p>
                <ul className="space-y-2 mb-6">
                  {p.features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                      <svg className="w-4 h-4 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href={p.href} className="text-blue-600 font-medium hover:underline text-sm">Explorer →</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="px-8 py-20 bg-blue-600 text-white text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Prêt à rejoindre NOVI ?</h2>
          <p className="text-blue-200 mb-8">Commence gratuitement aujourd'hui.</p>
          <div className="flex items-center justify-center gap-4">
            <Link href="/register" className="bg-white text-blue-600 px-8 py-3 rounded-xl font-bold hover:bg-blue-50">Commencer gratuitement</Link>
            <Link href="/academie" className="border border-blue-400 text-white px-8 py-3 rounded-xl font-medium hover:border-white">Voir les cours</Link>
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
            {[{ href: "/academie", label: "Académie" }, { href: "/opportunity", label: "Opportunity" }, { href: "/research", label: "Research" }, { href: "/innovation", label: "Innovation" }, { href: "/about", label: "À propos" }].map(l => (
              <Link key={l.href} href={l.href} className="hover:text-blue-600">{l.label}</Link>
            ))}
          </div>
          <p className="text-xs text-gray-400">© 2026 NOVI Ecosystem</p>
        </div>
      </footer>

    </main>
  )
}