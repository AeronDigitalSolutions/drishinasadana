import './Workshops.css';
import React from 'react'
import WorkshopsHero from '../components/WorkshopsHero'
import WorkshopsSteps from '../components/WorkshopsSteps'
import WorkshopList from '../components/WorkshopList'
import WorkshopBundleBanner from '../components/WorkshopBundleBanner'

const Workshops = () => {
    return (
        <main className="page-workshops">
            <WorkshopsHero />
            <WorkshopsSteps />
            <WorkshopList />
            <WorkshopBundleBanner />
        </main>
    )
}

export default Workshops
