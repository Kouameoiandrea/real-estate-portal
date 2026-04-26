'use client'

import Link from 'next/link'
import { useEffect } from 'react'

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-12">
      <div className="mx-auto max-w-2xl rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
        <div className="text-5xl">⚠️</div>
        <h1 className="mt-5 text-3xl font-bold text-slate-900">Erreur de chargement</h1>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          Une erreur a empeche l affichage de cette page. Tu peux reessayer ou revenir a l accueil.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={reset}
            className="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Reessayer
          </button>
          <Link
            href="/"
            className="rounded-2xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Retour a l accueil
          </Link>
        </div>
      </div>
    </div>
  )
}
