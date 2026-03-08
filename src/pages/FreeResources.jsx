import './FreeResources.css';
import React from 'react'
import FreeResourcesHero from '../components/FreeResourcesHero'
import FreeResourcesPodcasts from '../components/FreeResourcesPodcasts'
import FreeResourcesYoutube from '../components/FreeResourcesYoutube'

const FreeResources = () => {
    return (
        <main className="page-free-resources">
            <FreeResourcesHero />
            <FreeResourcesPodcasts />
            <FreeResourcesYoutube />
        </main>
    )
}

export default FreeResources
