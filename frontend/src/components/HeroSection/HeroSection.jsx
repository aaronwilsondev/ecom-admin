import React from 'react'

export default function HeroSection() {
    return (
        <div className="hero-container row">
            <div className="hero-image-container">
                <img className="hero-image" src="/images/hero-section.jpg" alt="fluid art" />
            </div>
            <div className="hero-text">
               <h1 className="main-heading">
                   Emsi's <br/>
                   <span className="hero-title-dark">Fluid</span> <br/>
                   Acrylics
               </h1>
               <div>
                   <h3 className="hero-subheading">A Collection of Abstract Works</h3>
               </div>
             </div>
            </div>
    )
}
