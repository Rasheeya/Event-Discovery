import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useEvents } from '../context/EventContext';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { registrations, favourites } = useEvents();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 8);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(prev => !prev);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
      <div className="container navbar-container">
        {/* Brand Logo */}
        <Link to="/" className="brand-logo" onClick={closeMobileMenu} aria-label="Stackly Home">
          <img
            src="/images/logo/stackly-logo.webp"
            alt="Stackly"
            className="navbar-brand-img"
          />
        </Link>

        {/* Desktop Navigation Links */}
        <nav aria-label="Main Navigation">
          <ul className="nav-links">
            <li>
              <NavLink
                to="/"
                end
                className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
              >
                <span>Home</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/events"
                className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
              >
                <i className="fa-solid fa-compass" style={{ fontSize: '0.9rem' }}></i>
                <span>Explore Events</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/registrations"
                className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
              >
                <i className="fa-solid fa-ticket" style={{ fontSize: '0.9rem' }}></i>
                <span>My Registrations</span>
                {registrations.length > 0 && (
                  <span className="nav-count-badge" title={`${registrations.length} registered event(s)`}>
                    {registrations.length}
                  </span>
                )}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/events?filter=favourites"
                className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
              >
                <i className="fa-solid fa-heart" style={{ fontSize: '0.85rem' }}></i>
                <span>Saved</span>
                {favourites.length > 0 && (
                  <span className="nav-count-badge nav-fav-badge" title={`${favourites.length} saved event(s)`}>
                    {favourites.length}
                  </span>
                )}
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* Action Button & Mobile Toggle */}
        <div className="nav-actions">
          <button
            onClick={() => {
              navigate('/404');
              closeMobileMenu();
            }}
            className="btn btn-primary btn-sm hover-lift"
          >
            <span>Find Workshops</span>
            <i className="fa-solid fa-arrow-right" style={{ fontSize: '0.85rem', marginLeft: '0.35rem' }}></i>
          </button>

          <button
            className="mobile-menu-toggle"
            onClick={toggleMobileMenu}
            aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <i className="fa-solid fa-xmark" style={{ fontSize: '1.4rem' }}></i>
            ) : (
              <i className="fa-solid fa-bars" style={{ fontSize: '1.3rem' }}></i>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="mobile-nav-drawer animate__animated animate__fadeInDown animate__faster">
          <ul className="mobile-nav-links">
            <li>
              <NavLink
                to="/"
                end
                className={({ isActive }) => (isActive ? 'mobile-nav-link active' : 'mobile-nav-link')}
                onClick={closeMobileMenu}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <i className="fa-solid fa-house" style={{ fontSize: '0.95rem' }}></i>
                  <span>Home</span>
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/events"
                className={({ isActive }) => (isActive ? 'mobile-nav-link active' : 'mobile-nav-link')}
                onClick={closeMobileMenu}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <i className="fa-solid fa-compass" style={{ fontSize: '0.95rem' }}></i>
                  <span>Explore Events</span>
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/registrations"
                className={({ isActive }) => (isActive ? 'mobile-nav-link active' : 'mobile-nav-link')}
                onClick={closeMobileMenu}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <i className="fa-solid fa-ticket" style={{ fontSize: '0.95rem' }}></i>
                  <span>My Registrations</span>
                </span>
                {registrations.length > 0 && (
                  <span className="nav-count-badge">
                    {registrations.length}
                  </span>
                )}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/events?filter=favourites"
                className={({ isActive }) => (isActive ? 'mobile-nav-link active' : 'mobile-nav-link')}
                onClick={closeMobileMenu}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <i className="fa-solid fa-heart" style={{ fontSize: '0.95rem', color: '#f43f5e' }}></i>
                  <span>Saved Favourites</span>
                </span>
                {favourites.length > 0 && (
                  <span className="nav-count-badge nav-fav-badge">
                    {favourites.length}
                  </span>
                )}
              </NavLink>
            </li>
          </ul>

          <button
            onClick={() => {
              navigate('/events');
              closeMobileMenu();
            }}
            className="btn btn-primary btn-sm"
            style={{ width: '100%', justifyContent: 'center' }}
          >
            <span>Explore All 14+ Workshops</span>
            <i className="fa-solid fa-arrow-right" style={{ marginLeft: '0.45rem' }}></i>
          </button>
        </div>
      )}
    </header>
  );
}
