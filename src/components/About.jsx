import React from 'react'
import { aboutData } from '../data'

export default function About() {
  return (
    <section className="about" id="about">
      <div className="about-content">
        <h2 className="heading">
          About <span>Me</span>
        </h2>
        <h3>
          I'm a <span>{aboutData.title}</span>
        </h3>
        <p>{aboutData.description}</p>
      </div>
    </section>
  )
}
