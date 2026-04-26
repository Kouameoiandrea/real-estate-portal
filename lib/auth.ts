import jwt from 'jsonwebtoken'

export const AUTH_COOKIE_NAME = 'immopro_session'

type AuthPayload = {
  userId: string
  email: string
  username: string
  role: string
}

function getJwtSecret() {
  return process.env.JWT_SECRET || 'immopro-dev-secret'
}

export function signAuthToken(payload: AuthPayload) {
  return jwt.sign(payload, getJwtSecret(), {
    expiresIn: '7d'
  })
}

export function verifyAuthToken(token: string) {
  try {
    return jwt.verify(token, getJwtSecret()) as AuthPayload
  } catch {
    return null
  }
}
