import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getFeaturedPropertyById } from '../../../lib/featured-properties'

export default function ListingDetailPage({
  params
}: {
  params: { id: string }
}) {
  const propertyId = Number(params.id)
  const property = getFeaturedPropertyById(propertyId)

  if (!property) {
    notFound()
  }

  const priceLabel =
    property.type === 'location'
      ? `${property.price.toLocaleString('fr-FR')} FCFA/mois`
      : `${property.price.toLocaleString('fr-FR')} FCFA`

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
          <div>
            <Link href="/" className="text-sm font-medium text-slate-600 hover:text-slate-900">
              ← Retour a l'accueil
            </Link>
            <h1 className="mt-3 text-3xl font-bold text-slate-900">{property.title}</h1>
            <p className="mt-2 text-sm text-slate-600">Fiche detaillee du bien selectionne.</p>
          </div>
          <div className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm ring-1 ring-slate-200">
            {property.type === 'location' ? 'Location' : 'Vente'}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="flex h-80 items-center justify-center bg-gradient-to-br from-slate-200 via-slate-100 to-blue-100">
              <div className="text-center text-slate-600">
                <div className="text-6xl">🏠</div>
                <div className="mt-3 text-lg font-semibold">{property.title}</div>
              </div>
            </div>

            <div className="p-6">
              <div className="mb-6 flex items-center gap-2 text-sm text-slate-500">
                <span>📍</span>
                <span>{property.location}</span>
              </div>

              <h2 className="text-lg font-semibold text-slate-900">Description</h2>
              <p className="mt-3 leading-7 text-slate-600">{property.description}</p>

              <h2 className="mt-8 text-lg font-semibold text-slate-900">Caracteristiques</h2>
              <div className="mt-4 flex flex-wrap gap-3">
                {property.features.map((feature) => (
                  <span
                    key={feature}
                    className="rounded-full bg-orange-50 px-4 py-2 text-sm font-medium text-orange-700 ring-1 ring-orange-200"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="text-sm font-medium text-slate-500">Prix</div>
              <div className="mt-2 text-3xl font-bold text-emerald-600">{priceLabel}</div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-900">Informations du bien</h2>
              <div className="mt-5 space-y-4 text-sm text-slate-600">
                <div className="flex items-center justify-between">
                  <span>Type</span>
                  <span className="font-semibold text-slate-900">
                    {property.type === 'location' ? 'Location' : 'Vente'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Chambres</span>
                  <span className="font-semibold text-slate-900">{property.bedrooms}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Surface</span>
                  <span className="font-semibold text-slate-900">{property.area} m²</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Localisation</span>
                  <span className="font-semibold text-slate-900">{property.location}</span>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-900">Actions</h2>
              <div className="mt-4 space-y-3">
                <Link
                  href="/listings"
                  className="block rounded-xl bg-slate-900 px-4 py-3 text-center font-semibold text-white transition hover:bg-slate-800"
                >
                  Voir tout le referentiel
                </Link>
                <Link
                  href="/"
                  className="block rounded-xl border border-slate-300 px-4 py-3 text-center font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Retour a l'accueil
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
