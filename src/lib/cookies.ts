import { cookies } from 'next/headers'
import type { NextResponse } from 'next/server'

const USER_TOKEN_COOKIE = 'testlab-user-token'

export const COOKIE_CONFIG = {
  USER_TOKEN: {
    httpOnly: true,
    secure: true,
    sameSite: 'lax' as const,
    path: '/',
    maxAge: 60 * 60 * 24, // 24 horas
  },
} as const

export function setUserTokenCookie(response: NextResponse, token: string) {
  response.cookies.set(USER_TOKEN_COOKIE, token, COOKIE_CONFIG.USER_TOKEN)
}

export async function getUserTokenCookie() {
  const cookieStore = await cookies()
  return cookieStore.get(USER_TOKEN_COOKIE)
}

export async function deleteUserTokenCookie() {
  const cookieStore = await cookies()
  cookieStore.delete(USER_TOKEN_COOKIE)
}
