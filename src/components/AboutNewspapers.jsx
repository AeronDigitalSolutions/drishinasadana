import React from 'react';
import { aboutData } from '../data/aboutContent';

const AboutNewspapers = () => {
    return (
        <section className="about-news-section">
            <div className="shell about-news-shell">
                <h2 className="about-section-heading" style={{ textAlign: 'center', marginBottom: '40px' }}>
                    {aboutData.newspapers.title2}
                    <div className="heading-underline" style={{ margin: '15px auto 0' }}></div>
                </h2>

                <div className="about-news-masonry">
                    {aboutData.newspapers.images.map((img, index) => (
                        <div key={index} className="about-news-item">
                            <img src={img} alt={`Newspaper appearance ${index + 1}`} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AboutNewspapers;
