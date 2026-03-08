const EnrollmentFormsSection = () => {
    return (
        <section className="cert-enroll-section">
            {/* Top Enrollment Block */}
            <div className="shell cert-enroll-shell">
                <div className="cert-enroll-grid">

                    <article className="cert-enroll-image-col">
                        <img
                            src="/site-assets/images/getintouch.png" // Fallback matching screenshot content
                            alt="Dr. Ishinna with a certified coach"
                            className="cert-enroll-image"
                        />
                    </article>

                    <article className="cert-enroll-form-col">
                        <h2>
                            Next Two Months<br />
                            PPC batch starting<br />
                            in: February 2026
                        </h2>
                        <p>
                            If you are interested in enrolling for the<br />
                            program, fill out our quick form and we<br />
                            will get in touch with you.
                        </p>
                        <p className="cert-enroll-bold">
                            <strong>Take the first step today!</strong>
                        </p>

                        <form className="cert-enroll-form">
                            <div className="cert-input-group">
                                <label>Name <span>*</span></label>
                                <input type="text" required />
                            </div>
                            <div className="cert-input-group">
                                <label>Email <span>*</span></label>
                                <input type="email" required />
                            </div>
                            <div className="cert-input-group">
                                <label>Phone <span>*</span></label>
                                <input type="tel" required />
                            </div>
                            <div className="cert-input-group">
                                <label>Message</label>
                                <textarea rows="4"></textarea>
                            </div>
                            <button type="button" className="btn cert-btn-submit">
                                SUBMIT
                            </button>
                        </form>
                    </article>

                </div>
            </div>

            {/* Bottom Download Outline Block */}
            <div className="shell cert-download-shell">
                <div className="cert-download-panel">
                    <h2>Download Course Outline</h2>
                    <form className="cert-download-form">

                        <div className="cert-download-input-row">
                            <div className="cert-input-group full-width">
                                <label>Full Name <span>*</span></label>
                                <input type="text" required />
                            </div>
                        </div>

                        <div className="cert-download-input-row halves">
                            <div className="cert-input-group">
                                <label>Email <span>*</span></label>
                                <input type="email" required />
                            </div>
                            <div className="cert-input-group">
                                <label>Phone <span>*</span></label>
                                <input type="tel" required />
                            </div>
                        </div>

                        <button type="button" className="btn cert-btn-submit download-btn">
                            DOWNLOAD
                        </button>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default EnrollmentFormsSection
