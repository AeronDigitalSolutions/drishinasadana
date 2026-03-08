import React from 'react';
import SectionTitle from './SectionTitle';
import { featuredLogos } from '../data/siteContent';

const AboutFeatured = () => {
    return (
        <section className="shell reveal about-featured-override">
            <SectionTitle title="Featured In" />
            <div className="featured-logos card">
                <div className="logo-marquee">
                    <div className="logo-track">
                        {[...featuredLogos, ...featuredLogos].map((logo, idx) => (
                            <div className="logo-item" key={`${logo.alt}-${idx}`}>
                                <img src={logo.src} alt={logo.alt} loading="lazy" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutFeatured;
