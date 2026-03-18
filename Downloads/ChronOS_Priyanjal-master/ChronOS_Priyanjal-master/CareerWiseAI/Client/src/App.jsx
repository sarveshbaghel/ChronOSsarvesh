import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Header from './components/Header'
import React from 'react'
import Footer from './components/Footer'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white text-blue-900 font-sans">
        <Header />
        <main className="min-h-screen w-full px-4 py-6 bg-white">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
        <Footer/>
      </div>
    </Router>
  )
}

export default App
