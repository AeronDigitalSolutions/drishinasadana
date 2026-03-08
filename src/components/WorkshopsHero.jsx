import React from 'react';
import { workshopsData } from '../data/workshopsContent';

const WorkshopsHero = () => {
    return (
        <section className="work-hero-section">
            <div className="shell work-hero-shell">
                <h1 className="work-hero-title">{workshopsData.hero.title}</h1>
                <p className="work-hero-subtitle">{workshopsData.hero.subtitle}</p>
            </div>
        </section>
    );
};

export default WorkshopsHero;
