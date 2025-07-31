'use server'

import { deleteUserTokenCookie } from '@/lib/cookies'

export async function logout() {
  await deleteUserTokenCookie()
}
