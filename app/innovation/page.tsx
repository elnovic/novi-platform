'use client'

import { useState } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'

const CarteMondeComponent = dynamic(() => import('@/components/CarteMonde'), {
  ssr: false,
  loading: () => (
    <div className="h-full flex items-center justify-center bg-gray-50 rounded-2xl">
      <div className="text-center">
        <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-3" />
        <p className="text-sm text-gray-400">Chargement de la carte...</p>
      </div>
    </div>
  )
})

const paysData: Record<string, any> = {
  "Maroc": { drapeau: "🇲🇦", lat: 31.7917, lng: -7.0926, score: 78, tendances: ["IA & Fintech", "Smart Cities", "Énergies renouvelables"], startups: "340+", investissement: "2.1 Mds $", projets: [{ nom: "Casablanca Tech City", description: "Hub technologique de 100 000 m²", annee: "2025" }] },
  "Sénégal": { drapeau: "🇸🇳", lat: 14.4974, lng: -14.4524, score: 65, tendances: ["Agritech IA", "Mobile Banking", "Éducation numérique"], startups: "180+", investissement: "450 M $", projets: [{ nom: "Dakar Digital Hub", description: "Écosystème de 50 startups tech", annee: "2025" }] },
  "Nigeria": { drapeau: "🇳🇬", lat: 9.0820, lng: 8.6753, score: 71, tendances: ["Fintech", "IA Santé", "E-commerce"], startups: "890+", investissement: "3.2 Mds $", projets: [{ nom: "Lagos Tech Corridor", description: "Silicon Valley africaine", annee: "2025" }] },
  "Rwanda": { drapeau: "🇷🇼", lat: -1.9403, lng: 29.8739, score: 74, tendances: ["Smart Cities", "Drones médicaux", "Fintech"], startups: "120+", investissement: "280 M $", projets: [{ nom: "Kigali Innovation City", description: "Cité de l'innovation de 61 hectares", annee: "2024" }] },
  "France": { drapeau: "🇫🇷", lat: 46.2276, lng: 2.2137, score: 92, tendances: ["IA Générative", "Quantique", "Cybersécurité"], startups: "4 200+", investissement: "12.4 Mds $", projets: [{ nom: "France 2030 — IA", description: "1,5 milliard € dans l'IA nationale", annee: "2024" }, { nom: "Mistral AI", description: "Champion européen des LLM", annee: "2023" }] },
  "Allemagne": { drapeau: "🇩🇪", lat: 51.1657, lng: 10.4515, score: 94, tendances: ["Industrie 4.0", "Robotique", "Voiture autonome"], startups: "3 800+", investissement: "18.7 Mds $", projets: [{ nom: "German AI Strategy", description: "3 milliards € dans la recherche IA", annee: "2024" }] },
  "USA": { drapeau: "🇺🇸", lat: 37.0902, lng: -95.7129, score: 99, tendances: ["AGI", "IA Générative", "Quantique"], startups: "45 000+", investissement: "340 Mds $", projets: [{ nom: "Stargate Project", description: "500 milliards $ dans l'infrastructure IA", annee: "2025" }] },
  "Chine": { drapeau: "🇨🇳", lat: 35.8617, lng: 104.1954, score: 97, tendances: ["IA Générative", "Semi-conducteurs", "Robotique"], startups: "12 000+", investissement: "95 Mds $", projets: [{ nom: "DeepSeek R2", description: "Modèle de langage frontier", annee: "2025" }] },
  "Inde": { drapeau: "🇮🇳", lat: 20.5937, lng: 78.9629, score: 85, tendances: ["IA", "Fintech", "Space Tech"], startups: "11 000+", investissement: "28 Mds $", projets: [{ nom: "IndiaAI Mission", description: "1,2 milliard $ dans l'IA", annee: "2024" }] },
  "Japon": { drapeau: "🇯🇵", lat: 36.2048, lng: 138.2529, score: 91, tendances: ["Robotique", "IA", "Semiconducteurs"], startups: "5 600+", investissement: "15.3 Mds $", projets: [{ nom: "Japan AI Strategy", description: "Programme national de robotique", annee: "2024" }] },
  "Brésil": { drapeau: "🇧🇷", lat: -14.2350, lng: -51.9253, score: 72, tendances: ["Agritech", "Fintech", "IA Santé"], startups: "4 300+", investissement: "8.5 Mds $", projets: [{ nom: "Brazilian AI Plan", description: "500M $ d'investissement IA", annee: "2024" }] },
  "Canada": { drapeau: "🇨🇦", lat: 56.1304, lng: -106.3468, score: 90, tendances: ["IA", "CleanTech", "BioTech"], startups: "6 800+", investissement: "19.2 Mds $", projets: [{ nom: "Pan-Canadian AI Strategy", description: "Hub IA à Montréal et Toronto", annee: "2023" }] },
  "Émirats Arabes Unis": { drapeau: "🇦🇪", lat: 23.4241, lng: 53.8478, score: 88, tendances: ["Smart Cities", "IA", "Blockchain"], startups: "1 200+", investissement: "7.8 Mds $", projets: [{ nom: "UAE AI Strategy 2031", description: "Devenir le pays le plus préparé à l'IA", annee: "2024" }] },
  "Corée du Sud": { drapeau: "🇰🇷", lat: 35.9078, lng: 127.7669, score: 93, tendances: ["Semiconducteurs", "Robotique", "5G"], startups: "4 900+", investissement: "16.4 Mds $", projets: [{ nom: "K-Semiconductor Strategy", description: "451 milliards $ dans les semiconducteurs", annee: "2024" }] }
}

