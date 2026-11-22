import CrudManager from '../components/CrudManager'
import { useAuth } from '../context/AuthContext'

const fields = [
  { name: 'title', label: 'Qualification / degree', required: true },
  { name: 'firstname', label: 'First name', required: true },
  { name: 'lastname', label: 'Last name', required: true },
  { name: 'email', label: 'Email', type: 'email', required: true },
  { name: 'completion', label: 'Completion date', type: 'date', required: true },
  { name: 'description', label: 'Description', type: 'textarea' }
]

export default function Education() {
  const { isAdmin } = useAuth()
  return (
    <section>
      <h1>Education</h1>
      <CrudManager resource="qualifications" fields={fields} canEdit={isAdmin}
        emptyText="No qualifications yet."
        renderItem={(q) => (
          <>
            <h3>{q.title}</h3>
            <small>{new Date(q.completion).getFullYear()} · {q.firstname} {q.lastname}</small>
            <p>{q.description}</p>
          </>
        )} />
    </section>
  )
}
