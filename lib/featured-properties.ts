export interface FeaturedProperty {
  id: number
  title: string
  location: string
  price: number
  type: 'location' | 'vente'
  bedrooms: number
  area: number
  description: string
  features: string[]
}

export const featuredProperties: FeaturedProperty[] = [
  {
    id: 1,
    title: 'Appartement T3 Moderne Cocody',
    location: 'Cocody, Abidjan',
    price: 250000,
    type: 'location',
    bedrooms: 3,
    area: 120,
    description:
      'Appartement lumineux de type T3 situe a Cocody, avec balcon, parking et acces facile aux commerces et services.',
    features: ['Balcon', 'Parking', 'Climatisation', 'Securite']
  },
  {
    id: 2,
    title: 'Villa de Luxe avec Piscine',
    location: 'Riviera, Abidjan',
    price: 85000000,
    type: 'vente',
    bedrooms: 5,
    area: 350,
    description:
      'Grande villa familiale a la Riviera avec piscine, jardin prive et espaces interieurs spacieux.',
    features: ['Piscine', 'Jardin', 'Garage', 'Suite parentale']
  },
  {
    id: 3,
    title: 'Appartement T2 Marcory Residentiel',
    location: 'Marcory, Abidjan',
    price: 180000,
    type: 'location',
    bedrooms: 2,
    area: 82,
    description:
      'Appartement T2 pratique et bien situe a Marcory, proche des commerces, des axes principaux et des services du quartier.',
    features: ['Balcon', 'Cuisine equipee', 'Parking', 'Securite']
  },
  {
    id: 4,
    title: 'Duplex Familial Marcory Zone 4',
    location: 'Marcory Zone 4, Abidjan',
    price: 650000,
    type: 'location',
    bedrooms: 4,
    area: 210,
    description:
      'Duplex spacieux dans le secteur Zone 4 a Marcory, ideal pour une famille recherchant confort, accessibilite et standing.',
    features: ['Terrasse', 'Garage', 'Climatisation', 'Securite']
  },
  {
    id: 5,
    title: 'Bureau Premium Plateau',
    location: 'Plateau, Abidjan',
    price: 120000000,
    type: 'vente',
    bedrooms: 6,
    area: 420,
    description:
      'Plateau de bureaux haut de gamme au Plateau, adapte aux activites administratives, financieres ou commerciales.',
    features: ['Ascenseur', 'Parking', 'Open space', 'Salle de reunion']
  },
  {
    id: 6,
    title: 'Residence Moderne Yopougon',
    location: 'Yopougon, Abidjan',
    price: 95000,
    type: 'location',
    bedrooms: 2,
    area: 74,
    description:
      'Appartement moderne et accessible a Yopougon, parfait pour un jeune couple ou une petite famille.',
    features: ['Ventilation', 'Cour commune', 'Acces facile', 'Securite']
  },
  {
    id: 7,
    title: 'Villa Contemporaine Cocody Danga',
    location: 'Cocody Danga, Abidjan',
    price: 145000000,
    type: 'vente',
    bedrooms: 5,
    area: 390,
    description:
      'Villa contemporaine de standing a Cocody Danga avec jardin, grands volumes et finitions soignees.',
    features: ['Jardin', 'Garage', 'Suite parentale', 'Terrasse']
  },
  {
    id: 8,
    title: 'Appartement T3 Marcory Biétry',
    location: 'Marcory Bietry, Abidjan',
    price: 275000,
    type: 'location',
    bedrooms: 3,
    area: 118,
    description:
      'Bel appartement T3 a Bietry, quartier recherche de Marcory, offrant confort, luminosite et accessibilite.',
    features: ['Balcon', 'Climatisation', 'Parking', 'Gardiennage']
  }
]

export function getFeaturedPropertyById(id: number) {
  return featuredProperties.find((property) => property.id === id)
}
