import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)

// Inscription
export async function inscrire(email: string, password: string, metadata: any) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: metadata
    }
  })
  if (error) throw error
  return data
}

// Connexion
export async function connecter(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })
  if (error) throw error
  return data
}

// Déconnexion
export async function deconnecter() {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

// Utilisateur actuel
export async function getUtilisateurActuel() {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

// Écouter les changements d'auth
export function ecouterAuth(callback: (user: any) => void) {
  return supabase.auth.onAuthStateChange((event, session) => {
    callback(session?.user || null)
  })
}