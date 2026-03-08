import React from 'react'

const Footer = () => {
    return (
        <footer className="footer">
            <div className="shell footer-inner">
                <div className="footer-brand">
                    <img src="/site-assets/logos/mainlogo.png" alt="Ishina Sadana" className="footer-brand-logo" />
                    <p className="footer-bio">
                        Parenting coach, Ph.D. in Human Development, TEDx
                        speaker, bestselling author, and mom of two — I help
                        parents shift from self-doubt to connection with real-life,
                        science-backed strategies.
                    </p>
                    <a href="/#about" className="footer-about-link">About Us <span>→</span></a>
                </div>

                <div className="footer-col">
                    <h4>Top Links</h4>
                    <a href="/">Home</a>
                    <a href="#">Power To The Parent</a>
                    <a href="/#program">PPC Program</a>
                    <a href="/#workshops">Workshop</a>
                </div>

                <div className="footer-col">
                    <h4>Support</h4>
                    <a href="#">FAQs</a>
                    <a href="/#about">About Us</a>
                    <a href="#">Use Of Terms</a>
                    <a href="#">Privacy Policy</a>
                </div>

                <div className="footer-col">
                    <h4>Top Categories</h4>
                    <a href="#">Linkedin</a>
                    <a href="#">Instagram</a>
                    <a href="#">Youtube</a>
                </div>

                <div className="footer-contact">
                    <a href="tel:+919755931554">+91 975 593 1554</a>
                    <a href="mailto:teamnewinsights@gmail.com">teamnewinsights@gmail.com</a>
                </div>
            </div>

            <button
                className="footer-top"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                aria-label="Scroll to top"
            >
                ↑
            </button>
        </footer>
    )
}

export default Footer
