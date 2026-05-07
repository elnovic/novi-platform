'use client'

import { useState } from 'react'
import { getUtilisateurConnecte, supabase } from '@/lib/supabase'
import { usePathname } from 'next/navigation'

const types = [
  'Erreur technique',
  'Contenu incorrect',
  'Lien cassé',
  'Page ne charge pas',
  'Problème de connexion',
  'Autre'
]

export default function BoutonSignalement() {
  const pathname = usePathname()
  const [ouvert, setOuvert] = useState(false)
  const [form, setForm] = useState({ type: '', description: '' })
  const [envoi, setEnvoi] = useState(false)
  const [succes, setSucces] = useState(false)
  const [erreur, setErreur] = useState('')

  const envoyer = async () => {
    if (!form.type || !form.description.trim()) {
      setErreur('Remplis tous les champs.')
      return
    }
    setErreur('')
    setEnvoi(true)
    try {
      const user = await getUtilisateurConnecte()
      await supabase.from('signalements').insert({
        utilisateur_id: user?.id || null,
        page: pathname,
        type: form.type,
        description: form.description
      })
      setSucces(true)
      setTimeout(() => {
        setSucces(false)
        setOuvert(false)
        setForm({ type: '', description: '' })
      }, 2000)
    } catch {
      setErreur('Erreur lors de l\'envoi. Réessaie.')
    } finally {
      setEnvoi(false)
    }
  }

  return (
    <>
      {/* Bouton flottant */}
      <button
        onClick={() => setOuvert(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-gray-900 text-white px-4 py-2.5 rounded-full shadow-lg hover:bg-gray-800 transition-all text-sm font-medium"
        title="Signaler un problème"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        Signaler
      </button>

      {/* Modal */}
      {ouvert && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end md:items-center justify-center z-50 px-4 pb-4 md:pb-0">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 space-y-4">

            {succes ? (
              <div className="text-center py-6">
                <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">Signalement envoyé !</h3>
                <p className="text-sm text-gray-500">Merci, nous allons corriger ça rapidement.</p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">Signaler un problème</h3>
                    <p className="text-xs text-gray-400 mt-0.5">Page : {pathname}</p>
                  </div>
                  <button onClick={() => setOuvert(false)}
                    className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600">
                    ✕
                  </button>
                </div>

                <div>
                  <label className="text-xs font-medium text-gray-600 mb-2 block">Type de problème</label>
                  <div className="grid grid-cols-2 gap-2">
                    {types.map(t => (
                      <button key={t} onClick={() => setForm(p => ({ ...p, type: t }))}
                        className={`text-xs px-3 py-2 rounded-xl border transition-all text-left ${
                          form.type === t
                            ? 'border-2 border-blue-500 bg-blue-50 text-blue-700 font-medium'
                            : 'border-gray-200 text-gray-600 hover:border-blue-300'
                        }`}>
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-gray-600 mb-1 block">Description</label>
                  <textarea
                    placeholder="Décris le problème en détail..."
                    value={form.description}
                    onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
                    className="w-full px-3 py-2.5 border-2 border-gray-300 rounded-xl text-sm focus:outline-none focus:border-blue-500 h-24 resize-none"
                  />
                </div>

                {erreur && <p className="text-xs text-red-500">{erreur}</p>}

                <div className="flex gap-3">
                  <button onClick={() => setOuvert(false)}
                    className="flex-1 py-2.5 border border-gray-200 text-gray-600 text-sm rounded-xl hover:bg-gray-50">
                    Annuler
                  </button>
                  <button onClick={envoyer} disabled={envoi}
                    className="flex-1 py-2.5 bg-blue-600 text-white text-sm rounded-xl hover:bg-blue-700 font-medium disabled:opacity-60">
                    {envoi ? 'Envoi...' : 'Envoyer'}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}