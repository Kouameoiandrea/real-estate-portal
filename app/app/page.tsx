import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { AUTH_COOKIE_NAME, verifyAuthToken } from '../../lib/auth'

export default async function ApplicationEntryPage() {
  const cookieStore = await cookies()
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value
  const session = token ? verifyAuthToken(token) : null

  if (!session) {
    redirect('/login')
  }

  redirect('/dashboard')
}
