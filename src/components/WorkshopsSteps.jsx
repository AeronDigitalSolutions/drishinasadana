import React from 'react';
import { workshopsData } from '../data/workshopsContent';

const WorkshopsSteps = () => {
    return (
        <section className="work-steps-section">
            <div className="shell work-steps-shell">
                <h2 className="work-steps-title">Follow the given steps to get access of the Workshop:</h2>

                <div className="work-steps-grid">
                    {workshopsData.steps.map((item, index) => (
                        <div key={index} className="work-step-item">
                            <div className="work-step-label">{item.step}</div>
                            <div className="work-step-action">{item.action}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WorkshopsSteps;
