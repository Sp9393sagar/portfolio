import React, { useRef, useState, useEffect } from 'react'
import { navLinks } from '../data'

export default function Header({ current, onNavigate }) {
  const headerRef = useRef(null)
  const [menuActive, setMenuActive] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (!headerRef.current) return
      if (window.scrollY > 100) headerRef.current.classList.add('sticky')
      else headerRef.current.classList.remove('sticky')
    }
    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNav = (e, id) => {
    e.preventDefault()
    setMenuActive(false)
    onNavigate(id)
  }

  return (
    <header ref={headerRef}>
      <a href="#home" className="logo" onClick={(e) => handleNav(e, 'home')}>
        Sagar Paudel
      </a>

      <i
        className={`fa-solid fa-bars ${menuActive ? 'fa-times' : ''}`}
        id="menu-icon"
        onClick={() => setMenuActive((s) => !s)}
      ></i>

      <nav className={`navbar ${menuActive ? 'active' : ''}`}>
        {navLinks.map((link) => (
          <a
            key={link.id}
            href={`#${link.id}`}
            className={current === link.id ? 'active' : ''}
            onClick={(e) => handleNav(e, link.id)}
          >
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  )
}
