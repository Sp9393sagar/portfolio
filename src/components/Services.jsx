import React from 'react'
import { servicesData } from '../data'

export default function Services() {
  return (
    <section className="services" id="services">
      <h2 className="heading">
        My <span>Services</span>
      </h2>

      <div className="services-container">
        {servicesData.map((service) => (
          <div className="services-box" key={service.id}>
            <i className={service.icon}></i>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
