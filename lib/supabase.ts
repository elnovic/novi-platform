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
  try {
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) return null

    // Chercher d'abord par auth_id
    const { data: parAuthId } = await supabase
      .from('utilisateurs')
      .select('*')
      .eq('auth_id', user.id)
      .single()

    if (parAuthId) return parAuthId

    // Si pas trouvé par auth_id, chercher par email et mettre à jour
    const { data: parEmail } = await supabase
      .from('utilisateurs')
      .select('*')
      .eq('email', user.email!)
      .single()

    if (parEmail) {
      // Mettre à jour l'auth_id manquant
      await supabase
        .from('utilisateurs')
        .update({ auth_id: user.id })
        .eq('email', user.email!)
      return parEmail
    }

    return null
  } catch {
    return null
  }
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

// ─── MESSAGES / CHAT ───
export async function envoyerMessage(expediteur_id: string, destinataire_id: string, contenu: string) {
  const { data, error } = await supabase
    .from('messages')
    .insert({ expediteur_id, destinataire_id, contenu })
    .select()
    .single()
  if (error) throw error
  return data
}

export async function getMessages(utilisateur1_id: string, utilisateur2_id: string) {
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .or(`and(expediteur_id.eq.${utilisateur1_id},destinataire_id.eq.${utilisateur2_id}),and(expediteur_id.eq.${utilisateur2_id},destinataire_id.eq.${utilisateur1_id})`)
    .order('created_at', { ascending: true })
  if (error) throw error
  return data || []
}

export async function getConversations(utilisateur_id: string) {
  const { data, error } = await supabase
    .from('messages')
    .select('*, expediteur:expediteur_id(*), destinataire:destinataire_id(*)')
    .or(`expediteur_id.eq.${utilisateur_id},destinataire_id.eq.${utilisateur_id}`)
    .order('created_at', { ascending: false })
  if (error) throw error
  return data || []
}

export async function marquerMessagesLus(expediteur_id: string, destinataire_id: string) {
  const { error } = await supabase
    .from('messages')
    .update({ lu: true })
    .eq('expediteur_id', expediteur_id)
    .eq('destinataire_id', destinataire_id)
  if (error) throw error
}

// ─── CONNEXIONS ───
export async function demanderConnexion(demandeur_id: string, receveur_id: string) {
  const { data, error } = await supabase
    .from('connexions')
    .insert({ demandeur_id, receveur_id, statut: 'en_attente' })
    .select()
    .single()
  if (error) throw error
  return data
}

export async function accepterConnexion(connexion_id: string) {
  const { data, error } = await supabase
    .from('connexions')
    .update({ statut: 'acceptee' })
    .eq('id', connexion_id)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function getConnexions(utilisateur_id: string) {
  const { data, error } = await supabase
    .from('connexions')
    .select('*, demandeur:demandeur_id(*), receveur:receveur_id(*)')
    .or(`demandeur_id.eq.${utilisateur_id},receveur_id.eq.${utilisateur_id}`)
    .eq('statut', 'acceptee')
  if (error) throw error
  return data || []
}

export async function getStatutConnexion(demandeur_id: string, receveur_id: string) {
  const { data } = await supabase
    .from('connexions')
    .select('*')
    .or(`and(demandeur_id.eq.${demandeur_id},receveur_id.eq.${receveur_id}),and(demandeur_id.eq.${receveur_id},receveur_id.eq.${demandeur_id})`)
    .single()
  return data
}

// ─── NOTIFICATIONS ───
export async function getNotifications(utilisateur_id: string) {
  const { data, error } = await supabase
    .from('notifications')
    .select('*')
    .eq('utilisateur_id', utilisateur_id)
    .order('created_at', { ascending: false })
    .limit(20)
  if (error) throw error
  return data || []
}

export async function marquerNotificationLue(id: string) {
  const { error } = await supabase
    .from('notifications')
    .update({ lu: true })
    .eq('id', id)
  if (error) throw error
}

// ─── PROFIL COMPLET ───
export async function getProfilComplet(utilisateur_id: string) {
  const { data, error } = await supabase
    .from('profils_opportunity')
    .select('*')
    .eq('utilisateur_id', utilisateur_id)
    .single()
  if (error) return null
  return data
}

export async function updateProfil(utilisateur_id: string, data: any) {
  const { data: profil, error } = await supabase
    .from('profils_opportunity')
    .upsert({ ...data, utilisateur_id })
    .select()
    .single()
  if (error) throw error
  return profil
}

export async function uploadAvatar(utilisateur_id: string, fichier: File) {
  const extension = fichier.name.split('.').pop()
  const chemin = `avatars/${utilisateur_id}.${extension}`

  const { error: uploadError } = await supabase.storage
    .from('avatars')
    .upload(chemin, fichier, { upsert: true })
  if (uploadError) throw uploadError

  const { data } = supabase.storage.from('avatars').getPublicUrl(chemin)
  return data.publicUrl
}

// ─── PUBLICATIONS V2 ───
export async function uploadPublication(fichier: File, pubId: string) {
  const extension = fichier.name.split('.').pop()
  const chemin = `publications/${pubId}.${extension}`

  const { error } = await supabase.storage
    .from('publications')
    .upload(chemin, fichier, { upsert: true })
  if (error) throw error

  const { data } = supabase.storage.from('publications').getPublicUrl(chemin)
  return data.publicUrl
}

export async function incrementerVues(id: string) {
  await supabase.rpc('incrementer_vues', { pub_id: id })
}

export async function incrementerTelechargements(id: string) {
  await supabase.rpc('incrementer_telechargements', { pub_id: id })
}