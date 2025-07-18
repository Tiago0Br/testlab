import { redirect } from 'next/navigation'
import { getLoggedUser } from '@/actions/get-logged-user'
import { Header } from '@/components/header'
import { UserProvider } from '@/contexts/user-context'

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  try {
    const user = await getLoggedUser()

    return (
      <UserProvider user={user}>
        <div className="flex flex-col w-full">
          <Header />
          {children}
        </div>
      </UserProvider>
    )
  } catch {
    redirect('/login')
  }
}
