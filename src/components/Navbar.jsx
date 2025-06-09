 
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-[#111] py-5 w-full">
      <div className="max-w-[1200px] mx-auto flex items-center justify-between px-4 relative">
        {/* Logo */}
        <div className="flex-shrink-0">
          <span className="text-[40px] font-bold text-[#00f2fe]">Flexi</span>
          <span className="text-[40px] font-bold text-[#f97102]">Slot</span>
        </div>

        {/* Hamburger menu (Mobile) */}
        <div className="block lg:hidden absolute top-5 right-4">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Nav links (Desktop) */}
        <nav className="hidden lg:flex ml-10">
          <ul className="flex space-x-8">
            {[
              { label: 'Home', to: '/' },
              { label: 'Book Slot', to: '/booking' },
              { label: 'My Bookings', to: '/bookingstatus' },
           
              { label: 'Contact', to: '/contact' },
            ].map((link, idx) => (
              <li key={idx}>
                <Link
                  to={link.to}
                  className="text-[#00f2fe] text-lg transition-colors duration-300 hover:text-[#ff00ff]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Dashboard / Sign Up / Login (Desktop) */}
        <div className="hidden lg:flex ml-6 space-x-6">
          <Link
            to="/dashboard"
            className="text-[#f97102] text-lg transition-colors duration-300 hover:text-[#ff00ff]"
          >
            Dashboard
          </Link>
          <Link
            to="/signup"
            className="text-[#00f2fe] text-lg transition-colors duration-300 hover:text-[#ff00ff]"
          >
            Sign Up
          </Link>
          <Link
            to="/login"
            className="text-[#00f2fe] text-lg transition-colors duration-300 hover:text-[#ff00ff]"
          >
            Login
          </Link>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden ${isMobileMenuOpen ? 'block' : 'hidden'} bg-[#111] p-4`}
      >
        <ul className="space-y-4">
          {[
            { label: 'Home', to: '/' },
            { label: 'Book Slot', to: '/booking' },
            { label: 'My Bookings', to: '/bookingstatus' },
            // { label: 'User Profile', to: '/profile' },
            { label: 'Contact', to: '/contact' },
            { label: 'Dashboard', to: '/dashboard' },
            { label: 'Sign Up', to: '/signup' },
            { label: 'Login', to: '/login' },
          ].map((link, idx) => (
            <li key={idx}>
              <Link
                to={link.to}
                className="text-[#00f2fe] text-lg transition-colors duration-300 hover:text-[#ff00ff]"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
