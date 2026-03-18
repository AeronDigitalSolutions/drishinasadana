import React from 'react'
import { FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="shell footer-inner">
        <section className="footer-brand">
          <img src="/site-assets/logos/mainlogo.png" alt="Ishinna Sadana" className="footer-brand-logo" />
          <h3 className="footer-brand-title">Dr. Ishinna Sadana</h3>
          <p className="footer-brand-role">Parenting Coach</p>
          <p className="footer-bio">
            Helping parents build deeper connections with their children using science-backed methods.
          </p>
          <p className="footer-brand-proof">TEDx Speaker • Author • PhD</p>
          <a href="/about" className="footer-about-link">
            About Dr. Ishinna <span>→</span>
          </a>
        </section>

        <nav className="footer-col" aria-label="Explore">
          <h4>Explore</h4>
          <a href="/">Home</a>
          <a href="/workshops">Workshops</a>
          <a href="/#program">Power to the Parent</a>
          <a href="/get-certified-today">PPC Program</a>
          <a href="/free-resources">Free Resources</a>
          <a href="/book">Book</a>
        </nav>

        <nav className="footer-col" aria-label="Resources">
          <h4>Resources</h4>
          <a href="/free-resources">Blog</a>
          <a href="/free-resources">FAQs</a>
          <a href="/about">Community</a>
          <a href="/free-resources">Podcast</a>
          <a href="/free-resources">Newsletter</a>
        </nav>

        <nav className="footer-col" aria-label="Legal">
          <h4>Legal</h4>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Refund Policy</a>
          <a href="#">Disclaimer</a>
        </nav>

        <section className="footer-contact">
          <h4>Contact</h4>
          <div className="footer-contact-card">
            <p className="footer-contact-label">Email</p>
            <a href="mailto:teamnewinsights@gmail.com">teamnewinsights@gmail.com</a>
          </div>
          <div className="footer-contact-card">
            <p className="footer-contact-label">Phone</p>
            <a href="tel:+919755931554">+91 975 593 1554</a>
          </div>
          <div className="footer-follow">
            <p className="footer-contact-label">Follow</p>
            <div className="footer-social-row">
              <a href="#" aria-label="LinkedIn" className="footer-social-link">
                <FaLinkedinIn />
              </a>
              <a href="#" aria-label="Instagram" className="footer-social-link">
                <FaInstagram />
              </a>
              <a href="#" aria-label="YouTube" className="footer-social-link">
                <FaYoutube />
              </a>
            </div>
          </div>
        </section>
      </div>

      <div className="shell footer-newsletter">
        <div className="footer-newsletter-copy">
          <h4>Join 10,000+ parents improving their parenting skills</h4>
        </div>
        <form className="footer-newsletter-form" onSubmit={(event) => event.preventDefault()}>
          <input type="email" placeholder="Enter your email" aria-label="Email address" />
          <button type="submit">Subscribe</button>
        </form>
      </div>

      <div className="shell footer-bottom">
        <p>© 2026 Ishinna Sadana. All rights reserved.</p>
        <div className="footer-social-row">
          <a href="#" aria-label="LinkedIn" className="footer-social-link">
            <FaLinkedinIn />
          </a>
          <a href="#" aria-label="Instagram" className="footer-social-link">
            <FaInstagram />
          </a>
          <a href="#" aria-label="YouTube" className="footer-social-link">
            <FaYoutube />
          </a>
          <button
            type="button"
            className="footer-social-link footer-social-link-top"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Scroll to top"
          >
            ↑
          </button>
        </div>
      </div>
    </footer>
  )
}

export default Footer
