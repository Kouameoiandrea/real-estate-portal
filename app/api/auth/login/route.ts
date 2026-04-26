import bcrypt from 'bcryptjs'
import { NextResponse } from 'next/server'
import { signAuthToken, AUTH_COOKIE_NAME } from '../../../../lib/auth'
import { prisma } from '../../../../lib/prisma'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const email = String(body.email || '')
      .trim()
      .toLowerCase()
    const password = String(body.password || '')

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email et mot de passe obligatoires.' },
        { status: 400 }
      )
    }

    const user = await prisma.user.findUnique({
      where: {
        email
      }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'Identifiants invalides.' },
        { status: 401 }
      )
    }

    const isValidPassword = await bcrypt.compare(password, user.password)

    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'Identifiants invalides.' },
        { status: 401 }
      )
    }

    const token = signAuthToken({
      userId: user.id,
      email: user.email,
      username: user.username,
      role: user.role
    })

    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role
      }
    })

    response.cookies.set(AUTH_COOKIE_NAME, token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24 * 7
    })

    return response
  } catch {
    return NextResponse.json(
      { error: "Impossible de se connecter pour l'instant." },
      { status: 500 }
    )
  }
}
