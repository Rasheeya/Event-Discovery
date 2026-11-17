import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useEvents } from '../context/EventContext';
import EventCard from '../components/EventCard';

export default function EventDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { events, getEventById, isFavourite, toggleFavourite, isRegisteredForEvent, openRegisterModal, showToast } = useEvents();

  const event = getEventById(id);
  const [copiedLink, setCopiedLink] = useState(false);
  const [activeTab, setActiveTab] = useState('transit'); // 'transit' | 'studio'

  if (!event) {
    return (
      <div className="section-padding">
        <div className="container">
          <div className="empty-state-box">
            <div className="empty-state-icon">
              <i className="fa-solid fa-shield-halved" style={{ fontSize: '2.5rem', color: '#ef4444' }}></i>
            </div>
            <h2 className="empty-state-title">Event Not Found</h2>
            <p className="empty-state-text">
              The workshop or summit you are looking for does not exist on Stackly or may have been concluded.
            </p>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => navigate('/events')}
            >
              <i className="fa-solid fa-arrow-left"></i>
              <span>Back to Explore Events</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  const isFav = isFavourite(event.id);
  const isEnrolled = isRegisteredForEvent(event.id);

  // Seat capacity percentage
  const seatPercentage = Math.round(((event.totalSeats - event.availableSeats) / event.totalSeats) * 100);

  // Related events in the same category
  const relatedEvents = events.filter(e => e.category === event.category && e.id !== event.id).slice(0, 3);

  const handleShare = () => {
    try {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      showToast('Event link copied to clipboard!', 'success');
      setTimeout(() => setCopiedLink(false), 3000);
    } catch (e) {
      showToast('Share link: ' + window.location.href, 'info');
    }
  };

  const getCategoryClass = (category) => {
    switch (category) {
      case 'Technology': return 'badge-category cat-tech';
      case 'Business': return 'badge-category cat-business';
      case 'Design': return 'badge-category cat-design';
      case 'Education': return 'badge-category cat-education';
      default: return 'badge-category cat-tech';
    }
  };

  const skillsGained = [
    { title: 'Production Architecture', desc: 'Deploying scalable architectures tested against high concurrency.', level: 'Advanced' },
    { title: 'Hands-on Coding Labs', desc: 'Live code synthesis and test-driven refactoring with senior mentors.', level: 'Hands-on' },
    { title: 'Performance Profiling', desc: 'Eliminating memory bottlenecks and optimizing runtime latency.', level: 'Practical' },
    { title: 'Security & Compliance', desc: 'Zero-trust privilege safeguards, credential isolation, and audit trails.', level: 'Core' },
    { title: 'Industry Best Practices', desc: 'Patterns authored by staff engineers at world-class tech firms.', level: 'Mastery' },
    { title: 'Continuous Integration', desc: 'Automating tests, linting gates, and zero-downtime deployment setups.', level: 'DevOps' }
  ];

  return (
    <div className="event-details-page" style={{ paddingBottom: '5rem' }}>
      <div className="container" style={{ paddingTop: '2rem' }}>
        {/* Breadcrumb Navigation */}
        <nav className="event-breadcrumb" aria-label="Breadcrumb" data-aos="fade-down" data-aos-duration="600">
          <Link to="/">Home</Link>
          <i className="fa-solid fa-chevron-right" style={{ fontSize: '0.75rem', opacity: 0.7 }}></i>
          <Link to="/events">Explore Events</Link>
          <i className="fa-solid fa-chevron-right" style={{ fontSize: '0.75rem', opacity: 0.7 }}></i>
          <Link to={`/events?category=${encodeURIComponent(event.category)}`}>{event.category}</Link>
          <i className="fa-solid fa-chevron-right" style={{ fontSize: '0.75rem', opacity: 0.7 }}></i>
          <span style={{ color: '#ffffff', fontWeight: 600, wordBreak: 'break-word' }}>{event.title}</span>
        </nav>

        {/* 1. Large Hero Banner */}
        <div className="event-details-hero" data-aos="fade-up" data-aos-duration="750">
          <img
            src={event.banner || event.image}
            alt={event.title}
            className="event-details-hero-img"
          />
          <div className="event-details-hero-overlay" />

          <div className="event-details-hero-content">
            <div style={{ display: 'flex', gap: '0.65rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
              <span className={getCategoryClass(event.category)}>
                {event.category}
              </span>
              <span style={{ background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(4px)', padding: '0.3rem 0.75rem', borderRadius: '999px', fontSize: '0.775rem', fontWeight: 700, textTransform: 'uppercase' }}>
                {event.format}
              </span>
              <span style={{ background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(4px)', padding: '0.3rem 0.75rem', borderRadius: '999px', fontSize: '0.775rem', fontWeight: 700 }}>
                {event.level}
              </span>
            </div>

            <h1 className="details-title">{event.title}</h1>

            <div className="details-meta-row">
              <div className="details-meta-pill">
                <i className="fa-regular fa-calendar" style={{ color: '#818cf8' }}></i>
                <span>{event.displayDate}</span>
              </div>
              <div className="details-meta-pill">
                <i className="fa-regular fa-clock" style={{ color: '#818cf8' }}></i>
                <span>{event.time}</span>
              </div>
              <div className="details-meta-pill">
                <i className="fa-solid fa-location-dot" style={{ color: '#818cf8' }}></i>
                <span>{event.venue}, {event.location}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Main Two-Column Layout */}
        <div className="details-layout-grid">
          {/* Left Column: Comprehensive Content */}
          <div className="details-main-content">
            {/* Overview / Description */}
            <div className="details-section-box" data-aos="fade-up" data-aos-delay="100">
              <h2 className="details-box-title">
                <i className="fa-solid fa-wand-magic-sparkles" style={{ color: 'var(--primary)' }}></i>
                <span>Workshop Overview</span>
              </h2>
              <div className="details-prose">
                <p style={{ marginBottom: '1.25rem' }}>{event.description}</p>
                <p>
                  Attendees will participate in live coding sessions, architectural teardowns, 
                  and receive all accompanying slides, sample GitHub repositories, and recording access.
                </p>
              </div>

              {/* Tags */}
              {event.tags && event.tags.length > 0 && (
                <div style={{ marginTop: '1.5rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {event.tags.map(tag => (
                    <span
                      key={tag}
                      style={{
                        background: 'var(--bg-main)',
                        border: '1px solid var(--border-light)',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '999px',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        color: 'var(--text-muted)'
                      }}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Agenda Timeline */}
            {event.agenda && event.agenda.length > 0 && (
              <div className="details-section-box" data-aos="fade-up" data-aos-delay="150">
                <h2 className="details-box-title">
                  <i className="fa-regular fa-clock" style={{ color: 'var(--primary)' }}></i>
                  <span>Workshop Agenda &amp; Modules</span>
                </h2>
                <div className="agenda-timeline">
                  {event.agenda.map((slot, index) => (
                    <div key={index} className="agenda-item">
                      <div className="agenda-time">{slot.time}</div>
                      <h4 className="agenda-item-title">{slot.title}</h4>
                      {slot.speaker && (
                        <div className="agenda-speaker">Lead: {slot.speaker}</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Featured Speaker Card */}
            {event.speaker && (
              <div className="details-section-box" data-aos="fade-up" data-aos-delay="200">
                <h2 className="details-box-title">
                  <i className="fa-solid fa-users" style={{ color: 'var(--primary)' }}></i>
                  <span>Instructor &amp; Keynote Speaker</span>
                </h2>
                <div className="speaker-profile-box">
                  <img
                    src={event.speaker.avatar}
                    alt={event.speaker.name}
                    className="speaker-big-avatar"
                  />
                  <div>
                    <h3 className="speaker-big-name">{event.speaker.name}</h3>
                    <div className="speaker-big-role">
                      {event.speaker.role} • {event.speaker.company}
                    </div>
                    <p className="speaker-big-bio">{event.speaker.bio}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Prerequisites */}
            {event.prerequisites && (
              <div className="details-section-box" data-aos="fade-up" data-aos-delay="250">
                <h2 className="details-box-title">
                  <i className="fa-solid fa-circle-check" style={{ color: 'var(--primary)' }}></i>
                  <span>Prerequisites &amp; Requirements</span>
                </h2>
                <ul className="prerequisites-list">
                  {event.prerequisites.map((item, idx) => (
                    <li key={idx} className="prerequisite-item">
                      <i className="fa-solid fa-circle-check prerequisite-icon" style={{ color: '#10b981' }}></i>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* NEW SECTION 1: Core Competencies & Skills Gained */}
            <div className="details-section-box" data-aos="fade-up" data-aos-delay="300">
              <h2 className="details-box-title">
                <i className="fa-solid fa-graduation-cap" style={{ color: 'var(--primary)' }}></i>
                <span>Core Competencies &amp; Skills Gained</span>
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
                Upon successful completion of this workshop, you will be proficient in the following production capabilities:
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
                {skillsGained.map((sk) => (
                  <div
                    key={sk.title}
                    style={{
                      padding: '1rem',
                      borderRadius: '12px',
                      background: 'var(--bg-main)',
                      border: '1px solid var(--border-light)'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                      <span style={{ fontWeight: 700, fontSize: '0.925rem', color: 'var(--text-main)' }}>{sk.title}</span>
                      <span style={{ fontSize: '0.7rem', fontWeight: 700, padding: '0.15rem 0.5rem', borderRadius: '6px', background: 'var(--primary-light)', color: 'var(--primary)' }}>
                        {sk.level}
                      </span>
                    </div>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: '1.5', margin: 0 }}>
                      {sk.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* NEW SECTION 2: Verified Digital Credential & Certificate of Completion */}
            <div className="details-section-box" data-aos="fade-up" data-aos-delay="350">
              <h2 className="details-box-title">
                <i className="fa-solid fa-award" style={{ color: '#d97706' }}></i>
                <span>Verified Stackly Certificate of Completion</span>
              </h2>
              <div
                style={{
                  background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)',
                  borderRadius: '16px',
                  padding: '2rem',
                  color: '#ffffff',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px dashed rgba(255,255,255,0.2)', paddingBottom: '1.25rem', marginBottom: '1.25rem' }}>
                  <div>
                    <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#a5b4fc', fontWeight: 700 }}>
                      Stackly Verified Credential
                    </div>
                    <div style={{ fontSize: '1.35rem', fontWeight: 800, marginTop: '0.25rem' }}>
                      Certificate of Technical Mastery
                    </div>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.1)', padding: '0.4rem 0.85rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <i className="fa-solid fa-shield-check" style={{ color: '#38bdf8' }}></i>
                    <span>Verifiable On-Chain &amp; LinkedIn</span>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.25rem', fontSize: '0.85rem' }}>
                  <div>
                    <div style={{ color: '#94a3b8', fontSize: '0.75rem', textTransform: 'uppercase' }}>Subject Domain</div>
                    <div style={{ fontWeight: 600, color: '#f8fafc' }}>{event.title}</div>
                  </div>
                  <div>
                    <div style={{ color: '#94a3b8', fontSize: '0.75rem', textTransform: 'uppercase' }}>Accreditation ID</div>
                    <div style={{ fontWeight: 700, fontFamily: 'monospace', color: '#38bdf8' }}>STK-CERT-{event.id.toUpperCase()}-2026</div>
                  </div>
                  <div>
                    <div style={{ color: '#94a3b8', fontSize: '0.75rem', textTransform: 'uppercase' }}>Eligible Hours</div>
                    <div style={{ fontWeight: 600, color: '#f8fafc' }}>6.5 Continuing Professional Units</div>
                  </div>
                </div>
              </div>
            </div>

            {/* NEW SECTION 3: Venue Directions vs Virtual Studio Access Guide */}
            <div className="details-section-box" data-aos="fade-up" data-aos-delay="400">
              <h2 className="details-box-title">
                <i className="fa-solid fa-map-location-dot" style={{ color: 'var(--primary)' }}></i>
                <span>Venue &amp; Connectivity Guide</span>
              </h2>

              <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <button
                  type="button"
                  className={`btn btn-sm ${activeTab === 'transit' ? 'btn-primary' : 'btn-secondary'}`}
                  onClick={() => setActiveTab('transit')}
                >
                  <i className="fa-solid fa-train-subway"></i>
                  <span>In-Person Venue &amp; Transit</span>
                </button>
                <button
                  type="button"
                  className={`btn btn-sm ${activeTab === 'studio' ? 'btn-primary' : 'btn-secondary'}`}
                  onClick={() => setActiveTab('studio')}
                >
                  <i className="fa-solid fa-wifi"></i>
                  <span>Virtual Studio Tech Setup</span>
                </button>
              </div>

              {activeTab === 'transit' ? (
                <div style={{ background: 'var(--bg-main)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border-light)' }}>
                  <h4 style={{ fontWeight: 700, fontSize: '1.05rem', marginBottom: '0.5rem' }}>
                    <i className="fa-solid fa-location-dot" style={{ color: 'var(--primary)', marginRight: '0.5rem' }}></i>
                    {event.venue} — {event.location}
                  </h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: '1.6', marginBottom: '1rem' }}>
                    Main hall doors open 45 minutes prior to session start. Please have your digital pass barcode loaded on your smartphone or printed.
                  </p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', fontSize: '0.85rem' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                      <i className="fa-solid fa-square-parking" style={{ color: '#0891b2', marginTop: '0.2rem' }}></i>
                      <span><strong>Parking:</strong> Underground parking deck validation available at reception desk.</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                      <i className="fa-solid fa-bus" style={{ color: '#0891b2', marginTop: '0.2rem' }}></i>
                      <span><strong>Transit:</strong> Metro station located 3 minutes walking distance from main pavilion entrance.</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div style={{ background: 'var(--bg-main)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border-light)' }}>
                  <h4 style={{ fontWeight: 700, fontSize: '1.05rem', marginBottom: '0.5rem' }}>
                    <i className="fa-solid fa-satellite-dish" style={{ color: '#0891b2', marginRight: '0.5rem' }}></i>
                    Stackly Ultra-HD Streaming Studio
                  </h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: '1.6', marginBottom: '1rem' }}>
                    All enrolled participants receive unique SSO classroom links 24 hours prior with instant cloud IDE environments.
                  </p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', fontSize: '0.85rem' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                      <i className="fa-solid fa-gauge-high" style={{ color: '#10b981', marginTop: '0.2rem' }}></i>
                      <span><strong>Bandwidth:</strong> Minimum 15 Mbps connection recommended for dual-screen 4K stream.</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                      <i className="fa-solid fa-headset" style={{ color: '#10b981', marginTop: '0.2rem' }}></i>
                      <span><strong>Interactive Audio:</strong> High-quality USB headset recommended for Q&amp;A floor privileges.</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* NEW SECTION 4: Past Cohort Feedback & Attendee Ratings */}
            <div className="details-section-box" data-aos="fade-up" data-aos-delay="450">
              <h2 className="details-box-title">
                <i className="fa-solid fa-comments" style={{ color: '#f59e0b' }}></i>
                <span>Attendee Ratings &amp; Feedback</span>
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem', alignItems: 'center' }}>
                <div style={{ textAlign: 'center', padding: '1.5rem', background: 'var(--bg-main)', borderRadius: '14px', border: '1px solid var(--border-light)' }}>
                  <div style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--text-main)', lineHeight: 1 }}>4.9</div>
                  <div style={{ color: '#f59e0b', margin: '0.4rem 0', fontSize: '1rem' }}>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>From 140+ verified attendees</div>
                </div>

                <div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.825rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ width: '45px' }}>5 Stars</span>
                      <div style={{ flex: 1, height: '8px', background: 'var(--border-light)', borderRadius: '999px', overflow: 'hidden' }}>
                        <div style={{ width: '92%', height: '100%', background: '#f59e0b' }} />
                      </div>
                      <span style={{ width: '35px', textAlign: 'right', color: 'var(--text-muted)' }}>92%</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ width: '45px' }}>4 Stars</span>
                      <div style={{ flex: 1, height: '8px', background: 'var(--border-light)', borderRadius: '999px', overflow: 'hidden' }}>
                        <div style={{ width: '7%', height: '100%', background: '#f59e0b' }} />
                      </div>
                      <span style={{ width: '35px', textAlign: 'right', color: 'var(--text-muted)' }}>7%</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ width: '45px' }}>3 Stars</span>
                      <div style={{ flex: 1, height: '8px', background: 'var(--border-light)', borderRadius: '999px', overflow: 'hidden' }}>
                        <div style={{ width: '1%', height: '100%', background: '#f59e0b' }} />
                      </div>
                      <span style={{ width: '35px', textAlign: 'right', color: 'var(--text-muted)' }}>1%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Registration & Reservation Box */}
          <aside>
            <div className="details-sidebar-card" data-aos="fade-left" data-aos-delay="200" data-aos-duration="750">
              {/* Seats Status Progress Bar */}
              <div className="sidebar-seats-status">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.875rem' }}>
                  <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>Remaining Seats</span>
                  <span style={{ fontWeight: 700, color: event.availableSeats <= 15 ? 'var(--danger)' : 'var(--success)' }}>
                    {event.availableSeats} of {event.totalSeats} left
                  </span>
                </div>
                <div className="seats-progress-bar-bg">
                  <div
                    className="seats-progress-fill"
                    style={{ width: `${seatPercentage}%` }}
                  />
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>
                  {seatPercentage}% of total cohort reserved
                </div>
              </div>

              {/* Main Action Button */}
              {isEnrolled ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <button
                    type="button"
                    className="btn btn-secondary btn-lg"
                    style={{ width: '100%', color: '#059669', borderColor: '#a7f3d0', background: '#ecfdf5' }}
                    onClick={() => navigate('/registrations')}
                  >
                    <i className="fa-solid fa-circle-check" style={{ fontSize: '1.2rem' }}></i>
                    <span>View Your Registration Pass</span>
                  </button>
                  <p style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    You are already enrolled for this event on this device.
                  </p>
                </div>
              ) : event.availableSeats <= 0 ? (
                <button
                  type="button"
                  className="btn btn-secondary btn-lg btn-disabled"
                  disabled
                  style={{ width: '100%' }}
                >
                  <span>Cohort Sold Out</span>
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-primary btn-lg"
                  style={{ width: '100%' }}
                  onClick={() => openRegisterModal(event)}
                >
                  <i className="fa-solid fa-ticket"></i>
                  <span>Register Now (Free)</span>
                </button>
              )}

              {/* Secondary Actions (Favourite & Share) */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <button
                  type="button"
                  className={`btn btn-secondary btn-sm ${isFav ? 'btn-outline-primary' : ''}`}
                  onClick={() => toggleFavourite(event.id)}
                >
                  <i
                    className={`${isFav ? 'fa-solid' : 'fa-regular'} fa-heart`}
                    style={{ color: isFav ? '#f43f5e' : 'currentColor' }}
                  ></i>
                  <span>{isFav ? 'Saved' : 'Bookmark'}</span>
                </button>

                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={handleShare}
                >
                  <i className="fa-solid fa-share-nodes"></i>
                  <span>{copiedLink ? 'Copied!' : 'Share'}</span>
                </button>
              </div>

              {/* Quick Info Points */}
              <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <i className="fa-regular fa-calendar" style={{ color: 'var(--primary)' }}></i>
                  <span>Instant ticket generation</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <i className="fa-solid fa-users" style={{ color: 'var(--primary)' }}></i>
                  <span>Free cancellation up to 24h before</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <i className="fa-solid fa-award" style={{ color: 'var(--primary)' }}></i>
                  <span>Verified credentials &amp; certificate</span>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* 3. Related Events in Category */}
        {relatedEvents.length > 0 && (
          <section style={{ marginTop: '5rem', paddingTop: '3rem', borderTop: '1px solid var(--border-light)' }} data-aos="fade-up">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Related {event.category} Workshops</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                  Explore other high-caliber sessions in this discipline.
                </p>
              </div>
              <Link to={`/events?category=${encodeURIComponent(event.category)}`} className="btn btn-secondary btn-sm hover-lift">
                <span>View All</span>
                <i className="fa-solid fa-chevron-right" style={{ fontSize: '0.8rem' }}></i>
              </Link>
            </div>

            <div className="events-grid">
              {relatedEvents.map((rel, idx) => (
                <EventCard
                  key={rel.id}
                  event={rel}
                  onRegisterClick={openRegisterModal}
                  animDelay={(idx + 1) * 100}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
