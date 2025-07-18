'use server'

import { prisma } from '@/lib/prisma'

export async function getUserProjects(userId: string) {
  const projects = await prisma.project.findMany({
    where: {
      users: {
        some: {
          id: userId,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return projects
}
