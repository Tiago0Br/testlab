'use server'

import { jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { env } from '@/env'
import { prisma } from '@/lib/prisma'

export async function getLoggedUser() {
  const token = (await cookies()).get('testlab-user-token')

  if (!token) {
    throw new Error('User not authenticated')
  }

  try {
    const result = await jwtVerify(token.value, new TextEncoder().encode(env.JWT_SECRET))
    const userId = result.payload.user_id as string

    const user = await prisma.user.findUnique({
      where: { id: userId },
    })

    if (!user) {
      throw new Error('User not found')
    }

    return user
  } catch {
    throw new Error('User not authenticated')
  }
}
