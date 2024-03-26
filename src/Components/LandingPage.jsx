import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';

const LandingPage = () => {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          href="https://cdn.jsdelivr.net/npm/remixicon@3.2.0/fonts/remixicon.css"
          rel="stylesheet"
        />
        <link rel="stylesheet" type="text/css" href="./src/index.css" />
        <title>TutorLink Website</title>
      </head>
      <body>
        <nav>
        <Header/>
        </nav>
        <section className="section">
          <div className="section__container">
            <div className="content">
              <p className="subtitle">HELLO</p>
              <h1 className="title">
                <span>Welcome<br />Find your Tutor</span>
              </h1>
              <p className="description">
                TutorLink: Connecting learners with exceptional tutors worldwide. Our platform offers personalized learning experiences tailored to individual needs, empowering students to achieve their academic goals. With a diverse network of qualified tutors, TutorLink ensures quality education accessible to all.
              </p>
              <div className="action__btns">
                <button className="hire__me">Hire A Tutor</button>
              </div>
            </div>
            <div className="image">
              <img src="https://res.cloudinary.com/dhexjuuzd/image/upload/v1711401879/Data%20seed%20class/malte-helmhold-mQmuv-3jAOc-unsplash_cuzbyg.jpg" alt="profile" />
            </div>
          </div>
        </section>
        <div id="root"></div>
        <script type="module" src="/src/main.jsx"></script>
      </body>
    </html>
  );
};

export default LandingPage;
