import React from 'react'

export default function AboutScreen() {
    return (
        <div className="about-container row">
            <div className="about-content-container">
                <div className="about-title-container">
                  <h1 className="about-title">About</h1>
                  <h3 className="about-sub">The</h3>
                  <h1 className="about-title black">Artist</h1>
                </div>
                <div className="about-text-container">
                  <p className="about-text">
                    Siema! Welcome to my Art Gallery, I am 
                    <span className="about-trim"> Emsi </span>, <br/>
                    a young, self-taught fluid artist.
                    I express myself through pouring and pigments. <br/>
                    Stroll through my Gallery and let your 
                    <span className="about-trim"> mood </span> guide you! <br/>
                    <br/> I Hope you enjoy my work as much as i enjoy creating them!
                    <span className="about-trim"> :) </span>
                  </p>
                </div>
            </div>
            <div className="about-image-container">
                <img className="about-image" src="/images/about-section.jpg" alt="fluid art"></img>
            </div>
        </div>
    )
}
