import Link from 'next/link'
import { featuredProperties } from '../../lib/featured-properties'

type SearchPageProps = {
  searchParams?: {
    q?: string
    type?: string
  }
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  const query = (searchParams?.q || '').trim().toLowerCase()
  const selectedType = (searchParams?.type || 'all').trim().toLowerCase()

  const results = featuredProperties.filter((property) => {
    const matchesQuery =
      !query ||
      property.title.toLowerCase().includes(query) ||
      property.location.toLowerCase().includes(query) ||
      property.description.toLowerCase().includes(query)

    const matchesType =
      selectedType === 'all' ||
      !selectedType ||
      property.type === selectedType

    return matchesQuery && matchesType
  })

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <Link href="/" className="text-sm font-medium text-slate-600 hover:text-slate-900">
                ← Retour a l accueil
              </Link>
              <h1 className="mt-3 text-3xl font-bold text-slate-900">Resultats de recherche</h1>
              <p className="mt-2 text-sm text-slate-600">
                {query
                  ? `Recherche pour "${searchParams?.q}".`
                  : 'Tous les biens disponibles.'}
                {selectedType !== 'all' && selectedType
                  ? ` Filtre applique : ${selectedType}.`
                  : ''}
              </p>
            </div>

            <div className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">
              {results.length} resultat(s)
            </div>
          </div>
        </div>

        {results.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Aucun bien trouve</h2>
            <p className="mt-3 text-sm text-slate-600">
              Essaie une autre ville ou retire le filtre de type.
            </p>
            <Link
              href="/"
              className="mt-6 inline-flex rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Revenir a la recherche
            </Link>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {results.map((property) => (
              <div key={property.id} className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                <div className="flex h-48 items-center justify-center bg-slate-50">
                  <div className="text-center">
                    <div className="text-4xl">🏠</div>
                    <div className="mt-3 text-base font-semibold text-slate-900">{property.title}</div>
                  </div>
                </div>

                <div className="space-y-4 p-5">
                  <div className="flex items-center justify-between gap-3">
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-700">
                      {property.type}
                    </span>
                    <span className="text-sm font-medium text-slate-600">{property.location}</span>
                  </div>

                  <div>
                    <h2 className="text-lg font-semibold text-slate-900">{property.title}</h2>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{property.description}</p>
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <div className="text-lg font-bold text-slate-900">
                      {property.type === 'location'
                        ? `${property.price.toLocaleString('fr-FR')} FCFA/mois`
                        : `${property.price.toLocaleString('fr-FR')} FCFA`}
                    </div>
                    <div className="text-sm text-slate-600">
                      {property.bedrooms} chambres • {property.area} m²
                    </div>
                  </div>

                  <Link
                    href={`/listings/${property.id}`}
                    className="inline-flex w-full items-center justify-center rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                  >
                    Voir les details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
