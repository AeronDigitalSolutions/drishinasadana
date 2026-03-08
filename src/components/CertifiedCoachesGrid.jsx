const coachPlaceholderImages = [
    '/site-assets/images/booklivesession-1.png',
    '/site-assets/images/booklivesession-2.png',
    '/site-assets/images/getintouch.png',
    '/site-assets/images/one-on-one.png',
    '/site-assets/images/booklivesession-1.png',
    '/site-assets/images/booklivesession-2.png',
    '/site-assets/images/getintouch.png',
    '/site-assets/images/booklivesession-1.png',
    '/site-assets/images/booklivesession-2.png',
    '/site-assets/images/one-on-one.png',
    '/site-assets/images/getintouch.png',
    '/site-assets/images/booklivesession-1.png',
    '/site-assets/images/booklivesession-2.png',
    '/site-assets/images/booklivesession-1.png',
    '/site-assets/images/getintouch.png',
    '/site-assets/images/booklivesession-2.png',
    '/site-assets/images/one-on-one.png',
    '/site-assets/images/booklivesession-1.png',
    '/site-assets/images/getintouch.png',
    '/site-assets/images/booklivesession-2.png',
    '/site-assets/images/booklivesession-1.png',
    '/site-assets/images/one-on-one.png',
    '/site-assets/images/booklivesession-2.png',
    '/site-assets/images/getintouch.png',
]

const CertifiedCoachesGrid = () => {
    return (
        <section className="cert-coaches-section">
            <h2 className="cert-coaches-title">Meet Our Certified Positive Parent Coaches</h2>

            <div className="cert-coaches-masonry">
                {coachPlaceholderImages.map((src, index) => (
                    <div className="cert-coaches-masonry-item" key={index}>
                        <img
                            src={src}
                            alt={`Certified Coach ${index + 1}`}
                            className="cert-coach-image"
                            loading="lazy"
                        />
                    </div>
                ))}
            </div>
        </section>
    )
}

export default CertifiedCoachesGrid
