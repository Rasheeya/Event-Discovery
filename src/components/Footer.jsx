import React from 'react';
import { Link } from 'react-router-dom';
import NewsletterForm from './NewsletterForm';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top-grid">
          {/* Brand Col */}
          <div>
            <Link to="/" style={{ display: 'inline-block', marginBottom: '1.15rem', textDecoration: 'none' }} aria-label="Stackly Home">
              <img
                src="/images/logo/stackly-logo.webp"
                alt="Stackly"
                className="footer-brand-img"
              />
            </Link>
            <p style={{ fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '1.25rem', color: '#94a3b8' }}>
              The premier destination to discover hands-on tech workshops, design intensives, 
              and executive masterclasses. Learn, connect, and elevate your engineering craft.
            </p>
            <div style={{ display: 'flex', gap: '0.85rem' }}>
              <a href="#github" aria-label="Github" style={{ color: '#94a3b8', fontSize: '1.1rem', transition: 'color 200ms' }}>
                <i className="fa-brands fa-github"></i>
              </a>
              <a href="#twitter" aria-label="X Twitter" style={{ color: '#94a3b8', fontSize: '1.1rem', transition: 'color 200ms' }}>
                <i className="fa-brands fa-x-twitter"></i>
              </a>
              <a href="#linkedin" aria-label="LinkedIn" style={{ color: '#94a3b8', fontSize: '1.1rem', transition: 'color 200ms' }}>
                <i className="fa-brands fa-linkedin-in"></i>
              </a>
              <a href="#discord" aria-label="Discord Community" style={{ color: '#94a3b8', fontSize: '1.1rem', transition: 'color 200ms' }}>
                <i className="fa-brands fa-discord"></i>
              </a>
            </div>
          </div>

          {/* Quick Categories */}
          <div>
            <h4 className="footer-col-title">Event Categories</h4>
            <ul className="footer-links-list">
              <li><Link to="/events?category=Technology">Technology &amp; AI</Link></li>
              <li><Link to="/events?category=Business">Business &amp; Startups</Link></li>
              <li><Link to="/events?category=Design">UI/UX &amp; Product Design</Link></li>
              <li><Link to="/events?category=Education">STEM &amp; Education</Link></li>
              <li><Link to="/events">All 14+ Workshops</Link></li>
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="footer-col-title">Platform</h4>
            <ul className="footer-links-list">
              <li><Link to="/">Home Overview</Link></li>
              <li><Link to="/events">Explore Events Catalog</Link></li>
              <li><Link to="/registrations">My Registrations &amp; Tickets</Link></li>
              <li><Link to="/events?filter=favourites">Saved Favourites</Link></li>
              <li><a href="#terms">Terms &amp; Code of Conduct</a></li>
            </ul>
          </div>

          {/* Newsletter Box with red Email is required validation */}
          <div>
            <h4 className="footer-col-title">Workshop Alerts</h4>
            <p style={{ fontSize: '0.85rem', marginBottom: '1rem', lineHeight: '1.5', color: '#94a3b8' }}>
              Get curated weekly alerts whenever new masterclasses and tech summits open registrations on Stackly.
            </p>
            <NewsletterForm />
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom-bar">
          <div className="footer-copyright">
            © {new Date().getFullYear()} Stackly Inc. All rights reserved. Built with React &amp; LocalStorage.
          </div>
          <div className="footer-links-inline">
            <a href="#privacy">Privacy Policy</a>
            <a href="#cookies">Cookie Settings</a>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              Built with <i className="fa-solid fa-heart" style={{ color: '#f43f5e', fontSize: '0.85rem' }}></i> for continuous learners
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
