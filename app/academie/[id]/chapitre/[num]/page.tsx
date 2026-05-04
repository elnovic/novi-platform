'use client'

import { useState, useEffect, use } from 'react'
import Link from 'next/link'
import { getCours } from '@/lib/supabase'

export default function LecteurCours({ params }: { params: Promise<{ id: string, num: string }> }) {
  const { id, num } = use(params)
  const [chapitre, setChapitre] = useState<any>(null)
  const [totalChapitres, setTotalChapitres] = useState(5)
  const [chargement, setChargement] = useState(true)
  const [quizEtat, setQuizEtat] = useState<Record<number, string>>({})
  const [quizValide, setQuizValide] = useState<Record<number, boolean>>({})
  const [exerciceOuvert, setExerciceOuvert] = useState(false)

  useEffect(() => {
    getCours(id).then(cours => {
      const contenu = cours.contenu || cours
      const chapitres = contenu.chapitres || []
      setTotalChapitres(chapitres.length)
      const ch = chapitres.find((c: any) => c.numero === parseInt(num))
      setChapitre(ch || null)
      setChargement(false)
    }).catch(() => setChargement(false))
  }, [id, num])

  const handleReponse = (quizIndex: number, option: string) => {
    if (quizValide[quizIndex]) return
    setQuizEtat(prev => ({ ...prev, [quizIndex]: option }))
  }

  const handleValider = (quizIndex: number) => {
    if (!quizEtat[quizIndex]) return
    setQuizValide(prev => ({ ...prev, [quizIndex]: true }))
  }

  const tousQuizRepondus = chapitre?.quiz?.every((_: any, i: number) => quizValide[i]) ?? false

  if (chargement) return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
    </main>
  )

  if (!chapitre) return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="text-gray-500 mb-4">Chapitre introuvable</p>
        <Link href={`/academie/${id}`} className="text-blue-600 hover:underline text-sm">Retour au cours</Link>
      </div>
    </main>
  )

  return (
    <main className="min-h-screen bg-white">
      <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
        <div className="flex items-center justify-between px-6 py-3">
          <Link href={`/academie/${id}`} className="text-sm text-gray-500 hover:text-blue-600">← Retour au cours</Link>
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-400">Chapitre {chapitre.numero} / {totalChapitres}</span>
            <div className="w-32 h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-blue-600 rounded-full" style={{ width: `${(chapitre.numero / totalChapitres) * 100}%` }} />
            </div>
          </div>
          {chapitre.numero < totalChapitres ? (
            <Link href={tousQuizRepondus ? `/academie/${id}/chapitre/${chapitre.numero + 1}` : '#'}
              className={`text-sm px-4 py-1.5 rounded-lg transition-colors ${tousQuizRepondus ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-100 text-gray-400 cursor-not-allowed pointer-events-none'}`}>
              Chapitre suivant →
            </Link>
          ) : (
            <Link href={`/academie/${id}`} className="text-sm px-4 py-1.5 rounded-lg bg-green-600 text-white hover:bg-green-700">
              Terminer ✓
            </Link>
          )}
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 pt-24 pb-20 space-y-10">
        <div>
          <span className="text-xs text-blue-600 font-medium uppercase tracking-wider">Chapitre {chapitre.numero}</span>
          <h1 className="text-2xl font-bold text-gray-900 mt-2">{chapitre.titre}</h1>
        </div>

        <section>
          {chapitre.contenu?.split('\n\n').map((p: string, i: number) => (
            <p key={i} className="text-gray-700 leading-relaxed mb-4">{p}</p>
          ))}
        </section>

        {chapitre.points_cles?.length > 0 && (
          <section className="bg-blue-50 rounded-2xl p-6">
            <h2 className="font-semibold text-blue-900 mb-4">Points clés</h2>
            <ul className="space-y-2">
              {chapitre.points_cles.map((point: string, i: number) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">{i + 1}</span>
                  </div>
                  <span className="text-sm text-blue-800">{point}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {chapitre.exemple_concret && (
          <section className="border-l-4 border-blue-600 pl-6">
            <h2 className="font-semibold text-gray-900 mb-2">Exemple concret</h2>
            <p className="text-gray-600 text-sm leading-relaxed">{chapitre.exemple_concret}</p>
          </section>
        )}

        {chapitre.anecdote && (
          <section className="bg-amber-50 rounded-2xl p-6">
            <h2 className="font-semibold text-amber-900 mb-2">Le savais-tu ?</h2>
            <p className="text-amber-800 text-sm leading-relaxed">{chapitre.anecdote}</p>
          </section>
        )}

        {chapitre.quiz?.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-6">Quiz</h2>
            <div className="space-y-8">
              {chapitre.quiz.map((q: any, i: number) => (
                <div key={i} className="border border-gray-100 rounded-2xl p-6">
                  <p className="font-medium text-gray-900 mb-4">{i + 1}. {q.question}</p>
                  <div className="space-y-3">
                    {q.options.map((option: string) => {
                      const selectionne = quizEtat[i] === option
                      const valide = quizValide[i]
                      const estBonne = option === q.bonne_reponse
                      let style = "border border-gray-200 text-gray-700 hover:border-blue-300"
                      if (selectionne && !valide) style = "border-2 border-blue-500 text-blue-700 bg-blue-50"
                      if (valide && estBonne) style = "border-2 border-green-500 text-green-700 bg-green-50"
                      if (valide && selectionne && !estBonne) style = "border-2 border-red-400 text-red-700 bg-red-50"
                      return (
                        <button key={option} onClick={() => handleReponse(i, option)}
                          className={`w-full text-left px-4 py-3 rounded-xl text-sm transition-all ${style}`}>
                          {option}
                        </button>
                      )
                    })}
                  </div>
                  {!quizValide[i] && (
                    <button onClick={() => handleValider(i)} disabled={!quizEtat[i]}
                      className={`mt-4 px-6 py-2 rounded-lg text-sm font-medium transition-colors ${quizEtat[i] ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}>
                      Valider
                    </button>
                  )}
                  {quizValide[i] && (
                    <div className={`mt-4 p-4 rounded-xl text-sm ${quizEtat[i] === q.bonne_reponse ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                      <p className="font-medium mb-1">{quizEtat[i] === q.bonne_reponse ? 'Bonne réponse !' : 'Pas tout à fait...'}</p>
                      <p>{q.explication}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {chapitre.exercice && (
          <section className="border border-gray-100 rounded-2xl overflow-hidden">
            <button onClick={() => setExerciceOuvert(!exerciceOuvert)}
              className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-amber-50 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <div className="text-left">
                  <p className="font-medium text-gray-900">Exercice pratique</p>
                  <p className="text-xs text-gray-500">{chapitre.exercice.enonce}</p>
                </div>
              </div>
              <svg className={`w-5 h-5 text-gray-400 transition-transform ${exerciceOuvert ? 'rotate-180' : ''}`}
                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {exerciceOuvert && (
              <div className="px-6 pb-6 border-t border-gray-50">
                <div className="mt-4 space-y-4">
                  <ol className="space-y-2">
                    {chapitre.exercice.instructions?.map((inst: string, i: number) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                        <span className="w-5 h-5 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 text-xs">{i + 1}</span>
                        {inst}
                      </li>
                    ))}
                  </ol>
                  {chapitre.exercice.livrable && (
                    <div className="bg-gray-50 rounded-xl p-4">
                      <p className="text-xs font-medium text-gray-500 mb-1">Livrable</p>
                      <p className="text-sm text-gray-700">{chapitre.exercice.livrable}</p>
                    </div>
                  )}
                  {chapitre.exercice.conseil && (
                    <div className="bg-blue-50 rounded-xl p-4">
                      <p className="text-xs font-medium text-blue-600 mb-1">Conseil</p>
                      <p className="text-sm text-blue-700">{chapitre.exercice.conseil}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </section>
        )}

        <div className="flex justify-between pt-6 border-t border-gray-100">
          {chapitre.numero > 1 ? (
            <Link href={`/academie/${id}/chapitre/${chapitre.numero - 1}`} className="text-sm text-gray-500 hover:text-blue-600">← Précédent</Link>
          ) : <div />}
          {chapitre.numero < totalChapitres ? (
            <Link href={tousQuizRepondus ? `/academie/${id}/chapitre/${chapitre.numero + 1}` : '#'}
              className={`text-sm px-6 py-2.5 rounded-xl font-medium transition-colors ${tousQuizRepondus ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-100 text-gray-400 cursor-not-allowed pointer-events-none'}`}>
              Suivant →
            </Link>
          ) : (
            <Link href={`/academie/${id}`} className="text-sm px-6 py-2.5 rounded-xl font-medium bg-green-600 text-white hover:bg-green-700">
              Terminer ✓
            </Link>
          )}
        </div>
      </div>
    </main>
  )
}