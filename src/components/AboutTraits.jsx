import React from 'react';
import { aboutData } from '../data/aboutContent';

const AboutTraits = () => {
    return (
        <section className="about-traits-section">
            <div className="shell about-traits-shell">
                <div className="about-traits-container">
                    <div className="about-traits-logo">
                        <img src="/site-assets/images/solologo.png" alt="Ishinna Sadana Logo" />
                    </div>
                    <div className="about-traits-grid">
                        {aboutData.traits.map((trait, index) => (
                            <div
                                key={index}
                                className={`about-trait-pill ${index === aboutData.traits.length - 1 ? 'about-trait-pill-highlight' : ''}`}
                                style={{ backgroundColor: trait.bgColor }}
                            >
                                {trait.text}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutTraits;
