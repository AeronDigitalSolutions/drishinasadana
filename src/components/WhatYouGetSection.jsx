import { whatYouGetFeatures } from '../data/getCertifiedContent'

const WhatYouGetSection = () => {
    return (
        <section className="cert-whatget-section">
            {/* Decorative Background Elements */}
            <div className="cert-deco-shape shape-1" />
            <div className="cert-deco-shape shape-2" />
            <div className="cert-deco-shape shape-3" />
            <div className="cert-deco-shape shape-4" />
            <div className="cert-deco-shape shape-5" />
            <div className="cert-deco-shape shape-6" />

            <div className="shell cert-whatget-shell">
                <h2 className="cert-whatget-title">What Do You Get?</h2>

                <div className="cert-whatget-list">
                    {whatYouGetFeatures.map((feature, index) => (
                        <div className="cert-whatget-item" key={index}>
                            <div className="cert-whatget-label-wrap">
                                <div className="cert-whatget-label">
                                    {feature.label}
                                </div>
                            </div>
                            <div className="cert-whatget-content-wrap">
                                <div className="cert-whatget-content">
                                    {feature.description.split('\\n').map((line, i) => (
                                        <p key={i}>{line}</p>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default WhatYouGetSection
