import React, { useEffect, useState } from 'react'
import ScrollReveal from 'scrollreveal'
import Typed from 'typed.js'
import Header from './components/Header'
import Home from './components/Home'
import About from './components/About'
import Services from './components/Services'
import Contact from './components/Contact'
import { navLinks } from './data'

export default function App() {
  const [current, setCurrent] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section')
      let currentId = ''

      // Simple offset-based scroll spy
      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 150
        const sectionHeight = section.offsetHeight
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
          currentId = section.getAttribute('id')
        }
      })

      if (currentId) setCurrent(currentId)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    ScrollReveal({
      reset: true,
      distance: '60px',
      duration: 1000,
      delay: 200,
    })

    ScrollReveal().reveal('.home-content, .heading', { origin: 'top' })
    ScrollReveal().reveal('.home-img, .services-container, .contact form', { origin: 'bottom' })

    const typed = new Typed('.multiple-text', {
      strings: ['Frontend Developer', 'UI/UX Designer', 'Freelancer'],
      typeSpeed: 100,
      backSpeed: 100,
      backDelay: 1000,
      loop: true,
    })

    return () => {
      typed.destroy()
    }
  }, [])

  const handleNavigate = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
    setCurrent(id)
  }

  return (
    <>
      <Header current={current} onNavigate={handleNavigate} />
      <main>
        <Home onNavigate={handleNavigate} />
        <About />
        <Services />
        <Contact />
      </main>
    </>
  )
}
