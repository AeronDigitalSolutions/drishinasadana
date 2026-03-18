import React, { useState } from 'react';
import { bookData } from '../data/bookContent';

const BookPurchaseLink = () => {
    const [activeSlide, setActiveSlide] = useState(0);
    const [showModal, setShowModal] = useState(false);

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
                                <a 
                                    href="https://www.amazon.in/Power-Parent-Parents-Know-Better/dp/014346597X" 
                                    target="_blank" 
                                    rel="noreferrer" 
                                    className="book-btn-orange" 
                                    style={{ textDecoration: 'none', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                                >
                                    {bookData.purchase.buyNowText}
                                </a>
                                <button className="book-btn-navy" onClick={() => setShowModal(true)}>
                                    {bookData.purchase.buyMarathiText}
                                </button>
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

            {showModal && (
                <div className="global-modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="global-modal-content" onClick={e => e.stopPropagation()}>
                        <h2 className="global-modal-title">Coming Soon!</h2>
                        <p className="global-modal-text">The Marathi translation for <strong>Power to the Parent</strong> is currently underway and will be available to purchase very soon.</p>
                        <div className="global-modal-actions">
                            <button className="global-modal-btn-primary" onClick={() => setShowModal(false)}>
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default BookPurchaseLink;
