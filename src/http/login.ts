import type { LoginRequestBody } from '@/app/api/login/route'

export async function login({ email, password }: LoginRequestBody) {
  return fetch('/api/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })
}
