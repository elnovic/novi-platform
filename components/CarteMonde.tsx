'use client'

import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const scoreColor = (score: number) => {
  if (score >= 90) return '#22c55e'
  if (score >= 75) return '#3b82f6'
  if (score >= 60) return '#f59e0b'
  return '#ef4444'
}

export default function CarteMonde({ paysData, paysFiltres, paysSelectionne, onPaysClick }: any) {
  const mapRef = useRef<L.Map | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const markersRef = useRef<L.CircleMarker[]>([])

  useEffect(() => {
    if (!containerRef.current) return
    if (mapRef.current) return // Évite la réinitialisation

    const map = L.map(containerRef.current, {
      center: [20, 10],
      zoom: 2,
      scrollWheelZoom: true
    })

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map)

    mapRef.current = map

    return () => {
      map.remove()
      mapRef.current = null
    }
  }, [])

  // Mettre à jour les marqueurs quand les données changent
  useEffect(() => {
    if (!mapRef.current) return

    // Supprimer les anciens marqueurs
    markersRef.current.forEach(m => m.remove())
    markersRef.current = []

    // Ajouter les nouveaux marqueurs
    paysFiltres.forEach((nom: string) => {
      const p = paysData[nom]
      if (!p) return

      const estSelectionne = paysSelectionne === nom

      const marker = L.circleMarker([p.lat, p.lng], {
        radius: estSelectionne ? 16 : 10,
        fillColor: scoreColor(p.score),
        fillOpacity: 0.85,
        color: estSelectionne ? '#1d4ed8' : 'white',
        weight: estSelectionne ? 3 : 1.5
      }).addTo(mapRef.current!)

      marker.bindPopup(`
        <div style="text-align:center;padding:4px">
          <p style="font-size:20px">${p.drapeau}</p>
          <p style="font-weight:bold;font-size:13px">${nom}</p>
          <p style="font-size:11px;color:#6b7280">Score : ${p.score}/100</p>
          <p style="font-size:11px;color:#3b82f6">${p.tendances[0]}</p>
        </div>
      `)

      marker.on('click', () => onPaysClick(nom))
      markersRef.current.push(marker)
    })
  }, [paysFiltres, paysSelectionne, paysData, onPaysClick])

  // Centrer sur le pays sélectionné
  useEffect(() => {
    if (!mapRef.current || !paysSelectionne) return
    const p = paysData[paysSelectionne]
    if (p) {
      mapRef.current.flyTo([p.lat, p.lng], 5, { duration: 1.5 })
    }
  }, [paysSelectionne])

  return (
    <div
      ref={containerRef}
      style={{ height: '100%', width: '100%' }}
    />
  )
}