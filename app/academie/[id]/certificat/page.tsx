'use client'

import { use, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Certificat({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const certificatRef = useRef<HTMLDivElement>(null)

  const coursData: Record<string, any> = {
    "intro-ia": {
      titre: "Introduction à l'Intelligence Artificielle",
      mention: "Très Bien",
      score: 92,
      competences: ["Bases de l'IA", "Machine Learning", "Deep Learning", "Applications pratiques"],
      duree: "12 heures",
      date: "29 Avril 2026"
    }
  }

  const cours = coursData[id]
  const apprenant = { nom: "Amadou Diallo", email: "amadou@exemple.com" }
  const numeroCertificat = `NOVI-2026-${id.toUpperCase().replace(/-/g, '').slice(0, 8)}`

  const telechargerPDF = async () => {
    const { default: jsPDF } = await import('jspdf')
    const { default: html2canvas } = await import('html2canvas')

    if (!certificatRef.current) return

    const canvas = await html2canvas(certificatRef.current, {
      scale: 2,
      backgroundColor: '#ffffff'
    })

    const imgData = canvas.toDataURL('image/png')
    const pdf = new jsPDF('landscape', 'mm', 'a4')
    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = pdf.internal.pageSize.getHeight()

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)
    pdf.save(`certificat-novi-${id}.pdf`)
  }

  if (!cours) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4">Certificat introuvable</p>
          <Link href={`/academie/${id}`} className="text-blue-600 hover:underline text-sm">
            Retour au cours
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gray-100 py-12 px-4">

      {/* Actions */}
      <div className="max-w-4xl mx-auto mb-6 flex items-center justify-between">
        <Link href={`/academie/${id}`} className="text-sm text-gray-500 hover:text-blue-600">
          ← Retour au cours
        </Link>
        <div className="flex gap-3">
          <button
            onClick={telechargerPDF}
            className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Télécharger PDF
          </button>
          <Link
            href="/dashboard"
            className="flex items-center gap-2 border border-gray-200 text-gray-600 px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            Mon tableau de bord
          </Link>
        </div>
      </div>

      {/* Certificat */}
      <div
        ref={certificatRef}
        className="max-w-4xl mx-auto bg-white rounded-2xl overflow-hidden shadow-lg"
        style={{ aspectRatio: '297/210' }}
      >
        {/* Bordure décorative haut */}
        <div className="h-3 bg-gradient-to-r from-blue-600 via-blue-400 to-blue-600" />

        <div className="px-16 py-10 h-full flex flex-col">

          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="NOVI Ecosystem"
                width={52}
                height={52}
              />
              <div>
                <p className="font-bold text-blue-600 tracking-widest text-lg">NOVi</p>
                <p className="text-xs text-gray-400 tracking-widest uppercase">Ecosystem</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-400">Certificat n°</p>
              <p className="text-sm font-mono text-gray-600">{numeroCertificat}</p>
            </div>
          </div>

          {/* Titre */}
          <div className="text-center mb-8">
            <p className="text-sm text-gray-400 uppercase tracking-widest mb-2">Certificat de réussite</p>
            <h1 className="text-3xl font-bold text-gray-900 mb-1">NOVI Académie</h1>
            <div className="w-24 h-1 bg-blue-600 rounded-full mx-auto mt-3" />
          </div>

          {/* Corps */}
          <div className="text-center flex-1 flex flex-col justify-center">
            <p className="text-gray-500 text-sm mb-3">Ce certificat est décerné à</p>
            <p className="text-4xl font-bold text-gray-900 mb-3">{apprenant.nom}</p>
            <p className="text-gray-500 text-sm mb-6">pour avoir complété avec succès le cours</p>
            <p className="text-xl font-semibold text-blue-600 mb-2">"{cours.titre}"</p>
            <p className="text-gray-400 text-sm mb-8">{cours.duree} de formation · {cours.date}</p>

            {/* Mention et score */}
            <div className="flex items-center justify-center gap-8 mb-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-2xl font-bold text-blue-600">{cours.score}</span>
                </div>
                <p className="text-xs text-gray-400">Score /100</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-2">
                  <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-xs text-gray-400">Certifié NOVI</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-sm font-bold text-amber-600">{cours.mention}</span>
                </div>
                <p className="text-xs text-gray-400">Mention</p>
              </div>
            </div>

            {/* Compétences */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {cours.competences.map((c: string) => (
                <span key={c} className="text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded-full border border-blue-100">
                  {c}
                </span>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-end justify-between pt-6 border-t border-gray-100">
            <div>
              <div className="w-32 h-0.5 bg-gray-300 mb-1" />
              <p className="text-xs text-gray-400">Directeur NOVI Académie</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-1">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <p className="text-xs text-gray-400">Certifié &amp; Validé</p>
            </div>
            <div className="text-right">
              <div className="w-32 h-0.5 bg-gray-300 mb-1 ml-auto" />
              <p className="text-xs text-gray-400">IA Course Manager</p>
            </div>
          </div>

        </div>

        {/* Bordure bas */}
        <div className="h-3 bg-gradient-to-r from-blue-600 via-blue-400 to-blue-600" />
      </div>

      {/* Message encourageant */}
      <div className="max-w-4xl mx-auto mt-6 bg-blue-50 rounded-2xl p-6 text-center">
        <p className="text-blue-900 font-semibold mb-1">Félicitations {apprenant.nom} !</p>
        <p className="text-blue-600 text-sm">
          Ton certificat est valide 2 ans. Ajoute-le à ton profil Novi Opportunity pour le rendre visible aux entreprises partenaires.
        </p>
        <Link href="/opportunity/profil/creer"
          className="inline-block mt-4 bg-blue-600 text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors">
          Ajouter à mon profil →
        </Link>
      </div>

    </main>
  )
}