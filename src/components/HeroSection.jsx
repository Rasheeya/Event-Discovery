import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEvents } from '../context/EventContext';
import AnimatedCounter from './AnimatedCounter';

export default function HeroSection() {
  const navigate = useNavigate();
  const { events, openRegisterModal, isRegisteredForEvent } = useEvents();

  // Find the top featured event (Event 1: Global AI & LLM Summit 2026)
  const featuredEvent = events.find(ev => ev.id === 'event-1') || events[0];
  const isEnrolled = featuredEvent ? isRegisteredForEvent(featuredEvent.id) : false;

  return (
    <section className="hero-section">
      <div className="container">
        <div className="hero-grid">
          {/* Left Column: Headline and CTAs */}
          <div data-aos="fade-up" data-aos-duration="750">
            <div className="hero-badge-pill" data-aos="fade-down" data-aos-delay="100">
              <i className="fa-solid fa-wand-magic-sparkles" style={{ color: 'var(--primary)', fontSize: '0.9rem' }}></i>
              <span>Next-Generation Learning Experiences</span>
            </div>

            <h1 className="hero-headline" data-aos="fade-up" data-aos-delay="150">
              Discover &amp; Register for World-Class{' '}
              <span className="hero-headline-gradient">Tech Workshops</span> on Stackly.
            </h1>

            <p className="hero-subtext" data-aos="fade-up" data-aos-delay="250">
              Elevate your engineering and leadership skills with hands-on masterclasses led by frontier researchers. 
              Explore cutting-edge Technology, Business, Design, and Education summits with instant digital reservations.
            </p>

            {/* CTA Buttons */}
            <div className="hero-cta-group" data-aos="fade-up" data-aos-delay="350">
              <button
                type="button"
                className="btn btn-primary btn-lg hover-lift"
                onClick={() => navigate('/events')}
              >
                <span>Explore All Workshops</span>
                <i className="fa-solid fa-arrow-right" style={{ marginLeft: '0.45rem', fontSize: '0.9rem' }}></i>
              </button>

              {featuredEvent && (
                <button
                  type="button"
                  className="btn btn-secondary btn-lg hover-lift"
                  onClick={() => navigate(`/events/${featuredEvent.id}`)}
                >
                  <span>View Spotlight Summit</span>
                </button>
              )}
            </div>

            {/* Hero Key Stats with Smooth Counting Animation */}
            <div className="hero-stats-row" data-aos="fade-up" data-aos-delay="450">
              <div className="hero-stat-item">
                <span className="hero-stat-number">
                  <AnimatedCounter end={14} suffix="+" duration={1800} />
                </span>
                <span className="hero-stat-label">Active Workshops</span>
              </div>
              <div className="hero-stat-item">
                <span className="hero-stat-number">
                  <AnimatedCounter end={15000} suffix="+" duration={2200} />
                </span>
                <span className="hero-stat-label">Enrolled Learners</span>
              </div>
              <div className="hero-stat-item">
                <span className="hero-stat-number">
                  <AnimatedCounter end={4.9} decimals={1} suffix=" / 5" duration={2000} />
                </span>
                <span className="hero-stat-label">Attendee Rating</span>
              </div>
            </div>
          </div>

          {/* Right Column: Spotlight Upcoming Event Card */}
          {featuredEvent && (
            <div data-aos="fade-left" data-aos-delay="250" data-aos-duration="800">
              <div className="hero-featured-card hover-lift">
                <div className="hero-card-banner">
                  <img
                    src={featuredEvent.banner || featuredEvent.image}
                    alt={featuredEvent.title}
                  />
                  <div className="hero-card-floating-badge animate__animated animate__pulse animate__infinite">
                    <i className="fa-solid fa-star" style={{ color: '#f59e0b', fontSize: '0.85rem' }}></i>
                    <span>Featured Spotlight Event</span>
                  </div>
                </div>

                <div className="hero-card-content">
                  <span className="badge-category cat-tech" style={{ marginBottom: '0.65rem' }}>
                    {featuredEvent.category}
                  </span>

                  <h3 className="hero-card-title">
                    {featuredEvent.title}
                  </h3>

                  <div className="hero-card-meta">
                    <div className="meta-item">
                      <i className="fa-regular fa-calendar" style={{ color: 'var(--primary)', fontSize: '0.85rem' }}></i>
                      <span>{featuredEvent.displayDate} • {featuredEvent.time}</span>
                    </div>
                    <div className="meta-item">
                      <i className="fa-solid fa-location-dot" style={{ color: 'var(--primary)', fontSize: '0.85rem' }}></i>
                      <span>{featuredEvent.venue}, {featuredEvent.location}</span>
                    </div>
                  </div>

                  {/* Speaker Strip */}
                  {featuredEvent.speaker && (
                    <div className="hero-card-speaker-strip">
                      <img
                        src={featuredEvent.speaker.avatar}
                        alt={featuredEvent.speaker.name}
                        className="hero-speaker-avatar"
                      />
                      <div className="hero-speaker-info">
                        <span className="hero-speaker-name">{featuredEvent.speaker.name}</span>
                        <span className="hero-speaker-title">
                          {featuredEvent.speaker.role} at {featuredEvent.speaker.company}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Actions & Remaining seats */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.85rem', borderTop: '1px solid #e2e8f0' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', fontWeight: 600, color: '#047857' }}>
                      <i className="fa-solid fa-users" style={{ fontSize: '0.85rem' }}></i>
                      <span>{featuredEvent.availableSeats} seats remaining</span>
                    </div>

                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button
                        type="button"
                        className="btn btn-secondary btn-sm hover-lift"
                        onClick={() => navigate(`/events/${featuredEvent.id}`)}
                      >
                        Details
                      </button>

                      {isEnrolled ? (
                        <button
                          type="button"
                          className="btn btn-sm btn-secondary"
                          style={{ color: '#059669', borderColor: '#a7f3d0', background: '#ecfdf5' }}
                          onClick={() => navigate('/registrations')}
                        >
                          <i className="fa-solid fa-circle-check" style={{ marginRight: '0.35rem' }}></i>
                          <span>Enrolled</span>
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="btn btn-primary btn-sm hover-lift"
                          onClick={() => openRegisterModal(featuredEvent)}
                        >
                          <span>Register Now</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
