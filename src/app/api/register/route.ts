import bcrypt from 'bcrypt'
import { type NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export interface RegisterRequestBody {
  name: string
  email: string
  password: string
}

export async function POST(request: NextRequest) {
  const { name, email, password } = (await request.json()) as RegisterRequestBody

  const userAlreadyExists = await prisma.user.findFirst({
    where: {
      email,
    },
  })

  if (userAlreadyExists) {
    return NextResponse.json({ error: 'Email já cadastrado' }, { status: 400 })
  }

  await prisma.user.create({
    data: {
      name,
      email,
      password: await bcrypt.hash(password, 10),
    },
  })

  return NextResponse.json({ message: 'Usuário criado com sucesso' }, { status: 201 })
}
