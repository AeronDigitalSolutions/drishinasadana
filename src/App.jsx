import { useEffect, useState } from 'react'

const workshopCards = [
  {
    tag: 'Connection',
    title: 'Building Deep Connection',
    copy: 'Learn why children resist and how to build trust so cooperation feels natural.',
    price: 'Rs. 999',
    image:
      'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1200&q=80',
  },
  {
    tag: 'Discipline',
    title: 'Positive Discipline',
    copy: 'Set boundaries with warmth. Discipline without yelling or fear.',
    price: 'Rs. 1199',
    image:
      'https://images.unsplash.com/photo-1609220136736-443140cffec6?auto=format&fit=crop&w=1200&q=80',
  },
  {
    tag: 'Emotional Regulation',
    title: 'Calm Parenting',
    copy: 'Manage your reactions and respond with emotional clarity.',
    price: 'Rs. 1199',
    image:
      'https://images.unsplash.com/photo-1607453998774-d533f65dac99?auto=format&fit=crop&w=1200&q=80',
  },
  {
    tag: 'Tantrums',
    title: 'Tantrums Decoded',
    copy: 'Handle meltdowns confidently without escalating the situation.',
    price: 'Rs. 999',
    image:
      'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=1200&q=80',
  },
]

const programFAQs = ['What’s in it for you?', 'Who is this course for?', 'Will you get certified?']

const testimonials = [
  {
    name: 'Bhargavi R',
    role: 'A Parent',
    quote: 'Hi Ishinna Mam, Please find my testimonial attached:',
    body: `Positive parenting coach course is curated well with the syllabus and you have included everything we have to know about parenting. This is the best decision I have made for myself and my daughter. The course not only gave me immense knowledge on how to be a better parent, but it also taught me how better a human I can be by controlling and working on my triggers. This is eye opening for me, and you came as a light.`,
    avatar:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Ashima Sahni',
    role: 'A Parent and a Grandparent',
    quote:
      'I would like to express my heartfelt gratitude for giving me the opportunity to attend your outstanding sessions For Positive Parenting Coaching.',
    body: `Your passion for your profession exuded in each of your classes encouraging us to equally engage with great interest and enthusiasm. You taught us with such great calmness and patience the two very necessary key roles to imbibe for this career. Your ability to convey complex messages with the most simple examples made the course so relatable and easy to understand. My learning from this course has enriched me with knowledge opening doors for me for a way forward to a career which has always been my dream. I Thank YOU for your dedication and for believing in me and for encouraging me that age is just a number and that one can achieve anything anytime as long as we have the passion for it. Your influence will always motivate me and stay with me forever and I truly Hope that I can be as compassionate as you to help others.\n\nYou truly are the BEST teacher and I would recommend your course to not only people who want to start a career but to every woman who wants to be a better mother.`,
    avatar:
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Asfia S.',
    role: 'Co-founder of The Perch Montessori Learning',
    quote: 'It’s so rare to find mentors who like to listen more than they like to talk!',
    body: `Dr. Ishinna Sadana is one such coach who believes in learning and growing together. When I enrolled myself into her Positive Parenting workshop, I was sure that it would be very interesting…but little did I expect it to be such a revolutionary and transformational journey for me and my inner self!\n\nThe humble and casual manner in which Dr. Ishinna speaks with all of us makes us feel at ease to ask any questions during our sessions. The workshop has deep and insightful content, which is made simple to understand by open and free-flowing discussions. I feel more confident as a parent to 3 young boys, now that I’ve been empowered with the tools that I’m going to need to tackle the obstacles in my parenting journey ahead.\n\nThank you Dr. Ishinna, for these amazing 2 months of learning! Forever grateful.`,
    avatar:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
  },
]

const liveBenefits = [
  {
    title: 'Research-backed frameworks',
    text: 'Build stronger, emotionally secure parent-child bonds.',
  },
  {
    title: 'Engaging & heartfelt delivery',
    text: 'Sessions that resonate with diverse audiences.',
  },
  {
    title: 'Practical parenting tools',
    text: 'Simple strategies parents can implement immediately.',
  },
  {
    title: 'Interactive live Q&A',
    text: 'Personalized solutions and clarity.',
  },
]

