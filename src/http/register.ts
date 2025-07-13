import type { RegisterRequestBody } from '@/app/api/register/route'

export function register({ name, email, password }: RegisterRequestBody) {
  return fetch('/api/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password }),
  })
}
