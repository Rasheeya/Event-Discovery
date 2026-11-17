import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEvents } from '../context/EventContext';
import HeroSection from '../components/HeroSection';
import CategorySection from '../components/CategorySection';
import EventCard from '../components/EventCard';
import NewsletterForm from '../components/NewsletterForm';
import AnimatedCounter from '../components/AnimatedCounter';

const BASE_URL = import.meta.env.BASE_URL;

export default function HomePage() {
  const navigate = useNavigate();
  const { events, openRegisterModal } = useEvents();

  // 1. Featured workshops: exactly 6 cards (2 full rows of 3 cards, filling the grid completely!)
  const featuredEvents = events.filter(ev => ev.featured).slice(0, 6);

  // 2. Upcoming workshops: exactly 6 cards (2 full rows of 3 cards, filling the grid completely!)
  const upcomingEvents = events.filter(ev => !ev.featured).slice(0, 6);

  // FAQ accordion state
  const [openFaq, setOpenFaq] = useState(0);

  const faqs = [
    {
      q: "Are workshop registrations completely free on Stackly?",
      a: "Yes! All scheduled workshops and community labs on Stackly are 100% free to register. We partner with frontier tech enterprises and developer foundations to empower engineers worldwide with zero financial barrier."
    },
    {
      q: "How do I access hybrid or virtual online workshops?",
      a: "Upon confirming registration, your digital admission pass includes a verified Ticket ID. For virtual and hybrid sessions, the interactive stream link and calendar invite are sent to your registered email 24 hours prior to commencement."
    },
    {
      q: "Can I cancel my registration if my schedule changes?",
      a: "Absolutely. You can visit 'My Registrations' at any time to cancel your reservation with a single click. Your reserved seat is instantly released back to the general community."
    },
    {
      q: "Will I receive a verified certificate after completing a workshop?",
      a: "Yes! Every attendee who attends the live session and submits the hands-on lab receives an authentic, verifiable Stackly Certificate of Completion that can be added to your LinkedIn profile."
    }
  ];

  return (
    <div className="home-page">
      {/* 1. Hero Section with Spotlight Event */}
      <HeroSection />

      {/* 2. Impact Animated Counters Bar with Scroll-Triggered Ease-Out Animation */}
      <section style={{ background: '#ffffff', borderBottom: '1px solid var(--border-light)', padding: '3rem 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2rem', textAlign: 'center' }} data-aos="fade-up">
            <div className="hover-lift" style={{ padding: '1.25rem', borderRadius: '16px', background: 'var(--bg-main)' }}>
              <div style={{ width: '3rem', height: '3rem', borderRadius: '50%', background: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.85rem auto', fontSize: '1.2rem' }}>
                <i className="fa-solid fa-users"></i>
              </div>
              <div style={{ fontSize: '2.1rem', fontWeight: 800, color: 'var(--text-main)', fontFamily: 'var(--font-heading)' }}>
                <AnimatedCounter end={15200} suffix="+" duration={2200} />
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Engineers Upskilled
              </div>
            </div>

            <div className="hover-lift" style={{ padding: '1.25rem', borderRadius: '16px', background: 'var(--bg-main)' }}>
              <div style={{ width: '3rem', height: '3rem', borderRadius: '50%', background: '#ecfeff', color: '#0891b2', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.85rem auto', fontSize: '1.2rem' }}>
                <i className="fa-solid fa-laptop-code"></i>
              </div>
              <div style={{ fontSize: '2.1rem', fontWeight: 800, color: 'var(--text-main)', fontFamily: 'var(--font-heading)' }}>
                <AnimatedCounter end={140} suffix="+" duration={2000} />
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Masterclasses Hosted
              </div>
            </div>

            <div className="hover-lift" style={{ padding: '1.25rem', borderRadius: '16px', background: 'var(--bg-main)' }}>
              <div style={{ width: '3rem', height: '3rem', borderRadius: '50%', background: '#fdf2f8', color: '#db2777', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.85rem auto', fontSize: '1.2rem' }}>
                <i className="fa-solid fa-award"></i>
              </div>
              <div style={{ fontSize: '2.1rem', fontWeight: 800, color: 'var(--text-main)', fontFamily: 'var(--font-heading)' }}>
                <AnimatedCounter end={98.6} decimals={1} suffix="%" duration={2000} />
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Completion Satisfaction
              </div>
            </div>

            <div className="hover-lift" style={{ padding: '1.25rem', borderRadius: '16px', background: 'var(--bg-main)' }}>
              <div style={{ width: '3rem', height: '3rem', borderRadius: '50%', background: '#fef3c7', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.85rem auto', fontSize: '1.2rem' }}>
                <i className="fa-solid fa-earth-americas"></i>
              </div>
              <div style={{ fontSize: '2.1rem', fontWeight: 800, color: 'var(--text-main)', fontFamily: 'var(--font-heading)' }}>
                <AnimatedCounter end={48} suffix="+" duration={1800} />
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Global Metros &amp; Virtual
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Domain Categories Grid */}
      <CategorySection />

      {/* 4. Featured Workshops Section (6 CARDS - Full 2x3 Grid without Empty Spaces) */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-main)' }}>
        <div className="container">
          <div
            style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}
            data-aos="fade-up"
          >
            <div>
              <span className="section-tag">
                <i className="fa-solid fa-wand-magic-sparkles" style={{ fontSize: '0.8rem' }}></i>
                Hand-Picked Cohorts
              </span>
              <h2 className="section-title" style={{ textAlign: 'left', marginBottom: 0 }}>
                Featured Workshops
              </h2>
              <p className="section-subtitle" style={{ textAlign: 'left', margin: '0.5rem 0 0 0' }}>
                Top-rated workshops and summits with limited reserved seats.
              </p>
            </div>

            <button
              type="button"
              className="btn btn-secondary hover-lift"
              onClick={() => navigate('/events')}
            >
              <span>View All 14+ Workshops</span>
              <i className="fa-solid fa-arrow-right" style={{ marginLeft: '0.4rem', fontSize: '0.85rem' }}></i>
            </button>
          </div>

          <div className="events-grid">
            {featuredEvents.map((event, index) => (
              <EventCard
                key={event.id}
                event={event}
                onRegisterClick={openRegisterModal}
                animDelay={(index % 3) * 100}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 5. How It Works: Interactive 4-Step Pipeline (NEW Section 2) */}
      <section className="section-padding" style={{ backgroundColor: '#ffffff', borderTop: '1px solid var(--border-light)', borderBottom: '1px solid var(--border-light)' }}>
        <div className="container">
          <div className="section-header" data-aos="fade-up">
            <span className="section-tag">
              <i className="fa-solid fa-route" style={{ fontSize: '0.8rem' }}></i>
              Simple &amp; Frictionless
            </span>
            <h2 className="section-title">How Stackly Works</h2>
            <p className="section-subtitle">
              From finding your domain passion to attending interactive laboratories in four seamless steps.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem' }}>
            <div className="hover-lift" style={{ padding: '2rem', borderRadius: '16px', background: 'var(--bg-card-subtle)', border: '1px solid var(--border-light)', position: 'relative' }} data-aos="fade-up" data-aos-delay="100">
              <span style={{ fontSize: '2.5rem', fontWeight: 800, color: '#c7d2fe', lineHeight: 1, fontFamily: 'monospace' }}>01</span>
              <div style={{ width: '2.75rem', height: '2.75rem', borderRadius: '10px', background: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '1rem 0', fontSize: '1.1rem' }}>
                <i className="fa-solid fa-magnifying-glass"></i>
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.4rem' }}>Find Your Cohort</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: '1.6' }}>
                Filter workshops by Technology, Design, Business, and Education. Check syllabus, topics, and live seat capacity.
              </p>
            </div>

            <div className="hover-lift" style={{ padding: '2rem', borderRadius: '16px', background: 'var(--bg-card-subtle)', border: '1px solid var(--border-light)' }} data-aos="fade-up" data-aos-delay="200">
              <span style={{ fontSize: '2.5rem', fontWeight: 800, color: '#c7d2fe', lineHeight: 1, fontFamily: 'monospace' }}>02</span>
              <div style={{ width: '2.75rem', height: '2.75rem', borderRadius: '10px', background: '#ecfeff', color: '#0891b2', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '1rem 0', fontSize: '1.1rem' }}>
                <i className="fa-solid fa-pen-to-square"></i>
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.4rem' }}>Instant Registration</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: '1.6' }}>
                Fill out your details with zero booking fee or payment required. Duplicate detection protects your seat reservation.
              </p>
            </div>

            <div className="hover-lift" style={{ padding: '2rem', borderRadius: '16px', background: 'var(--bg-card-subtle)', border: '1px solid var(--border-light)' }} data-aos="fade-up" data-aos-delay="300">
              <span style={{ fontSize: '2.5rem', fontWeight: 800, color: '#c7d2fe', lineHeight: 1, fontFamily: 'monospace' }}>03</span>
              <div style={{ width: '2.75rem', height: '2.75rem', borderRadius: '10px', background: '#fdf2f8', color: '#db2777', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '1rem 0', fontSize: '1.1rem' }}>
                <i className="fa-solid fa-qrcode"></i>
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.4rem' }}>Digital Admission Pass</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: '1.6' }}>
                Get an instant verifiable ticket ID and printable admission barcode stored safely in browser LocalStorage.
              </p>
            </div>

            <div className="hover-lift" style={{ padding: '2rem', borderRadius: '16px', background: 'var(--bg-card-subtle)', border: '1px solid var(--border-light)' }} data-aos="fade-up" data-aos-delay="400">
              <span style={{ fontSize: '2.5rem', fontWeight: 800, color: '#c7d2fe', lineHeight: 1, fontFamily: 'monospace' }}>04</span>
              <div style={{ width: '2.75rem', height: '2.75rem', borderRadius: '10px', background: '#fef3c7', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '1rem 0', fontSize: '1.1rem' }}>
                <i className="fa-solid fa-rocket"></i>
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.4rem' }}>Attend &amp; Level Up</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: '1.6' }}>
                Join live code teardowns, interactive labs, and connect with senior mentors in person or via high-definition stream.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Upcoming Workshops Section (6 CARDS - Full 2x3 Grid without Empty Spaces) */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-main)' }}>
        <div className="container">
          <div
            style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}
            data-aos="fade-up"
          >
            <div>
              <span className="section-tag">
                <i className="fa-regular fa-calendar" style={{ fontSize: '0.8rem' }}></i>
                Calendar Ahead
              </span>
              <h2 className="section-title" style={{ textAlign: 'left', marginBottom: 0 }}>
                Upcoming Labs &amp; Summits
              </h2>
              <p className="section-subtitle" style={{ textAlign: 'left', margin: '0.5rem 0 0 0' }}>
                Reserve your tickets before seats reach full capacity.
              </p>
            </div>

            <button
              type="button"
              className="btn btn-outline-primary hover-lift"
              onClick={() => navigate('/events')}
            >
              <i className="fa-solid fa-compass" style={{ marginRight: '0.4rem', fontSize: '0.85rem' }}></i>
              <span>Explore All Events</span>
            </button>
          </div>

          <div className="events-grid">
            {upcomingEvents.map((event, index) => (
              <EventCard
                key={event.id}
                event={event}
                onRegisterClick={openRegisterModal}
                animDelay={(index % 3) * 100}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 7. Community Testimonials & Attendee Reviews (NEW Section 3) */}
      <section className="section-padding" style={{ backgroundColor: '#ffffff', borderTop: '1px solid var(--border-light)' }}>
        <div className="container">
          <div className="section-header" data-aos="fade-up">
            <span className="section-tag">
              <i className="fa-solid fa-comment-dots" style={{ fontSize: '0.8rem' }}></i>
              Verified Learner Reviews
            </span>
            <h2 className="section-title">What Past Attendees Say</h2>
            <p className="section-subtitle">
              Thousands of software engineers, product designers, and founders trust Stackly workshops.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            <div className="hover-lift" style={{ padding: '2rem', borderRadius: '16px', background: 'var(--bg-main)', border: '1px solid var(--border-light)' }} data-aos="fade-up" data-aos-delay="100">
              <div style={{ color: '#f59e0b', marginBottom: '1rem', display: 'flex', gap: '0.25rem', fontSize: '0.9rem' }}>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
              </div>
              <p style={{ fontSize: '0.95rem', color: '#334155', lineHeight: 1.7, marginBottom: '1.5rem', fontStyle: 'italic' }}>
                "The React 19 Architecture masterclass was the most practical workshop I've attended in years. We deployed real Server Actions and learned production patterns not found in docs."
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                <img src={`${BASE_URL}images/speakers/speaker-1.webp`} alt="Reviewer" style={{ width: '45px', height: '45px', borderRadius: '50%', objectFit: 'cover' }} />
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.925rem' }}>Claire Zheng</div>
                  <div style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>Staff Engineer at Stripe</div>
                </div>
              </div>
            </div>

            <div className="hover-lift" style={{ padding: '2rem', borderRadius: '16px', background: 'var(--bg-main)', border: '1px solid var(--border-light)' }} data-aos="fade-up" data-aos-delay="200">
              <div style={{ color: '#f59e0b', marginBottom: '1rem', display: 'flex', gap: '0.25rem', fontSize: '0.9rem' }}>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
              </div>
              <p style={{ fontSize: '0.95rem', color: '#334155', lineHeight: 1.7, marginBottom: '1.5rem', fontStyle: 'italic' }}>
                "The Figma Design Systems lab bridged the gap between our design tokens and GitHub pipelines. The zero-friction registration and instant digital pass made check-in a breeze."
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                <img src={`${BASE_URL}images/speakers/speaker-3.webp`} alt="Reviewer" style={{ width: '45px', height: '45px', borderRadius: '50%', objectFit: 'cover' }} />
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.925rem' }}>Jordan Thorne</div>
                  <div style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>Lead Product Designer at Spotify</div>
                </div>
              </div>
            </div>

            <div className="hover-lift" style={{ padding: '2rem', borderRadius: '16px', background: 'var(--bg-main)', border: '1px solid var(--border-light)' }} data-aos="fade-up" data-aos-delay="300">
              <div style={{ color: '#f59e0b', marginBottom: '1rem', display: 'flex', gap: '0.25rem', fontSize: '0.9rem' }}>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
              </div>
              <p style={{ fontSize: '0.95rem', color: '#334155', lineHeight: 1.7, marginBottom: '1.5rem', fontStyle: 'italic' }}>
                "As an angel investor and founder, the Startup Syndicate brought together serious builders. Stackly's seat counters and reminder systems kept everyone perfectly synchronized."
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                <img src={`${BASE_URL}images/speakers/speaker-4.webp`} alt="Reviewer" style={{ width: '45px', height: '45px', borderRadius: '50%', objectFit: 'cover' }} />
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.925rem' }}>Tariq El-Masri</div>
                  <div style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>General Partner at Vertex Seed</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Frequently Asked Questions (NEW Section 4) */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-main)', borderTop: '1px solid var(--border-light)' }}>
        <div className="container" style={{ maxWidth: '820px' }}>
          <div className="section-header" data-aos="fade-up">
            <span className="section-tag">
              <i className="fa-solid fa-circle-question" style={{ fontSize: '0.8rem' }}></i>
              Got Questions?
            </span>
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-subtitle">
              Everything you need to know about registering and attending workshops on Stackly.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }} data-aos="fade-up">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                style={{
                  background: '#ffffff',
                  borderRadius: '12px',
                  border: '1px solid var(--border-light)',
                  overflow: 'hidden',
                  transition: 'all 200ms ease'
                }}
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                  style={{
                    width: '100%',
                    padding: '1.25rem 1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    textAlign: 'left',
                    fontWeight: 700,
                    fontSize: '1rem',
                    color: 'var(--text-main)',
                    gap: '1rem'
                  }}
                  aria-expanded={openFaq === idx}
                >
                  <span>{faq.q}</span>
                  <i
                    className={`fa-solid ${openFaq === idx ? 'fa-chevron-up' : 'fa-chevron-down'}`}
                    style={{ color: 'var(--primary)', fontSize: '0.85rem' }}
                  ></i>
                </button>
                {openFaq === idx && (
                  <div style={{ padding: '0 1.5rem 1.25rem 1.5rem', color: 'var(--text-muted)', fontSize: '0.925rem', lineHeight: 1.65 }} className="animate__animated animate__fadeIn">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Big CTA & Workshop Alerts Section with Newsletter Form */}
      <section
        style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 60%, #4338ca 100%)', color: '#ffffff', padding: '5rem 0', position: 'relative', overflow: 'hidden' }}
        data-aos="zoom-in"
        data-aos-duration="750"
      >
        <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: '780px', margin: '0 auto' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(255,255,255,0.15)', color: '#a5b4fc', padding: '0.35rem 0.85rem', borderRadius: '999px', fontSize: '0.85rem', fontWeight: 600, marginBottom: '1.25rem' }}>
            <i className="fa-solid fa-wand-magic-sparkles" style={{ fontSize: '0.8rem' }}></i>
            Start Learning Today
          </span>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#ffffff', marginBottom: '1rem', letterSpacing: '-0.02em' }}>
            Ready to upgrade your skillset with world-class mentors?
          </h2>
          <p style={{ color: '#cbd5e1', fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '2rem' }}>
            Browse through 14+ intensive workshops on Stackly spanning Generative AI, Next.js architecture, Figma Design Systems, and Venture Capital.
          </p>

          <div style={{ maxWidth: '440px', margin: '0 auto 2rem auto', textAlign: 'left' }}>
            <NewsletterForm variant="dark" />
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <button
              type="button"
              className="btn btn-lg hover-lift"
              style={{ background: '#ffffff', color: '#1e1b4b', fontWeight: 700 }}
              onClick={() => navigate('/events')}
            >
              <span>Explore Events Catalog</span>
              <i className="fa-solid fa-arrow-right" style={{ marginLeft: '0.45rem' }}></i>
            </button>

            <button
              type="button"
              className="btn btn-lg hover-lift"
              style={{ background: 'rgba(255,255,255,0.12)', color: '#ffffff', border: '1px solid rgba(255,255,255,0.25)' }}
              onClick={() => navigate('/registrations')}
            >
              <span>Check My Registrations</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
