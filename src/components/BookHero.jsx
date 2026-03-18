import React, { useState } from 'react';
import { bookData } from '../data/bookContent';

const BookHero = () => {
    const [activeSlide, setActiveSlide] = useState(0)

    const goPrev = () => {
        setActiveSlide((prev) => (prev === 0 ? bookData.purchase.sliderImages.length - 1 : prev - 1))
    }

    const goNext = () => {
        setActiveSlide((prev) => (prev === bookData.purchase.sliderImages.length - 1 ? 0 : prev + 1))
    }

    return (
        <section className="book-hero-top-section">
            <div className="shell book-hero-top-shell">
                <h1 className="book-hero-title">{bookData.hero.title}</h1>

                <div className="book-hero-mobile-slider">
                    <div className="book-slider-container">
                        <img
                            src={bookData.purchase.sliderImages[activeSlide]}
                            alt="Dr. Ishinna with book"
                            className="book-slider-img"
                        />
                        <button type="button" className="book-slider-nav prev" onClick={goPrev}>‹</button>
                        <button type="button" className="book-slider-nav next" onClick={goNext}>›</button>
                    </div>
                </div>

                <p className="book-hero-text" dangerouslySetInnerHTML={{ __html: bookData.hero.paragraph }}></p>
            </div>
        </section>
    );
};

export default BookHero;
