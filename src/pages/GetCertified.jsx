import './GetCertified.css';
import TestimonialCarousel from '../components/TestimonialCarousel'
import AboutProgramAccordion from '../components/AboutProgramAccordion'
import WhatYouGetSection from '../components/WhatYouGetSection'
import EnrollmentFormsSection from '../components/EnrollmentFormsSection'
import CertifiedCoachesGrid from '../components/CertifiedCoachesGrid'
import FeedbackVideoCarousel from '../components/FeedbackVideoCarousel'
import CertifiedFAQs from '../components/CertifiedFAQs'

const GetCertified = () => {
    return (
        <main className="page-get-certified">
            <TestimonialCarousel />
            <AboutProgramAccordion />
            <WhatYouGetSection />
            <EnrollmentFormsSection />
            <CertifiedCoachesGrid />
            <FeedbackVideoCarousel />
            <CertifiedFAQs />
        </main>
    )
}

export default GetCertified