const liveStats = ['500K+ Parents Impacted', '10+ Years Experience', 'Invited Speaker Across Cities']

const featuredLogos = [
  { src: '/site-assets/logos/punjab-kesri.png', alt: 'Punjab Kesari' },
  { src: '/site-assets/logos/thetimesofindia.png', alt: 'The Times of India' },
  { src: '/site-assets/logos/hindustan.png', alt: 'Hindustan' },
  { src: '/site-assets/logos/tedx.png', alt: 'TEDx' },
  { src: '/site-assets/logos/ndtv.png', alt: 'NDTV' },
  { src: '/site-assets/logos/dainikbhaskar.png', alt: 'Dainik Bhaskar' },
  { src: '/site-assets/logos/hindustantimes.png', alt: 'Hindustan Times' },
]

const heroMediaLogos = [
  { src: '/site-assets/logos/tedx.png', alt: 'TEDx' },
  { src: '/site-assets/logos/ndtv.png', alt: 'NDTV' },
  { src: '/site-assets/logos/hindustantimes.png', alt: 'Hindustan Times' },
  { src: '/site-assets/logos/thetimesofindia.png', alt: 'The Times of India' },
]

function SectionTitle({ overline, title, subtitle, align = 'center' }) {
  return (
    <div className={`section-title ${align === 'left' ? 'left' : ''}`}>
      {overline && <p className="overline">{overline}</p>}
      <h2>{title}</h2>
      {subtitle && <p className="subtitle">{subtitle}</p>}
    </div>
  )
}

function App() {
  const [activeTestimonial, setActiveTestimonial] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5500)
    return () => clearInterval(id)
  }, [])

  const currentTestimonial = testimonials[activeTestimonial]

  const goPrev = () =>
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  const goNext = () => setActiveTestimonial((prev) => (prev + 1) % testimonials.length)

  return (
    <div className="site">
      <header className="nav-wrap">
        <div className="shell nav">
          <a href="#" className="brand">
            <span className="brand-mark">✦</span>
            <span>Ishinna Sadana</span>
          </a>
          <nav className="links">
            <a href="#">Home</a>
            <a href="#program">Programs</a>
            <a href="#about">About</a>
            <a href="#workshops">Workshops</a>
            <a href="#contact">Contact</a>
            <button className="nav-cta" type="button">Get Certified</button>
          </nav>
        </div>
      </header>

      <section className="hero">
        <div className="shell hero-grid">
          <div className="hero-copy reveal">
            <p className="kicker">TEDx Speaker • PhD in Human Development</p>
            <h1>
              Raising Confident,
              <br />
              Emotionally Strong
              <br />
              Children Starts With
              <br />
              <span>Empowered Parents.</span>
            </h1>
            <div className="line" />
            <h3>Meet Dr. Ishinna B. Sadana</h3>
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
            <div className="cta-row">
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
              alt="Dr. Ishinna"
              className="hero-image"
            />
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
              <p className="testi-body">{currentTestimonial.body}</p>
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
                  <strong>{card.price}</strong>
                  <button>Enroll →</button>
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
          </div>

          <div className="consult-copy">
            <p className="consult-kicker">Private Consultation</p>
            <h2>
              One-on-One Parenting
              <br />
              Consultation <span>with</span>
              <br />
              <span>Dr. Ishinna Sadana</span>
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
            <button className="btn consult-cta">Book Your Private Session →</button>
            <p className="consult-meta">₹4,999 • 75-minute consultation</p>
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
            <p className="book-kicker">Book by Dr. Ishinna</p>
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
              <button className="btn book-cta">Buy on Amazon →</button>
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
            <h2>Book a Live Session with Dr. Ishinna</h2>
            <div className="live-title-line" />
            <p className="live-intro">
              Dr. Ishinna conducts impactful live workshops - both online and offline - for
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
                alt="Dr. Ishinna speaking"
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
              <img src="/site-assets/images/getintouch.png" alt="Dr. Ishinna" />
            </article>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="shell footer-inner">
          <p>© {new Date().getFullYear()} Ishinna Sadana. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
