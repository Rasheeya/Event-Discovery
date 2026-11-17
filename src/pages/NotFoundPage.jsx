import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function NotFoundPage() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    // If there is browser history, go back; otherwise go to home
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="not-found-page">
      <div className="not-found-hero" data-aos="zoom-in" data-aos-duration="650">
        {/* Brand Logo */}
        <div style={{ marginBottom: '1.75rem', display: 'flex', justifyContent: 'center' }}>
          <Link to="/" className="brand-logo" style={{ textDecoration: 'none' }} aria-label="Stackly Home">
            <img
              src="/images/logo/stackly-logo.webp"
              alt="Stackly"
              className="navbar-brand-img"
              style={{ height: '42px', width: 'auto' }}
            />
          </Link>
        </div>

        {/* 404 Status Pill */}
        <div className="not-found-code-badge">
          <i className="fa-solid fa-triangle-exclamation"></i>
          <span>Error 404 • Destination Not Found</span>
        </div>

        {/* Animated Gradient 404 */}
        <div className="not-found-title-glitch" aria-label="404">
          404
        </div>

        {/* Headline */}
        <h1 className="not-found-subtitle">
          Lost in the Stack? We Couldn't Find That Page.
        </h1>

        {/* Subtitle Description */}
        <p className="not-found-description">
          The workshop or URL you are trying to reach may have been rescheduled, concluded, 
          or mistyped. Let's get you back on track to discovering frontier masterclasses.
        </p>

        {/* Action Buttons: "Back to Home" and replaced "Go Back" */}
        <div className="not-found-actions-group">
          <button
            type="button"
            className="btn btn-primary btn-lg hover-lift"
            onClick={() => navigate('/')}
          >
            <i className="fa-solid fa-house"></i>
            <span>Back to Home</span>
          </button>

          <button
            type="button"
            className="btn btn-secondary btn-lg hover-lift"
            onClick={handleGoBack}
          >
            <i className="fa-solid fa-arrow-left"></i>
            <span>Go Back</span>
          </button>
        </div>
      </div>
    </div>
  );
}
