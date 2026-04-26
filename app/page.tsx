'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { featuredProperties } from '../lib/featured-properties'

export default function Home() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedType, setSelectedType] = useState('all')
  const navLinkStyle = {
    color: '#fff7ef',
    fontSize: '14px',
    cursor: 'pointer',
    padding: '10px 14px',
    borderRadius: '10px',
    fontWeight: 'bold',
    transition: 'all 0.3s',
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center'
  } as const

  const stats = [
    { label: 'Biens disponibles', value: '2,847' },
    { label: 'Utilisateurs actifs', value: '15,892' },
    { label: 'Transactions/mois', value: '523' },
    { label: 'Note moyenne', value: '4.9' }
  ]
  const marketSignals = [
    'Biens rares',
    'Adresses recherchées',
    'Accompagnement discret'
  ]
  const trustPoints = [
    { label: 'Biens sélectionnés', value: '126' },
    { label: 'Mandats premium', value: '58' },
    { label: 'Conseillers dédiés', value: '12' }
  ]

  function handleSearch() {
    const params = new URLSearchParams()

    if (searchQuery.trim()) {
      params.set('q', searchQuery.trim())
    }

    if (selectedType !== 'all') {
      params.set('type', selectedType)
    }

    router.push(`/search${params.toString() ? `?${params.toString()}` : ''}`)
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#101712', fontFamily: 'Arial, sans-serif' }}>
      <nav style={{ position: 'sticky', top: 0, zIndex: 50, backgroundColor: 'rgba(16,23,18,0.94)', boxShadow: '0 1px 20px rgba(159,47,53,0.14)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(159,47,53,0.18)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 20px', display: 'flex', minHeight: '86px', alignItems: 'center', justifyContent: 'space-between', gap: '24px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ height: '40px', width: '40px', borderRadius: '12px', background: 'linear-gradient(135deg, #9f2f35, #2f6b3b)', boxShadow: '0 10px 25px rgba(47,107,59,0.22)' }}></div>
              <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#f5ede3' }}>ImmoPro</span>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
            <Link
              href="/listings"
              style={navLinkStyle}
              onMouseOver={(e) => { e.currentTarget.style.color = '#b8d8b4'; e.currentTarget.style.backgroundColor = 'rgba(47,107,59,0.16)' }}
              onMouseOut={(e) => { e.currentTarget.style.color = '#fff7ef'; e.currentTarget.style.backgroundColor = 'transparent' }}
            >
              Nos biens
            </Link>
            <Link
              href="/users"
              style={navLinkStyle}
              onMouseOver={(e) => { e.currentTarget.style.color = '#b8d8b4'; e.currentTarget.style.backgroundColor = 'rgba(47,107,59,0.16)' }}
              onMouseOut={(e) => { e.currentTarget.style.color = '#fff7ef'; e.currentTarget.style.backgroundColor = 'transparent' }}
            >
              Gérer utilisateurs
            </Link>
            <Link
              href="/contracts"
              style={navLinkStyle}
              onMouseOver={(e) => { e.currentTarget.style.color = '#b8d8b4'; e.currentTarget.style.backgroundColor = 'rgba(47,107,59,0.16)' }}
              onMouseOut={(e) => { e.currentTarget.style.color = '#fff7ef'; e.currentTarget.style.backgroundColor = 'transparent' }}
            >
              Gérer contrats
            </Link>
            <Link
              href="/finance"
              style={navLinkStyle}
              onMouseOver={(e) => { e.currentTarget.style.color = '#b8d8b4'; e.currentTarget.style.backgroundColor = 'rgba(47,107,59,0.16)' }}
              onMouseOut={(e) => { e.currentTarget.style.color = '#fff7ef'; e.currentTarget.style.backgroundColor = 'transparent' }}
            >
              Suivi financier
            </Link>
            <Link
              href="/login"
              style={{ ...navLinkStyle, border: '1px solid rgba(184,216,180,0.32)', padding: '9px 14px' }}
              onMouseOver={(e) => { e.currentTarget.style.borderColor = '#b8d8b4'; e.currentTarget.style.backgroundColor = 'rgba(47,107,59,0.16)' }}
              onMouseOut={(e) => { e.currentTarget.style.borderColor = 'rgba(184,216,180,0.32)'; e.currentTarget.style.backgroundColor = 'transparent' }}
            >
              Connexion
            </Link>
            <Link
              href="/register"
              style={{ borderRadius: '12px', background: 'linear-gradient(135deg, #9f2f35, #c94c52)', padding: '11px 16px', fontSize: '14px', fontWeight: 'bold', color: '#fff8f7', border: 'none', cursor: 'pointer', boxShadow: '0 8px 25px rgba(159,47,53,0.2)', transition: 'all 0.3s', textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}
              onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 35px rgba(159,47,53,0.28)' }}
              onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 25px rgba(159,47,53,0.2)' }}
            >
              S'inscrire
            </Link>
          </div>
        </div>
      </nav>

      <section style={{ position: 'relative', background: 'linear-gradient(135deg, #132018 0%, #1d3324 48%, #27472f 100%)', color: 'white', padding: '32px 20px 88px', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(10,16,12,0.2), rgba(10,16,12,0.04))' }}></div>
          <div style={{ position: 'absolute', top: '6%', left: '4%', width: '340px', height: '340px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(159,47,53,0.24), transparent 72%)' }}></div>
          <div style={{ position: 'absolute', bottom: '-8%', right: '6%', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(184,216,180,0.12), transparent 72%)' }}></div>
        </div>

        <div style={{ position: 'relative', maxWidth: '1220px', margin: '0 auto' }}>
          <div style={{ borderRadius: '40px', border: '1px solid rgba(184,216,180,0.14)', background: 'linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03))', boxShadow: '0 30px 80px rgba(7,12,9,0.26)', backdropFilter: 'blur(18px)', padding: '30px' }}>
            <div style={{ display: 'grid', gap: '34px', alignItems: 'stretch', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', backgroundColor: 'rgba(255,248,241,0.08)', padding: '10px 18px', borderRadius: '999px', marginBottom: '28px', border: '1px solid rgba(184,216,180,0.14)', backdropFilter: 'blur(10px)' }}>
                    <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#d47445', boxShadow: '0 0 0 6px rgba(212,116,69,0.1)' }}></span>
                    <span style={{ fontSize: '12px', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: '700', color: '#f0d6a8' }}>
                Collection privée Abidjan
                    </span>
                  </div>

                  <h1 style={{ margin: 0, maxWidth: '760px', fontSize: 'clamp(32px, 5vw, 52px)', lineHeight: '1.04', fontWeight: '800', letterSpacing: '-0.03em', color: '#f7efe1' }}>
                    Trouvez une adresse
                    <span style={{ display: 'block', color: '#f0d6a8' }}>
                      à la hauteur
                    </span>
                    <span style={{ display: 'block', color: '#d9e7d6' }}>
                      de votre ambition.
                    </span>
                  </h1>

                  <p style={{ margin: '20px 0 0', maxWidth: '620px', fontSize: '15px', lineHeight: '1.75', color: '#d9e7d6' }}>
                    Nous sélectionnons à Abidjan des villas, appartements et actifs immobiliers
                    conçus pour les clients qui recherchent une acquisition solide, élégante et
                    durable.
                  </p>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '26px' }}>
                    {marketSignals.map((item) => (
                      <span
                        key={item}
                        style={{ borderRadius: '999px', border: '1px solid rgba(184,216,180,0.14)', backgroundColor: 'rgba(255,249,241,0.08)', padding: '9px 13px', fontSize: '12px', fontWeight: '600', color: '#f7efe1' }}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    handleSearch()
                  }}
                  style={{ marginTop: '34px', maxWidth: '860px', borderRadius: '30px', backgroundColor: 'rgba(250,252,248,0.96)', padding: '14px', boxShadow: '0 24px 60px rgba(16,23,18,0.24)', border: '1px solid rgba(184,216,180,0.12)' }}
                >
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
                    <div style={{ flex: '1 1 320px', display: 'flex', alignItems: 'center', padding: '16px 18px' }}>
                      <span style={{ marginRight: '12px', color: '#8a5a35', fontSize: '18px' }}>⌕</span>
                      <input
                        type="text"
                        placeholder="Cocody, Plateau, Riviera, Marcory..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{ width: '100%', color: '#1b130d', border: 'none', outline: 'none', fontSize: '15px', backgroundColor: 'transparent' }}
                      />
                    </div>
                    <select
                      value={selectedType}
                      onChange={(e) => setSelectedType(e.target.value)}
                      style={{ borderLeft: '1px solid rgba(47,107,59,0.14)', padding: '16px 18px', color: '#1f261d', borderTop: 'none', borderRight: 'none', borderBottom: 'none', outline: 'none', minWidth: '180px', fontSize: '15px', backgroundColor: 'transparent' }}
                    >
                      <option value="all">Tous types</option>
                      <option value="location">Location</option>
                      <option value="vente">Vente</option>
                    </select>
                    <button
                      type="submit"
                      style={{ borderRadius: '18px', background: 'linear-gradient(135deg, #8a4a2c, #17352b)', padding: '16px 28px', fontSize: '15px', fontWeight: '700', color: '#fffdf9', border: 'none', cursor: 'pointer', boxShadow: '0 10px 28px rgba(31,58,48,0.18)', transition: 'all 0.3s' }}
                      onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 14px 34px rgba(31,58,48,0.26)' }}
                      onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 10px 28px rgba(31,58,48,0.18)' }}
                    >
                      Lancer la recherche
                    </button>
                  </div>
                </form>
              </div>

              <div style={{ display: 'grid', gap: '18px', alignSelf: 'stretch' }}>
                <div style={{ borderRadius: '36px', padding: '28px', background: 'linear-gradient(180deg, rgba(255,248,238,0.1), rgba(255,248,238,0.04))', border: '1px solid rgba(184,216,180,0.14)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '14px' }}>
                    <div>
                      <div style={{ fontSize: '12px', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#f0d6a8', fontWeight: '700' }}>
                        Bien du moment
                      </div>
                      <div style={{ marginTop: '8px', fontSize: '28px', fontWeight: '800', color: '#fff8ef' }}>
                        Cocody Danga
                      </div>
                    </div>
                    <div style={{ borderRadius: '999px', backgroundColor: 'rgba(212,116,69,0.16)', color: '#ffd9c6', padding: '9px 12px', fontSize: '12px', fontWeight: '700' }}>
                      Disponible cette semaine
                    </div>
                  </div>

                  <div style={{ marginTop: '22px', borderRadius: '28px', minHeight: '300px', background: 'linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))', padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative', overflow: 'hidden', border: '1px solid rgba(184,216,180,0.12)' }}>
                    <div style={{ position: 'absolute', right: '-24px', top: '-20px', width: '140px', height: '140px', borderRadius: '32px', border: '1px solid rgba(240,214,168,0.16)', transform: 'rotate(16deg)' }}></div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', alignItems: 'flex-start' }}>
                      <div style={{ maxWidth: '240px' }}>
                          <div style={{ fontSize: '12px', color: '#dce8df', lineHeight: '1.7' }}>
                          Appartement lumineux, finitions sobres, emplacement central et accès rapide
                          aux meilleures écoles et aux grands axes.
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '12px', color: '#c8d7ce', textTransform: 'uppercase', letterSpacing: '0.12em' }}>À partir de</div>
                        <div style={{ marginTop: '6px', fontSize: '26px', fontWeight: '900', color: '#fff7ec' }}>145 M FCFA</div>
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '12px' }}>
                      {trustPoints.map((point) => (
                        <div key={point.label} style={{ borderRadius: '18px', backgroundColor: 'rgba(255,252,247,0.08)', border: '1px solid rgba(255,244,231,0.1)', padding: '14px 12px' }}>
                          <div style={{ fontSize: '18px', fontWeight: '900', color: '#fff7ec' }}>{point.value}</div>
                          <div style={{ marginTop: '6px', fontSize: '11px', lineHeight: '1.5', color: '#d6e4db' }}>{point.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '14px' }}>
                  <div style={{ borderRadius: '24px', backgroundColor: 'rgba(255,249,241,0.08)', border: '1px solid rgba(184,216,180,0.12)', padding: '18px 20px' }}>
                    <div style={{ fontSize: '12px', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#f0d6a8', fontWeight: '700' }}>Acquisition</div>
                    <div style={{ marginTop: '10px', fontSize: '14px', lineHeight: '1.7', color: '#edf4ef' }}>
                      Recherche ciblée et visites réellement qualifiées.
                    </div>
                  </div>
                  <div style={{ borderRadius: '24px', backgroundColor: 'rgba(255,249,241,0.08)', border: '1px solid rgba(184,216,180,0.12)', padding: '18px 20px' }}>
                    <div style={{ fontSize: '12px', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#f0d6a8', fontWeight: '700' }}>Conseil</div>
                    <div style={{ marginTop: '10px', fontSize: '14px', lineHeight: '1.7', color: '#edf4ef' }}>
                      Une approche plus sobre, plus précise et mieux cadrée.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ backgroundColor: '#14211a', padding: '24px 20px 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
          {stats.map((stat, index) => (
            <div key={index} style={{ textAlign: 'center', backgroundColor: 'rgba(47,107,59,0.12)', borderRadius: '20px', padding: '24px 20px', boxShadow: '0 8px 25px rgba(47,107,59,0.14)', border: '1px solid rgba(184,216,180,0.16)', transition: 'transform 0.3s, box-shadow 0.3s' }}
              onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 15px 40px rgba(159,47,53,0.16)' }}
              onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 25px rgba(47,107,59,0.14)' }}>
              <div style={{ margin: '0 auto 16px', height: '56px', width: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '18px', background: 'linear-gradient(135deg, #9f2f35, #2f6b3b)', boxShadow: '0 8px 20px rgba(47,107,59,0.24)' }}>
                <span style={{ fontSize: '24px', color: '#fffdf9' }}>📊</span>
              </div>
              <div style={{ marginBottom: '6px', fontSize: '28px', fontWeight: '900', color: '#eef7eb', textShadow: '0 2px 15px rgba(47,107,59,0.16)' }}>{stat.value}</div>
              <div style={{ fontSize: '14px', color: '#b8d8b4', fontWeight: '600', letterSpacing: '0.5px' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ backgroundColor: '#14211a', padding: '48px 20px 36px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ marginBottom: '36px', textAlign: 'center' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(159,47,53,0.14)', padding: '8px 20px', borderRadius: '100px', marginBottom: '24px', border: '1px solid rgba(184,216,180,0.16)' }}>
              <span style={{ fontSize: '16px' }}>⚡</span>
              <span style={{ fontSize: '14px', fontWeight: '600', color: '#f2fffc' }}>Services Premium</span>
            </div>
            <h2 style={{ marginBottom: '12px', fontSize: '42px', fontWeight: '900', color: '#eef7eb', letterSpacing: '-0.02em', textShadow: '0 2px 20px rgba(47,107,59,0.16)' }}>Services de Gestion</h2>
            <p style={{ fontSize: '18px', color: '#cfe6ca', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
              Gérez toute votre activité immobilière avec élégance et précision
            </p>
          </div>

          <div style={{ display: 'grid', gap: '20px', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', alignItems: 'stretch', position: 'relative', zIndex: 2 }}>
            <Link
              href="/listings"
              style={{ borderRadius: '24px', background: 'linear-gradient(180deg, rgba(47,107,59,0.18), rgba(20,33,26,0.96))', padding: '24px', cursor: 'pointer', border: '1px solid rgba(184,216,180,0.16)', transition: 'transform 0.3s, box-shadow 0.3s', minHeight: '100%', display: 'flex', flexDirection: 'column', boxShadow: '0 8px 25px rgba(47,107,59,0.14)', textDecoration: 'none', position: 'relative', zIndex: 3, pointerEvents: 'auto' }}
              onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 15px 40px rgba(159,47,53,0.18)' }}
              onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 25px rgba(47,107,59,0.14)' }}
            >
              <div style={{ height: '48px', width: '48px', borderRadius: '16px', background: 'linear-gradient(135deg, #9f2f35, #2f6b3b)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', boxShadow: '0 8px 20px rgba(47,107,59,0.24)' }}>
                <span style={{ fontSize: '20px', color: '#fffdf9' }}>📚</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', marginBottom: '12px' }}>
                <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 'bold', color: '#f2fffc' }}>Gérer le Référentiel</h3>
                <span style={{ borderRadius: '12px', backgroundColor: 'rgba(159,47,53,0.16)', padding: '4px 10px', fontSize: '11px', fontWeight: 'bold', color: '#f7d9db' }}>
                  15 éléments
                </span>
              </div>
              <p style={{ marginBottom: '16px', fontSize: '14px', color: '#cfe6ca', lineHeight: '1.6' }}>
                Consultez les données immobilières organisées par types de biens et quartiers.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: 'auto' }}>
                <span style={{ borderRadius: '10px', backgroundColor: 'rgba(47,107,59,0.16)', padding: '6px 10px', border: '1px solid rgba(184,216,180,0.16)', fontSize: '11px', fontWeight: '600', color: '#d4ecd0' }}>
                  7 types
                </span>
                <span style={{ borderRadius: '10px', backgroundColor: 'rgba(47,107,59,0.16)', padding: '6px 10px', border: '1px solid rgba(184,216,180,0.16)', fontSize: '11px', fontWeight: '600', color: '#d4ecd0' }}>
                  8 quartiers
                </span>
                <span style={{ borderRadius: '10px', backgroundColor: 'rgba(47,107,59,0.16)', padding: '6px 10px', border: '1px solid rgba(184,216,180,0.16)', fontSize: '11px', fontWeight: '600', color: '#d4ecd0' }}>
                  prix moyens
                </span>
              </div>
            </Link>

            <Link
              href="/users"
              style={{ borderRadius: '24px', background: 'linear-gradient(180deg, rgba(47,107,59,0.16), rgba(16,23,18,0.94))', padding: '24px', cursor: 'pointer', border: '1px solid rgba(184,216,180,0.16)', transition: 'transform 0.3s, box-shadow 0.3s', minHeight: '100%', boxShadow: '0 8px 25px rgba(47,107,59,0.14)', display: 'flex', flexDirection: 'column', textDecoration: 'none', position: 'relative', zIndex: 3, pointerEvents: 'auto' }}
              onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 15px 40px rgba(159,47,53,0.18)' }}
              onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 25px rgba(47,107,59,0.14)' }}
            >
              <div style={{ height: '48px', width: '48px', borderRadius: '16px', background: 'linear-gradient(135deg, #9f2f35, #2f6b3b)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', boxShadow: '0 8px 20px rgba(47,107,59,0.24)' }}>
                <span style={{ fontSize: '20px', color: '#fffdf9' }}>👥</span>
              </div>
              <h3 style={{ marginBottom: '12px', fontSize: '18px', fontWeight: 'bold', color: '#eef7eb' }}>Gérer les Utilisateurs</h3>
              <p style={{ fontSize: '14px', color: '#cfe6ca', lineHeight: '1.6' }}>
                Administration des comptes utilisateurs, rôles et permissions avec authentification sécurisée.
              </p>
              <div style={{ marginTop: 'auto', paddingTop: '16px', fontSize: '12px', fontWeight: 'bold', color: '#d4ecd0' }}>
                Comptes • rôles • sécurité
              </div>
            </Link>

            <Link
              href="/contracts"
              style={{ borderRadius: '24px', background: 'linear-gradient(180deg, rgba(193,154,107,0.1), rgba(11,22,32,0.94))', padding: '24px', cursor: 'pointer', border: '1px solid rgba(193,154,107,0.24)', transition: 'transform 0.3s, box-shadow 0.3s', minHeight: '100%', boxShadow: '0 8px 25px rgba(193,154,107,0.14)', display: 'flex', flexDirection: 'column', textDecoration: 'none', position: 'relative', zIndex: 3, pointerEvents: 'auto' }}
              onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 15px 40px rgba(193,154,107,0.2)' }}
              onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 25px rgba(193,154,107,0.14)' }}
            >
              <div style={{ height: '48px', width: '48px', borderRadius: '16px', background: 'linear-gradient(135deg, #9f2f35, #2f6b3b)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', boxShadow: '0 8px 20px rgba(47,107,59,0.24)' }}>
                <span style={{ fontSize: '20px', color: '#fffdf9' }}>📄</span>
              </div>
              <h3 style={{ marginBottom: '12px', fontSize: '18px', fontWeight: 'bold', color: '#eef7eb' }}>Gérer les Contrats</h3>
              <p style={{ fontSize: '14px', color: '#cfe6ca', lineHeight: '1.6' }}>
                Contrats de location et de vente avec génération PDF et suivi des échéances.
              </p>
              <div style={{ marginTop: 'auto', paddingTop: '16px', fontSize: '12px', fontWeight: 'bold', color: '#d4ecd0' }}>
                location • vente • échéances
              </div>
            </Link>

            <Link
              href="/finance"
              style={{ borderRadius: '24px', background: 'linear-gradient(180deg, rgba(193,154,107,0.1), rgba(11,22,32,0.94))', padding: '24px', cursor: 'pointer', border: '1px solid rgba(193,154,107,0.24)', transition: 'transform 0.3s, box-shadow 0.3s', minHeight: '100%', boxShadow: '0 8px 25px rgba(193,154,107,0.14)', display: 'flex', flexDirection: 'column', textDecoration: 'none', position: 'relative', zIndex: 3, pointerEvents: 'auto' }}
              onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 15px 40px rgba(193,154,107,0.2)' }}
              onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 25px rgba(193,154,107,0.14)' }}
            >
              <div style={{ height: '48px', width: '48px', borderRadius: '16px', background: 'linear-gradient(135deg, #9f2f35, #2f6b3b)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', boxShadow: '0 8px 20px rgba(47,107,59,0.24)' }}>
                <span style={{ fontSize: '20px', color: '#fffdf9' }}>💰</span>
              </div>
              <h3 style={{ marginBottom: '12px', fontSize: '18px', fontWeight: 'bold', color: '#eef7eb' }}>Suivi Financier</h3>
              <p style={{ fontSize: '14px', color: '#cfe6ca', lineHeight: '1.6' }}>
                Suivi des loyers, charges et reporting complet.
              </p>
              <div style={{ marginTop: 'auto', paddingTop: '16px', fontSize: '12px', fontWeight: 'bold', color: '#d4ecd0' }}>
                loyers • charges • reporting
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section style={{ backgroundColor: '#14211a', padding: '32px 20px 40px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ marginBottom: '32px', textAlign: 'center' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(159,47,53,0.14)', padding: '8px 20px', borderRadius: '100px', marginBottom: '24px', border: '1px solid rgba(184,216,180,0.16)' }}>
              <span style={{ fontSize: '16px' }}>🏠</span>
              <span style={{ fontSize: '14px', fontWeight: '600', color: '#f2fffc' }}>Exclusivités</span>
            </div>
            <h2 style={{ marginBottom: '8px', fontSize: '38px', fontWeight: '900', color: '#eef7eb', letterSpacing: '-0.02em', textShadow: '0 2px 20px rgba(47,107,59,0.16)' }}>Biens en vedette</h2>
            <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#cfe6ca', maxWidth: '600px', margin: '0 auto' }}>
              Découvrez notre sélection exclusive des biens d'exception à Abidjan et en Côte d'Ivoire
            </p>
          </div>

          <div style={{ display: 'grid', gap: '20px', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
            {featuredProperties.map((property) => (
              <div key={property.id} style={{ borderRadius: '20px', backgroundColor: 'rgba(47,107,59,0.12)', boxShadow: '0 8px 25px rgba(47,107,59,0.14)', overflow: 'hidden', border: '1px solid rgba(184,216,180,0.16)', transition: 'transform 0.3s, box-shadow 0.3s' }}
                onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 15px 40px rgba(159,47,53,0.16)' }}
                onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 25px rgba(47,107,59,0.14)' }}>
                <div style={{ position: 'relative' }}>
                  <div style={{ height: '200px', background: 'linear-gradient(135deg, rgba(47,107,59,0.16), rgba(16,23,18,0.88))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ textAlign: 'center', color: '#eef7eb' }}>
                      <div style={{ fontSize: '42px', marginBottom: '10px' }}>🏠</div>
                      <div style={{ fontSize: '16px', fontWeight: 'bold' }}>{property.title}</div>
                    </div>
                  </div>
                  <div style={{ position: 'absolute', right: '16px', top: '16px', borderRadius: '12px', backgroundColor: 'rgba(159,47,53,0.92)', padding: '8px 12px', fontSize: '12px', fontWeight: 'bold', color: '#fff8f7', boxShadow: '0 4px 15px rgba(159,47,53,0.22)' }}>
                    {property.type === 'location' ? 'Location' : 'Vente'}
                  </div>
                </div>

                <div style={{ padding: '20px' }}>
                  <h3 style={{ marginBottom: '8px', fontSize: '18px', fontWeight: 'bold', color: '#eef7eb' }}>{property.title}</h3>
                  <div style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', fontSize: '13px', color: '#cfe6ca' }}>
                    <span style={{ marginRight: '6px' }}>📍</span>
                    {property.location}
                  </div>

                  <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
                    <div style={{ fontSize: '20px', fontWeight: '900', color: '#eef7eb', textShadow: '0 2px 10px rgba(47,107,59,0.16)' }}>
                      {property.type === 'location'
                        ? `${property.price.toLocaleString('fr-FR')} FCFA/mois`
                        : `${property.price.toLocaleString('fr-FR')} FCFA`}
                    </div>
                    <div style={{ fontSize: '12px', color: '#cfe6ca', fontWeight: '600' }}>
                      {property.bedrooms} chambres • {property.area}m²
                    </div>
                  </div>

                  <Link
                    href={`/listings/${property.id}`}
                    style={{ width: '100%', borderRadius: '12px', background: 'linear-gradient(135deg, #9f2f35, #2f6b3b)', padding: '12px', color: '#fffdf9', border: 'none', cursor: 'pointer', fontWeight: 'bold', fontSize: '14px', boxShadow: '0 6px 20px rgba(47,107,59,0.24)', transition: 'all 0.3s', display: 'block', textAlign: 'center', textDecoration: 'none' }}
                    onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(47,107,59,0.34)' }}
                    onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(47,107,59,0.24)' }}
                  >
                    Voir les détails
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ backgroundColor: '#14211a', padding: '24px 20px 32px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ borderRadius: '24px', background: 'linear-gradient(135deg, rgba(47,107,59,0.18), rgba(20,33,26,0.96))', padding: '28px 32px', color: 'white', boxShadow: '0 15px 40px rgba(47,107,59,0.16)', border: '1px solid rgba(184,216,180,0.16)' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '24px' }}>
              <div style={{ flex: '1 1 400px', maxWidth: '600px' }}>
                <div style={{ marginBottom: '8px', fontSize: '12px', fontWeight: 'bold', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#d4ecd0' }}>
                  Contact Premium
                </div>
                <h2 style={{ margin: '0 0 8px', fontSize: '26px', lineHeight: '1.3', fontWeight: '900', color: '#eef7eb', textShadow: '0 2px 15px rgba(47,107,59,0.16)' }}>
                  Besoin d'aide pour votre projet immobilier ?
                </h2>
                <p style={{ margin: 0, fontSize: '15px', lineHeight: '1.6', color: '#cfe6ca', maxWidth: '500px' }}>
                  Notre équipe d'experts est disponible pour vous accompagner dans vos projets immobiliers d'exception.
                </p>
              </div>

              <div style={{ minWidth: '280px', borderRadius: '20px', backgroundColor: 'rgba(159,47,53,0.12)', padding: '20px', border: '1px solid rgba(184,216,180,0.16)', boxShadow: 'inset 0 2px 10px rgba(159,47,53,0.08)' }}>
                <div style={{ marginBottom: '8px', fontSize: '13px', color: '#f7d9db', fontWeight: '600' }}>
                  Téléphone Direct
                </div>
                <div style={{ marginBottom: '16px', fontSize: '24px', fontWeight: '900', color: '#fff8f7', textShadow: '0 2px 10px rgba(159,47,53,0.16)' }}>
                  01 02 85 61 23
                </div>
                <a
                  href="tel:0102856123"
                  style={{ display: 'inline-block', borderRadius: '14px', background: 'linear-gradient(135deg, #9f2f35, #2f6b3b)', padding: '12px 20px', color: '#fffdf9', fontWeight: 'bold', textDecoration: 'none', boxShadow: '0 8px 25px rgba(47,107,59,0.24)', fontSize: '14px', transition: 'all 0.3s' }}
                  onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 35px rgba(47,107,59,0.34)' }}
                  onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 25px rgba(47,107,59,0.24)' }}
                >
                  Appeler maintenant
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer style={{ backgroundColor: '#101712', padding: '24px 20px 28px', color: 'white', borderTop: '1px solid rgba(184,216,180,0.14)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
            <div style={{ height: '32px', width: '32px', borderRadius: '10px', background: 'linear-gradient(135deg, #9f2f35, #2f6b3b)', boxShadow: '0 6px 20px rgba(47,107,59,0.24)' }}></div>
            <span style={{ fontSize: '20px', fontWeight: '900', color: '#eef7eb', textShadow: '0 2px 10px rgba(47,107,59,0.16)' }}>ImmoPro</span>
          </div>
          <p style={{ color: '#cfe6ca', fontSize: '14px', marginBottom: '20px', fontWeight: '500' }}>L'excellence immobilière au service de vos ambitions</p>
          <div style={{ borderTop: '1px solid rgba(184,216,180,0.12)', paddingTop: '20px', textAlign: 'center', color: '#d4ecd0' }}>
            <p style={{ fontSize: '13px', fontWeight: '500' }}>&copy; 2024 ImmoPro. Tous droits réservés. | Service Premium</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
