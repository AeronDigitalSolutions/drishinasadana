import './Workshops.css';
import React from 'react'
import WorkshopsHero from '../components/WorkshopsHero'
import WorkshopList from '../components/WorkshopList'
import WorkshopBundleBanner from '../components/WorkshopBundleBanner'

const Workshops = () => {
    return (
        <main className="page-workshops">
            <WorkshopsHero />
            <WorkshopList />
            <WorkshopBundleBanner />
        </main>
    )
}

export default Workshops
