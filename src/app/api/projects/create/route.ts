import { type NextRequest, NextResponse } from 'next/server'
import { getLoggedUser } from '@/actions/get-logged-user'
import { prisma } from '@/lib/prisma'

interface CreateProjectRequestBody {
  name: string
  description?: string
}

export async function POST(request: NextRequest) {
  const { name, description } = (await request.json()) as CreateProjectRequestBody
  const user = await getLoggedUser()

  await prisma.project.create({
    data: {
      name,
      description,
      users: {
        connect: {
          id: user.id,
        },
      },
    },
  })

  return NextResponse.json({ message: 'Projeto criado com sucesso' }, { status: 201 })
}
