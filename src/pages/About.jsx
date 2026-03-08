import './About.css';
import React from 'react'
import AboutHero from '../components/AboutHero'
import AboutTraits from '../components/AboutTraits'
import AboutBio from '../components/AboutBio'
import AboutFeatured from '../components/AboutFeatured'
import AboutNewspapers from '../components/AboutNewspapers'

const About = () => {
    return (
        <main className="page-about">
            <AboutHero />
            <AboutTraits />
            <AboutBio />
            <AboutFeatured />
            <AboutNewspapers />
        </main>
    )
}

export default About
