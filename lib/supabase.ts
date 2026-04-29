import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)

// ─── AUTHENTIFICATION ───
export async function inscrireUtilisateur(data: {
  nom: string
  prenom: string
  email: string
  motdepasse: string
  niveau: string
  objectifs: string[]
  domaines: string[]
}) {
  // 1. Créer le compte Auth
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: data.email,
    password: data.motdepasse,
    options: {
      data: {
        nom: data.nom,
        prenom: data.prenom
      }
    }
  })
  if (authError) throw authError

  // 2. Créer ou mettre à jour le profil avec upsert
  const { error: profileError } = await supabase
    .from('utilisateurs')
    .upsert({
      auth_id: authData.user?.id,
      nom: data.nom,
      prenom: data.prenom,
      email: data.email,
      niveau: data.niveau,
      objectifs: data.objectifs,
      domaines: data.domaines
    }, { onConflict: 'email' })

  if (profileError) throw profileError

  return authData
}

export async function connecterUtilisateur(email: string, motdepasse: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password: motdepasse
  })
  if (error) throw error
  return data
}

export async function deconnecterUtilisateur() {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

export async function getUtilisateurConnecte() {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data, error } = await supabase
    .from('utilisateurs')
    .select('*')
    .eq('auth_id', user.id)
    .single()

  if (error) return null
  return data
}

export async function ecouterAuthChangements(callback: (user: any) => void) {
  const { data: { subscription } } = supabase.auth.onAuthStateChange(
    async (event, session) => {
      if (session?.user) {
        const profil = await getUtilisateurConnecte()
        callback(profil)
      } else {
        callback(null)
      }
    }
  )
  return subscription
}

// ─── UTILISATEURS ───
export async function getUtilisateur(email: string) {
  const { data, error } = await supabase
    .from('utilisateurs')
    .select('*')
    .eq('email', email)
    .single()
  if (error) throw error
  return data
}

// ─── COURS ───
export async function getCoursListe() {
  const { data, error } = await supabase
    .from('cours')
    .select('id, titre, niveau, domaine, duree_estimee, score_qualite, certification')
    .order('created_at', { ascending: false })
  if (error) throw error
  return data || []
}

export async function getCours(id: string) {
  const { data, error } = await supabase
    .from('cours')
    .select('*')
    .eq('id', id)
    .single()
  if (error) throw error
  return data
}

export async function sauvegarderCours(cours: any) {
  const { data, error } = await supabase
    .from('cours')
    .upsert({
      id: cours.titre.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, ''),
      titre: cours.titre,
      niveau: cours.niveau,
      duree_estimee: cours.duree_estimee,
      score_qualite: cours.qualite?.score_final || 0,
      certification: cours.qualite?.certification_novi || false,
      contenu: cours
    })
    .select()
  if (error) throw error
  return data
}

// ─── PROGRESSION ───
export async function getProgression(utilisateur_id: string) {
  const { data, error } = await supabase
    .from('progression')
    .select('*')
    .eq('utilisateur_id', utilisateur_id)
  if (error) throw error
  return data || []
}

export async function updateProgression(
  utilisateur_id: string,
  cours_id: string,
  chapitre: number,
  pourcentage: number
) {
  const { data, error } = await supabase
    .from('progression')
    .upsert({
      utilisateur_id,
      cours_id,
      chapitre_actuel: chapitre,
      pourcentage,
      updated_at: new Date().toISOString()
    }, { onConflict: 'utilisateur_id,cours_id' })
    .select()
  if (error) throw error
  return data
}

// ─── CERTIFICATIONS ───
export async function sauvegarderCertification(data: {
  utilisateur_id: string
  cours_id: string
  titre: string
  mention: string
  score: number
}) {
  const { data: cert, error } = await supabase
    .from('certifications')
    .insert(data)
    .select()
    .single()
  if (error) throw error
  return cert
}

export async function getCertifications(utilisateur_id: string) {
  const { data, error } = await supabase
    .from('certifications')
    .select('*')
    .eq('utilisateur_id', utilisateur_id)
    .order('date_obtention', { ascending: false })
  if (error) throw error
  return data || []
}

// ─── PROFILS OPPORTUNITY ───
export async function creerProfilOpportunity(data: {
  utilisateur_id?: string
  titre: string
  ville: string
  bio: string
  competences: string[]
  domaines: string[]
  objectifs: string[]
  langues: string[]
  linkedin?: string
  github?: string
}) {
  const { data: profil, error } = await supabase
    .from('profils_opportunity')
    .insert(data)
    .select()
    .single()
  if (error) throw error
  return profil
}

export async function getProfilsOpportunity() {
  const { data, error } = await supabase
    .from('profils_opportunity')
    .select('*')
    .eq('disponible', true)
    .order('created_at', { ascending: false })
  if (error) throw error
  return data || []
}

// ─── PUBLICATIONS ───
export async function soumettrePublication(data: {
  auteur: string
  institution?: string
  titre: string
  resume: string
  type: string
  domaine?: string
  langue?: string
}) {
  const { data: pub, error } = await supabase
    .from('publications')
    .insert({ ...data, statut: 'en_attente' })
    .select()
    .single()
  if (error) throw error
  return pub
}

export async function getPublications() {
  const { data, error } = await supabase
    .from('publications')
    .select('*')
    .eq('statut', 'publie')
    .order('created_at', { ascending: false })
  if (error) throw error
  return data || []
}

// ─── OPPORTUNITÉS ───
export async function getOpportunites() {
  const { data, error } = await supabase
    .from('opportunites')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) throw error
  return data || []
}