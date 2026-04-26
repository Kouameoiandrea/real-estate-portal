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
    { label: 'Biens disponibles', value: '1,247', color: 'bg-green-500' },
    { label: 'Utilisateurs actifs', value: '8,392', color: 'bg-emerald-500' },
    { label: 'Transactions/mois', value: '342', color: 'bg-teal-500' },
    { label: 'Note moyenne', value: '4.8', color: 'bg-lime-500' }
  ]

  const featuredProperties = [
    {
      id: 1,
      title: 'Appartement T3 Centre-Ville',
      location: 'Paris 75015',
      price: 150000,
      type: 'location',
      image: '/api/placeholder/400/300',
      bedrooms: 3,
      area: 75,
      featured: true
    },
    {
      id: 2,
      title: 'Villa avec Piscine',
      location: 'Nice 06200',
      price: 85000000,
      type: 'vente',
      image: '/api/placeholder/400/300',
      bedrooms: 5,
      area: 180,
      featured: true
    },
    {
      id: 3,
      title: 'Studio Meublé',
      location: 'Lyon 69001',
      price: 65000,
      type: 'location',
      image: '/api/placeholder/400/300',
      bedrooms: 1,
      area: 28,
      featured: true
    }
  ]

  const normalizedSearch = searchQuery.trim().toLowerCase()
  const filteredProperties = featuredProperties.filter((property) => {
    const matchesType = selectedType === 'all' || property.type === selectedType
    const matchesSearch =
      normalizedSearch.length === 0 ||
      property.title.toLowerCase().includes(normalizedSearch) ||
      property.location.toLowerCase().includes(normalizedSearch)

    return matchesType && matchesSearch
  })

  function handleSearch() {
    const params = new URLSearchParams()

    if (searchQuery.trim()) {
      params.set('q', searchQuery.trim())
    }

    if (selectedType !== 'all') {
      params.set('type', selectedType)
    }

    router.push(`/listings${params.toString() ? `?${params.toString()}` : ''}`)
  }

  function openListings(options?: { type?: string; featured?: boolean; propertyId?: number }) {
    const params = new URLSearchParams()

    if (options?.type && options.type !== 'all') {
      params.set('type', options.type)
    }

    if (options?.featured) {
      params.set('featured', 'true')
    }

    if (options?.propertyId) {
      params.set('property', String(options.propertyId))
    }

    router.push(`/listings${params.toString() ? `?${params.toString()}` : ''}`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="sticky top-0 z-50 bg-white shadow-lg">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between">
            <div className="flex items-center">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-amber-600 to-orange-500"></div>
                <span className="text-lg font-bold text-gray-900">ImmoPro</span>
              </div>
            </div>

            <div className="hidden items-center space-x-6 md:flex">
              <button onClick={() => openListings()} className="text-sm text-gray-600 transition hover:text-amber-700">Nos biens</button>
              <a href="#services" className="text-sm text-gray-600 transition hover:text-amber-700">Services</a>
              <a href="#about" className="text-sm text-gray-600 transition hover:text-amber-700">A propos</a>
              <button className="text-sm text-gray-600 transition hover:text-amber-700">Connexion</button>
              <button className="rounded-md bg-gradient-to-r from-amber-600 to-orange-500 px-3 py-1.5 text-sm font-medium text-white transition hover:shadow-lg">
                S'inscrire
              </button>
            </div>

            <div className="flex items-center md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-700">
                {isMenuOpen ? '✕' : '☰'}
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="border-t bg-white md:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              <button onClick={() => openListings()} className="block w-full rounded px-3 py-2 text-left text-gray-700 hover:bg-gray-100">Nos biens</button>
              <a href="#services" className="block rounded px-3 py-2 text-gray-700 hover:bg-gray-100">Services</a>
              <a href="#about" className="block rounded px-3 py-2 text-gray-700 hover:bg-gray-100">A propos</a>
              <button className="block w-full rounded px-3 py-2 text-left text-gray-700 hover:bg-gray-100">Connexion</button>
              <button className="block w-full rounded bg-gradient-to-r from-amber-600 to-orange-500 px-3 py-2 text-left text-sm text-white">S'inscrire</button>
            </div>
          </div>
        )}
      </nav>

      <section className="relative min-h-[52vh] overflow-hidden bg-gradient-to-br from-stone-950 via-neutral-900 to-zinc-800 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(251,191,36,0.18),_transparent_28%),radial-gradient(circle_at_bottom_left,_rgba(249,115,22,0.14),_transparent_24%)]"></div>
        <div className="relative mx-auto flex min-h-[52vh] max-w-5xl items-center justify-center px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
          <div className="w-full max-w-3xl text-center">
            <h1 className="mb-4 text-3xl font-bold md:text-5xl">
              Trouvez votre logement
              <span className="block bg-gradient-to-r from-amber-300 to-orange-300 bg-clip-text text-transparent">
                ideal en quelques clics
              </span>
            </h1>
            <p className="mx-auto mb-6 max-w-2xl text-base text-gray-200 md:text-lg">
              La plateforme immobiliere qui simplifie votre recherche et securise vos transactions
            </p>

            <div className="mx-auto max-w-3xl rounded-2xl bg-white p-2 shadow-2xl">
              <div className="flex flex-col gap-2 md:flex-row">
                <div className="flex flex-1 items-center px-4 py-2.5">
                  <span className="mr-3 text-gray-400">🔍</span>
                  <input
                    type="text"
                    placeholder="Rechercher une ville, un quartier..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleSearch()
                      }
                    }}
                    className="w-full text-gray-900 outline-none placeholder:text-gray-500"
                  />
                </div>

                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="border-l border-gray-200 px-4 py-2.5 text-gray-900 outline-none"
                >
                  <option value="all">Tous types</option>
                  <option value="location">Location</option>
                  <option value="vente">Vente</option>
                  <option value="colocation">Colocation</option>
                </select>

                <button
                  onClick={handleSearch}
                  className="flex items-center justify-center rounded-lg bg-gradient-to-r from-amber-600 to-orange-500 px-5 py-2 text-sm font-medium text-white transition hover:shadow-lg"
                >
                  Rechercher
                  <span className="ml-2">→</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-8 md:py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className={`mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl ${stat.color}`}>
                  <span className="text-xl text-white">📊</span>
                </div>
                <div className="mb-1 text-2xl font-bold text-gray-900 md:text-3xl">{stat.value}</div>
                <div className="text-sm text-gray-600 md:text-base">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="properties" className="bg-gray-50 py-10 md:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="mb-3 text-3xl font-bold text-gray-900 md:text-4xl">Biens en vedette</h2>
            <p className="mx-auto max-w-2xl text-base text-gray-600 md:text-lg">
              Decouvrez notre selection des meilleures offres immobilieres du moment
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {filteredProperties.map((property) => (
              <div key={property.id} className="overflow-hidden rounded-2xl bg-white shadow-lg transition hover:shadow-2xl">
                <div className="relative">
                  <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300"></div>
                  <div className="absolute right-4 top-4 rounded-full bg-white px-3 py-1 text-sm font-medium text-gray-900">
                    {property.type === 'location' ? 'Location' : 'Vente'}
                  </div>
                  {property.featured && (
                    <button
                      onClick={() => openListings({ featured: true })}
                      className="absolute left-4 top-4 rounded-full bg-yellow-400 px-3 py-1 text-sm font-medium text-yellow-900 transition hover:bg-yellow-300"
                    >
                      ⭐ Vedette
                    </button>
                  )}
                </div>

                <div className="p-5">
                  <h3 className="mb-2 text-lg font-bold text-gray-900 md:text-xl">{property.title}</h3>
                  <div className="mb-3 flex items-center text-sm text-gray-600 md:text-base">
                    <span className="mr-1">📍</span>
                    {property.location}
                  </div>

                  <div className="mb-4 flex items-center justify-between gap-3">
                    <div className="text-xl font-bold text-green-600 md:text-2xl">
                      {property.type === 'location'
                        ? `${property.price.toLocaleString('fr-FR')} FCFA/mois`
                        : `${property.price.toLocaleString('fr-FR')} FCFA`}
                    </div>
                    <div className="text-xs text-gray-600 md:text-sm">
                      {property.bedrooms} chambres • {property.area}m²
                    </div>
                  </div>

                  <button
                    onClick={() => openListings({ type: property.type, propertyId: property.id })}
                    className="w-full rounded-lg bg-gradient-to-r from-amber-600 to-orange-500 py-2 text-white transition hover:shadow-lg"
                  >
                    Voir les details
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredProperties.length === 0 && (
            <div className="rounded-2xl border border-dashed border-amber-300 bg-amber-50 px-6 py-10 text-center text-amber-900">
              Aucun bien ne correspond a votre recherche pour le moment.
            </div>
          )}

          <div className="mt-6 text-center">
            <button
              onClick={() => openListings()}
              className="rounded-lg border-2 border-amber-600 px-8 py-3 font-medium text-amber-700 transition hover:bg-amber-50"
            >
              Voir tous les biens
            </button>
          </div>
        </div>
      </section>

      <section id="services" className="bg-white py-10 md:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="mb-3 text-3xl font-bold text-gray-900">Nos Services Complets</h2>
            <p className="mx-auto max-w-2xl text-base text-gray-600 md:text-lg">
              Gerez toute votre activite immobiliere en un seul endroit
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            <Link
              href="/listings"
              className="block rounded-xl border border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 p-5 transition hover:shadow-lg"
            >
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-to-r from-green-600 to-emerald-600">
                <span className="text-xl text-white">??</span>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900">Gérer le Référentiel</h3>
              <p className="mb-3 text-sm text-gray-600">
                Catalogue complet des biens immobiliers à Abidjan : Cocody, Plateau, Yopougon, Marcory. Photos HD, descriptions détaillées, disponibilités temps réel, prix en FCFA.
              </p>
              <div className="mb-3 text-xs text-gray-500">
                <strong>Types:</strong> Appartements T1-T5, Studios, Villas, Maisons<br/>
                <strong>Quartiers:</strong> Cocody, Riviera, Plateau, Yopougon, Marcory, Treichville<br/>
                <strong>Prix:</strong> 80,000 - 1,500,000 FCFA/mois
              </div>
              <span className="text-sm font-medium text-green-700 transition hover:text-green-800">
                Accéder au catalogue immobilier ?
              </span>
            </Link>

            <div className="rounded-xl border border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 p-5 transition hover:shadow-lg">
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600">
                <span className="text-xl text-white">??</span>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900">Gerer les Utilisateurs</h3>
              <p className="mb-3 text-sm text-gray-600">
                Administration des comptes utilisateurs, roles et permissions avec authentification securisee.
              </p>
              <Link href="/users" className="text-sm font-medium text-blue-700 transition hover:text-blue-800">
                Gerer les utilisateurs →
              </Link>
            </div>

            <div className="rounded-xl border border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50 p-5 transition hover:shadow-lg">
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-to-r from-purple-600 to-pink-600">
                <span className="text-xl text-white">📄</span>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900">Gerer les Contrats</h3>
              <p className="mb-3 text-sm text-gray-600">
                Contrats de location et de vente avec generation PDF et suivi des echeances.
              </p>
              <Link href="/contracts" className="text-sm font-medium text-purple-700 transition hover:text-purple-800">
                Voir les contrats →
              </Link>
            </div>

            <div className="rounded-xl border border-orange-200 bg-gradient-to-br from-orange-50 to-red-50 p-5 transition hover:shadow-lg">
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-to-r from-orange-600 to-red-600">
                <span className="text-xl text-white">💰</span>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900">Suivi Financier</h3>
              <p className="mb-3 text-sm text-gray-600">
                Tableaux de bord financiers, suivi des loyers, charges et reporting complet.
              </p>
              <Link href="/finance" className="text-sm font-medium text-orange-700 transition hover:text-orange-800">
                Acceder au finance →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-amber-600 to-orange-500 py-10 md:py-12 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Pret a trouver votre futur logement ?</h2>
          <p className="mb-6 text-base text-amber-100 md:text-lg">
            Rejoignez des milliers d'utilisateurs qui ont trouve leur bonheur sur ImmoPro
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <button className="rounded-lg bg-white px-8 py-3 font-medium text-amber-700 transition hover:bg-amber-50">
              Commencer maintenant
            </button>
            <button className="rounded-lg border-2 border-white px-8 py-3 font-medium text-white transition hover:bg-white hover:text-amber-700">
              En savoir plus
            </button>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 py-8 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="mb-4 flex items-center space-x-2">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-amber-600 to-orange-500"></div>
                <span className="text-xl font-bold">ImmoPro</span>
              </div>
              <p className="text-gray-400">Votre plateforme immobiliere innovante</p>
            </div>

            <div>
              <h3 className="mb-4 font-semibold">Services</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="transition hover:text-white">Location</a></li>
                <li><a href="#" className="transition hover:text-white">Vente</a></li>
                <li><a href="#" className="transition hover:text-white">Gestion</a></li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 font-semibold">Ressources</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="transition hover:text-white">Guide</a></li>
                <li><a href="#" className="transition hover:text-white">Blog</a></li>
                <li><a href="#" className="transition hover:text-white">FAQ</a></li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 font-semibold">Contact</h3>
              <ul className="space-y-2 text-gray-400">
                <li>contact@immopro.fr</li>
                <li>01 02 85 61 23</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 border-t border-gray-800 pt-6 text-center text-gray-400">
            <p>&copy; 2024 ImmoPro. Tous droits reserves.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
