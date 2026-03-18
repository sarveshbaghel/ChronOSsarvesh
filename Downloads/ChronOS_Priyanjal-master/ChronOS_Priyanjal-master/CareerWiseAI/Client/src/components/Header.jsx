import React from 'react'
import { Link } from 'react-router-dom'
import logo from '/favicon.JPG';

function Header() {
  return (
   <header className="bg-blue-600 text-white shadow-md w-full">
      <div className="container mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center">
        {/* Logo + Text */}
        <Link to="/" className="flex items-center space-x-3 mb-2 md:mb-0">
          <img
            src={logo}
            alt="CareerWiseAI Logo"
            className="h-10 w-10 rounded-full shadow-md object-cover"
          />
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-wide text-white">
            CareerWise<span className="text-yellow-300">AI</span>
          </h1>
        </Link>

        {/* Navigation */}
        <nav>
          <ul className="flex flex-wrap justify-center space-x-6 font-medium text-sm sm:text-base">
            <li>
              <Link to="/" className="hover:underline text-white">
                Home
              </Link>
            </li>
            {/* Add more links here later */}
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
