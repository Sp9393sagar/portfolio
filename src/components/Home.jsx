import React from 'react'
import { heroData } from '../data'

export default function Home({ onNavigate }) {
  return (
    <section className="home" id="home">
      <div className="home-img">
        <img src={heroData.image} alt={`${heroData.name} profile`} />
      </div>

      <div className="home-content">
        <h3>Hello, myself</h3>
        <h1>{heroData.name}</h1>
        <h3>
          And I'm a <span className="multiple-text"></span>
        </h3>
        <p>{heroData.description}</p>

        <div className="social-media">
          {heroData.socials.map((social, index) => (
            <a key={index} href={social.url}>
              <i className={social.icon}></i>
            </a>
          ))}
        </div>

        <a
          href="#contact"
          className="btn"
          style={{ marginTop: '1.8rem' }}
          onClick={(e) => {
            e.preventDefault()
            onNavigate('contact')
          }}
        >
          Contact Me
        </a>
      </div>
    </section>
  )
}
