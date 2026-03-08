import React from 'react'

const FeedbackVideoCarousel = () => {
    // Creating an array of 6 placeholders based on the design
    const placeholders = Array.from({ length: 6 })

    return (
        <section className="cert-feedback-section">
            <div className="shell cert-feedback-shell">
                <h2 className="cert-feedback-title">PPC Program Feedback</h2>

                <div className="cert-feedback-track-container">
                    <div className="cert-feedback-track">
                        {placeholders.map((_, index) => (
                            <article key={index} className="cert-feedback-video-block">
                                {/* Empty black block per screenshot */}
                                <div className="cert-feedback-placeholder"></div>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default FeedbackVideoCarousel
