'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Set initial theme based on localStorage or system preference
  useEffect(() => {
    const stored = localStorage.getItem('theme');
    if (stored === 'dark' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
      setIsDarkMode(true);
    }
  }, []);

  const toggleDarkMode = () => {
    const next = !isDarkMode;
    setIsDarkMode(next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', next);
  };

  const handleLinkClick = () => setIsOpen(false);

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md rounded-lg px-6 py-4 mb-6">
      <div className="flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400 hover:underline">
          🛍️ E-Store
        </Link>

        {/* Right Controls: Hamburger + Dark Mode Toggle */}
        <div className="flex items-center space-x-4">
          {/* Dark mode toggle */}
          <button
            onClick={toggleDarkMode}
            className="text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <Sun size={22} /> : <Moon size={22} />}
          </button>

          {/* Hamburger menu button (mobile only) */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-800 dark:text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center space-x-6 text-gray-700 dark:text-gray-200 font-medium">
          <NavLinks onLinkClick={() => {}} />
        </div>
      </div>

      {/* Mobile Nav Links with animation */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-[500px] mt-4' : 'max-h-0'
        }`}
      >
        <div className="flex flex-col space-y-3 text-gray-700 dark:text-gray-200 font-medium">
          <NavLinks onLinkClick={handleLinkClick} />
        </div>
      </div>
    </nav>
  );
}

function NavLinks({ onLinkClick }: { onLinkClick: () => void }) {
  const linkStyle = "hover:text-blue-600 dark:hover:text-blue-400 transition-colors";

  return (
    <>
      <Link href="/" onClick={onLinkClick} className={linkStyle}>Home</Link>
      <Link href="/cart" onClick={onLinkClick} className={linkStyle}>Cart</Link>
      <Link href="/contactus" onClick={onLinkClick} className={linkStyle}>Contact Us</Link>
      <Link href="/about" onClick={onLinkClick} className={linkStyle}>About</Link>
      <Link href="/product/123" onClick={onLinkClick} className={linkStyle}>Product 123</Link>
      <Link href="/routescomp/mainsection" onClick={onLinkClick} className={linkStyle}>Mainsec</Link>
      <Link href="/routescomp/employeecrud" onClick={onLinkClick} className={linkStyle}>EmployeesData</Link>
    </>
  );
}
