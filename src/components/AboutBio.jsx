import React from 'react';
import { aboutData } from '../data/aboutContent';

const AboutBio = () => {
    return (
        <section className="about-bio-section">
            <div className="shell about-bio-grid">
                <div className="about-bio-content-col">
                    <h2
                        className="about-bio-title title-v2"
                        dangerouslySetInnerHTML={{ __html: aboutData.hero.title2 }}
                    ></h2>
                    <div className="about-bio-content">
                        {aboutData.hero.paragraphs.slice(1).map((para, index) => (
                            <p key={index} dangerouslySetInnerHTML={{ __html: para }}></p>
                        ))}
                    </div>
                </div>

                <div className="about-bio-media-col">
                    <div className="about-bio-shape"></div>
                    <div className="about-bio-image-main">
                        <img src="/site-assets/images/getintouch.png" alt="Dr. Ishinna" />
                    </div>
                    <div className="about-bio-image-overlap">
                        <img src="/site-assets/images/meetdrishina2.png" alt="Dr. Ishinna with child" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutBio;
