import { useState, useEffect } from 'react'

const Header = () => {
    const [mobileNavOpen, setMobileNavOpen] = useState(false)

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

        const onKeyDown = (event) => {
            if (event.key === 'Escape') {
                setMobileNavOpen(false)
            }
        }

        window.addEventListener('resize', onResize)
        window.addEventListener('keydown', onKeyDown)
        return () => {
            window.removeEventListener('resize', onResize)
            window.removeEventListener('keydown', onKeyDown)
        }
    }, [])

    return (
        <header className={`nav-wrap ${mobileNavOpen ? 'nav-open' : ''}`}>
            <div className="shell nav">
                <a href="/" className="brand" aria-label="Ishina Sadana">
                    <img src="/site-assets/logos/mainlogo.png" alt="Ishina Sadana" className="brand-logo" />
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
                    <a href="/" onClick={() => setMobileNavOpen(false)}>Home</a>
                    <a href="/about" onClick={() => setMobileNavOpen(false)}>About</a>
                    <a href="/book" onClick={() => setMobileNavOpen(false)}>Book</a>
                    <a href="/free-resources" onClick={() => setMobileNavOpen(false)}>Free Resources</a>
                    <a href="/workshops" onClick={() => setMobileNavOpen(false)}>Workshops</a>
                    <a href="/get-certified-today/" className="nav-cta" onClick={() => setMobileNavOpen(false)}>Get Certified</a>
                </nav>
            </div>
            <button
                type="button"
                className={`nav-backdrop ${mobileNavOpen ? 'open' : ''}`}
                aria-label="Close menu"
                onClick={() => setMobileNavOpen(false)}
            />
        </header>
    )
}

export default Header
