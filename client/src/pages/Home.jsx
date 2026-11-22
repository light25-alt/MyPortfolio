import { Link, useLocation } from 'react-router-dom'
import { site } from '../siteConfig'

export default function Home() {
  const { state } = useLocation() // flash message sent after the contact form
  return (
    <section className="hero">
      {state?.flash && <p className="notice success">{state.flash}</p>}
      <h1>Welcome to my portfolio</h1>
      <p className="lead">Hi, I'm {site.name} — {site.title}.</p>
      <blockquote><strong>Mission:</strong> {site.mission}</blockquote>
      <div className="row center">
        <Link className="btn" to="/about">About me</Link>
        <Link className="btn ghost" to="/projects">See my projects</Link>
      </div>
    </section>
  )
}
