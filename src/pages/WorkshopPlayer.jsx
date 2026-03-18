import { useEffect, useMemo, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { workshopsData } from '../data/workshopsContent'
import { getProfileInfo, setCurrentAuthToken } from '../lib/apiLms'
import LoadingAnimation from '../components/LoadingAnimation'
import './Lms.css'

const WorkshopPlayer = () => {
  const { workshopId, authToken } = useParams()
  const [activeLesson, setActiveLesson] = useState(0)
  const [purchases, setPurchases] = useState(null)
  const [videoReady, setVideoReady] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  const workshop = useMemo(
    () => workshopsData.workshops.find((item) => item.id === workshopId),
    [workshopId],
  )

  const lessons = useMemo(() => (workshop ? workshop.mockLessons || [] : []), [workshop])
  const currentLesson = lessons[activeLesson] || null
  const totalLessons = lessons.length

  useEffect(() => {
    if (!authToken) return
    setCurrentAuthToken(authToken)
    getProfileInfo().then((data) => {
      if (data) setPurchases(data.purchases)
      else setPurchases([])
    })
  }, [authToken])

  useEffect(() => {
    if (!currentLesson || !workshop) return
    setVideoReady(false)
    setIsPlaying(false)
  }, [currentLesson, workshop])

  // --- Early returns AFTER all hooks ---

  if (purchases === null) {
    return <main className="lms-page"><div className="shell">Loading lesson...</div></main>
  }

  const purchasedIds = new Set(purchases.map((item) => item.workshopId))

  if (!purchasedIds.has(workshopId)) {
    return <Navigate to={`/checkout/${workshopId}`} replace />
  }

  if (!workshop) {
    return <Navigate to={`/lms/dashboard/${authToken}`} replace />
  }

  const goToPrev = () => {
    if (activeLesson > 0) setActiveLesson(activeLesson - 1)
  }

  const goToNext = () => {
    if (activeLesson < totalLessons - 1) setActiveLesson(activeLesson + 1)
  }

  return (
    <main className="lms-page wp-page">
      <div className="wp-container">
        {/* ---- Top Header ---- */}
        <div className="wp-top-bar">
          <div className="wp-top-left">
            <h1 className="wp-workshop-title">{workshop.title}</h1>
            <p className="wp-workshop-subtitle">Personal Video Lectures</p>
          </div>
          <Link to={`/lms/dashboard/${authToken}`} className="wp-back-btn">
            Back to Dashboard
          </Link>
        </div>

        {/* ---- Progress Summary ---- */}
        <div className="wp-progress-summary">
          <span className="wp-progress-highlight">
            Lesson {activeLesson + 1} of {totalLessons}
          </span>
          <span className="wp-progress-dot">·</span>
          <span>{totalLessons} {totalLessons === 1 ? 'Lesson' : 'Lessons'}</span>
        </div>

        {/* ---- Main Layout ---- */}
        <div className="wp-main-grid">
          {/* Left Column: Video */}
          <div className="wp-left-col">
            <div className="wp-video-container">
              {currentLesson ? (
                <>
                  <div className="wp-video-wrap">
                    {currentLesson.videoUrl ? (
                      <video
                        key={currentLesson.videoUrl}
                        controls
                        preload="metadata"
                        className="wp-video-element"
                        onLoadedData={() => setVideoReady(true)}
                        onPlay={() => setIsPlaying(true)}
                        onPause={() => setIsPlaying(false)}
                      >
                        <source src={currentLesson.videoUrl} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    ) : (
                      <iframe
                        src={`https://www.youtube.com/embed/${currentLesson.ytId}`}
                        title={currentLesson.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="wp-video-element"
                      />
                    )}

                    {/* Loading state overlay */}
                    {!videoReady && (
                      <div className="wp-loading-state">
                        <LoadingAnimation />
                      </div>
                    )}

                    {/* Click to Play overlay */}
                    {videoReady && !isPlaying && (
                      <div className="wp-play-overlay">
                        <div className="wp-play-icon">▶</div>
                        <span className="wp-play-label">Click to Play</span>
                      </div>
                    )}
                  </div>

                  {/* Video Info */}
                  <div className="wp-video-info">
                    <h3 className="wp-lesson-title">{currentLesson.title}</h3>
                    <p className="wp-lesson-meta">
                      Instructor: <strong>Dr. Ishinna Sadana</strong>
                    </p>
                  </div>
                </>
              ) : (
                <div className="wp-no-lesson">
                  <p>No lessons configured for this workshop yet.</p>
                </div>
              )}
            </div>

            {/* Nav Buttons */}
            {totalLessons > 1 && (
              <div className="wp-nav-buttons">
                <button
                  type="button"
                  className="wp-nav-btn wp-nav-prev"
                  onClick={goToPrev}
                  disabled={activeLesson === 0}
                >
                  ← Previous Lesson
                </button>
                <button
                  type="button"
                  className="wp-nav-btn wp-nav-next"
                  onClick={goToNext}
                  disabled={activeLesson === totalLessons - 1}
                >
                  Next Lesson →
                </button>
              </div>
            )}
          </div>

          {/* Right Column: Sidebar */}
          <div className="wp-right-col">
            {/* Course Curriculum Card */}
            <div className="wp-sidebar-card">
              <h4 className="wp-sidebar-title">Course Curriculum</h4>
              <div className="wp-curriculum-list">
                {lessons.map((lesson, index) => (
                  <button
                    key={lesson.id}
                    type="button"
                    className={`wp-curriculum-item ${index === activeLesson ? 'active' : ''} ${index < activeLesson ? 'completed' : ''}`}
                    onClick={() => setActiveLesson(index)}
                  >
                    <span className="wp-curriculum-icon">
                      {index < activeLesson ? '✓' : index === activeLesson ? '▶' : '○'}
                    </span>
                    <span className="wp-curriculum-label">{lesson.title}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Instructor Card */}
            <div className="wp-sidebar-card wp-instructor-card">
              <h4 className="wp-sidebar-title">Instructor</h4>
              <div className="wp-instructor-content">
                <img
                  src="/site-assets/images/hero-dr-ishinna.png"
                  alt="Dr. Ishinna Sadana"
                  className="wp-instructor-avatar"
                />
                <div>
                  <h5 className="wp-instructor-name">Dr. Ishinna Sadana</h5>
                  <p className="wp-instructor-role">Parenting Coach · TEDx Speaker</p>
                  <p className="wp-instructor-bio">
                    Helping parents raise emotionally confident and resilient children.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default WorkshopPlayer
