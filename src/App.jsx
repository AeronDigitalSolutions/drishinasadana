import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import GetCertified from './pages/GetCertified'
import Workshops from './pages/Workshops'
import About from './pages/About'
import Book from './pages/Book'
import FreeResources from './pages/FreeResources'
import WorkshopCheckout from './pages/WorkshopCheckout'
import WorkshopAccess from './pages/WorkshopAccess'
import LmsDashboard from './pages/LmsDashboard'
import WorkshopPlayer from './pages/WorkshopPlayer'
import WorkshopDirectAccess from './pages/WorkshopDirectAccess'
import ScrollToTop from './components/ScrollToTop'
import AuthLogin from './pages/AuthLogin'

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/get-certified-today" element={<GetCertified />} />
          <Route path="/workshops" element={<Workshops />} />
          <Route path="/about" element={<About />} />
          <Route path="/book" element={<Book />} />
          <Route path="/free-resources" element={<FreeResources />} />
          <Route path="/auth" element={<AuthLogin />} />
          <Route path="/checkout/:workshopId" element={<WorkshopCheckout />} />
          <Route path="/workshop-login/:workshopId" element={<WorkshopDirectAccess />} />
          <Route path="/workshop-access/:accessToken" element={<WorkshopAccess />} />
          <Route path="/lms/dashboard/:authToken" element={<LmsDashboard />} />
          <Route path="/lms/workshop/:workshopId/:authToken" element={<WorkshopPlayer />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
