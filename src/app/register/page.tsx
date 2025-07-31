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
import { register } from '@/http/register'

const registerSchema = z
  .object({
    name: z.string().nonempty('Informe o nome'),
    email: z.string().nonempty('Informe o e-mail').email('E-mail inválido'),
    password: z
      .string()
      .nonempty('Informe a senha')
      .min(6, 'A senha deve ter pelo menos 6 caracteres'),
    confirmPassword: z.string().nonempty('Informe a confirmação da senha'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  })

type RegisterFormSchema = z.infer<typeof registerSchema>

export default function RegisterPage() {
  const router = useRouter()
  const form = useForm<RegisterFormSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  async function handleRegister({ name, email, password }: RegisterFormSchema) {
    const response = await register({ name, email, password })
    if (response.ok) {
      toast.success('Cadastro realizado com sucesso!')
      router.push('/login')
    } else {
      toast.error('Ocorreu um erro ao realizar o cadastro.')
    }
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <Form {...form}>
        <form
          method="POST"
          onSubmit={form.handleSubmit(handleRegister)}
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
            <h1 className="text-2xl">Cadastre-se</h1>
          </div>
          <div className="w-full flex flex-col gap-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Nome" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="E-mail" autoComplete="email" {...field} />
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
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <PasswordInput placeholder="Confirmar Senha" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" className="w-full uppercase">
            Cadastrar
          </Button>

          <span className="text-sm">
            Já possui conta?{' '}
            <Link className="underline" href="/login">
              Login
            </Link>
          </span>
        </form>
      </Form>
    </div>
  )
}