const scoreColor = (score: number) => {
  if (score >= 90) return "text-green-600 bg-green-50"
  if (score >= 75) return "text-blue-600 bg-blue-50"
  if (score >= 60) return "text-amber-600 bg-amber-50"
  return "text-red-500 bg-red-50"
}

export default function Innovation() {
  const [paysSelectionne, setPaysSelectionne] = useState<string | null>(null)
  const [recherche, setRecherche] = useState('')

  const paysFiltres = Object.keys(paysData).filter(pays =>
    pays.toLowerCase().includes(recherche.toLowerCase()) ||
    paysData[pays].tendances.some((t: string) => t.toLowerCase().includes(recherche.toLowerCase()))
  )

  const pays = paysSelectionne ? paysData[paysSelectionne] : null

  return (
    <main className="min-h-screen bg-white">
      <div className="bg-gray-950 text-white px-8 py-12">
        <div className="max-w-7xl mx-auto">
          <Link href="/" className="text-sm text-gray-400 hover:text-white mb-6 inline-block">← Accueil</Link>
          <h1 className="text-3xl font-bold mb-2">Novi Innovation</h1>
          <p className="text-gray-400">Carte mondiale des évolutions technologiques — clique sur un pays</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-8">
        <div className="mb-6">
          <input type="text" placeholder="Rechercher un pays ou une technologie..."
            value={recherche} onChange={e => setRecherche(e.target.value)}
            className="w-full max-w-md px-4 py-2.5 border-2 border-gray-400 rounded-xl text-sm focus:outline-none focus:border-blue-500 bg-white text-gray-900" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" style={{ height: '600px' }}>
          <div className="lg:col-span-2 rounded-2xl overflow-hidden border border-gray-100 h-full">
            <CarteMondeComponent
              paysData={paysData}
              paysFiltres={paysFiltres}
              paysSelectionne={paysSelectionne}
              onPaysClick={(nom: string) => setPaysSelectionne(nom)}
            />
          </div>

          <div className="h-full overflow-y-auto">
            {!pays ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 bg-gray-50 rounded-2xl border border-gray-100">
                <span className="text-5xl mb-4">🌍</span>
                <h3 className="font-semibold text-gray-900 mb-2">Explore le monde tech</h3>
                <p className="text-sm text-gray-400 max-w-xs mb-6">Clique sur un pays pour voir ses évolutions technologiques.</p>
                <div className="space-y-2 w-full px-4">
                  {Object.keys(paysData).slice(0, 5).map(nom => (
                    <button key={nom} onClick={() => setPaysSelectionne(nom)}
                      className="w-full flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-100 hover:border-blue-200 transition-colors text-left">
                      <span className="text-xl">{paysData[nom].drapeau}</span>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{nom}</p>
                        <p className="text-xs text-gray-400">{paysData[nom].tendances[0]}</p>
                      </div>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${scoreColor(paysData[nom].score)}`}>{paysData[nom].score}</span>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-white border border-gray-100 rounded-2xl p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl">{pays.drapeau}</span>
                    <div className="flex-1">
                      <h2 className="text-xl font-bold text-gray-900">{paysSelectionne}</h2>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${scoreColor(pays.score)}`}>Score : {pays.score}/100</span>
                    </div>
                    <button onClick={() => setPaysSelectionne(null)} className="text-gray-400 hover:text-gray-600 text-xl">×</button>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-gray-50 rounded-xl p-3 text-center">
                      <p className="font-bold text-gray-900">{pays.startups}</p>
                      <p className="text-xs text-gray-400">Startups</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-3 text-center">
                      <p className="font-bold text-gray-900">{pays.investissement}</p>
                      <p className="text-xs text-gray-400">Investissement</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-100 rounded-2xl p-5">
                  <h3 className="font-semibold text-gray-900 mb-3 text-sm">Tendances</h3>
                  <div className="flex flex-wrap gap-2">
                    {pays.tendances.map((t: string) => (
                      <span key={t} className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full">{t}</span>
                    ))}
                  </div>
                </div>

                <div className="bg-white border border-gray-100 rounded-2xl p-5">
                  <h3 className="font-semibold text-gray-900 mb-3 text-sm">Projets phares</h3>
                  <div className="space-y-3">
                    {pays.projets.map((p: any, i: number) => (
                      <div key={i} className="bg-gray-50 rounded-xl p-3">
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-sm font-medium text-gray-900">{p.nom}</p>
                          <span className="text-xs text-gray-400">{p.annee}</span>
                        </div>
                        <p className="text-xs text-gray-500">{p.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}