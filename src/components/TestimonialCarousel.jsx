import { useState, useEffect } from 'react'
import { certifiedTestimonials } from '../data/getCertifiedContent'
import ReadMore from './ReadMore'

const TestimonialCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [cardsToShow, setCardsToShow] = useState(3)

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setCardsToShow(1)
            } else if (window.innerWidth < 1100) {
                setCardsToShow(2)
            } else {
                setCardsToShow(3)
            }
        }

        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const maxIndex = Math.max(0, certifiedTestimonials.length - cardsToShow)

    const goNext = () => {
        setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
    }

    const goPrev = () => {
        setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1))
    }

    return (
        <section className="cert-testimonials-section">
            <div className="cert-bg-curve"></div>

            <div className="shell cert-header-shell">
                <h1 className="cert-title">Positive Parenting Coach Program</h1>
                <p className="cert-subtitle">
                    This program is a two-month journey that aims to have more conscious parents and create well informed parent coaches who can effectively help many more parents and bring changes in their own lives.
                </p>
            </div>

            <div className="shell cert-carousel-shell">
                <div className="cert-carousel-container">

                    <button
                        className="cert-nav-btn prev"
                        onClick={goPrev}
                        aria-label="Previous testimonials"
                    >
                        &#8249;
                    </button>

                    <div className="cert-carousel-viewport">
                        <div
                            className="cert-carousel-track"
                            style={{
                                transform: `translateX(-${currentIndex * (100 / cardsToShow)}%)`
                            }}
                        >
                            {certifiedTestimonials.map((testimonial, idx) => (
                                <div
                                    className="cert-card-wrap"
                                    key={idx}
                                    style={{ width: `${100 / cardsToShow}%` }}
                                >
                                    <article className="cert-card">
                                        <div className="cert-card-header">
                                            <h3>{testimonial.name}</h3>
                                            <p>{testimonial.role}</p>
                                        </div>

                                        <div className="cert-card-avatar-wrap">
                                            <img
                                                src={testimonial.image}
                                                alt={testimonial.name}
                                                className="cert-card-avatar"
                                            />
                                        </div>

                                        <div className="cert-card-body">
                                            <ReadMore text={testimonial.text} limit={160} />
                                        </div>
                                    </article>
                                </div>
                            ))}
                        </div>
                    </div>

                    <button
                        className="cert-nav-btn next"
                        onClick={goNext}
                        aria-label="Next testimonials"
                    >
                        &#8250;
                    </button>

                </div>
            </div>
        </section>
    )
}

export default TestimonialCarousel
