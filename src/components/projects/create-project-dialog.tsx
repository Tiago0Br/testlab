'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import z from 'zod'
import { Button } from '../ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'

const createProjectSchema = z.object({
  name: z.string().min(3, 'O nome deve ter pelo menos 3 caracteres'),
  description: z.string().optional(),
})

type CreateProjectFormSchema = z.infer<typeof createProjectSchema>

export function CreateProjectDialog() {
  const form = useForm<CreateProjectFormSchema>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      name: '',
      description: '',
    },
  })

  function handleCreateProject(data: CreateProjectFormSchema) {
    console.log('morra tiago!!!', data)
    fetch('/api/projects/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          form.reset()
          toast.success('Projeto criado com sucesso!')
        } else {
          toast.error('Erro ao criar o projeto.')
        }
      })
      .catch(() => {
        toast.error('Erro ao criar o projeto.')
      })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Novo projeto</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form
            method="POST"
            onSubmit={form.handleSubmit(handleCreateProject)}
            className="flex flex-col gap-4"
          >
            <DialogHeader>
              <DialogTitle>Novo projeto de testes</DialogTitle>
              <DialogDescription>
                Crie um novo projeto de testes preenchendo os campos abaixo.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Nome do projeto" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea placeholder="Descrição" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancelar</Button>
              </DialogClose>
              <Button type="submit">Cadastrar</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
