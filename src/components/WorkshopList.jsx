import React from 'react';
import { workshopsData } from '../data/workshopsContent';

const WorkshopList = () => {
    return (
        <section className="work-list-section">
            <div className="shell work-list-shell">
                {workshopsData.workshops.map((workshop, index) => (
                    <div key={index} className="work-item">
                        <div className="work-item-image-col">
                            <img src={workshop.image} alt={workshop.title} className="work-item-img" />
                        </div>

                        <div className="work-item-content-col">
                            <h2 className="work-item-title">{workshop.title}</h2>
                            <div className="work-item-fee">
                                {/* Highlight the buy now part if it exists */}
                                {workshop.price.includes('Buy Now') ? (
                                    <>
                                        <span className="work-fee-text">{workshop.price.split('Buy Now')[0]}</span>
                                        <span className="work-fee-buy">Buy Now</span>
                                    </>
                                ) : (
                                    <span className="work-fee-text">{workshop.price}</span>
                                )}
                            </div>

                            <div className="work-item-details">
                                <p className="work-item-learn-heading">What you will learn:</p>
                                <ul className="work-item-points">
                                    {workshop.points.map((point, idx) => (
                                        <li key={idx}>{point}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="work-item-number-col" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <button className="btn primary" style={{ whiteSpace: 'nowrap', padding: '12px 30px' }}>
                                Buy this workshop
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default WorkshopList;
