'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Home() {
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedType, setSelectedType] = useState('all')

  const stats = [
    { label: 'Biens disponibles', value: '2,847' },
    { label: 'Utilisateurs actifs', value: '15,892' },
    { label: 'Transactions/mois', value: '523' },
    { label: 'Note moyenne', value: '4.9' }
  ]

  const featuredProperties = [
    {
      id: 1,
      title: 'Appartement T3 Moderne Cocody',
      location: 'Cocody, Abidjan',
      price: 250000,
      type: 'location',
      bedrooms: 3,
      area: 120
    },
    {
      id: 2,
      title: 'Villa de Luxe avec Piscine',
      location: 'Riviera, Abidjan',
      price: 85000000,
      type: 'vente',
      bedrooms: 5,
      area: 350
    }
  ]

  function handleSearch() {
    alert('Recherche: ' + searchQuery)
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', fontFamily: 'Arial, sans-serif' }}>
      {/* Navigation */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 50, backgroundColor: 'white', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px', display: 'flex', height: '64px', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', space: '8px' }}>
              <div style={{ height: '32px', width: '32px', borderRadius: '8px', background: 'linear-gradient(to right, #d97706, #f97316)' }}></div>
              <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#111827' }}>ImmoPro</span>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', space: '24px' }}>
            <button style={{ color: '#6b7280', fontSize: '14px' }}>Nos biens</button>
            <button style={{ color: '#6b7280', fontSize: '14px' }}>Services</button>
            <button style={{ color: '#6b7280', fontSize: '14px' }}>A propos</button>
            <button style={{ color: '#6b7280', fontSize: '14px' }}>Connexion</button>
            <button style={{ borderRadius: '6px', background: 'linear-gradient(to right, #d97706, #f97316)', padding: '6px 12px', fontSize: '14px', fontWeight: 'medium', color: 'white' }}>
              S'inscrire
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{ position: 'relative', minHeight: '400px', background: 'linear-gradient(to bottom right, #111827, #374151, #6b7280)', color: 'white', padding: '40px 20px' }}>
        <div style={{ position: 'relative', maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '16px' }}>
            Votre logement idéal
            <span style={{ display: 'block', background: 'linear-gradient(to right, #fcd34d, #fb923c)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              à Abidjan et en Côte d'Ivoire
            </span>
          </h1>
          <p style={{ fontSize: '18px', color: '#e5e7eb', marginBottom: '24px', maxWidth: '600px', margin: '0 auto 24px' }}>
            La plateforme immobilière leader pour trouver, louer ou vendre votre bien en toute sécurité
          </p>

          {/* Search Bar */}
          <div style={{ maxWidth: '600px', margin: '0 auto', borderRadius: '16px', backgroundColor: 'white', padding: '8px', boxShadow: '0 20px 25px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', padding: '10px 16px' }}>
                <span style={{ marginRight: '12px', color: '#9ca3af' }}>??</span>
                <input
                  type="text"
                  placeholder="Cocody, Plateau, Yopougon, Marcory..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ width: '100%', color: '#111827', border: 'none', outline: 'none' }}
                />
              </div>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                style={{ borderLeft: '1px solid #e5e7eb', padding: '10px 16px', color: '#111827', border: 'none', outline: 'none' }}
              >
                <option value="all">Tous types</option>
                <option value="location">Location</option>
                <option value="vente">Vente</option>
              </select>
              <button
                onClick={handleSearch}
                style={{ borderRadius: '8px', background: 'linear-gradient(to right, #d97706, #f97316)', padding: '10px 20px', fontSize: '14px', fontWeight: 'medium', color: 'white', border: 'none', cursor: 'pointer' }}
              >
                Rechercher
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section style={{ backgroundColor: 'white', padding: '32px 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
          {stats.map((stat, index) => (
            <div key={index} style={{ textAlign: 'center' }}>
              <div style={{ margin: '0 auto 12px', height: '56px', width: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '16px', backgroundColor: '#10b981' }}>
                <span style={{ fontSize: '24px', color: 'white' }}>??</span>
              </div>
              <div style={{ marginBottom: '4px', fontSize: '32px', fontWeight: 'bold', color: '#111827' }}>{stat.value}</div>
              <div style={{ fontSize: '14px', color: '#6b7280' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Properties Section */}
      <section style={{ backgroundColor: '#f9fafb', padding: '40px 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ marginBottom: '40px', textAlign: 'center' }}>
            <h2 style={{ marginBottom: '12px', fontSize: '36px', fontWeight: 'bold', color: '#111827' }}>Biens en vedette</h2>
            <p style={{ fontSize: '18px', color: '#6b7280', maxWidth: '600px', margin: '0 auto' }}>
              Découvrez notre sélection des meilleures offres immobilières à Abidjan et en Côte d'Ivoire
            </p>
          </div>

          <div style={{ display: 'grid', gap: '24px', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
            {featuredProperties.map((property) => (
              <div key={property.id} style={{ borderRadius: '16px', backgroundColor: 'white', boxShadow: '0 10px 15px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
                <div style={{ position: 'relative' }}>
                  <div style={{ height: '192px', background: 'linear-gradient(to bottom right, #e5e7eb, #d1d5db)' }}></div>
                  <div style={{ position: 'absolute', right: '16px', top: '16px', borderRadius: '20px', backgroundColor: 'white', padding: '6px 12px', fontSize: '14px', fontWeight: 'medium', color: '#111827' }}>
                    {property.type === 'location' ? 'Location' : 'Vente'}
                  </div>
                </div>

                <div style={{ padding: '20px' }}>
                  <h3 style={{ marginBottom: '8px', fontSize: '20px', fontWeight: 'bold', color: '#111827' }}>{property.title}</h3>
                  <div style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', fontSize: '14px', color: '#6b7280' }}>
                    <span style={{ marginRight: '4px' }}>??</span>
                    {property.location}
                  </div>

                  <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
                    <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#059669' }}>
                      {property.type === 'location'
                        ? `${property.price.toLocaleString('fr-FR')} FCFA/mois`
                        : `${property.price.toLocaleString('fr-FR')} FCFA`}
                    </div>
                    <div style={{ fontSize: '12px', color: '#6b7280' }}>
                      {property.bedrooms} chambres ? {property.area}m²
                    </div>
                  </div>

                  <button
                    onClick={() => alert('Voir details de: ' + property.title)}
                    style={{ width: '100%', borderRadius: '8px', background: 'linear-gradient(to right, #d97706, #f97316)', padding: '8px', color: 'white', border: 'none', cursor: 'pointer' }}
                  >
                    Voir les details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: '#111827', padding: '32px 20px', color: 'white' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', space: '8px' }}>
            <div style={{ height: '32px', width: '32px', borderRadius: '8px', background: 'linear-gradient(to right, #d97706, #f97316)' }}></div>
            <span style={{ fontSize: '20px', fontWeight: 'bold' }}>ImmoPro</span>
          </div>
          <p style={{ color: '#9ca3af' }}>Votre plateforme immobilière innovante</p>
          <div style={{ marginTop: '24px', borderTop: '1px solid #374151', paddingTop: '24px', textAlign: 'center', color: '#9ca3af' }}>
            <p>&copy; 2024 ImmoPro. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
