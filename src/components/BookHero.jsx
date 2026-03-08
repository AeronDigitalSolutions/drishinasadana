import React from 'react';
import { bookData } from '../data/bookContent';

const BookHero = () => {
    return (
        <section className="book-hero-top-section">
            <div className="shell book-hero-top-shell">
                <h1 className="book-hero-title">{bookData.hero.title}</h1>
                <p className="book-hero-text" dangerouslySetInnerHTML={{ __html: bookData.hero.paragraph }}></p>
            </div>
        </section>
    );
};

export default BookHero;
