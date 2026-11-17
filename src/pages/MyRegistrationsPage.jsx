import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useEvents } from '../context/EventContext';
import EventCard from '../components/EventCard';

export default function MyRegistrationsPage() {
  const { registrations, cancelRegistration, events, openRegisterModal } = useEvents();
  const navigate = useNavigate();

  // State for cancellation confirmation dialog
  const [cancellingReg, setCancellingReg] = useState(null);
  // State for viewing/printing a full ticket modal
  const [viewingPass, setViewingPass] = useState(null);
  // State for interactive preparation checklist
  const [checklist, setChecklist] = useState({
    calendar: true,
    pass: true,
    tools: false,
    discord: false
  });
  // State for support FAQ accordion
  const [openFaq, setOpenFaq] = useState(0);

  const toggleCheck = (key) => {
    setChecklist(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const confirmCancel = () => {
    if (cancellingReg) {
      cancelRegistration(cancellingReg.id);
      setCancellingReg(null);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  // Curated recommendations (workshops not yet registered)
  const registeredIds = registrations.map(r => r.eventId);
  const recommendedEvents = events.filter(ev => !registeredIds.includes(ev.id)).slice(0, 3);

  const regFaqs = [
    {
      q: "How do I check in at the in-person venue or virtual stream?",
      a: "For in-person events, present the digital admission pass barcode or ticket reference ID on your smartphone at the registration desk. For virtual and hybrid sessions, your private SSO stream access link will activate 24 hours prior."
    },
    {
      q: "Can I transfer my admission pass to a coworker or friend?",
      a: "Yes! If you are unable to attend, you can cancel your registration here so another attendee can claim the seat, or simply share your ticket reference ID with your colleague."
    },
    {
      q: "Where do I access recorded videos and presentation slides?",
      a: "Within 12 hours after the workshop wraps up, full 4K on-demand recordings, slide decks, and code repositories are published directly to the event page."
    },
    {
      q: "Are continuing education (CEU/CPE) certificates accredited?",
      a: "Yes, Stackly certificates are cryptographically verifiable and specify the exact instructional hours and syllabus covered, suitable for employer reimbursement and LinkedIn certifications."
    }
  ];

  return (
    <div style={{ backgroundColor: 'var(--bg-main)' }}>
      {/* 1. Registrations Hero Banner with Background WebP Image */}
      <section className="registrations-hero-banner">
        <div className="container">
          <div data-aos="fade-up">
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--primary)', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>
              <i className="fa-solid fa-ticket" style={{ fontSize: '0.9rem' }}></i>
              <span>Attendee Dashboard</span>
            </div>
            <h1 style={{ fontSize: '2.75rem', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '0.75rem' }}>
              My Event Registrations
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: '720px', lineHeight: 1.6, margin: 0 }}>
              Review your confirmed passes, access admission barcodes, or manage your attendee schedule.
              Registrations are stored locally on your device in Stackly.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Main Registrations Dashboard Content */}
      <div className="section-padding" style={{ minHeight: '60vh', paddingTop: '2.5rem', paddingBottom: '3rem' }}>
        <div className="container">
          {/* If registrations exist */}
        {registrations.length > 0 ? (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', fontSize: '0.95rem', color: 'var(--text-muted)', flexWrap: 'wrap', gap: '0.75rem' }} data-aos="fade-up" data-aos-delay="50">
              <span>You have <strong>{registrations.length}</strong> confirmed workshop registration(s)</span>
              <button
                type="button"
                className="btn btn-secondary btn-sm hover-lift"
                onClick={() => navigate('/events')}
              >
                <i className="fa-solid fa-compass"></i>
                <span>Find More Workshops</span>
              </button>
            </div>

            <div className="registrations-grid">
              {registrations.map((reg, index) => (
                <article
                  key={reg.id}
                  className="registration-card hover-lift"
                  data-aos="fade-up"
                  data-aos-delay={(index % 4) * 100}
                  data-aos-duration="650"
                >
                  {/* Registration Header */}
                  <div className="registration-header">
                    <img
                      src={reg.eventImage}
                      alt={reg.eventTitle}
                      className="reg-thumb"
                    />

                    <div className="reg-header-info">
                      <div className="reg-badge-row">
                        <span className="badge-category cat-tech" style={{ fontSize: '0.7rem' }}>
                          {reg.eventCategory}
                        </span>
                        <span className="ticket-status-badge">
                          <i className="fa-solid fa-circle-check" style={{ fontSize: '0.8rem' }}></i>
                          {reg.status || 'Confirmed'}
                        </span>
                      </div>

                      <h3 className="reg-title">
                        <Link to={`/events/${reg.eventId}`}>
                          {reg.eventTitle}
                        </Link>
                      </h3>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                          <i className="fa-regular fa-calendar" style={{ color: 'var(--primary)' }}></i>
                          {reg.eventDate} • {reg.eventTime.split(' - ')[0]}
                        </span>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                          <i className="fa-solid fa-location-dot" style={{ color: 'var(--primary)' }}></i>
                          {reg.eventLocation}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Registration Body: Attendee Details */}
                  <div className="registration-body">
                    <div className="reg-info-item">
                      <span className="reg-info-label">Ticket Reference</span>
                      <span className="reg-info-value" style={{ fontFamily: 'monospace', color: 'var(--primary)' }}>
                        {reg.ticketId}
                      </span>
                    </div>

                    <div className="reg-info-item">
                      <span className="reg-info-label">Attendee Name</span>
                      <span className="reg-info-value">{reg.name}</span>
                    </div>

                    <div className="reg-info-item">
                      <span className="reg-info-label">Contact Email</span>
                      <span className="reg-info-value" style={{ fontSize: '0.85rem' }}>{reg.email}</span>
                    </div>

                    <div className="reg-info-item">
                      <span className="reg-info-label">Phone</span>
                      <span className="reg-info-value" style={{ fontSize: '0.85rem' }}>{reg.phone}</span>
                    </div>
                  </div>

                  {/* Registration Footer: Actions & Barcode */}
                  <div className="registration-footer">
                    <div className="ticket-barcode-mock" title="Official admission check-in code">
                      <i className="fa-solid fa-ticket" style={{ fontSize: '0.9rem' }}></i>
                      <span>{reg.ticketId}</span>
                    </div>

                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button
                        type="button"
                        className="btn btn-secondary btn-sm"
                        onClick={() => setViewingPass(reg)}
                        title="View digital pass"
                      >
                        <i className="fa-solid fa-print"></i>
                        <span>Pass</span>
                      </button>

                      <button
                        type="button"
                        className="btn btn-danger-outline btn-sm"
                        onClick={() => setCancellingReg(reg)}
                        title="Cancel this registration"
                      >
                        <i className="fa-solid fa-trash-can"></i>
                        <span>Cancel</span>
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        ) : (
          /* Empty State */
          <div className="empty-state-box" data-aos="zoom-in" data-aos-duration="650">
            <div className="empty-state-icon animate__animated animate__bounceIn">
              <i className="fa-solid fa-ticket" style={{ fontSize: '2.5rem', color: 'var(--primary)' }}></i>
            </div>
            <h2 className="empty-state-title">No Active Registrations Found</h2>
            <p className="empty-state-text">
              You haven't registered for any workshops or summits yet. 
              Browse our catalog of world-class events in AI, React, Design Systems, and Business to reserve your seat today.
            </p>
            <button
              type="button"
              className="btn btn-primary btn-lg hover-lift"
              onClick={() => navigate('/events')}
            >
              <i className="fa-solid fa-compass"></i>
              <span>Explore Available Workshops</span>
              <i className="fa-solid fa-arrow-right" style={{ marginLeft: '0.4rem' }}></i>
            </button>
          </div>
        )}

        {/* NEW SECTION 1: Attendee Learning Journey & Milestone Progress Bar */}
        <section style={{ marginTop: '4rem', padding: '2.5rem', borderRadius: '20px', background: '#ffffff', border: '1px solid var(--border-light)' }} data-aos="fade-up">
          <div style={{ marginBottom: '1.75rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              <i className="fa-solid fa-bars-progress"></i>
              Milestone Progression
            </span>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginTop: '0.35rem', color: 'var(--text-main)' }}>
              Your Attendee Journey
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>
              Track your progression from initial seat reservation to receiving your verified completion certificate.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', position: 'relative' }}>
            <div style={{ padding: '1.25rem', borderRadius: '14px', background: 'var(--bg-main)', border: '1px solid var(--border-light)' }}>
              <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '50%', background: '#dcfce7', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.75rem', fontSize: '1rem' }}>
                <i className="fa-solid fa-check"></i>
              </div>
              <div style={{ fontWeight: 700, fontSize: '0.925rem', marginBottom: '0.25rem' }}>1. Seat Reserved</div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>Ticket ID confirmed &amp; saved locally.</p>
            </div>

            <div style={{ padding: '1.25rem', borderRadius: '14px', background: 'var(--bg-main)', border: '1px solid var(--border-light)' }}>
              <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '50%', background: '#dbeafe', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.75rem', fontSize: '1rem' }}>
                <i className="fa-regular fa-calendar-check"></i>
              </div>
              <div style={{ fontWeight: 700, fontSize: '0.925rem', marginBottom: '0.25rem' }}>2. Calendar Sync</div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>Time slot locked in your schedule.</p>
            </div>

            <div style={{ padding: '1.25rem', borderRadius: '14px', background: 'var(--bg-main)', border: '1px solid var(--border-light)' }}>
              <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '50%', background: '#fef3c7', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.75rem', fontSize: '1rem' }}>
                <i className="fa-solid fa-book-open"></i>
              </div>
              <div style={{ fontWeight: 700, fontSize: '0.925rem', marginBottom: '0.25rem' }}>3. Pre-Lab Reading</div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>Prerequisites and setup guides sent.</p>
            </div>

            <div style={{ padding: '1.25rem', borderRadius: '14px', background: 'var(--bg-main)', border: '1px solid var(--border-light)' }}>
              <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '50%', background: '#f3e8ff', color: '#9333ea', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.75rem', fontSize: '1rem' }}>
                <i className="fa-solid fa-laptop-code"></i>
              </div>
              <div style={{ fontWeight: 700, fontSize: '0.925rem', marginBottom: '0.25rem' }}>4. Live Workshop</div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>In-person or virtual live coding lab.</p>
            </div>

            <div style={{ padding: '1.25rem', borderRadius: '14px', background: 'var(--bg-main)', border: '1px solid var(--border-light)' }}>
              <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '50%', background: '#fce7f3', color: '#db2777', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.75rem', fontSize: '1rem' }}>
                <i className="fa-solid fa-award"></i>
              </div>
              <div style={{ fontWeight: 700, fontSize: '0.925rem', marginBottom: '0.25rem' }}>5. Credential Issued</div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>Add verifiable badge to LinkedIn.</p>
            </div>
          </div>
        </section>

        {/* NEW SECTION 2: Workshop Day Preparation Checklist & Tooling Guide */}
        <section style={{ marginTop: '2.5rem', padding: '2.5rem', borderRadius: '20px', background: '#ffffff', border: '1px solid var(--border-light)' }} data-aos="fade-up">
          <div style={{ marginBottom: '1.5rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              <i className="fa-solid fa-list-check"></i>
              Preparation Guide
            </span>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginTop: '0.35rem', color: 'var(--text-main)' }}>
              Workshop Day Readiness Checklist
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>
              Complete these steps ahead of time to ensure a seamless experience on the day of the event.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
            <div
              className="hover-lift"
              onClick={() => toggleCheck('calendar')}
              style={{
                padding: '1.25rem',
                borderRadius: '14px',
                background: 'var(--bg-main)',
                border: checklist.calendar ? '1.5px solid #10b981' : '1px solid var(--border-light)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem'
              }}
            >
              <div style={{ width: '1.75rem', height: '1.75rem', borderRadius: '6px', background: checklist.calendar ? '#10b981' : '#ffffff', border: checklist.calendar ? 'none' : '2px solid var(--border-light)', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {checklist.calendar && <i className="fa-solid fa-check" style={{ fontSize: '0.8rem' }}></i>}
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.925rem' }}>Add Session to Calendar</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Include venue notes or virtual stream times</div>
              </div>
            </div>

            <div
              className="hover-lift"
              onClick={() => toggleCheck('pass')}
              style={{
                padding: '1.25rem',
                borderRadius: '14px',
                background: 'var(--bg-main)',
                border: checklist.pass ? '1.5px solid #10b981' : '1px solid var(--border-light)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem'
              }}
            >
              <div style={{ width: '1.75rem', height: '1.75rem', borderRadius: '6px', background: checklist.pass ? '#10b981' : '#ffffff', border: checklist.pass ? 'none' : '2px solid var(--border-light)', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {checklist.pass && <i className="fa-solid fa-check" style={{ fontSize: '0.8rem' }}></i>}
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.925rem' }}>Save Ticket Pass Offline</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Take a screenshot or print admission pass</div>
              </div>
            </div>

            <div
              className="hover-lift"
              onClick={() => toggleCheck('tools')}
              style={{
                padding: '1.25rem',
                borderRadius: '14px',
                background: 'var(--bg-main)',
                border: checklist.tools ? '1.5px solid #10b981' : '1px solid var(--border-light)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem'
              }}
            >
              <div style={{ width: '1.75rem', height: '1.75rem', borderRadius: '6px', background: checklist.tools ? '#10b981' : '#ffffff', border: checklist.tools ? 'none' : '2px solid var(--border-light)', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {checklist.tools && <i className="fa-solid fa-check" style={{ fontSize: '0.8rem' }}></i>}
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.925rem' }}>Update Developer Tools</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Install Node.js 20+, Docker, and VS Code</div>
              </div>
            </div>

            <div
              className="hover-lift"
              onClick={() => toggleCheck('discord')}
              style={{
                padding: '1.25rem',
                borderRadius: '14px',
                background: 'var(--bg-main)',
                border: checklist.discord ? '1.5px solid #10b981' : '1px solid var(--border-light)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem'
              }}
            >
              <div style={{ width: '1.75rem', height: '1.75rem', borderRadius: '6px', background: checklist.discord ? '#10b981' : '#ffffff', border: checklist.discord ? 'none' : '2px solid var(--border-light)', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {checklist.discord && <i className="fa-solid fa-check" style={{ fontSize: '0.8rem' }}></i>}
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.925rem' }}>Join Attendee Discord</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Meet peer engineers and project mentors</div>
              </div>
            </div>
          </div>
        </section>

        {/* NEW SECTION 3: Recommended Next Cohorts */}
        {recommendedEvents.length > 0 && (
          <section style={{ marginTop: '3.5rem' }} data-aos="fade-up">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.75rem', flexWrap: 'wrap', gap: '0.75rem' }}>
              <div>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                  <i className="fa-solid fa-wand-magic-sparkles"></i>
                  Expand Your Skills
                </span>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginTop: '0.35rem', color: 'var(--text-main)' }}>
                  Recommended For You
                </h2>
              </div>
              <button
                type="button"
                className="btn btn-secondary btn-sm hover-lift"
                onClick={() => navigate('/events')}
              >
                <span>View All 14+ Workshops</span>
                <i className="fa-solid fa-arrow-right" style={{ fontSize: '0.8rem' }}></i>
              </button>
            </div>

            <div className="events-grid">
              {recommendedEvents.map((ev, idx) => (
                <EventCard
                  key={ev.id}
                  event={ev}
                  onRegisterClick={openRegisterModal}
                  animDelay={(idx + 1) * 100}
                />
              ))}
            </div>
          </section>
        )}

        {/* NEW SECTION 4: Attendee Support & FAQ Helpdesk Accordion */}
        <section style={{ marginTop: '3.5rem', padding: '2.5rem', borderRadius: '20px', background: '#ffffff', border: '1px solid var(--border-light)' }} data-aos="fade-up">
          <div style={{ marginBottom: '1.75rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              <i className="fa-solid fa-circle-question"></i>
              Attendee Support
            </span>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginTop: '0.35rem', color: 'var(--text-main)' }}>
              Registration Helpdesk &amp; FAQs
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>
              Frequently asked questions regarding tickets, cancellations, and credentials on Stackly.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {regFaqs.map((faq, idx) => (
              <div
                key={faq.q}
                style={{
                  borderRadius: '12px',
                  background: 'var(--bg-main)',
                  border: '1px solid var(--border-light)',
                  overflow: 'hidden'
                }}
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                  style={{
                    width: '100%',
                    padding: '1.25rem',
                    textAlign: 'left',
                    background: 'none',
                    border: 'none',
                    fontWeight: 700,
                    fontSize: '0.975rem',
                    color: 'var(--text-main)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer'
                  }}
                >
                  <span>{faq.q}</span>
                  <i
                    className={`fa-solid fa-chevron-down`}
                    style={{
                      fontSize: '0.85rem',
                      color: 'var(--primary)',
                      transform: openFaq === idx ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.2s ease'
                    }}
                  ></i>
                </button>
                {openFaq === idx && (
                  <div style={{ padding: '0 1.25rem 1.25rem 1.25rem', color: 'var(--text-muted)', fontSize: '0.885rem', lineHeight: '1.6', borderTop: '1px solid var(--border-light)', paddingTop: '1rem' }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Cancellation Confirmation Dialog */}
        {cancellingReg && (
          <div
            className="modal-backdrop animate__animated animate__fadeIn animate__faster"
            onClick={() => setCancellingReg(null)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="cancel-dialog-title"
          >
            <div
              className="modal-container animate__animated animate__zoomIn animate__faster"
              style={{ maxWidth: '460px', padding: '2rem' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', color: '#b91c1c' }}>
                <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '50%', background: '#fee2e2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <i className="fa-solid fa-triangle-exclamation" style={{ fontSize: '1.2rem', color: '#ef4444' }}></i>
                </div>
                <h3 id="cancel-dialog-title" style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0, color: '#0f172a' }}>
                  Cancel Registration?
                </h3>
              </div>

              <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                Are you sure you want to cancel your registration for <strong>"{cancellingReg.eventTitle}"</strong>?
                Your reserved seat will be immediately released back to the general public on Stackly.
              </p>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={() => setCancellingReg(null)}
                >
                  Keep Registration
                </button>
                <button
                  type="button"
                  className="btn btn-sm"
                  style={{ background: '#ef4444', color: '#ffffff', border: 'none', borderRadius: '8px', padding: '0.5rem 1rem', cursor: 'pointer', fontWeight: 600 }}
                  onClick={confirmCancel}
                >
                  Yes, Cancel Reservation
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Printable Digital Pass Modal */}
        {viewingPass && (
          <div
            className="modal-backdrop animate__animated animate__fadeIn animate__faster"
            onClick={() => setViewingPass(null)}
            role="dialog"
            aria-modal="true"
          >
            <div
              className="modal-container animate__animated animate__zoomIn animate__faster"
              style={{ maxWidth: '560px' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <div>
                  <h3 className="modal-title">Attendee Admission Pass</h3>
                  <p style={{ fontSize: '0.85rem', color: '#64748b' }}>Present this ticket pass or ID during venue check-in on Stackly</p>
                </div>
                <button className="modal-close-btn" onClick={() => setViewingPass(null)}>
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>

              <div style={{ padding: '1.75rem' }}>
                <div className="ticket-digital-pass" style={{ margin: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px dashed rgba(255,255,255,0.2)', paddingBottom: '0.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#a5b4fc' }}>
                      <i className="fa-solid fa-ticket"></i>
                      <span>Official Admission Pass</span>
                    </div>
                    <span style={{ background: '#10b981', color: '#ffffff', fontSize: '0.75rem', fontWeight: 700, padding: '0.2rem 0.6rem', borderRadius: '999px' }}>
                      Confirmed
                    </span>
                  </div>

                  <h4 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.5rem' }}>
                    {viewingPass.eventTitle}
                  </h4>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1.25rem', fontSize: '0.875rem' }}>
                    <div>
                      <div style={{ color: '#a5b4fc', fontSize: '0.75rem', textTransform: 'uppercase' }}>Attendee</div>
                      <div style={{ fontWeight: 600 }}>{viewingPass.name}</div>
                    </div>
                    <div>
                      <div style={{ color: '#a5b4fc', fontSize: '0.75rem', textTransform: 'uppercase' }}>Ticket ID</div>
                      <div style={{ fontWeight: 700, fontFamily: 'monospace', color: '#38bdf8' }}>{viewingPass.ticketId}</div>
                    </div>
                    <div>
                      <div style={{ color: '#a5b4fc', fontSize: '0.75rem', textTransform: 'uppercase' }}>Date</div>
                      <div>{viewingPass.eventDate}</div>
                    </div>
                    <div>
                      <div style={{ color: '#a5b4fc', fontSize: '0.75rem', textTransform: 'uppercase' }}>Location</div>
                      <div>{viewingPass.eventLocation}</div>
                    </div>
                    <div>
                      <div style={{ color: '#a5b4fc', fontSize: '0.75rem', textTransform: 'uppercase' }}>Email</div>
                      <div style={{ wordBreak: 'break-all' }}>{viewingPass.email}</div>
                    </div>
                    <div>
                      <div style={{ color: '#a5b4fc', fontSize: '0.75rem', textTransform: 'uppercase' }}>Phone</div>
                      <div>{viewingPass.phone}</div>
                    </div>
                  </div>

                  <div style={{ marginTop: '1.5rem', paddingTop: '0.85rem', borderTop: '1px dashed rgba(255,255,255,0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.775rem', color: '#cbd5e1' }}>
                    <span>Registered on {new Date(viewingPass.registeredAt).toLocaleDateString()}</span>
                    <span style={{ fontFamily: 'monospace', letterSpacing: '0.15em' }}>||||| ||| | |||||</span>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    onClick={() => setViewingPass(null)}
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={handlePrint}
                  >
                    <i className="fa-solid fa-print"></i>
                    <span>Print This Pass</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
  );
}
