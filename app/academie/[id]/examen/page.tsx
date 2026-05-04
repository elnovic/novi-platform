'use client'

import { useState, useRef, useEffect, use } from 'react'
import Link from 'next/link'
import { getCours } from '@/lib/supabase'

type Statut = 'intro' | 'question' | 'enregistrement' | 'evaluation' | 'resultats'

export default function ExamenOral({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [examen, setExamen] = useState<any>(null)
  const [chargement, setChargement] = useState(true)
  const [statut, setStatut] = useState<Statut>('intro')
  const [questionActuelle, setQuestionActuelle] = useState(0)
  const [resultats, setResultats] = useState<any[]>([])
  const [resultatFinal, setResultatFinal] = useState<any>(null)
  const [chargementEval, setChargementEval] = useState(false)
  const [transcription, setTranscription] = useState('')
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])

  useEffect(() => {
    getCours(id).then(cours => {
      const contenu = cours.contenu || cours
      setExamen({
        titre: `Examen oral — ${cours.titre}`,
        questions: contenu.examen_oral?.questions || [],
        criteres: contenu.examen_oral?.criteres_evaluation || ["clarté", "précision", "exemples"]
      })
      setChargement(false)
    }).catch(() => setChargement(false))
  }, [id])

  const demarrerEnregistrement = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      audioChunksRef.current = []
      mediaRecorder.ondataavailable = (e) => audioChunksRef.current.push(e.data)
      mediaRecorder.start()
      setStatut('enregistrement')
    } catch {
      alert("Impossible d'accéder au microphone.")
    }
  }

  const arreterEtEvaluer = async () => {
    if (!mediaRecorderRef.current) return
    setChargementEval(true)
    mediaRecorderRef.current.stop()
    mediaRecorderRef.current.stream.getTracks().forEach(t => t.stop())
    mediaRecorderRef.current.onstop = async () => {
      const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' })
      const formData = new FormData()
      formData.append('audio', audioBlob, 'reponse.webm')
      formData.append('question', examen.questions[questionActuelle])
      formData.append('criteres', examen.criteres.join(','))
      try {
        const res = await fetch('http://localhost:8000/examen-oral/question', { method: 'POST', body: formData })
        const data = await res.json()
        setTranscription(data.transcription)
        setResultats(prev => [...prev, { numero: questionActuelle + 1, question: examen.questions[questionActuelle], transcription: data.transcription, evaluation: data.evaluation }])
        setStatut('evaluation')
      } catch {
        alert("Erreur lors de l'évaluation.")
      } finally {
        setChargementEval(false)
      }
    }
  }

  const questionSuivante = () => {
    if (questionActuelle < examen.questions.length - 1) {
      setQuestionActuelle(prev => prev + 1)
      setTranscription('')
      setStatut('question')
    } else {
      const scores = resultats.map(r => r.evaluation.score)
      const scoreFinal = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
      const mention = scoreFinal >= 90 ? "Excellent" : scoreFinal >= 80 ? "Très Bien" : scoreFinal >= 70 ? "Bien" : scoreFinal >= 60 ? "Passable" : "Insuffisant"
      setResultatFinal({ score_final: scoreFinal, mention_finale: mention, certification_obtenue: scoreFinal >= 60 })
      setStatut('resultats')
    }
  }

  if (chargement) return <main className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" /></main>

  if (!examen || examen.questions.length === 0) return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="text-gray-500 mb-4">Examen introuvable</p>
        <Link href={`/academie/${id}`} className="text-blue-600 hover:underline">Retour au cours</Link>
      </div>
    </main>
  )

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-100 px-8 py-4 flex items-center justify-between">
        <Link href={`/academie/${id}`} className="text-sm text-gray-500 hover:text-blue-600">← Retour</Link>
        <h1 className="text-sm font-medium text-gray-700">{examen.titre}</h1>
        <div className="text-xs text-gray-400">Question {questionActuelle + 1} / {examen.questions.length}</div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-12">
        {statut === 'intro' && (
          <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center space-y-6">
            <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mx-auto">
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Examen oral IA</h2>
              <p className="text-sm text-gray-500">{examen.questions.length} questions · Réponds clairement avec des exemples</p>
            </div>
            <button onClick={() => setStatut('question')} className="w-full bg-purple-600 text-white py-3 rounded-xl font-medium hover:bg-purple-700">
              Commencer →
            </button>
          </div>
        )}

        {statut === 'question' && (
          <div className="bg-white rounded-2xl border border-gray-100 p-8 space-y-6">
            <div className="bg-purple-50 rounded-xl p-6">
              <p className="text-gray-900 font-medium">{examen.questions[questionActuelle]}</p>
            </div>
            <button onClick={demarrerEnregistrement} className="w-full bg-red-500 text-white py-3 rounded-xl font-medium hover:bg-red-600 flex items-center justify-center gap-2">
              <div className="w-3 h-3 bg-white rounded-full" />
              Commencer l'enregistrement
            </button>
          </div>
        )}

        {statut === 'enregistrement' && (
          <div className="bg-white rounded-2xl border border-gray-100 p-8 space-y-6 text-center">
            <div className="bg-purple-50 rounded-xl p-6 text-left">
              <p className="text-gray-900 font-medium">{examen.questions[questionActuelle]}</p>
            </div>
            <div className="flex flex-col items-center gap-4">
              <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center relative">
                <div className="absolute inset-0 rounded-full bg-red-100 animate-ping opacity-50" />
                <svg className="w-8 h-8 text-red-500 relative z-10" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
                  <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
                </svg>
              </div>
              <p className="text-sm font-medium text-red-500">Enregistrement en cours...</p>
            </div>
            <button onClick={arreterEtEvaluer} className="w-full bg-gray-900 text-white py-3 rounded-xl font-medium hover:bg-gray-800">
              Terminer ma réponse
            </button>
          </div>
        )}

        {chargementEval && (
          <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center space-y-4">
            <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto" />
            <p className="text-sm font-medium text-gray-700">Évaluation en cours...</p>
          </div>
        )}

        {statut === 'evaluation' && !chargementEval && resultats.length > 0 && (() => {
          const dernier = resultats[resultats.length - 1]
          const eval_ = dernier.evaluation
          return (
            <div className="space-y-4">
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h3 className="font-semibold mb-3">Ta réponse</h3>
                <p className="text-sm text-gray-600 italic">"{transcription}"</p>
              </div>
              <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Évaluation IA</h3>
                  <div className="text-right">
                    <p className={`text-2xl font-bold ${eval_.score >= 80 ? 'text-green-600' : eval_.score >= 60 ? 'text-amber-600' : 'text-red-500'}`}>{eval_.score}/100</p>
                    <p className="text-xs text-gray-400">{eval_.mention}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-green-50 rounded-xl p-4">
                    <p className="text-xs font-medium text-green-700 mb-2">Points forts</p>
                    {eval_.points_forts?.map((p: string, i: number) => (
                      <p key={i} className="text-xs text-green-600">✓ {p}</p>
                    ))}
                  </div>
                  <div className="bg-amber-50 rounded-xl p-4">
                    <p className="text-xs font-medium text-amber-700 mb-2">À améliorer</p>
                    {eval_.points_ameliorer?.map((p: string, i: number) => (
                      <p key={i} className="text-xs text-amber-600">→ {p}</p>
                    ))}
                  </div>
                </div>
                <div className="bg-blue-50 rounded-xl p-4">
                  <p className="text-xs font-medium text-blue-700 mb-1">Feedback</p>
                  <p className="text-sm text-blue-700">{eval_.feedback_detaille}</p>
                </div>
                <button onClick={questionSuivante} className="w-full bg-purple-600 text-white py-3 rounded-xl font-medium hover:bg-purple-700">
                  {questionActuelle < examen.questions.length - 1 ? 'Question suivante →' : 'Voir mes résultats →'}
                </button>
              </div>
            </div>
          )
        })()}

        {statut === 'resultats' && resultatFinal && (
          <div className="space-y-6">
            <div className={`rounded-2xl p-8 text-center ${resultatFinal.certification_obtenue ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
              <p className={`text-4xl font-bold mb-1 ${resultatFinal.score_final >= 80 ? 'text-green-600' : resultatFinal.score_final >= 60 ? 'text-amber-600' : 'text-red-500'}`}>
                {resultatFinal.score_final}/100
              </p>
              <p className="text-lg font-semibold text-gray-900 mb-1">Mention : {resultatFinal.mention_finale}</p>
              <p className={`text-sm font-medium ${resultatFinal.certification_obtenue ? 'text-green-600' : 'text-red-500'}`}>
                {resultatFinal.certification_obtenue ? '🎓 Certification NOVI obtenue !' : 'Certification non obtenue — Réessaie'}
              </p>
            </div>
            <div className="flex gap-3">
              <Link href={`/academie/${id}`} className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-600 text-sm text-center hover:bg-gray-50">
                Retour au cours
              </Link>
              {resultatFinal.certification_obtenue && (
                <Link href={`/academie/${id}/certificat`} className="flex-1 py-3 rounded-xl bg-blue-600 text-white text-sm text-center hover:bg-blue-700 font-medium">
                  Voir mon certificat →
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}