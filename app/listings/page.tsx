'use client'

import { FormEvent, useMemo, useState } from 'react'
import database from '../../database.json'

type TypeItem = {
  id: string
  name: string
  description: string
  minPrice: number
  maxPrice: number
}

type NeighborhoodItem = {
  id: string
  name: string
  description: string
  avgPrice: number
  popular: boolean
}

type CommuneItem = {
  id: string
  name: string
  description: string
}

type RoomTypeItem = {
  id: string
  name: string
  description: string
}

type CategoryKey = 'types' | 'quartiers' | 'communes' | 'pieces'

const initialTypes = database.referentiel.types as TypeItem[]
const initialNeighborhoods = database.referentiel.quartiers as NeighborhoodItem[]
const initialCommunes: CommuneItem[] = [
  { id: 'cocody', name: 'Commune de Cocody', description: 'Commune residentielle avec plusieurs quartiers references.' },
  { id: 'yopougon', name: 'Commune de Yopougon', description: 'Grande commune populaire avec une forte activite locative.' },
  { id: 'plateau', name: 'Commune du Plateau', description: 'Zone administrative et d affaires.' }
]
const initialRoomTypes: RoomTypeItem[] = [
  { id: 'salon', name: 'Salon', description: 'Piece principale de vie.' },
  { id: 'chambre', name: 'Chambre', description: 'Piece reservee au repos.' },
  { id: 'cuisine', name: 'Cuisine', description: 'Piece dediee a la preparation des repas.' }
]

const categoryMeta: Record<CategoryKey, { label: string; helper: string; accent: string }> = {
  types: {
    label: 'Types de biens',
    helper: 'Ajoutez les categories de biens a utiliser dans toute l application.',
    accent: '#2563eb'
  },
  quartiers: {
    label: 'Quartiers',
    helper: 'Gerez les quartiers disponibles dans votre referentiel immobilier.',
    accent: '#059669'
  },
  communes: {
    label: 'Communes',
    helper: 'Ajoutez les communes rattachees a vos biens et a vos quartiers.',
    accent: '#7c3aed'
  },
  pieces: {
    label: 'Types de pieces',
    helper: 'Definissez les types de pieces pour la description des logements.',
    accent: '#d97706'
  }
}

const categoryTips: Record<CategoryKey, string[]> = {
  types: [
    'Utilisez un identifiant court et stable, par exemple t2, studio ou villa.',
    'Indiquez une fourchette de prix realiste pour aider les equipes commerciales.',
    'Mettez a jour les types existants avant d en creer de nouveaux similaires.'
  ],
  quartiers: [
    'Ajoutez un prix moyen pour faciliter le positionnement commercial.',
    'Marquez comme populaire les zones les plus demandees par les clients.',
    'Gardez une description courte et exploitable pour vos agents.'
  ],
  communes: [
    'Utilisez les communes comme niveau d organisation principal.',
    'Ajoutez une description claire pour differencier les zones couvertes.',
    'Evitez les doublons pour garder un referentiel propre.'
  ],
  pieces: [
    'Listez seulement les types de pieces utiles a vos annonces.',
    'Conservez des noms simples pour faciliter la saisie des biens.',
    'Supprimez les libelles inutilises pour garder une base lisible.'
  ]
}

