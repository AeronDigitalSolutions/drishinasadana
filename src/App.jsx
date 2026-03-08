import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import GetCertified from './pages/GetCertified'
import Workshops from './pages/Workshops'
import About from './pages/About'
import Book from './pages/Book'
import FreeResources from './pages/FreeResources'

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/get-certified-today" element={<GetCertified />} />
          <Route path="/workshops" element={<Workshops />} />
          <Route path="/about" element={<About />} />
          <Route path="/book" element={<Book />} />
          <Route path="/free-resources" element={<FreeResources />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
