import { jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const token = (await cookies()).get('testlab-user-token')

  if (!token) {
    redirect('/login')
  }

  try {
    await jwtVerify(token.value, new TextEncoder().encode(process.env.JWT_SECRET!))
  } catch (error) {
    redirect('/login')
  }

  return children
}
