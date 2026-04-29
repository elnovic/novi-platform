import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)

// ─── UTILISATEURS ───
export async function creerUtilisateur(data: {
  nom: string
  prenom: string
  email: string
  niveau: string
  objectifs: string[]
  domaines: string[]
}) {
  const { data: user, error } = await supabase
    .from('utilisateurs')
    .insert(data)
    .select()
    .single()
  if (error) throw error
  return user
}

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