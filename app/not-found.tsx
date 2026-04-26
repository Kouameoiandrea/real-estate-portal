import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-100 px-4 py-12">
      <div className="mx-auto max-w-2xl rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
        <div className="text-5xl">🏠</div>
        <h1 className="mt-5 text-3xl font-bold text-slate-900">Page introuvable</h1>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          Le bien ou la page demandee n existe pas ou n est plus disponible.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Retour a l accueil
          </Link>
          <Link
            href="/search"
            className="rounded-2xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Voir les biens
          </Link>
        </div>
      </div>
    </div>
  )
}
