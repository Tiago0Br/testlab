import bcrypt from 'bcrypt'
import { SignJWT } from 'jose'
import { type NextRequest, NextResponse } from 'next/server'
import { env } from '@/env'
import { setUserTokenCookie } from '@/lib/cookies'
import { prisma } from '@/lib/prisma'

export interface LoginRequestBody {
  email: string
  password: string
}

export async function POST(request: NextRequest) {
  const { email, password } = (await request.json()) as LoginRequestBody

  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  })

  if (!user) {
    return NextResponse.json({ error: 'Email ou senha incorretos' }, { status: 401 })
  }

  const isValidPassword = await bcrypt.compare(password, user.password)

  if (!isValidPassword) {
    return NextResponse.json({ error: 'Email ou senha incorretos' }, { status: 401 })
  }

  const token = await new SignJWT({ user_id: user.id })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('2h')
    .sign(new TextEncoder().encode(env.JWT_SECRET))

  const response = NextResponse.json({ user }, { status: 200 })

  setUserTokenCookie(response, token)

  return response
}
