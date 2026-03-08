import { useState } from 'react'
import { finalFAQs } from '../data/getCertifiedContent'

const CertifiedFAQs = () => {
    const [openIndex, setOpenIndex] = useState(0) // Default to first open

    const toggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? -1 : index)
    }

    return (
        <section className="cert-finalfaq-section">
            <div className="shell cert-finalfaq-shell">
                <h2 className="cert-finalfaq-title">Frequently Asked Questions</h2>

                <div className="cert-finalfaq-container">
                    {finalFAQs.map((faq, index) => {
                        const isOpen = openIndex === index
                        return (
                            <div
                                key={index}
                                className={`cert-finalfaq-item ${isOpen ? 'open' : ''}`}
                            >
                                <button
                                    className="cert-finalfaq-question"
                                    onClick={() => toggleAccordion(index)}
                                    aria-expanded={isOpen}
                                >
                                    <span className="cert-finalfaq-text">{faq.question}</span>
                                    <span className={`cert-finalfaq-icon ${isOpen ? 'open' : ''}`}>
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            {isOpen ? (
                                                <path d="M12 19V5M5 12l7-7 7 7" /> // Up arrow (↑)
                                            ) : (
                                                <path d="M6 9l6 6 6-6" /> // Down chevron (∨)
                                            )}
                                        </svg>
                                    </span>
                                </button>
                                <div
                                    className="cert-finalfaq-answer-wrap"
                                    style={{ height: isOpen ? 'auto' : '0px', overflow: 'hidden' }}
                                >
                                    <div className="cert-finalfaq-answer">
                                        <p>{faq.answer}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div >
        </section >
    )
}

export default CertifiedFAQs
