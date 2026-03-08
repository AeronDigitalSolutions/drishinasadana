import React from 'react';
import { workshopsData } from '../data/workshopsContent';

const WorkshopBundleBanner = () => {
    const { bundle } = workshopsData;

    return (
        <section className="work-bundle-section">
            <div className="shell work-bundle-shell">
                <div className="work-bundle-layout-card">
                    {/* Left: Image */}
                    <div className="work-bundle-layout-image">
                        <img
                            src="/site-assets/images/getall4workshops.jpeg"
                            alt="Get all 4 workshops"
                        />
                    </div>

                    {/* Right: Content */}
                    <div className="work-bundle-layout-content">
                        <h2>{bundle.title}</h2>
                        <p>{bundle.subtitle}</p>

                        <div className="work-bundle-layout-cta">
                            <button className="btn primary">
                                {bundle.buttonText}
                            </button>
                            <span className="price">{bundle.price}</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WorkshopBundleBanner;
