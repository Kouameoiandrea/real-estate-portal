'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'

type UserRecord = {
  id: number
  name: string
  email: string
  role: string
  status: string
  city: string
  lastLogin: string
  permissions: string[]
  phone: string
  note: string
}

const initialUsers: UserRecord[] = [
  {
    id: 1,
    name: 'Awa Kone',
    email: 'awa.kone@immopro.ci',
    role: 'Administrateur',
    status: 'Actif',
    city: 'Abidjan',
    lastLogin: 'Aujourd hui, 08:45',
    permissions: ['Gestion complete', 'Validation comptes', 'Configuration'],
    phone: '+225 07 11 22 33 44',
    note: 'Supervise les acces sensibles et valide les nouveaux comptes.'
  },
  {
    id: 2,
    name: 'Yao Kouassi',
    email: 'yao.kouassi@immopro.ci',
    role: 'Agent immobilier',
    status: 'Actif',
    city: 'Bouake',
    lastLogin: 'Aujourd hui, 10:12',
    permissions: ['Creation annonces', 'Suivi clients', 'Edition biens'],
    phone: '+225 05 21 43 65 87',
    note: 'Suit les prospects et gere les visites terrain.'
  },
  {
    id: 3,
    name: 'Mariam Traore',
    email: 'mariam.traore@immopro.ci',
    role: 'Gestionnaire',
    status: 'En attente',
    city: 'Yamoussoukro',
    lastLogin: 'Hier, 17:30',
    permissions: ['Contrats', 'Paiements', 'Relances'],
    phone: '+225 01 33 44 55 66',
    note: 'Compte en attente de validation finale par un administrateur.'
  },
  {
    id: 4,
    name: 'Jean Nguessan',
    email: 'jean.nguessan@immopro.ci',
    role: 'Client premium',
    status: 'Suspendu',
    city: 'San Pedro',
    lastLogin: '12 avril, 14:05',
    permissions: ['Consultation', 'Demandes visites'],
    phone: '+225 07 88 77 66 55',
    note: 'Compte suspendu apres plusieurs echecs de connexion.'
  }
]

const roleStats = [
  { label: 'Administrateurs', value: '04', tone: 'bg-amber-100 text-amber-800' },
  { label: 'Agents', value: '18', tone: 'bg-blue-100 text-blue-800' },
  { label: 'Gestionnaires', value: '09', tone: 'bg-emerald-100 text-emerald-800' },
  { label: 'Clients actifs', value: '126', tone: 'bg-violet-100 text-violet-800' }
]

type PanelAction = 'view' | 'edit' | 'schedule' | null

