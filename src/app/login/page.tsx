'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/ui/password-input'
import { login } from '@/http/login'

const loginSchema = z.object({
  email: z.string().nonempty('Informe o e-mail').email('E-mail inválido'),
  password: z.string().nonempty('Informe a senha'),
})

type LoginSchema = z.infer<typeof loginSchema>

export default function LoginPage() {
  const router = useRouter()
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function handleLogin({ email, password }: LoginSchema) {
    const response = await login({ email, password })
    if (response.status === 401) {
      toast.error('Email ou senha incorretos')
    }

    if (response.status === 500) {
      toast.error('Ocorreu um erro ao realizar o login.')
    }

    if (response.ok) {
      toast.success('Login realizado com sucesso!')
      router.push('/')
    }
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <Form {...form}>
        <form
          method="POST"
          onSubmit={form.handleSubmit(handleLogin)}
          className="w-[390px] flex flex-col items-center bg-zinc-900 rounded-lg border py-8 px-12 gap-6"
        >
          <div className="flex flex-col items-center gap-4">
            <Image
              src="/testlab-logo.png"
              width={80}
              height={80}
              alt="Logo do projeto Testlab"
              draggable={false}
            />
            <h1 className="text-2xl">Login</h1>
          </div>
          <div className="w-full flex flex-col gap-3">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Email" autoComplete="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <PasswordInput placeholder="Senha" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" className="w-full uppercase">
            Entrar
          </Button>

          <span className="text-sm">
            Não possui conta?{' '}
            <Link className="underline" href="/register">
              Cadastre-se
            </Link>
          </span>
        </form>
      </Form>
    </div>
  )
}
