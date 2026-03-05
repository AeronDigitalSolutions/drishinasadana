import { useEffect, useState } from 'react'
import { FaChevronDown, FaChevronUp, FaSearch } from 'react-icons/fa'

function App() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [aboutOpen, setAboutOpen] = useState(0)
  const [faqOpen, setFaqOpen] = useState(0)

  useEffect(() => {
    document.body.style.overflow = mobileNavOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileNavOpen])

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 992) {
        setMobileNavOpen(false)
      }
    }

    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <div className="site gc-mode" id="top">
      <header className={`nav-wrap ${mobileNavOpen ? 'nav-open' : ''}`}>
        <div className="shell nav">
          <a href="#top" className="brand" aria-label="Ishinna Sadana">
            <img src="/site-assets/logos/mainlogo.png" alt="Ishinna Sadana" className="brand-logo" />
          </a>

          <button
            type="button"
            className={`nav-toggle ${mobileNavOpen ? 'open' : ''}`}
            aria-label="Toggle menu"
            aria-expanded={mobileNavOpen}
            onClick={() => setMobileNavOpen((prev) => !prev)}
          >
            <span className="nav-toggle-bar" />
            <span className="nav-toggle-bar" />
            <span className="nav-toggle-bar" />
          </button>

          <nav className={`links ${mobileNavOpen ? 'open' : ''}`}>
            <a href="#top" onClick={() => setMobileNavOpen(false)}>Home</a>
            <a href="#top" className="active" onClick={() => setMobileNavOpen(false)}>Get Certified</a>
            <a href="#faq" onClick={() => setMobileNavOpen(false)}>Workshops</a>
            <a href="#about-program" onClick={() => setMobileNavOpen(false)}>About</a>
            <a href="#download-outline" onClick={() => setMobileNavOpen(false)}>Book</a>
            <a href="#faq" onClick={() => setMobileNavOpen(false)}>Free Resources</a>
            <a href="#contact-form" onClick={() => setMobileNavOpen(false)}>My Account</a>
            <button className="nav-search" type="button" aria-label="Search">
              <FaSearch />
            </button>
          </nav>
        </div>

        <button
          type="button"
          className={`nav-backdrop ${mobileNavOpen ? 'open' : ''}`}
          aria-label="Close menu"
          onClick={() => setMobileNavOpen(false)}
        />
      </header>

      <main className="gc-main">
        <section className="gc-hero">
          <div className="shell gc-hero-shell">
            <h1>Positive Parenting Coach Program</h1>
            <p>
              This program is a two-month journey that aims to have more conscious parents and
              create well informed parent coaches who can effectively help many more parents and
              bring changes in their own lives.
            </p>
          </div>
        </section>

        <section id="about-program" className="gc-about">
          <div className="shell">
            <h2>About The Program</h2>
            <p className="gc-about-intro">
              This program is a two-month journey that aims to have more conscious Parents and
              create well informed Parent Coaches who can effectively help many more parents and
              bring changes in their own lives.
            </p>

            <div className="gc-about-accordion">
              {[].map((item, idx) => {
                const isOpen = aboutOpen === idx
                return (
                  <article className="gc-accordion-item" key={item.title}>
                    <button
                      type="button"
                      className="gc-accordion-trigger"
                      onClick={() => setAboutOpen((prev) => (prev === idx ? null : idx))}
                      aria-expanded={isOpen}
                    >
                      <span className="gc-trigger-left">»</span>
                      <span>{item.title}</span>
                      <span className="gc-trigger-icon">{isOpen ? '−' : '+'}</span>
                    </button>
                    {isOpen && (
                      <div className="gc-accordion-content">
                        {item.paragraphs?.map((para) => (
                          <p key={para}>{para}</p>
                        ))}
                        {item.points?.length ? (
                          <ol>
                            {item.points.map((point) => (
                              <li key={point}>{point}</li>
                            ))}
                          </ol>
                        ) : null}
                      </div>
                    )}
                  </article>
                )
              })}
            </div>

            <div className="gc-about-actions">
              <button type="button" className="gc-btn gc-btn-primary">Enroll Now</button>
              <button type="button" className="gc-btn gc-btn-outline">Know More</button>
            </div>
          </div>
        </section>

        <section className="gc-value-props">
          <div className="shell">
            <h2>What Do You Get?</h2>
            <div className="gc-props-grid">
              {getCertifiedValueProps.map((item) => (
                <article className="gc-prop-row" key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="contact-form" className="gc-lead-form">
          <div className="shell gc-lead-grid">
            <article className="gc-lead-image">
              <img src="/site-assets/images/getintouch.png" alt="Certification inquiry" />
            </article>

            <article className="gc-lead-card">
              <h3>Next Two Months PPC batch starting in: February 2026</h3>
              <p>
                If you are interested in enrolling for the program, fill out our quick form and we
                will get in touch with you.
              </p>
              <strong>Take the first step today!</strong>

              <form onSubmit={(event) => event.preventDefault()}>
                <label htmlFor="lead-name">Name *</label>
                <input id="lead-name" type="text" required />

                <label htmlFor="lead-email">Email *</label>
                <input id="lead-email" type="email" required />

                <label htmlFor="lead-phone">Phone *</label>
                <input id="lead-phone" type="tel" required />

                <label htmlFor="lead-message">Message</label>
                <textarea id="lead-message" rows="5" />

                <button type="submit" className="gc-btn gc-btn-primary">Submit</button>
              </form>
            </article>
          </div>
        </section>

        <section id="download-outline" className="gc-outline">
          <div className="shell">
            <article className="gc-outline-card">
              <h3>Download Course Outline</h3>
              <form onSubmit={(event) => event.preventDefault()}>
                <label htmlFor="outline-name">Full Name *</label>
                <input id="outline-name" type="text" required />

                <div className="gc-outline-row">
                  <div>
                    <label htmlFor="outline-email">Email *</label>
                    <input id="outline-email" type="email" required />
                  </div>
                  <div>
                    <label htmlFor="outline-phone">Phone *</label>
                    <input id="outline-phone" type="tel" required />
                  </div>
                </div>

                <button type="submit" className="gc-btn gc-btn-primary">Download</button>
              </form>
            </article>
          </div>
        </section>

        <section className="gc-certified-coaches">
          <div className="shell">
            <h2>Meet Our Certified Positive Parent Coaches</h2>
            <div className="gc-coach-collage">
              {certifiedCoachPhotos.map((img, idx) => (
                <img src={img} alt={`Certified coach ${idx + 1}`} key={`${img}-${idx}`} loading="lazy" />
              ))}
            </div>
          </div>
        </section>

        <section className="gc-feedback">
          <div className="shell">
            <h2>PPC Program Feedback</h2>
            <div className="gc-feedback-grid">
              {getCertifiedFeedback.map((item) => (
                <article key={item} className="gc-video-card" aria-label={item} />
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="gc-faq">
          <div className="shell">
            <h2>Frequently Asked Questions</h2>
            <div className="gc-faq-list">
              {getCertifiedFaqs.map((item, idx) => {
                const isOpen = faqOpen === idx
                return (
                  <article className="gc-faq-item" key={item.q}>
                    <button
                      className="gc-faq-trigger"
                      type="button"
                      onClick={() => setFaqOpen((prev) => (prev === idx ? null : idx))}
                      aria-expanded={isOpen}
                    >
                      <span>{`${idx + 1}. ${item.q}`}</span>
                      {isOpen ? <FaChevronUp /> : <FaChevronDown />}
                    </button>
                    {isOpen ? <p>{item.a}</p> : null}
                  </article>
                )
              })}
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="shell footer-inner">
          <article className="footer-profile">
            <img
              src="/site-assets/logos/mainlogo.png"
              alt="Ishinna Sadana logo"
              className="footer-brand-logo"
            />
            <p>
              Parenting coach, Ph.D. in Human Development, TEDx speaker, bestselling author, and
              mom of two. Helping parents shift from self-doubt to deep connection with practical,
              science-backed strategies.
            </p>
            <a href="#about-program">About Us →</a>
          </article>

          <article className="footer-col">
            <h4>Top Links</h4>
            <a href="#top">Home</a>
            <a href="#about-program">PPC Program</a>
            <a href="#contact-form">Get Certified</a>
            <a href="#faq">Workshop</a>
          </article>

          <article className="footer-col">
            <h4>Support</h4>
            <a href="#faq">FAQs</a>
            <a href="#about-program">About Us</a>
            <a href="#">Use Of Terms</a>
            <a href="#">Privacy Policy</a>
          </article>

          <article className="footer-col">
            <h4>Social</h4>
            <a href="#">LinkedIn</a>
            <a href="#">Instagram</a>
            <a href="#">YouTube</a>
          </article>

          <article className="footer-contact">
            <a href="tel:+919755931554">+91 975 593 1554</a>
            <a href="mailto:teamnewinsights@gmail.com">teamnewinsights@gmail.com</a>
          </article>
        </div>

        <div className="shell footer-bottom">
          <p>© {new Date().getFullYear()} Ishinna Sadana. All rights reserved.</p>
          <a href="#top" className="footer-top" aria-label="Back to top">↑</a>
        </div>
      </footer>

      <a href="#top" className="gc-floating-top" aria-label="Back to top">↑</a>
    </div>
  )
}

export default App