export default function Users() {
  const [users, setUsers] = useState(initialUsers)
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null)
  const [selectedAction, setSelectedAction] = useState<PanelAction>(null)
  const [scheduleMessage, setScheduleMessage] = useState('')
  const [saveMessage, setSaveMessage] = useState('')

  const selectedUser = useMemo(
    () => users.find((user) => user.id === selectedUserId) || null,
    [users, selectedUserId]
  )

  const [editForm, setEditForm] = useState({
    role: '',
    status: '',
    city: '',
    phone: '',
    note: ''
  })

  function openPanel(user: UserRecord, action: Exclude<PanelAction, null>) {
    setSelectedUserId(user.id)
    setSelectedAction(action)
    setScheduleMessage('')
    setSaveMessage('')

    if (action === 'edit') {
      setEditForm({
        role: user.role,
        status: user.status,
        city: user.city,
        phone: user.phone,
        note: user.note
      })
    }
  }

  useEffect(() => {
    if (!selectedUser || !selectedAction) return

    const panel = document.getElementById('user-panel')
    panel?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [selectedUser, selectedAction])

  function closePanel() {
    setSelectedUserId(null)
    setSelectedAction(null)
    setScheduleMessage('')
    setSaveMessage('')
  }

  function saveUserChanges() {
    if (!selectedUser) return

    setUsers((current) =>
      current.map((user) =>
        user.id === selectedUser.id
          ? {
              ...user,
              role: editForm.role,
              status: editForm.status,
              city: editForm.city,
              phone: editForm.phone,
              note: editForm.note
            }
          : user
      )
    )
    setSelectedAction('view')
    setSaveMessage(`Les modifications de ${selectedUser.name} ont bien ete enregistrees.`)
  }

  function confirmPlanning() {
    if (!selectedUser) return
    setScheduleMessage(`Entretien planifie pour ${selectedUser.name} demain a 10:00.`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-amber-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="overflow-hidden rounded-[2rem] bg-white shadow-xl ring-1 ring-slate-200">
          <div className="bg-gradient-to-r from-slate-950 via-neutral-900 to-zinc-800 px-6 py-8 text-white sm:px-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.22em] text-amber-300">Gestion utilisateurs</p>
                <h1 className="mt-2 text-3xl font-bold sm:text-4xl">Administration des comptes</h1>
                <p className="mt-3 max-w-2xl text-sm text-slate-200 sm:text-base">
                  Suivez les roles, les permissions et la securite des utilisateurs de votre plateforme immobiliere.
                </p>
              </div>
              <Link
                href="/"
                className="rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white hover:text-slate-900"
              >
                Retour accueil
              </Link>
            </div>
          </div>

          <div className="border-b border-slate-200 bg-slate-50 px-6 py-6 sm:px-8">
            <div className="grid gap-4 md:grid-cols-4">
              {roleStats.map((stat) => (
                <div key={stat.label} className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
                  <div className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] ${stat.tone}`}>
                    {stat.label}
                  </div>
                  <p className="mt-3 text-3xl font-bold text-slate-900">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="px-6 py-8 sm:px-8">
            {selectedUser && (
              <div className="mb-8 rounded-[2rem] border border-amber-200 bg-amber-50 p-6">
                <div id="user-panel"></div>
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-800">
                      {selectedAction === 'edit' ? 'Modification utilisateur' : selectedAction === 'schedule' ? 'Planification' : 'Profil utilisateur'}
                    </p>
                    <h2 className="mt-2 text-2xl font-bold text-slate-900">{selectedUser.name}</h2>
                    <p className="mt-1 text-sm text-slate-600">{selectedUser.email}</p>
                  </div>
                  <button
                    onClick={closePanel}
                    className="rounded-xl border border-amber-300 bg-white px-4 py-2 text-sm font-medium text-amber-800 transition hover:bg-amber-100"
                  >
                    Fermer
                  </button>
                </div>

                {selectedAction === 'edit' && (
                  <div className="mt-6 grid gap-4 md:grid-cols-2">
                    <label className="rounded-2xl bg-white p-4 ring-1 ring-amber-100">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Role</p>
                      <select
                        value={editForm.role}
                        onChange={(e) => setEditForm((current) => ({ ...current, role: e.target.value }))}
                        className="mt-3 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none"
                      >
                        <option>Administrateur</option>
                        <option>Agent immobilier</option>
                        <option>Gestionnaire</option>
                        <option>Client premium</option>
                      </select>
                    </label>

                    <label className="rounded-2xl bg-white p-4 ring-1 ring-amber-100">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Statut</p>
                      <select
                        value={editForm.status}
                        onChange={(e) => setEditForm((current) => ({ ...current, status: e.target.value }))}
                        className="mt-3 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none"
                      >
                        <option>Actif</option>
                        <option>En attente</option>
                        <option>Suspendu</option>
                      </select>
                    </label>

                    <label className="rounded-2xl bg-white p-4 ring-1 ring-amber-100">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Ville</p>
                      <input
                        value={editForm.city}
                        onChange={(e) => setEditForm((current) => ({ ...current, city: e.target.value }))}
                        className="mt-3 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none"
                      />
                    </label>

                    <label className="rounded-2xl bg-white p-4 ring-1 ring-amber-100">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Telephone</p>
                      <input
                        value={editForm.phone}
                        onChange={(e) => setEditForm((current) => ({ ...current, phone: e.target.value }))}
                        className="mt-3 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none"
                      />
                    </label>

                    <label className="rounded-2xl bg-white p-4 ring-1 ring-amber-100 md:col-span-2">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Note</p>
                      <textarea
                        value={editForm.note}
                        onChange={(e) => setEditForm((current) => ({ ...current, note: e.target.value }))}
                        rows={4}
                        className="mt-3 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none"
                      />
                    </label>

                    <div className="md:col-span-2 flex gap-3">
                      <button
                        onClick={saveUserChanges}
                        className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-700"
                      >
                        Enregistrer les modifications
                      </button>
                      <button
                        onClick={closePanel}
                        className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                      >
                        Annuler
                      </button>
                    </div>
                  </div>
                )}

                {selectedAction === 'schedule' && (
                  <div className="mt-6">
                    <div className="grid gap-4 md:grid-cols-3">
                      <div className="rounded-2xl bg-white p-5 ring-1 ring-amber-100">
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Objet</p>
                        <p className="mt-2 text-lg font-semibold text-slate-900">Entretien utilisateur</p>
                      </div>
                      <div className="rounded-2xl bg-white p-5 ring-1 ring-amber-100">
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Date proposee</p>
                        <p className="mt-2 text-lg font-semibold text-slate-900">Demain, 10:00</p>
                      </div>
                      <div className="rounded-2xl bg-white p-5 ring-1 ring-amber-100">
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Canal</p>
                        <p className="mt-2 text-lg font-semibold text-slate-900">Appel / Visio</p>
                      </div>
                    </div>
                    <div className="mt-5 flex gap-3">
                      <button
                        onClick={confirmPlanning}
                        className="rounded-xl bg-amber-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-amber-700"
                      >
                        Confirmer la planification
                      </button>
                      <button
                        onClick={closePanel}
                        className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                      >
                        Fermer
                      </button>
                    </div>
                    {scheduleMessage && (
                      <div className="mt-4 rounded-2xl bg-white p-4 text-sm font-medium text-emerald-700 ring-1 ring-emerald-100">
                        {scheduleMessage}
                      </div>
                    )}
                  </div>
                )}

                {selectedAction === 'view' && (
                  <div className="mt-6">
                    {saveMessage && (
                      <div className="mb-4 rounded-2xl bg-white p-4 text-sm font-medium text-emerald-700 ring-1 ring-emerald-100">
                        {saveMessage}
                      </div>
                    )}

                    <div className="grid gap-4 md:grid-cols-3">
                      <div className="rounded-2xl bg-white p-5 ring-1 ring-amber-100">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Telephone</p>
                      <p className="mt-2 text-lg font-semibold text-slate-900">{selectedUser.phone}</p>
                      </div>
                      <div className="rounded-2xl bg-white p-5 ring-1 ring-amber-100">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Ville</p>
                      <p className="mt-2 text-lg font-semibold text-slate-900">{selectedUser.city}</p>
                      </div>
                      <div className="rounded-2xl bg-white p-5 ring-1 ring-amber-100">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Derniere connexion</p>
                      <p className="mt-2 text-lg font-semibold text-slate-900">{selectedUser.lastLogin}</p>
                      </div>
                      <div className="rounded-2xl bg-white p-5 ring-1 ring-amber-100 md:col-span-3">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Note</p>
                      <p className="mt-2 text-sm leading-6 text-slate-700">{selectedUser.note}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="mb-6 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="rounded-3xl bg-amber-50 p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-800">Informations utiles</p>
                <ul className="mt-4 space-y-3 text-sm text-slate-700">
                  <li>Chaque compte utilisateur possede un role, un statut et un niveau d acces.</li>
                  <li>Les administrateurs gerent les permissions et valident les nouveaux comptes.</li>
                  <li>Les agents publient les biens, suivent les clients et gerent les demandes.</li>
                  <li>Les gestionnaires suivent les contrats, paiements et relances.</li>
                </ul>
              </div>

              <div className="rounded-3xl bg-slate-100 p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Authentification securisee</p>
                <div className="mt-4 space-y-3 text-sm text-slate-700">
                  <p>Connexion par email et mot de passe.</p>
                  <p>Validation des comptes sensibles par administrateur.</p>
                  <p>Historique de connexion et suivi du dernier acces.</p>
                  <p>Suspension rapide des comptes a risque.</p>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-3xl border border-slate-200">
              <div className="hidden grid-cols-[1.3fr_1fr_0.8fr_1.2fr] gap-4 bg-slate-900 px-5 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-slate-300 lg:grid">
                <div>Utilisateur</div>
                <div>Role</div>
                <div>Statut</div>
                <div>Actions</div>
              </div>

              <div className="divide-y divide-slate-200">
                {users.map((user) => (
                  <div key={user.id} className="bg-white px-5 py-5">
                    <div className="grid gap-4 lg:grid-cols-[1.3fr_1fr_0.8fr_1.2fr]">
                      <div>
                        <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400 lg:hidden">Utilisateur</p>
                        <p className="text-lg font-semibold text-slate-900">{user.name}</p>
                        <p className="mt-1 text-sm text-slate-600">{user.email}</p>
                        <p className="mt-1 text-sm text-slate-500">{user.city}</p>
                      </div>

                      <div>
                        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400 lg:hidden">Role</p>
                        <span className="inline-flex rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-amber-800">
                          {user.role}
                        </span>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {user.permissions.map((permission) => (
                            <span
                              key={permission}
                              className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
                            >
                              {permission}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400 lg:hidden">Statut</p>
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] ${
                            user.status === 'Actif'
                              ? 'bg-emerald-100 text-emerald-800'
                              : user.status === 'En attente'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {user.status}
                        </span>
                        <p className="mt-3 text-sm font-medium text-slate-900">{user.lastLogin}</p>
                      </div>

                      <div>
                        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400 lg:hidden">Actions</p>
                        <div className="grid gap-2 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                          <button
                            onClick={() => openPanel(user, 'view')}
                            type="button"
                            className="flex min-h-9 cursor-pointer items-center justify-center rounded-lg bg-slate-900 px-3 py-2 text-xs font-medium text-white transition hover:bg-slate-700"
                          >
                            Voir profil
                          </button>
                          <button
                            onClick={() => openPanel(user, 'edit')}
                            type="button"
                            className="flex min-h-9 cursor-pointer items-center justify-center rounded-lg border border-slate-300 px-3 py-2 text-xs font-medium text-slate-700 transition hover:bg-slate-100"
                          >
                            Modifier
                          </button>
                          <button
                            onClick={() => openPanel(user, 'schedule')}
                            type="button"
                            className="flex min-h-9 cursor-pointer items-center justify-center rounded-lg border border-amber-300 bg-amber-50 px-3 py-2 text-xs font-medium text-amber-800 transition hover:bg-amber-100"
                          >
                            Planifier
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
