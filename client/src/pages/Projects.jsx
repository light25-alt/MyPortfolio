import CrudManager from '../components/CrudManager'
import { useAuth } from '../context/AuthContext'

const fields = [
  { name: 'title', label: 'Title', required: true },
  { name: 'firstname', label: 'First name', required: true },
  { name: 'lastname', label: 'Last name', required: true },
  { name: 'email', label: 'Email', type: 'email', required: true },
  { name: 'completion', label: 'Completion date', type: 'date', required: true },
  { name: 'description', label: 'Description (your role and the outcome)', type: 'textarea' }
]

export default function Projects() {
  const { isAdmin } = useAuth()
  return (
    <section>
      <h1>Projects</h1>
      <CrudManager resource="projects" fields={fields} canEdit={isAdmin}
        emptyText="No projects yet."
        renderItem={(p, i) => (
          <>
            <img src={`/img/project${(i % 3) + 1}.svg`} alt={p.title} />
            <h3>{p.title}</h3>
            <small>{p.firstname} {p.lastname} · {new Date(p.completion) > new Date() ? `In progress, expected ${new Date(p.completion).toLocaleDateString(undefined, { timeZone: 'UTC' })}` : `Completed ${new Date(p.completion).toLocaleDateString(undefined, { timeZone: 'UTC' })}`}</small>
            <p>{p.description}</p>
          </>
        )} />
    </section>
  )
}
