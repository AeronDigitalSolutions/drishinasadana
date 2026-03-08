import './Book.css';
import React from 'react'
import BookHero from '../components/BookHero'
import BookPurchaseLink from '../components/BookPurchaseLink'
import BookReviews from '../components/BookReviews'

const Book = () => {
    return (
        <main className="page-book">
            <BookHero />
            <BookPurchaseLink />
            <BookReviews />
        </main>
    )
}

export default Book
