import React from 'react';
import { aboutData } from '../data/aboutContent';

const AboutHero = () => {
    return (
        <section className="about-hero-section">
            <div className="shell about-hero-shell">
                <div className="about-hero-grid">
                    <div className="about-hero-image-col">
                        <div className="about-hero-image-shape"></div>
                        <img
                            src="/site-assets/images/aboutdrishina.png"
                            alt="Dr. Ishinna B. Sadana"
                            className="about-hero-img"
                        />
                    </div>
                    <div className="about-hero-content-col">
                        <h1
                            className="about-hero-title title-v1"
                            dangerouslySetInnerHTML={{ __html: aboutData.hero.title }}
                        ></h1>
                        <div className="about-hero-bio">
                            <p dangerouslySetInnerHTML={{ __html: aboutData.hero.paragraphs[0] }}></p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutHero;
