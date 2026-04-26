import bcrypt from 'bcryptjs'
import { NextResponse } from 'next/server'
import { signAuthToken, AUTH_COOKIE_NAME } from '../../../../lib/auth'
import { prisma } from '../../../../lib/prisma'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const fullName = String(body.fullName || '').trim()
    const email = String(body.email || '')
      .trim()
      .toLowerCase()
    const password = String(body.password || '')

    if (!fullName || !email || !password) {
      return NextResponse.json(
        { error: 'Tous les champs sont obligatoires.' },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Le mot de passe doit contenir au moins 6 caracteres.' },
        { status: 400 }
      )
    }

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username: email }]
      }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'Un compte existe deja avec cet email.' },
        { status: 409 }
      )
    }

    const [firstName, ...rest] = fullName.split(' ').filter(Boolean)
    const lastName = rest.join(' ') || null
    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data: {
        email,
        username: email,
        password: hashedPassword,
        firstName: firstName || null,
        lastName
      }
    })

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
      { error: "Impossible de creer le compte pour l'instant." },
      { status: 500 }
    )
  }
}
