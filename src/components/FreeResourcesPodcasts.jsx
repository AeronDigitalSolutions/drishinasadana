import React from 'react';
import { freeResourcesData } from '../data/freeResourcesContent';

const FreeResourcesPodcasts = () => {
    return (
        <section className="free-podcasts-section">
            <div className="shell free-podcasts-shell">
                <h2 className="free-section-heading">
                    {freeResourcesData.podcasts.title}
                </h2>

                <div className="free-video-grid">
                    {freeResourcesData.podcasts.videos.map((video) => (
                        <div key={video.id} className="free-video-card">
                            <div className="free-video-thumbnail-wrap" style={{ paddingBottom: '56.25%', position: 'relative', height: 0 }}>
                                <iframe
                                    src={`https://www.youtube.com/embed/${video.ytId}`}
                                    title={video.title}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '100%',
                                        border: 'none',
                                        borderRadius: 'var(--radius)'
                                    }}
                                ></iframe>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FreeResourcesPodcasts;
