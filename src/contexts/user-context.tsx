'use client'

import { createContext, type ReactNode, useContext } from 'react'
import type { User } from '@/generated/prisma'

interface UserContextType {
  user: User
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children, user }: { children: ReactNode; user: User }) {
  return <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
}

export function useUser() {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}
