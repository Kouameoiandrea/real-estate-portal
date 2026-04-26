import Link from 'next/link'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { AUTH_COOKIE_NAME, verifyAuthToken } from '../../lib/auth'
import { prisma } from '../../lib/prisma'

async function logout() {
  'use server'

  const cookieStore = await cookies()
  cookieStore.set(AUTH_COOKIE_NAME, '', {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 0
  })

  redirect('/login')
}

function formatRole(role: string) {
  if (role === 'CLIENT') return 'Client'
  if (role === 'ADMIN') return 'Administrateur'
  if (role === 'AGENT') return 'Agent'
  return role
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  }).format(date)
}

export default async function DashboardPage() {
  const cookieStore = await cookies()
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value
  const session = token ? verifyAuthToken(token) : null

  if (!session) {
    redirect('/login')
  }

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    include: {
      listings: {
        orderBy: { createdAt: 'desc' },
        take: 3
      },
      transactions: {
        orderBy: { date: 'desc' },
        take: 3
      }
    }
  })

  if (!user) {
    redirect('/login')
  }

  const fullName = [user.firstName, user.lastName].filter(Boolean).join(' ')
  const displayName = fullName || (user.username.includes('@') ? user.username.split('@')[0] : user.username)
  const roleLabel = formatRole(user.role)
  const listingsCount = user.listings.length
  const transactionsCount = user.transactions.length
  const activeTransactions = user.transactions.filter(
    (transaction) => transaction.status === 'PENDING' || transaction.status === 'PAID'
  ).length
  const totalVolume = user.transactions.reduce((sum, transaction) => sum + transaction.amount, 0)

  const profileCompletionItems = [
    Boolean(user.firstName || user.lastName),
    Boolean(user.email),
    Boolean(user.phone)
  ]
  const profileCompletion = Math.round(
    (profileCompletionItems.filter(Boolean).length / profileCompletionItems.length) * 100
  )

  return (
    <div className="min-h-screen bg-[#f4efe6] px-4 py-8 text-slate-900">
      <div className="mx-auto max-w-6xl space-y-6">
        <section className="overflow-hidden rounded-[36px] border border-[#d8cfbf] bg-[#fffaf2] shadow-[0_24px_70px_rgba(58,42,29,0.08)]">
          <div className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(212,116,69,0.28),_transparent_36%),linear-gradient(135deg,#17352b_0%,#21483b_55%,#305848_100%)] px-8 py-8 text-[#fff7ee]">
            <div className="absolute right-[-40px] top-[-40px] h-40 w-40 rounded-full bg-[#d47445]/25 blur-2xl" />
            <div className="absolute bottom-[-50px] left-[25%] h-36 w-36 rounded-full bg-[#f0d6a8]/10 blur-2xl" />

            <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <div className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#f4ddbe]">
                  Espace client
                </div>
                <h1 className="mt-5 text-4xl font-black tracking-tight md:text-5xl">
                  Bonjour {displayName}
                </h1>
                <p className="mt-4 max-w-2xl text-base leading-7 text-[#e5eee8]">
                  Retrouvez ici votre compte, vos activites recentes et les raccourcis
                  utiles pour gerer votre parcours immobilier en toute simplicite.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/listings"
                  className="rounded-2xl bg-[#fff4e7] px-5 py-3 text-sm font-semibold text-[#17352b] transition hover:bg-white"
                >
                  Explorer les biens
                </Link>
                <form action={logout}>
                  <button
                    type="submit"
                    className="rounded-2xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
                  >
                    Se deconnecter
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div className="grid gap-4 border-t border-[#e6dccb] bg-[#fffaf2] px-8 py-6 md:grid-cols-4">
            <HeroStat label="Profil" value={roleLabel} helper="Type de compte actif" accent="bg-[#17352b]" />
            <HeroStat label="Profil complet" value={`${profileCompletion}%`} helper="Informations disponibles" accent="bg-[#d47445]" />
            <HeroStat label="Operations" value={transactionsCount} helper="Transactions recentes chargees" accent="bg-[#9f6c3d]" />
            <HeroStat label="Volume" value={`${Math.round(totalVolume).toLocaleString('fr-FR')} FCFA`} helper="Montant cumule observe" accent="bg-[#305848]" />
          </div>
        </section>

        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <section className="space-y-6">
            <div className="grid gap-4 md:grid-cols-3">
              <SoftCard title="Compte actif" value={user.email} helper="Adresse utilisee pour la connexion" />
              <SoftCard title="Biens charges" value={listingsCount} helper="Biens recents associes a votre compte" />
              <SoftCard title="Suivi en cours" value={activeTransactions} helper="Operations avec statut actif" />
            </div>

            <div className="rounded-[30px] border border-[#d8cfbf] bg-[#fffaf2] p-6 shadow-[0_16px_40px_rgba(58,42,29,0.06)]">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">Vue d&apos;ensemble</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Un resume rapide de votre espace apres connexion.
                  </p>
                </div>
                <div className="rounded-full bg-[#efe4d4] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#7b5a3d]">
                  Tableau de bord
                </div>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <Panel
                  eyebrow="Identite"
                  title={displayName}
                  description="Votre nom d affichage est utilise pour personnaliser l espace client."
                >
                  <InfoRow label="Email" value={user.email} />
                  <InfoRow label="Telephone" value={user.phone || 'A completer'} />
                  <InfoRow label="Inscription" value={formatDate(user.createdAt)} />
                </Panel>

                <Panel
                  eyebrow="Etat du compte"
                  title={`${profileCompletion}% complete`}
                  description="Un profil complete facilite la gestion de vos demandes et interactions."
                >
                  <ProgressBar value={profileCompletion} />
                  <div className="mt-4 space-y-2 text-sm text-slate-600">
                    <ChecklistItem done={Boolean(user.firstName || user.lastName)} label="Nom renseigne" />
                    <ChecklistItem done={Boolean(user.email)} label="Email valide" />
                    <ChecklistItem done={Boolean(user.phone)} label="Telephone renseigne" />
                  </div>
                </Panel>
              </div>
            </div>

            <div className="rounded-[30px] border border-[#d8cfbf] bg-[#fffaf2] p-6 shadow-[0_16px_40px_rgba(58,42,29,0.06)]">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">Actions rapides</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Accedez directement aux zones les plus utiles du portail.
                  </p>
                </div>
                <div className="rounded-full bg-[#e4efe9] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#305848]">
                  Navigation
                </div>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <QuickLink
                  href="/"
                  title="Accueil public"
                  description="Retournez a la vitrine principale du portail."
                  tone="bg-[#17352b] text-white"
                />
                <QuickLink
                  href="/listings"
                  title="Biens"
                  description="Parcourez le referentiel immobilier."
                  tone="bg-[#fff4e7] text-[#17352b]"
                />
                <QuickLink
                  href="/search"
                  title="Recherche"
                  description="Relancez une recherche rapide par zone ou type."
                  tone="bg-[#f6ebe2] text-[#8a4a2c]"
                />
                <QuickLink
                  href="/finance"
                  title="Finances"
                  description="Consultez la partie financiere disponible."
                  tone="bg-[#ebf3ee] text-[#305848]"
                />
              </div>
            </div>
          </section>

          <aside className="space-y-6">
            <div className="rounded-[30px] border border-[#d8cfbf] bg-[#fffaf2] p-6 shadow-[0_16px_40px_rgba(58,42,29,0.06)]">
              <h2 className="text-xl font-bold text-slate-900">Derniers biens</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Les derniers biens rattaches a votre compte.
              </p>

              <div className="mt-5 space-y-3">
                {user.listings.length === 0 ? (
                  <EmptyState
                    title="Aucun bien recent"
                    description="Votre compte ne contient pas encore de bien associe."
                  />
                ) : (
                  user.listings.map((listing) => (
                    <div key={listing.id} className="rounded-2xl border border-[#e8dece] bg-[#fffcf7] p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="text-base font-semibold text-slate-900">{listing.title}</div>
                          <div className="mt-1 text-sm text-slate-600">
                            {listing.city} • {listing.type}
                          </div>
                        </div>
                        <span className="rounded-full bg-[#efe4d4] px-3 py-1 text-xs font-semibold text-[#7b5a3d]">
                          {listing.status}
                        </span>
                      </div>
                      <div className="mt-3 text-sm font-semibold text-[#17352b]">
                        {Math.round(listing.price).toLocaleString('fr-FR')} FCFA
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="rounded-[30px] border border-[#d8cfbf] bg-[#fffaf2] p-6 shadow-[0_16px_40px_rgba(58,42,29,0.06)]">
              <h2 className="text-xl font-bold text-slate-900">Activite recente</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Apercu des dernieres transactions connues.
              </p>

              <div className="mt-5 space-y-3">
                {user.transactions.length === 0 ? (
                  <EmptyState
                    title="Aucune transaction recente"
                    description="Les operations s afficheront ici lorsqu elles seront creees."
                  />
                ) : (
                  user.transactions.map((transaction) => (
                    <div key={transaction.id} className="rounded-2xl border border-[#e8dece] bg-[#fffcf7] p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="text-base font-semibold text-slate-900">{transaction.type}</div>
                          <div className="mt-1 text-sm text-slate-600">
                            {transaction.description || 'Operation immobiliere'}
                          </div>
                        </div>
                        <span className="rounded-full bg-[#ebf3ee] px-3 py-1 text-xs font-semibold text-[#305848]">
                          {transaction.status}
                        </span>
                      </div>
                      <div className="mt-3 flex items-center justify-between text-sm">
                        <span className="font-semibold text-[#8a4a2c]">
                          {Math.round(transaction.amount).toLocaleString('fr-FR')} FCFA
                        </span>
                        <span className="text-slate-500">{formatDate(transaction.date)}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="rounded-[30px] border border-[#d8cfbf] bg-[linear-gradient(135deg,#fff2df_0%,#f8e3cc_100%)] p-6 shadow-[0_16px_40px_rgba(58,42,29,0.06)]">
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8a4a2c]">
                Conseil
              </div>
              <h2 className="mt-3 text-xl font-bold text-slate-900">Prochaine bonne etape</h2>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                Completez votre profil et consultez les biens pour rendre votre espace
                client plus utile des maintenant.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href="/register"
                  className="rounded-2xl bg-[#8a4a2c] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#72381e]"
                >
                  Voir le parcours d inscription
                </Link>
                <Link
                  href="/search"
                  className="rounded-2xl border border-[#c89b79] px-4 py-3 text-sm font-semibold text-[#8a4a2c] transition hover:bg-white/50"
                >
                  Lancer une recherche
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}

function HeroStat({
  label,
  value,
  helper,
  accent
}: {
  label: string
  value: string | number
  helper: string
  accent: string
}) {
  return (
    <div className="rounded-[24px] border border-[#e6dccb] bg-white/70 p-4 backdrop-blur">
      <div className={`h-1.5 w-14 rounded-full ${accent}`} />
      <div className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{label}</div>
      <div className="mt-2 text-2xl font-black tracking-tight text-slate-900">{value}</div>
      <div className="mt-2 text-sm leading-5 text-slate-600">{helper}</div>
    </div>
  )
}

function SoftCard({
  title,
  value,
  helper
}: {
  title: string
  value: string | number
  helper: string
}) {
  return (
    <div className="rounded-[24px] border border-[#d8cfbf] bg-[#fffaf2] p-5 shadow-[0_12px_28px_rgba(58,42,29,0.05)]">
      <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{title}</div>
      <div className="mt-3 break-words text-xl font-bold text-slate-900">{value}</div>
      <div className="mt-2 text-sm leading-6 text-slate-600">{helper}</div>
    </div>
  )
}

function Panel({
  eyebrow,
  title,
  description,
  children
}: {
  eyebrow: string
  title: string
  description: string
  children: React.ReactNode
}) {
  return (
    <div className="rounded-[26px] border border-[#e8dece] bg-[#fffcf7] p-5">
      <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8a4a2c]">{eyebrow}</div>
      <div className="mt-2 text-xl font-bold text-slate-900">{title}</div>
      <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
      <div className="mt-5">{children}</div>
    </div>
  )
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-[#efe4d4] py-3 last:border-b-0 last:pb-0">
      <div className="text-sm text-slate-500">{label}</div>
      <div className="max-w-[65%] break-words text-right text-sm font-semibold text-slate-900">{value}</div>
    </div>
  )
}

function ProgressBar({ value }: { value: number }) {
  return (
    <div className="overflow-hidden rounded-full bg-[#efe4d4]">
      <div
        className="h-3 rounded-full bg-[linear-gradient(90deg,#d47445_0%,#17352b_100%)]"
        style={{ width: `${value}%` }}
      />
    </div>
  )
}

function ChecklistItem({ done, label }: { done: boolean; label: string }) {
  return (
    <div className="flex items-center gap-3">
      <span
        className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
          done ? 'bg-[#17352b] text-white' : 'bg-[#efe4d4] text-[#8a4a2c]'
        }`}
      >
        {done ? 'OK' : '...'}
      </span>
      <span>{label}</span>
    </div>
  )
}

function QuickLink({
  href,
  title,
  description,
  tone
}: {
  href: string
  title: string
  description: string
  tone: string
}) {
  return (
    <Link href={href} className={`rounded-[24px] p-5 transition hover:translate-y-[-2px] ${tone}`}>
      <div className="text-base font-bold">{title}</div>
      <div className="mt-2 text-sm leading-6 opacity-80">{description}</div>
    </Link>
  )
}

function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-[#d8cfbf] bg-[#fffdf9] px-4 py-6 text-center">
      <div className="text-sm font-semibold text-slate-900">{title}</div>
      <div className="mt-2 text-sm leading-6 text-slate-600">{description}</div>
    </div>
  )
}
