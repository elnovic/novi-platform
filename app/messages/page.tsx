'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { getUtilisateurConnecte, getConversations, getMessages, envoyerMessage, marquerMessagesLus } from '@/lib/supabase'
import { supabase } from '@/lib/supabase'

export default function Messages() {
  const [utilisateur, setUtilisateur] = useState<any>(null)
  const [conversations, setConversations] = useState<any[]>([])
  const [conversationActive, setConversationActive] = useState<any>(null)
  const [messages, setMessages] = useState<any[]>([])
  const [nouveau, setNouveau] = useState('')
  const [chargement, setChargement] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    chargerDonnees()
  }, [])

  useEffect(() => {
    if (!utilisateur) return

    // Abonnement Realtime pour les nouveaux messages
    const channel = supabase
      .channel('messages-realtime')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'messages',
        filter: `destinataire_id=eq.${utilisateur.id}`
      }, (payload) => {
        if (conversationActive && payload.new.expediteur_id === conversationActive.id) {
          setMessages(prev => [...prev, payload.new])
        }
        chargerConversations()
      })
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [utilisateur, conversationActive])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const chargerDonnees = async () => {
    const user = await getUtilisateurConnecte()
    if (!user) { window.location.href = '/login'; return }
    setUtilisateur(user)
    await chargerConversations(user.id)
    setChargement(false)
  }

  const chargerConversations = async (userId?: string) => {
    const uid = userId || utilisateur?.id
    if (!uid) return
    const msgs = await getConversations(uid)

    // Dédupliquer les conversations
    const convMap = new Map()
    msgs.forEach((m: any) => {
      const autreId = m.expediteur_id === uid ? m.destinataire_id : m.expediteur_id
      const autre = m.expediteur_id === uid ? m.destinataire : m.expediteur
      if (!convMap.has(autreId)) {
        convMap.set(autreId, { id: autreId, utilisateur: autre, dernierMessage: m })
      }
    })
    setConversations(Array.from(convMap.values()))
  }

  const ouvrirConversation = async (conv: any) => {
    setConversationActive(conv)
    if (!utilisateur) return
    const msgs = await getMessages(utilisateur.id, conv.id)
    setMessages(msgs)
    await marquerMessagesLus(conv.id, utilisateur.id)
  }

  const envoyer = async () => {
    if (!nouveau.trim() || !conversationActive || !utilisateur) return
    const msg = await envoyerMessage(utilisateur.id, conversationActive.id, nouveau)
    setMessages(prev => [...prev, msg])
    setNouveau('')
    chargerConversations()
  }

  if (chargement) return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
    </main>
  )

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-8 py-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
            <p className="text-gray-500 text-sm mt-1">{conversations.length} conversation(s)</p>
          </div>
          <Link href="/opportunity" className="text-sm text-gray-500 hover:text-blue-600">← Opportunity</Link>
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden" style={{ height: '600px' }}>
          <div className="flex h-full">

            {/* Liste conversations */}
            <div className="w-80 border-r border-gray-100 flex flex-col">
              <div className="p-4 border-b border-gray-100">
                <p className="text-sm font-medium text-gray-700">Conversations</p>
              </div>
              <div className="flex-1 overflow-y-auto">
                {conversations.length === 0 ? (
                  <div className="text-center py-12 px-4">
                    <p className="text-gray-400 text-sm">Aucune conversation.</p>
                    <Link href="/opportunity" className="text-blue-600 text-xs hover:underline mt-2 block">
                      Trouver des talents →
                    </Link>
                  </div>
                ) : (
                  conversations.map(conv => (
                    <button key={conv.id} onClick={() => ouvrirConversation(conv)}
                      className={`w-full flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors text-left border-b border-gray-50 ${
                        conversationActive?.id === conv.id ? 'bg-blue-50' : ''
                      }`}>
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-sm font-bold">
                          {conv.utilisateur?.prenom?.[0]}{conv.utilisateur?.nom?.[0]}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {conv.utilisateur?.prenom} {conv.utilisateur?.nom}
                        </p>
                        <p className="text-xs text-gray-400 truncate">{conv.dernierMessage?.contenu}</p>
                      </div>
                    </button>
                  ))
                )}
              </div>
            </div>

            {/* Zone de chat */}
            <div className="flex-1 flex flex-col">
              {!conversationActive ? (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </div>
                    <p className="text-gray-400 text-sm">Sélectionne une conversation</p>
                  </div>
                </div>
              ) : (
                <>
                  {/* Header conversation */}
                  <div className="p-4 border-b border-gray-100 flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">
                        {conversationActive.utilisateur?.prenom?.[0]}{conversationActive.utilisateur?.nom?.[0]}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 text-sm">
                        {conversationActive.utilisateur?.prenom} {conversationActive.utilisateur?.nom}
                      </p>
                      <p className="text-xs text-green-500">En ligne</p>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-3">
                    {messages.map((msg: any) => {
                      const estMoi = msg.expediteur_id === utilisateur?.id
                      return (
                        <div key={msg.id} className={`flex ${estMoi ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-xs px-4 py-2.5 rounded-2xl text-sm ${
                            estMoi
                              ? 'bg-blue-600 text-white rounded-br-md'
                              : 'bg-gray-100 text-gray-900 rounded-bl-md'
                          }`}>
                            <p>{msg.contenu}</p>
                            <p className={`text-xs mt-1 ${estMoi ? 'text-blue-200' : 'text-gray-400'}`}>
                              {new Date(msg.created_at).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                            </p>
                          </div>
                        </div>
                      )
                    })}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Input message */}
                  <div className="p-4 border-t border-gray-100">
                    <div className="flex gap-3">
                      <input type="text" placeholder="Écris un message..."
                        value={nouveau}
                        onChange={e => setNouveau(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && envoyer()}
                        className="flex-1 px-4 py-2.5 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500" />
                      <button onClick={envoyer} disabled={!nouveau.trim()}
                        className="px-5 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}