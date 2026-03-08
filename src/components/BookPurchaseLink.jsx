import React, { useState } from 'react';
import { bookData } from '../data/bookContent';

const BookPurchaseLink = () => {
    const [activeSlide, setActiveSlide] = useState(0);

    const goPrev = () => {
        setActiveSlide((prev) => (prev === 0 ? bookData.purchase.sliderImages.length - 1 : prev - 1));
    };

    const goNext = () => {
        setActiveSlide((prev) => (prev === bookData.purchase.sliderImages.length - 1 ? 0 : prev + 1));
    };

    return (
        <section className="book-purchase-section">
            <div className="shell book-purchase-shell">
                <div className="book-purchase-grid">

                    <div className="book-purchase-left">
                        <div className="book-cover-wrap">
                            <span className="book-bestseller-badge">{bookData.purchase.badgeText}</span>
                            <img src={bookData.purchase.bookCoverImg} alt="Power to the Parent Cover" className="book-cover-img" />
                        </div>

                        <div className="book-purchase-actions">
                            <h3 className="book-purchase-heading">{bookData.purchase.ctaHeading}</h3>
                            <div className="book-btn-group">
                                <button className="book-btn-orange">{bookData.purchase.buyNowText}</button>
                                <button className="book-btn-navy">{bookData.purchase.buyMarathiText}</button>
                            </div>
                        </div>
                    </div>

                    <div className="book-purchase-right">
                        <div className="book-slider-container">
                            <img
                                src={bookData.purchase.sliderImages[activeSlide]}
                                alt="Dr. Ishinna with book"
                                className="book-slider-img"
                            />
                            <button className="book-slider-nav prev" onClick={goPrev}>‹</button>
                            <button className="book-slider-nav next" onClick={goNext}>›</button>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default BookPurchaseLink;
