import React from 'react';
import { freeResourcesData } from '../data/freeResourcesContent';

const FreeResourcesHero = () => {
    return (
        <section className="free-hero-section">
            <div className="shell free-hero-shell">
                <h1 className="free-hero-title">{freeResourcesData.hero.title}</h1>
                <p className="free-hero-text">{freeResourcesData.hero.paragraph}</p>
            </div>
        </section>
    );
};

export default FreeResourcesHero;
