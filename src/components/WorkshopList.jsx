import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { workshopsData } from '../data/workshopsContent';
import { getCurrentAuthState, getProfileInfo } from '../lib/apiLms';

const WorkshopList = () => {
    const [authState, setAuthState] = useState(getCurrentAuthState())
    const [purchasedWorkshopIds, setPurchasedWorkshopIds] = useState(new Set())

    useEffect(() => {
        if (authState) {
            getProfileInfo().then(data => {
                if (data && data.purchases) {
                    setPurchasedWorkshopIds(new Set(data.purchases.map(p => p.workshopId)))
                }
            })
        } else {
            setPurchasedWorkshopIds(new Set())
        }
    }, [authState])

    useEffect(() => {
        const syncAuth = () => setAuthState(getCurrentAuthState())
        window.addEventListener('Ishinna-auth-changed', syncAuth)
        return () => window.removeEventListener('Ishinna-auth-changed', syncAuth)
    }, [])

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

                        <div className="work-item-number-col work-item-cta-col" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            {!authState ? (
                                <>
                                    <Link
                                        to={`/checkout/${workshop.id}`}
                                        className="btn primary"
                                        style={{ whiteSpace: 'nowrap', padding: '12px 30px', textDecoration: 'none' }}
                                    >
                                        Buy this workshop
                                    </Link>
                                    <Link
                                        to={`/workshop-login/${workshop.id}`}
                                        className="btn ghost"
                                        style={{ whiteSpace: 'nowrap', padding: '12px 24px', textDecoration: 'none' }}
                                    >
                                        Already Purchased? Get Access
                                    </Link>
                                </>
                            ) : purchasedWorkshopIds.has(workshop.id) ? (
                                <Link
                                    to={`/lms/workshop/${workshop.id}/${authState.authToken}`}
                                    className="btn primary"
                                    style={{ whiteSpace: 'nowrap', padding: '12px 30px', textDecoration: 'none' }}
                                >
                                    View Workshop
                                </Link>
                            ) : (
                                <Link
                                    to={`/checkout/${workshop.id}`}
                                    className="btn primary"
                                    style={{ whiteSpace: 'nowrap', padding: '12px 30px', textDecoration: 'none' }}
                                >
                                    Buy this workshop
                                </Link>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default WorkshopList;
