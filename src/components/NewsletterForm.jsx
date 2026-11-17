import React, { useState } from 'react';

export default function NewsletterForm({ variant = 'default' }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setError('Email is required');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setError('Please enter a valid email address');
      return;
    }

    // Success
    setError('');
    setSubscribed(true);
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
    if (error) {
      setError('');
    }
  };

  if (subscribed) {
    return (
      <div className="newsletter-success animate__animated animate__fadeIn" style={{ padding: '0.75rem 1rem', background: 'rgba(16, 185, 129, 0.15)', border: '1px solid #10b981', borderRadius: '8px', color: '#10b981', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <i className="fa-solid fa-circle-check"></i>
        <span>Thank you for subscribing to Stackly workshop alerts!</span>
      </div>
    );
  }

  const isLight = variant === 'light';

  return (
    <div className="newsletter-form-box" style={{ width: '100%', maxWidth: '100%' }}>
      <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', width: '100%' }}>
        <div style={{ position: 'relative', width: '100%' }}>
          <input
            type="email"
            placeholder="Enter your email address..."
            value={email}
            onChange={handleChange}
            className={error ? 'input-error' : ''}
            style={{
              width: '100%',
              padding: '0.75rem 1rem',
              borderRadius: '8px',
              border: error ? '1.5px solid #ef4444' : (isLight ? '1.5px solid #cbd5e1' : '1px solid #334155'),
              background: isLight ? '#ffffff' : '#1e293b',
              color: isLight ? '#0f172a' : '#ffffff',
              fontSize: '0.9rem',
              boxSizing: 'border-box',
              outline: 'none',
              transition: 'border-color 200ms ease'
            }}
            aria-label="Newsletter email address"
          />
        </div>

        {error && (
          <span
            className="field-error-text newsletter-error-msg animate__animated animate__headShake"
            style={{
              color: '#ef4444',
              fontSize: '0.8rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              marginTop: '0.1rem'
            }}
          >
            <i className="fa-solid fa-circle-exclamation" style={{ color: '#ef4444' }}></i>
            <span>{error}</span>
          </span>
        )}

        <button
          type="submit"
          className="btn btn-primary btn-sm hover-lift"
          style={{ width: '100%', marginTop: '0.25rem' }}
        >
          <i className="fa-solid fa-paper-plane" style={{ marginRight: '0.35rem' }}></i>
          <span>Subscribe to Alerts</span>
        </button>
      </form>
    </div>
  );
}
