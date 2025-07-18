import { LogOutIcon, UserRoundPenIcon } from 'lucide-react'
import Link from 'next/link'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from './ui/navigation-menu'

export function Header() {
  return (
    <header className="py-4 px-30 flex justify-between">
      <div className="text-2xl font-bold">
        <Link href="/">
          <span className="text-rose-500">Test</span>
          <span className="text-green-500">Lab</span>
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
              <Link href="/">
                <span className="flex items-center gap-2">
                  <LogOutIcon />
                  Sair
                </span>
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  )
}
