import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import Test from './Test'
import Solutions from './pages/Solutions'
import ApproachPage from './pages/Approach'
import Pricing from './pages/Pricing'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'
import AnalyticsManager from './components/AnalyticsManager'
import CrispChat from './components/CrispChat'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/test" element={<Test />} />
        <Route path="/solutions" element={<Solutions />} />
        <Route path="/approach" element={<ApproachPage />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
    <AnalyticsManager />
    <CrispChat />
  </React.StrictMode>,
)
