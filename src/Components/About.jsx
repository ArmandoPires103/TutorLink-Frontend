import React from "react";
import Header from "./Header";
import "./About.css";

export default function About() {
  return (
    <div>
      <Header />
      <div className={`about-container`}>
        <h1 className="about-heading">About the Developers</h1>
        <div className="developer-card">
          <a
            className="developer-link"
            href="https://github.com/ArmandoPires103"
          >
            <img
              className="developer-image"
              src="https://res.cloudinary.com/dhexjuuzd/image/upload/v1711574507/Data%20seed%20class/github-mark_edqyun.png"
              alt="Armando Pires GitHub"
            />
          </a>
          <h2 className="developer-name">Armando Pires</h2>
          <p>Queens. Loves the rain. </p>
        </div>
        <div className="developer-card">
          <a className="developer-link" href="https://github.com/CRDutan5">
            <img
              className="developer-image"
              src="https://res.cloudinary.com/dhexjuuzd/image/upload/v1711574507/Data%20seed%20class/github-mark_edqyun.png"
              alt="Carlitos Dutan GitHub"
            />
          </a>
          <h2 className="developer-name">Carlitos Dutan</h2>
          <p> Queens. Baconeggandcheese.</p>
        </div>
        <div className="developer-card">
          <a className="developer-link" href="https://github.com/haiyahperez">
            <img
              className="developer-image"
              src="https://res.cloudinary.com/dhexjuuzd/image/upload/v1711574507/Data%20seed%20class/github-mark_edqyun.png"
              alt="Haiyah Perez GitHub"
            />
          </a>
          <h2 className="developer-name">Haiyah Perez</h2>
          <p>
            {" "}
            Queens. Tiny mighty <br /> gym rat.
          </p>
        </div>
        <div className="developer-card">
          <a className="developer-link" href="https://github.com/isiahArrufat">
            <img
              className="developer-image"
              src="https://res.cloudinary.com/dhexjuuzd/image/upload/v1711574507/Data%20seed%20class/github-mark_edqyun.png"
              alt="Isiah Aruffat GitHub"
            />
          </a>
          <h2 className="developer-name">Isiah Aruffat</h2>
          <p>Borough. Super Dad.</p>
        </div>
        <div className="developer-card">
          <a className="developer-link" href="https://github.com/JuliGarc91">
            <img
              className="developer-image"
              src="https://res.cloudinary.com/dhexjuuzd/image/upload/v1711574507/Data%20seed%20class/github-mark_edqyun.png"
              alt="Julissa Garcia GitHub"
            />
          </a>
          <h2 className="developer-name">Julissa Garcia</h2>
          <p>
            Brooklyn. Pro Hot <br />
            Chocolatier.
          </p>
        </div>
      </div>
    </div>
  );
}
