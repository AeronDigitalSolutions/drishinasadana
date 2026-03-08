import './Home.css';
import { useEffect, useState } from 'react'
import { FaWhatsapp, FaAmazon } from 'react-icons/fa'
import SectionTitle from '../components/SectionTitle'
import ReadMore from '../components/ReadMore'
import {
    featuredLogos,
    heroMediaLogos,
    liveBenefits,
    liveStats,
    programFAQs,
    testimonials,
    workshopCards,
} from '../data/siteContent'

const Home = () => {
    const [activeTestimonial, setActiveTestimonial] = useState(0)
    const [activeLiveSlide, setActiveLiveSlide] = useState(0)
    const [liveTouchStartX, setLiveTouchStartX] = useState(null)

    useEffect(() => {
        const id = setInterval(() => {
            setActiveTestimonial((prev) => (prev + 1) % testimonials.length)
        }, 5500)
        return () => clearInterval(id)
    }, [])

    useEffect(() => {
        const id = setInterval(() => {
            setActiveLiveSlide((prev) => (prev + 1) % 2)
        }, 2500)
        return () => clearInterval(id)
    }, [])

    const currentTestimonial = testimonials[activeTestimonial]
    const liveSlides = [
        {
            src: '/site-assets/images/booklivesession-1.png',
            alt: 'Live workshop audience',
        },
        {
            src: '/site-assets/images/booklivesession-2.png',
            alt: 'Dr. Ishina speaking on stage',
        },
    ]

    const goPrev = () =>
        setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    const goNext = () => setActiveTestimonial((prev) => (prev + 1) % testimonials.length)
    const goPrevLive = () => setActiveLiveSlide((prev) => (prev - 1 + liveSlides.length) % liveSlides.length)
    const goNextLive = () => setActiveLiveSlide((prev) => (prev + 1) % liveSlides.length)

    const onLiveTouchStart = (event) => {
        setLiveTouchStartX(event.touches[0].clientX)
    }

    const onLiveTouchEnd = (event) => {
        if (liveTouchStartX === null) return
        const delta = event.changedTouches[0].clientX - liveTouchStartX
        if (Math.abs(delta) > 35) {
            if (delta < 0) goNextLive()
            if (delta > 0) goPrevLive()
        }
        setLiveTouchStartX(null)
    }

    return (
        <main>
            <section className="hero hero-desktop">
                <div className="shell hero-grid">
                    <div className="hero-copy reveal">
                        <p className="kicker">TEDx Speaker • PhD in Human Development</p>
                        <h1>
                            Raising Confident,
                            <br />
                            Emotionally Strong
                            <br />
                            Children Start With
                            <br />
                            <span>Empowered Parents.</span>
                        </h1>
                        <div className="line" />
                        <h3>Meet Dr. Ishina B. Sadana</h3>
                        <p>
                            Parenting Coach • TEDx Speaker • Bestselling Author
                            <br />
                            Blending academic research with real motherhood
                            <br />
                            to help parents raise emotionally resilient children.
                        </p>
                        <ul className="checks">
                            <li>Guided 10,000+ parents globally</li>
                            <li>PhD & M.Sc in Human Development</li>
                            <li>Creator of Certified Parenting Programs</li>
                        </ul>
                        <div className="cta-row hero-cta-row">
                            <button className="btn primary">Explore Certifications</button>
                            <button className="btn ghost">Watch My Story →</button>
                        </div>
                        <div className="hero-media-strip">
                            <p>As Seen On</p>
                            <div className="hero-logo-marquee">
                                <div className="hero-logo-track">
                                    {[...heroMediaLogos, ...heroMediaLogos].map((logo, idx) => (
                                        <img key={`${logo.alt}-${idx}`} src={logo.src} alt={logo.alt} loading="lazy" />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="hero-media reveal">
                        <div className="hero-glow" />
                        <img
                            src="/site-assets/images/hero-dr-ishinna.png?v=2"
                            alt="Dr. Ishina"
                            className="hero-image"
                        />
                    </div>
                </div>
            </section>

            <section className="hero-mobile">
                <div className="shell hero-mobile-shell">
                    {/* Top Text for Mobile */}
                    <div className="hero-mobile-top-text reveal">
                        <p className="kicker">TEDx Speaker • PhD in Human Development</p>
                        <h1>
                            Raising Confident,
                            <br />
                            Emotionally Strong
                            <br />
                            Children Start With
                            <br />
                            <span>Empowered Parents.</span>
                        </h1>
                    </div>

                    <div className="hero-mobile-media reveal">
                        <img
                            src="/site-assets/images/hero-dr-ishinna.png?v=2"
                            alt="Dr. Ishina"
                            className="hero-mobile-image"
                        />
                    </div>

                    <div className="hero-mobile-copy reveal">
                        <div className="line" />
                        <h3>Meet Dr. Ishina B. Sadana</h3>
                        <p>
                            Parenting Coach • TEDx Speaker • Bestselling Author.
                            <br />
                            Blending academic research with real motherhood
                            <br />
                            to help parents raise emotionally resilient children.
                        </p>
                        <ul className="checks">
                            <li>Guided 10,000+ parents globally</li>
                            <li>PhD & M.Sc in Human Development</li>
                            <li>Creator of Certified Parenting Programs</li>
                        </ul>

                        <div className="hero-mobile-cta">
                            <button className="btn primary">Explore Certifications</button>
                            <button className="btn ghost">Watch My Story →</button>
                        </div>

                    </div>
                </div>
            </section>

            <section id="program" className="panel shell reveal">
                <SectionTitle overline="Flagship Program" title="Positive Parenting Coach Program" />
                <div className="program-grid">
                    <article className="testimonial-slider card">
                        <div key={activeTestimonial} className="testi-slide">
                            <div className="testi-head">
                                <h4>{currentTestimonial.name}</h4>
                                <p>{currentTestimonial.role}</p>
                            </div>
                            <img
                                src={currentTestimonial.avatar}
                                alt={currentTestimonial.name}
                                className="testi-avatar"
                            />
                            <p className="quote">“{currentTestimonial.quote}”</p>
                            <div className="testi-body">
                                <ReadMore text={currentTestimonial.body} limit={220} />
                            </div>
                        </div>
                        <div className="testi-controls">
                            <button type="button" onClick={goPrev} aria-label="Previous testimonial" className="testi-nav">
                                ←
                            </button>
                            <div className="testi-dots">
                                {testimonials.map((item, idx) => (
                                    <button
                                        key={item.name}
                                        type="button"
                                        aria-label={`Go to testimonial ${idx + 1}`}
                                        className={`dot ${idx === activeTestimonial ? 'active' : ''}`}
                                        onClick={() => setActiveTestimonial(idx)}
                                    />
                                ))}
                            </div>
                            <button type="button" onClick={goNext} aria-label="Next testimonial" className="testi-nav">
                                →
                            </button>
                        </div>
                    </article>
                    <article className="card about-program">
                        <h3>About The Program</h3>
                        <p>
                            A two-month journey designed to help conscious parents become informed and effective
                            parent coaches.
                        </p>
                        <div className="faq-list">
                            {programFAQs.map((item) => (
                                <div key={item} className="faq-item">
                                    <span>{item}</span>
                                    <span>+</span>
                                </div>
                            ))}
                        </div>
                        <div className="cta-row">
                            <button className="btn primary">Enroll Now</button>
                            <button className="btn ghost">Know More →</button>
                        </div>
                    </article>
                </div>
            </section>

            <section id="workshops" className="workshops-section reveal">
                <div className="shell workshops-shell">
                    <SectionTitle
                        overline="Workshops"
                        title="Our Parenting Workshops"
                        subtitle="Practical, science-backed sessions to help you build connection, discipline, and emotional resilience."
                    />

                    <div className="journey-row">
                        <span>1. WhatsApp Us</span>
                        <span>2. Request Recorded Workshops</span>
                        <span>3. Get Instant Lifetime Access</span>
                    </div>

                    <div className="cta-row center">
                        <button className="btn primary">Get Workshop Access →</button>
                        <button className="btn ghost">View All Workshops</button>
                    </div>

                    <div className="cards-grid">
                        {workshopCards.map((card) => (
                            <article key={card.title} className="workshop card">
                                <span className="tag">{card.tag}</span>
                                <h4>{card.title}</h4>
                                <p>{card.copy}</p>
                                <img src={card.image} alt={card.title} />
                                <div className="price-row">
                                    <strong className="price-pill">{card.price}</strong>
                                    <button type="button" className="enroll-btn">Enroll Now →</button>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="consult-section reveal">
                <div className="shell consult-grid">
                    <div className="consult-media">
                        <img src="/site-assets/images/one-on-one.png" alt="One-on-one consultation" />
                        <div className="consult-price-card consult-price-card-side" role="note" aria-label="Consultation pricing">
                            <span className="consult-price-kicker">Private Session Fee</span>
                            <div className="consult-price-main">
                                <span className="consult-currency">₹</span>
                                <strong>4,999</strong>
                            </div>
                            <p className="consult-duration">75-minute one-on-one consultation</p>
                            <div className="consult-price-tags">
                                <span>Personalized Guidance</span>
                                <span>Actionable Plan</span>
                            </div>
                        </div>
                    </div>

                    <div className="consult-copy">
                        <p className="consult-kicker">Private Consultation</p>
                        <h2>
                            One-on-One Parenting
                            <br />
                            Consultation <span>with</span>
                            <br />
                            <span>Dr. Ishina Sadana</span>
                        </h2>
                        <p className="consult-intro">
                            Get personalized, practical parenting guidance rooted in psychology and real-world
                            family experience.
                        </p>
                        <ul className="consult-points">
                            <li>Safe and confidential discussion space</li>
                            <li>75-minute personalized parenting guidance</li>
                            <li>Practical strategies you can implement immediately</li>
                            <li>Tailored solutions for your family challenges</li>
                        </ul>
                        <button className="btn consult-cta">
                            <span className="journey-step">
                                <FaWhatsapp className="btn-icon whatsapp" />
                                <span>Book Your Private Session →</span>
                            </span>
                        </button>
                    </div>
                </div>
            </section>

            <section id="book" className="book-premium-section reveal">
                <div className="shell book-premium-grid">
                    <article className="book-media-panel">
                        <div className="book-media-stage">
                            <img src="/site-assets/images/book.png" alt="Power To The Parent book" />
                        </div>
                    </article>

                    <article className="book-copy-panel">
                        <p className="book-kicker">Book by Dr. Ishina</p>
                        <h2>
                            The Book That
                            <br />
                            Changed Thousands
                            <br />
                            of Parenting <span>Journeys</span>
                        </h2>
                        <p className="book-intro">
                            <strong>‘Power To The Parent’</strong> is a practical guide to everyday parenting
                            with confidence, clarity, and emotional strength.
                        </p>
                        <ul className="book-points">
                            <li>Build stronger parent-child connection</li>
                            <li>Set boundaries without guilt</li>
                            <li>Raise confident, emotionally secure kids</li>
                        </ul>
                        <div className="book-cta-row">

                            <button className="btn book-cta amazon-btn">
                                <span className="journey-step">
                                    <FaAmazon className="btn-icon amazon" />
                                    <span>Buy on Amazon →</span>
                                </span>
                            </button>

                            <span className="book-meta">English & Marathi • ★ 4.8 rating</span>
                        </div>
                        <div className="book-price-tag">
                            <strong>₹4,999</strong>
                            <span>75-minute consultation</span>
                        </div>
                    </article>
                </div>
            </section>

            <section className="live-session-section reveal">
                <div className="shell live-wrap">
                    <div className="live-copy">
                        <p className="live-topline">LIVE WORKSHOPS • SCHOOLS • CORPORATES • PARENT GROUPS</p>
                        <h2>
                            Book a Live Session with
                            <span className="live-name">Dr. Ishina</span>
                        </h2>
                        <div className="live-title-line" />
                        <div className="live-mobile-carousel" aria-label="Live session photos">
                            <div
                                className="live-mobile-window"
                                onTouchStart={onLiveTouchStart}
                                onTouchEnd={onLiveTouchEnd}
                            >
                                <div
                                    className="live-mobile-track"
                                    style={{ transform: `translateX(-${activeLiveSlide * 100}%)` }}
                                >
                                    {liveSlides.map((slide) => (
                                        <article className="live-mobile-slide" key={slide.src}>
                                            <img src={slide.src} alt={slide.alt} />
                                        </article>
                                    ))}
                                </div>
                            </div>
                            <button
                                type="button"
                                className="live-mobile-arrow prev"
                                aria-label="Previous live photo"
                                onClick={goPrevLive}
                            >
                                ←
                            </button>
                            <button
                                type="button"
                                className="live-mobile-arrow next"
                                aria-label="Next live photo"
                                onClick={goNextLive}
                            >
                                →
                            </button>
                        </div>
                        <p className="live-intro">
                            Dr. Ishina conducts impactful live workshops - both online and offline - for
                            schools, corporates, and parent communities across India.
                        </p>
                        <p className="live-intro">
                            Her sessions combine research-backed psychology with real-life parenting
                            experiences, creating deep transformation and practical change.
                        </p>

                        <h3 className="live-subhead">What You Get:</h3>
                        <div className="live-benefits-grid">
                            {liveBenefits.map((benefit) => (
                                <article key={benefit.title} className="live-benefit-card">
                                    <h4>{benefit.title}</h4>
                                    <p>{benefit.text}</p>
                                </article>
                            ))}
                        </div>

                        <div className="live-stats">
                            {liveStats.map((stat) => (
                                <span key={stat}>{stat}</span>
                            ))}
                        </div>

                        <div className="cta-row">
                            <button className="btn primary">Book a Live Session</button>
                            <span className="meta">For schools, institutions & organizations</span>
                        </div>
                    </div>

                    <div className="live-media">
                        <div className="live-photo-card live-photo-main">
                            <img
                                src="/site-assets/images/booklivesession-1.png"
                                alt="Live workshop audience"
                            />
                        </div>
                        <div className="live-photo-card live-photo-overlay">
                            <img
                                src="/site-assets/images/booklivesession-2.png"
                                alt="Dr. Ishina speaking"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <section className="shell reveal">
                <SectionTitle title="Featured In" />
                <div className="featured-logos card">
                    <div className="logo-marquee">
                        <div className="logo-track">
                            {[...featuredLogos, ...featuredLogos].map((logo, idx) => (
                                <div className="logo-item" key={`${logo.alt}-${idx}`}>
                                    <img src={logo.src} alt={logo.alt} loading="lazy" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section id="contact" className="contact-premium-section reveal">
                <div className="shell contact-premium-wrap">
                    <div className="contact-premium-grid">
                        <form className="contact-premium-form">
                            <h2>Get In Touch</h2>
                            <label>Name *</label>
                            <input type="text" />
                            <label>Email *</label>
                            <input type="email" />
                            <label>Phone *</label>
                            <input type="tel" />
                            <label>Message</label>
                            <textarea rows="4" />
                            <button type="button" className="contact-submit-btn">
                                Submit
                            </button>
                        </form>
                        <article className="contact-premium-image-card">
                            <img src="/site-assets/images/getintouch.png" alt="Dr. Ishina" />
                        </article>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Home
