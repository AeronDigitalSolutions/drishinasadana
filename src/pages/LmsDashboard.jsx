import { useEffect, useMemo, useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { workshopsData } from '../data/workshopsContent'
import { clearAuthSession, getProfileInfo, setCurrentAuthToken, claimFreeWorkshop } from '../lib/apiLms'
import { startRazorpayPayment } from '../lib/razorpayCheckout'
import './Lms.css'

const LmsDashboard = () => {
  const { authToken } = useParams()
  const navigate = useNavigate()
  const [refreshTick, setRefreshTick] = useState(0)
  const [purchaseNotice, setPurchaseNotice] = useState('')
  const [pendingPurchaseWorkshop, setPendingPurchaseWorkshop] = useState(null)
  const [isQuickPaying, setIsQuickPaying] = useState(false)

  const FREE_WORKSHOP_IDS = ['building-connection']

  useEffect(() => {
    if (!authToken) return
    setCurrentAuthToken(authToken)
  }, [authToken])

  const [profile, setProfile] = useState(null)
  const [purchases, setPurchases] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true)
      const data = await getProfileInfo()
      if (data) {
        setProfile(data.profile)
        setPurchases(data.purchases)
      } else {
        clearAuthSession()
        navigate('/workshops', { replace: true })
      }
      setIsLoading(false)
    }
    fetchProfile()
  }, [authToken, refreshTick])

  useEffect(() => {
    if (!pendingPurchaseWorkshop) return undefined
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [pendingPurchaseWorkshop])

  if (isLoading) {
    return <main className="lms-page"><div className="shell">Loading dashboard...</div></main>
  }

  const purchasedIds = new Set(purchases.map((item) => item.workshopId))
  const purchasedWorkshops = workshopsData.workshops.filter((item) => purchasedIds.has(item.id))
  const suggestedWorkshops = workshopsData.workshops.filter((item) => !purchasedIds.has(item.id))

  const handleLogout = () => {
    clearAuthSession(authToken)
    navigate('/workshops', { replace: true })
  }

  const handleStartQuickBuy = async (workshop) => {
    setPurchaseNotice('')
    if (FREE_WORKSHOP_IDS.includes(workshop.id)) {
      // Directly claim free workshop without showing modal
      try {
        setIsQuickPaying(true)
        await claimFreeWorkshop(workshop.id)
        setRefreshTick((prev) => prev + 1)
        setPurchaseNotice(
          `${workshop.title} unlocked for free! Content is now available below.`,
        )
      } catch (err) {
        setPurchaseNotice(err.message)
      } finally {
        setIsQuickPaying(false)
      }
    } else {
      setPendingPurchaseWorkshop(workshop)
    }
  }

  const handleConfirmQuickBuy = async () => {
    if (!pendingPurchaseWorkshop) return
    try {
      setPurchaseNotice('')
      setIsQuickPaying(true)
      const paymentInfo = await startRazorpayPayment({
        workshop: pendingPurchaseWorkshop,
        customer: {
          firstName: profile?.firstName,
          lastName: profile?.lastName,
          email: profile?.email,
          phone: profile?.phone,
        },
      })
      // Send the payment information to the backend to verify and link to the DB User
      // Note: We bypass `completeMockPaymentForContact` altogether as Razorpay is now real
      setRefreshTick((prev) => prev + 1)

      setPurchaseNotice(
        `${pendingPurchaseWorkshop.title} unlocked successfully. Content is now available below.`,
      )
      setPendingPurchaseWorkshop(null)
    } catch (err) {
      setPurchaseNotice(err.message)
    } finally {
      setIsQuickPaying(false)
    }
  }

  return (
    <main className="lms-page lms-dashboard-page">
      <div className="lms-shell dash-shell">
        {/* Top Bar: Greeting + Logout */}
        <div className="dash-top-bar">
          <div className="dash-greeting">
            <h1 className="dash-greeting-title">Hi, {profile?.firstName || 'Parent'}</h1>
            <p className="dash-greeting-sub">Welcome to Your Parent Dashboard</p>
          </div>
          <button type="button" className="dash-logout-btn" onClick={handleLogout}>Logout</button>
        </div>

        {purchaseNotice ? <p className="lms-purchase-notice">{purchaseNotice}</p> : null}

        {/* Purchased Workshops */}
        <section className="dash-section">
          <h3 className="dash-section-title">Purchased Workshops</h3>
          {purchasedWorkshops.length === 0 ? <p className="lms-empty">No workshops purchased yet.</p> : null}
          {purchasedWorkshops.map((workshop) => {
            const lessons = workshop.mockLessons || []
            return (
              <article className="dash-purchased-card" key={workshop.id}>
                {/* Left: Image with overlaid info */}
                <div className="dash-pc-image-wrap">
                  <img src={workshop.image} alt={workshop.title} className="dash-pc-image" />
                  <div className="dash-pc-overlay">
                    <div className="dash-pc-overlay-info">
                      <h4 className="dash-pc-title">{workshop.title}</h4>
                      <span className="lms-badge purchased">Purchased</span>
                    </div>
                    <Link to={`/lms/workshop/${workshop.id}/${authToken}`} className="dash-btn-watch">
                      Continue Watching
                    </Link>
                  </div>
                </div>

                {/* Right: Course Curriculum Sidebar */}
                <div className="dash-pc-sidebar">
                  <h4 className="dash-pc-sidebar-title">Course Curriculum</h4>
                  <div className="dash-pc-lesson-list">
                    {lessons.map((lesson, idx) => (
                      <div className="dash-pc-lesson" key={lesson.id}>
                        <span className="dash-pc-lesson-icon">▶</span>
                        <span className="dash-pc-lesson-label">{lesson.title}</span>
                      </div>
                    ))}
                  </div>
                  <Link to={`/lms/workshop/${workshop.id}/${authToken}`} className="dash-pc-notes-link">
                    Lesson Notes
                    <span>›</span>
                  </Link>
                </div>
              </article>
            )
          })}
        </section>

        {/* Recommended Workshops */}
        {suggestedWorkshops.length > 0 && (
          <section className="dash-section">
            <h3 className="dash-section-title">Recommended Workshops</h3>
            <div className="dash-workshop-grid">
              {suggestedWorkshops.map((workshop) => (
                <article className="dash-workshop-card" key={workshop.id}>
                  <img src={workshop.image} alt={workshop.title} className="dash-card-image" />
                  <h4 className="dash-card-title">{workshop.title}</h4>
                  <div className="dash-card-footer">
                    <span className="lms-badge neutral">Not Purchased</span>
                    <button type="button" className="lms-btn-buy" onClick={() => handleStartQuickBuy(workshop)} disabled={isQuickPaying}>
                      {FREE_WORKSHOP_IDS.includes(workshop.id) 
                        ? (isQuickPaying ? 'Unlocking...' : '🎉 Get Free Access')
                        : 'Buy Now'
                      }
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </div>

      {pendingPurchaseWorkshop ? (
        <div className="global-modal-overlay" onClick={() => setPendingPurchaseWorkshop(null)}>
          <section
            className="global-modal-content"
            role="dialog"
            aria-modal="true"
            aria-labelledby="lms-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <h3 id="lms-modal-title" className="global-modal-title">
              Payment Confirmation
            </h3>
            <p className="global-modal-text">
              You are buying <strong>{pendingPurchaseWorkshop.title}</strong> for{' '}
              <strong>Rs. {pendingPurchaseWorkshop.priceInr}</strong>.
            </p>
            <div className="global-modal-actions">
              <button type="button" className="global-modal-btn-primary" onClick={handleConfirmQuickBuy} disabled={isQuickPaying}>
                {isQuickPaying ? 'Opening Secure Payment...' : 'Confirm Secure Payment'}
              </button>
              <button
                type="button"
                className="global-modal-btn-text"
                onClick={() => setPendingPurchaseWorkshop(null)}
                disabled={isQuickPaying}
              >
                Cancel
              </button>
            </div>
          </section>
        </div>
      ) : null}
    </main>
  )
}

export default LmsDashboard
