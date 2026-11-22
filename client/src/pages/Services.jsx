const services = [
  { img: 'service1', title: 'Web Development', text: 'Responsive full-stack websites and web apps with React, Node and MongoDB.' },
  { img: 'service2', title: 'Mobile-friendly Apps', text: 'Progressive, mobile-first interfaces that work on any screen size.' },
  { img: 'service3', title: 'Programming & Consulting', text: 'Code reviews, API design, debugging and general programming help.' }
]

export default function Services() {
  return (
    <section>
      <h1>Services</h1>
      <div className="cards">
        {services.map((s) => (
          <div className="card item" key={s.title}>
            <img src={`/img/${s.img}.svg`} alt={s.title} />
            <h3>{s.title}</h3>
            <p>{s.text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
