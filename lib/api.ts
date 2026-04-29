const API_URL = "http://localhost:8000"

export async function getCoursListe() {
  const res = await fetch(`${API_URL}/cours`)
  return res.json()
}

export async function genererCours(sujet: string, niveau: string) {
  const res = await fetch(`${API_URL}/generer-cours`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sujet, niveau })
  })
  return res.json()
}

export async function recommanderParcours(profil: any) {
  const res = await fetch(`${API_URL}/recommander`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(profil)
  })
  return res.json()
}