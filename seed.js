import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  console.log("🗑️ Suppression des données existantes...")

  // Supprimer dans l'ordre inverse des dépendances
  await prisma.transaction.deleteMany()
  await prisma.listing.deleteMany()
  await prisma.user.deleteMany()

  console.log("✅ Données supprimées")

  // Créer un utilisateur de test
  const user = await prisma.user.create({
    data: {
      email: "agent@example.com",
      username: "agent1",
      password: "$2b$10$hashedpassword",
      firstName: "Jean",
      lastName: "Dupont",
      role: "AGENT",
      phone: "+225 07 12 34 56"
    }
  })

  // Créer des annonces de test
  const listing1 = await prisma.listing.create({
    data: {
      title: "Appartement T3 Moderne Cocody",
      description: "Bel appartement T3 de 120m² dans quartier résidentiel huppé. Proche commerces et transports.",
      price: 2500000,
      type: "Appartement",
      status: "AVAILABLE",
      address: "15 Rue de la Paix",
      city: "Abidjan",
      postalCode: "01 BP 1234",
      country: "Côte d'Ivoire",
      latitude: 5.3599,
      longitude: -4.0083,
      area: 120,
      bedrooms: 3,
      bathrooms: 2,
      yearBuilt: 2018,
      images: JSON.stringify(["apartment1.jpg"]),
      features: JSON.stringify(["Climatisation", "Parking", "Balcon", "Cuisine équipée"]),
      userId: user.id
    }
  })

  const listing2 = await prisma.listing.create({
    data: {
      title: "Villa avec Piscine Marcory",
      description: "Magnifique villa de 300m² avec piscine et jardin. Idéale pour une famille.",
      price: 15000000,
      type: "Villa",
      status: "AVAILABLE",
      address: "25 Avenue des Roses",
      city: "Abidjan",
      postalCode: "01 BP 5678",
      country: "Côte d'Ivoire",
      latitude: 5.3100,
      longitude: -3.9810,
      area: 300,
      bedrooms: 5,
      bathrooms: 4,
      yearBuilt: 2020,
      images: JSON.stringify(["villa1.jpg"]),
      features: JSON.stringify(["Piscine", "Jardin", "Garage", "Sécurité 24h"]),
      userId: user.id
    }
  })

  const listing3 = await prisma.listing.create({
    data: {
      title: "Studio Moderne Plateau",
      description: "Studio moderne et fonctionnel au cœur du Plateau. Idéal pour jeune professionnel.",
      price: 800000,
      type: "Studio",
      status: "AVAILABLE",
      address: "8 Boulevard de la République",
      city: "Abidjan",
      postalCode: "01 BP 9012",
      country: "Côte d'Ivoire",
      latitude: 5.3200,
      longitude: -4.0300,
      area: 35,
      bedrooms: 1,
      bathrooms: 1,
      yearBuilt: 2019,
      images: JSON.stringify(["studio1.jpg"]),
      features: JSON.stringify(["Climatisation", "Sécurité", "Ascenseur"]),
      userId: user.id
    }
  })

  console.log("✅ Base de données initialisée avec succès!")
  console.log("Utilisateur créé:", user.email)
  console.log("Annonces créées:", listing1.title, ",", listing2.title, "et", listing3.title)
}

main()
  .catch((e) => {
    console.error("❌ Erreur lors de l'initialisation:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })