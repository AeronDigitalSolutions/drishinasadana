import React, { useEffect, useRef, useState } from 'react';
import { aboutData } from '../data/aboutContent';

const AboutNewspapers = () => {
    const images = aboutData.newspapers.images
    const [activeIndex, setActiveIndex] = useState(0)
    const touchStartX = useRef(0)
    const touchCurrentX = useRef(0)

    useEffect(() => {
        if (images.length <= 1) return undefined
        const intervalId = window.setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % images.length)
        }, 3000)
        return () => window.clearInterval(intervalId)
    }, [images.length])

    const handleTouchStart = (event) => {
        const x = event.touches?.[0]?.clientX || 0
        touchStartX.current = x
        touchCurrentX.current = x
    }

    const handleTouchMove = (event) => {
        touchCurrentX.current = event.touches?.[0]?.clientX || 0
    }

    const handleTouchEnd = () => {
        const delta = touchCurrentX.current - touchStartX.current
        const threshold = 40
        if (Math.abs(delta) < threshold) return

        if (delta < 0) {
            setActiveIndex((prev) => (prev + 1) % images.length)
            return
        }

        setActiveIndex((prev) => (prev - 1 + images.length) % images.length)
    }

    return (
        <section className="about-news-section">
            <div className="shell about-news-shell">
                <h2 className="about-section-heading" style={{ textAlign: 'center', marginBottom: '40px' }}>
                    {aboutData.newspapers.title2}
                    <div className="heading-underline" style={{ margin: '15px auto 0' }}></div>
                </h2>

                <div className="about-news-masonry">
                    {images.map((img, index) => (
                        <div key={index} className="about-news-item">
                            <img src={img} alt={`Newspaper appearance ${index + 1}`} />
                        </div>
                    ))}
                </div>

                <div className="about-news-mobile" aria-label="Newspaper appearances slider">
                    <div
                        className="about-news-mobile-slider"
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                    >
                        <div
                            className="about-news-mobile-track"
                            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
                        >
                            {images.map((img, index) => (
                                <div className="about-news-mobile-slide" key={index}>
                                    <div className="about-news-item">
                                        <img src={img} alt={`Newspaper appearance ${index + 1}`} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="about-news-mobile-dots">
                        {images.map((_, index) => (
                            <button
                                key={index}
                                type="button"
                                aria-label={`Go to slide ${index + 1}`}
                                className={`about-news-dot ${index === activeIndex ? 'active' : ''}`}
                                onClick={() => setActiveIndex(index)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutNewspapers;
