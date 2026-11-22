import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import RequireAdmin from './components/RequireAdmin'
import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'
import Education from './pages/Education'
import Services from './pages/Services'
import Contact from './pages/Contact'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Admin from './pages/Admin'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/education" element={<Education />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin" element={<RequireAdmin><Admin /></RequireAdmin>} />
          <Route path="*" element={<p className="notice error">Page not found.</p>} />
        </Routes>
      </main>
      <footer>© {new Date().getFullYear()} My Portfolio</footer>
    </>
  )
}