export default function ListingsPage() {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>('types')
  const [types, setTypes] = useState<TypeItem[]>(initialTypes)
  const [quartiers, setQuartiers] = useState<NeighborhoodItem[]>(initialNeighborhoods)
  const [communes, setCommunes] = useState<CommuneItem[]>(initialCommunes)
  const [pieces, setPieces] = useState<RoomTypeItem[]>(initialRoomTypes)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  const [form, setForm] = useState({
    id: '',
    name: '',
    description: '',
    minPrice: '',
    maxPrice: '',
    avgPrice: '',
    popular: false
  })

  const activeMeta = categoryMeta[activeCategory]
  const selectedCount = selectedIds.length

  const activeItems = useMemo(() => {
    if (activeCategory === 'types') return types
    if (activeCategory === 'quartiers') return quartiers
    if (activeCategory === 'communes') return communes
    return pieces
  }, [activeCategory, types, quartiers, communes, pieces])

  function resetForm() {
    setForm({
      id: '',
      name: '',
      description: '',
      minPrice: '',
      maxPrice: '',
      avgPrice: '',
      popular: false
    })
    setEditingId(null)
  }

  function clearSelection() {
    setSelectedIds([])
  }

  function startEdit(item: any) {
    setEditingId(item.id)
    setForm({
      id: item.id,
      name: item.name,
      description: item.description,
      minPrice: 'minPrice' in item ? String(item.minPrice) : '',
      maxPrice: 'maxPrice' in item ? String(item.maxPrice) : '',
      avgPrice: 'avgPrice' in item ? String(item.avgPrice) : '',
      popular: 'popular' in item ? item.popular : false
    })
  }

  function deleteItem(id: string) {
    if (activeCategory === 'types') {
      setTypes((current) => current.filter((item) => item.id !== id))
    } else if (activeCategory === 'quartiers') {
      setQuartiers((current) => current.filter((item) => item.id !== id))
    } else if (activeCategory === 'communes') {
      setCommunes((current) => current.filter((item) => item.id !== id))
    } else {
      setPieces((current) => current.filter((item) => item.id !== id))
    }

    if (editingId === id) {
      resetForm()
    }

    setSelectedIds((current) => current.filter((selectedId) => selectedId !== id))
  }

  function deleteSelectedItems() {
    if (selectedIds.length === 0) {
      return
    }

    if (activeCategory === 'types') {
      setTypes((current) => current.filter((item) => !selectedIds.includes(item.id)))
    } else if (activeCategory === 'quartiers') {
      setQuartiers((current) => current.filter((item) => !selectedIds.includes(item.id)))
    } else if (activeCategory === 'communes') {
      setCommunes((current) => current.filter((item) => !selectedIds.includes(item.id)))
    } else {
      setPieces((current) => current.filter((item) => !selectedIds.includes(item.id)))
    }

    if (editingId && selectedIds.includes(editingId)) {
      resetForm()
    }

    clearSelection()
  }

  function toggleSelection(id: string) {
    setSelectedIds((current) =>
      current.includes(id)
        ? current.filter((selectedId) => selectedId !== id)
        : [...current, id]
    )
  }

  function toggleSelectAll() {
    if (selectedIds.length === activeItems.length) {
      clearSelection()
      return
    }

    setSelectedIds(activeItems.map((item) => item.id))
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const normalizedId = form.id.trim().toLowerCase()
    const payloadBase = {
      id: normalizedId,
      name: form.name.trim(),
      description: form.description.trim()
    }

    if (!payloadBase.id || !payloadBase.name || !payloadBase.description) {
      return
    }

    if (activeCategory === 'types') {
      const nextItem: TypeItem = {
        ...payloadBase,
        minPrice: Number(form.minPrice || 0),
        maxPrice: Number(form.maxPrice || 0)
      }

      setTypes((current) =>
        editingId
          ? current.map((item) => (item.id === editingId ? nextItem : item))
          : [...current, nextItem]
      )
    } else if (activeCategory === 'quartiers') {
      const nextItem: NeighborhoodItem = {
        ...payloadBase,
        avgPrice: Number(form.avgPrice || 0),
        popular: form.popular
      }

      setQuartiers((current) =>
        editingId
          ? current.map((item) => (item.id === editingId ? nextItem : item))
          : [...current, nextItem]
      )
    } else if (activeCategory === 'communes') {
      const nextItem: CommuneItem = payloadBase

      setCommunes((current) =>
        editingId
          ? current.map((item) => (item.id === editingId ? nextItem : item))
          : [...current, nextItem]
      )
    } else {
      const nextItem: RoomTypeItem = payloadBase

      setPieces((current) =>
        editingId
          ? current.map((item) => (item.id === editingId ? nextItem : item))
          : [...current, nextItem]
      )
    }

    resetForm()
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="border-b border-slate-200 bg-gradient-to-r from-white via-slate-50 to-slate-100">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-6 sm:px-6 lg:px-8 md:flex-row md:items-center md:justify-between">
          <div>
            <button
              type="button"
              onClick={() => window.history.back()}
              className="rounded-lg border border-slate-300 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
            >
              ← Retour
            </button>
            <h1 className="mt-4 text-3xl font-bold text-slate-900">Gerer le referentiel</h1>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
              Ce module sert a ajouter, modifier et supprimer les donnees de base
              comme les quartiers, communes, types de biens et types de pieces.
              Chaque categorie alimente les autres ecrans de gestion de l application.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            <StatCard label="Types" value={types.length} />
            <StatCard label="Quartiers" value={quartiers.length} />
            <StatCard label="Communes" value={communes.length} />
            <StatCard label="Pieces" value={pieces.length} />
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl items-start gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <section className="self-start rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-5">
            <h2 className="text-xl font-semibold text-slate-900">Categories du referentiel</h2>
            <p className="mt-1 text-sm text-slate-600">
              Choisissez la famille d informations a gerer.
            </p>
          </div>

          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-50">
            {(Object.keys(categoryMeta) as CategoryKey[]).map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => {
                  setActiveCategory(category)
                  resetForm()
                  clearSelection()
                }}
                className={`w-full border-b px-4 py-3 text-left transition last:border-b-0 ${
                  activeCategory === category
                    ? 'border-slate-900 bg-slate-900 text-white'
                    : 'border-slate-200 bg-white text-slate-800 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-sm font-semibold leading-5">{categoryMeta[category].label}</div>
                    <div
                      className={`mt-1 text-xs leading-5 ${activeCategory === category ? 'text-slate-300' : 'text-slate-500'}`}
                      style={{
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}
                    >
                      {categoryMeta[category].helper}
                    </div>
                  </div>
                  <span
                    className={`mt-0.5 inline-flex shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                      activeCategory === category
                        ? 'bg-white/15 text-white'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {category === 'types' && types.length}
                    {category === 'quartiers' && quartiers.length}
                    {category === 'communes' && communes.length}
                    {category === 'pieces' && pieces.length}
                  </span>
                </div>
              </button>
            ))}
          </div>

          <div className="mt-5 rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-4 shadow-sm">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Categorie active</div>
            <div className="mt-2 text-lg font-bold" style={{ color: activeMeta.accent }}>
              {activeMeta.label}
            </div>
            <p
              className="mt-2 text-sm leading-5 text-slate-600"
              style={{
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
              }}
            >
              {activeMeta.helper}
            </p>
          </div>

          <div className="mt-3 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <div className="text-sm font-semibold text-slate-900">Conseils de gestion</div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                3 points cles
              </span>
            </div>
            <div className="mt-3 grid gap-2">
              {categoryTips[activeCategory].map((tip) => (
                <div key={tip} className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50 px-3 py-2.5 text-sm leading-5 text-slate-600">
                  <span
                    className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white"
                    style={{ backgroundColor: activeMeta.accent }}
                  >
                    i
                  </span>
                  <span>{tip}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <div className="grid gap-3 md:grid-cols-3">
            <InfoTile
              label="Elements"
              value={activeItems.length}
              helper={`Total disponible dans ${activeMeta.label.toLowerCase()}.`}
            />
            <InfoTile
              label="Selection"
              value={selectedCount}
              helper="Elements prepares pour une suppression multiple."
            />
            <InfoTile
              label="Mode"
              value={editingId ? 'Edition' : 'Ajout'}
              helper={editingId ? 'Vous modifiez un element existant.' : 'Vous creez un nouvel element.'}
            />
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">
                  {editingId ? 'Modifier un element' : 'Ajouter un element'}
                </h2>
                <p className="mt-1 text-sm text-slate-600">
                  Remplissez les informations pour la categorie {activeMeta.label.toLowerCase()}.
                  Les champs ci-dessous determinent ce qui apparaitra dans le referentiel.
                </p>
              </div>
              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Annuler
                </button>
              )}
            </div>

            <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
              <Field
                label="Identifiant"
                value={form.id}
                onChange={(value) => setForm((current) => ({ ...current, id: value }))}
                placeholder="ex: cocody ou t3"
              />
              <Field
                label="Nom"
                value={form.name}
                onChange={(value) => setForm((current) => ({ ...current, name: value }))}
                placeholder="Nom a afficher"
              />

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-slate-700">Description</label>
                <textarea
                  value={form.description}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, description: event.target.value }))
                  }
                  placeholder="Description de l element"
                  className="min-h-[110px] w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-700 outline-none focus:border-slate-500"
                />
              </div>

              {activeCategory === 'types' && (
                <>
                  <Field
                    label="Prix minimum"
                    value={form.minPrice}
                    onChange={(value) => setForm((current) => ({ ...current, minPrice: value }))}
                    placeholder="0"
                    type="number"
                  />
                  <Field
                    label="Prix maximum"
                    value={form.maxPrice}
                    onChange={(value) => setForm((current) => ({ ...current, maxPrice: value }))}
                    placeholder="0"
                    type="number"
                  />
                </>
              )}

              {activeCategory === 'quartiers' && (
                <>
                  <Field
                    label="Prix moyen"
                    value={form.avgPrice}
                    onChange={(value) => setForm((current) => ({ ...current, avgPrice: value }))}
                    placeholder="0"
                    type="number"
                  />
                  <div className="flex items-end">
                    <label className="flex w-full items-center gap-3 rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-700">
                      <input
                        type="checkbox"
                        checked={form.popular}
                        onChange={(event) =>
                          setForm((current) => ({ ...current, popular: event.target.checked }))
                        }
                      />
                      Quartier populaire
                    </label>
                  </div>
                </>
              )}

              <div className="md:col-span-2 flex flex-wrap gap-3">
                <button
                  type="submit"
                  className="rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white transition hover:bg-slate-800"
                >
                  {editingId ? 'Mettre a jour' : 'Ajouter'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-xl border border-slate-300 px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Vider le formulaire
                </button>
              </div>
            </form>

            <div className="mt-5 rounded-3xl border border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50 px-5 py-4 text-sm leading-5 text-blue-900">
              <span className="font-semibold">A savoir :</span> les modifications faites ici
              mettent a jour l ecran courant. Pour une persistance complete apres rechargement,
              il faudra ensuite relier cette page a une API ou a la base.
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">
                  Liste des {activeMeta.label.toLowerCase()}
                </h2>
                <p className="mt-1 text-sm text-slate-600">
                  Cliquez sur modifier pour pre-remplir le formulaire, ou utilisez la selection multiple
                  pour supprimer plusieurs elements en une seule action.
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-end gap-3">
                <div className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">
                  {activeItems.length} element(s)
                </div>
                {activeItems.length > 0 && (
                  <button
                    type="button"
                    onClick={toggleSelectAll}
                    className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    {selectedIds.length === activeItems.length ? 'Tout deselectionner' : 'Tout selectionner'}
                  </button>
                )}
                {selectedIds.length > 0 && (
                  <button
                    type="button"
                    onClick={deleteSelectedItems}
                    className="rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
                  >
                    Supprimer la selection ({selectedIds.length})
                  </button>
                )}
              </div>
            </div>

            <div className="hidden overflow-hidden rounded-3xl border border-slate-200 lg:block">
              <div className="grid grid-cols-[44px_110px_minmax(220px,1.2fr)_minmax(220px,1fr)_220px] items-center gap-4 bg-slate-50 px-5 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                <div className="text-center">Sel.</div>
                <div>ID</div>
                <div>Element</div>
                <div>Informations</div>
                <div className="text-right">Actions</div>
              </div>

              <div className="divide-y divide-slate-200 bg-white">
                {activeItems.map((item: any) => (
                  <div
                    key={item.id}
                    className={`grid grid-cols-[44px_110px_minmax(220px,1.2fr)_minmax(220px,1fr)_220px] gap-4 px-5 py-4 transition ${
                      selectedIds.includes(item.id) ? 'bg-slate-100' : 'bg-white'
                    }`}
                  >
                    <div className="flex items-start justify-center pt-1">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(item.id)}
                        onChange={() => toggleSelection(item.id)}
                        className="h-4 w-4 rounded border-slate-300"
                      />
                    </div>

                    <div className="min-w-0">
                      <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-600">
                        {item.id}
                      </span>
                    </div>

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <div className="text-base font-semibold text-slate-900">{item.name}</div>
                        {'popular' in item && item.popular && (
                          <span className="rounded-full bg-green-100 px-2.5 py-1 text-[11px] font-semibold text-green-700">
                            Populaire
                          </span>
                        )}
                      </div>
                      <p
                        className="mt-1 text-sm leading-5 text-slate-600"
                        style={{
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden'
                        }}
                      >
                        {item.description}
                      </p>
                    </div>

                    <div className="min-w-0">
                      <div className="flex flex-wrap gap-2">
                        {'minPrice' in item && (
                          <Badge>
                            Min {item.minPrice.toLocaleString('fr-FR')} FCFA
                          </Badge>
                        )}
                        {'maxPrice' in item && (
                          <Badge>
                            Max {item.maxPrice.toLocaleString('fr-FR')} FCFA
                          </Badge>
                        )}
                        {'avgPrice' in item && (
                          <Badge>
                            Moyen {item.avgPrice.toLocaleString('fr-FR')} FCFA
                          </Badge>
                        )}
                        {!('minPrice' in item) && !('maxPrice' in item) && !('avgPrice' in item) && (
                          <Badge>Element descriptif</Badge>
                        )}
                      </div>
                    </div>

                    <div className="flex items-start justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => startEdit(item)}
                        className="rounded-2xl border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
                      >
                        Modifier
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteItem(item.id)}
                        className="rounded-2xl bg-red-600 px-3 py-2 text-sm font-semibold text-white hover:bg-red-700"
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3 lg:hidden">
              {activeItems.map((item: any) => (
                <div
                  key={item.id}
                  className={`rounded-3xl border p-4 transition ${
                    selectedIds.includes(item.id)
                      ? 'border-slate-900 bg-slate-100 shadow-md'
                      : 'border-slate-200 bg-white shadow-sm'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center gap-3">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(item.id)}
                        onChange={() => toggleSelection(item.id)}
                        className="h-4 w-4 rounded border-slate-300"
                      />
                      <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
                        {item.id}
                      </span>
                      {'popular' in item && item.popular && (
                        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                          Populaire
                        </span>
                      )}
                    </div>

                    <div className="text-lg font-semibold text-slate-900">{item.name}</div>
                    <p
                      className="text-sm leading-5 text-slate-600"
                      style={{
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}
                    >
                      {item.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {'minPrice' in item && (
                        <Badge>
                          Min {item.minPrice.toLocaleString('fr-FR')} FCFA
                        </Badge>
                      )}
                      {'maxPrice' in item && (
                        <Badge>
                          Max {item.maxPrice.toLocaleString('fr-FR')} FCFA
                        </Badge>
                      )}
                      {'avgPrice' in item && (
                        <Badge>
                          Moyen {item.avgPrice.toLocaleString('fr-FR')} FCFA
                        </Badge>
                      )}
                      {!('minPrice' in item) && !('maxPrice' in item) && !('avgPrice' in item) && (
                        <Badge>Element descriptif</Badge>
                      )}
                    </div>

                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() => startEdit(item)}
                        className="flex-1 rounded-2xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100"
                      >
                        Modifier
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteItem(item.id)}
                        className="flex-1 rounded-2xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700"
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {activeItems.length === 0 && (
                <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-10 text-center text-sm text-slate-500">
                  Aucun element disponible pour cette categorie.
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

function InfoTile({
  label,
  value,
  helper
}: {
  label: string
  value: string | number
  helper: string
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 px-4 py-4 shadow-sm">
      <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">{label}</div>
      <div className="mt-2 text-2xl font-bold tracking-tight text-slate-900">{value}</div>
      <div
        className="mt-2 text-sm leading-5 text-slate-600"
        style={{
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}
      >
        {helper}
      </div>
    </div>
  )
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700">
      {children}
    </span>
  )
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-center shadow-sm">
      <div className="text-xs uppercase tracking-wide text-slate-500">{label}</div>
      <div className="mt-1 text-xl font-bold text-slate-900">{value}</div>
    </div>
  )
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = 'text'
}: {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder: string
  type?: string
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-700 outline-none focus:border-slate-500"
      />
    </div>
  )
}
