'use client'

import { LogOutIcon, UserRoundPenIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { logout } from '@/actions/logout'
import { Button } from './ui/button'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from './ui/navigation-menu'

export function Header() {
  async function handleLogout() {
    await logout()
    redirect('/login')
  }

  return (
    <header className="py-4 px-30 flex justify-between">
      <div className="text-2xl font-bold">
        <Link href="/" draggable={false}>
          <Image
            src="/testlab-banner.png"
            alt="Testlab Banner"
            width={200}
            height={50}
            draggable={false}
          />
        </Link>
      </div>
      <NavigationMenu viewport={false}>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link href="/">
                <span className="flex items-center gap-2">
                  <UserRoundPenIcon />
                  Perfil
                </span>
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Button
                variant="link"
                className="text-foreground hover:no-underline"
                onClick={handleLogout}
              >
                <span className="flex items-center gap-2">
                  <LogOutIcon />
                  Sair
                </span>
              </Button>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  )
}
