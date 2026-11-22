import { site } from '../siteConfig'

export default function About() {
  const facts = [
    ['Education', site.education],
    ['Focus', site.focus],
    ['Languages', site.languages],
    ['Location', site.location]
  ]
  return (
    <section className="about-page">
      <div className="about-photo">
        <img className="profile" src="/img/profile.jpg" alt={site.name} />
      </div>
      <div className="about-text">
        <p className="eyebrow">About me</p>
        <h1>{site.name}</h1>
        <h2>{site.title}</h2>
        <p className="about-bio">{site.about}</p>
        <dl className="facts">
          {facts.map(([label, value]) => (
            <div key={label}><dt>{label}</dt><dd>{value}</dd></div>
          ))}
        </dl>
        <div className="row">
          <a className="btn" href="/resume.pdf" target="_blank" rel="noreferrer">Download my resume (PDF)</a>
          <a className="btn ghost" href="/contact">Contact me</a>
        </div>
      </div>
    </section>
  )
}
