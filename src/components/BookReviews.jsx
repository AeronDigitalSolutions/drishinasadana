import React from 'react';
import { bookData } from '../data/bookContent';

const BookReviews = () => {
    return (
        <section className="book-reviews-section">
            <div className="shell book-reviews-shell">
                <h2 className="book-section-heading">
                    {bookData.reviews.title}
                    <div className="heading-underline"></div>
                </h2>

                <div className="book-reviews-grid">
                    {bookData.reviews.list.map((review) => (
                        <div key={review.id} className="book-review-card">
                            <p className="book-review-text">"{review.text}"</p>
                            <span className="book-review-name">- {review.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BookReviews;
