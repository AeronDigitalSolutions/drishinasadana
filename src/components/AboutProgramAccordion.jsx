import { useState } from 'react'
import { aboutProgramFAQs } from '../data/getCertifiedContent'

const AboutProgramAccordion = () => {
    const [openIndex, setOpenIndex] = useState(0)

    const toggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? -1 : index)
    }

    return (
        <section className="cert-about-section">
            <div className="shell cert-about-shell">
                <h2 className="cert-section-title">About The Program</h2>
                <p className="cert-section-desc">
                    This program is a two-month journey that aims to have more conscious Parents and create well informed Parent Coaches who can effectively help many more parents and bring changes in their own lives.
                </p>

                <div className="cert-faq-container">
                    {aboutProgramFAQs.map((faq, index) => {
                        const isOpen = openIndex === index
                        return (
                            <div
                                key={index}
                                className={`cert-faq-item ${isOpen ? 'open' : ''}`}
                            >
                                <button
                                    className="cert-faq-question"
                                    onClick={() => toggleAccordion(index)}
                                    aria-expanded={isOpen}
                                >
                                    <span className="cert-faq-icon">»</span>
                                    <span className="cert-faq-text">{faq.question}</span>
                                    <span className="cert-faq-toggle-icon">{isOpen ? '−' : '+'}</span>
                                </button>
                                <div
                                    className="cert-faq-answer-wrap"
                                    style={{ height: isOpen ? 'auto' : '0px', overflow: 'hidden' }}
                                >
                                    <div className="cert-faq-answer">
                                        {faq.answer.split('\n').map((line, i) => (
                                            <p key={i}>{line}</p>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>

                <div className="cert-about-cta-row">
                    <button className="btn cert-btn-primary">Enroll Now</button>
                    <button className="btn cert-btn-outline">Know More</button>
                </div>
            </div>
        </section >
    )
}

export default AboutProgramAccordion
