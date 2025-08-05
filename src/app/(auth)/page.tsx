import { getLoggedUser } from '@/actions/get-logged-user'
import { getUserProjects } from '@/actions/get-user-projects'
import { CreateProjectDialog } from '@/components/projects/create-project-dialog'

export default async function Home() {
  const user = await getLoggedUser()
  const projects = await getUserProjects(user.id)

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-4">Meus projetos</h1>

      {projects.length === 0 ? (
        <div className="flex flex-col items-center gap-4">
          <p>Você ainda não possui projetos</p>
          <CreateProjectDialog />
        </div>
      ) : (
        <ul className="w-full max-w-2xl">
          {projects.map((project) => (
            <li key={project.id} className="border-b py-2">
              <h2 className="text-lg font-semibold">{project.name}</h2>
              <p className="text-sm text-gray-500">{project.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
