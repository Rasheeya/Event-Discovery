import React, { useState, useEffect } from 'react';
import { useEvents } from '../context/EventContext';
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';

export default function RegistrationModal() {
  const { registeringEvent, closeRegisterModal, registerForEvent, isRegisteredForEvent } = useEvents();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    agreeTerms: true
  });

  const [errors, setErrors] = useState({});
  const [submissionResult, setSubmissionResult] = useState(null);
  const [duplicateWarning, setDuplicateWarning] = useState(null);

  // Reset form when modal opens or event changes
  useEffect(() => {
    if (registeringEvent) {
      setFormData({
        name: '',
        email: '',
        phone: '',
        organization: '',
        agreeTerms: true
      });
      setErrors({});
      setSubmissionResult(null);
      setDuplicateWarning(null);

      // Check if current device already has a registration
      if (isRegisteredForEvent(registeringEvent.id)) {
        setDuplicateWarning(
          `Notice: You already have a confirmed registration for this event on this device on Stackly.`
        );
      }
    }
  }, [registeringEvent, isRegisteredForEvent]);

  if (!registeringEvent) return null;

  // Form Validation
  const validate = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    } else if (formData.name.trim().length < 3) {
      newErrors.name = 'Name must be at least 3 characters';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone validation
    const cleanedPhone = formData.phone.replace(/[\s\-\(\)\.]/g, '');
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (cleanedPhone.length < 8 || !/^\+?[0-9]{8,15}$/.test(cleanedPhone)) {
      newErrors.phone = 'Please enter a valid phone number (8-15 digits)';
    }

    // Terms agreement
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'You must agree to Stackly terms and attendance code of conduct';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
    if (duplicateWarning) {
      setDuplicateWarning(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    const result = registerForEvent(registeringEvent.id, formData);

    if (result.success) {
      setSubmissionResult(result.registration);
      // Trigger confetti celebrate
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        // Fallback silently if confetti encounters any canvas issue
      }
    } else {
      setDuplicateWarning(result.error);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      className="modal-backdrop animate__animated animate__fadeIn animate__faster"
      onClick={closeRegisterModal}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="modal-container animate__animated animate__zoomIn animate__faster"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="modal-header">
          <div>
            <h2 id="modal-title" className="modal-title">
              {submissionResult ? 'Registration Confirmed!' : 'Register for Workshop'}
            </h2>
            <p style={{ fontSize: '0.85rem', color: '#64748b' }}>
              {submissionResult
                ? 'Your Stackly admission pass has been generated and saved.'
                : 'Complete the form below to secure your seat.'}
            </p>
          </div>
          <button
            onClick={closeRegisterModal}
            className="modal-close-btn"
            aria-label="Close dialog"
          >
            <i className="fa-solid fa-xmark" style={{ fontSize: '1.2rem' }}></i>
          </button>
        </div>

        {/* If already submitted successfully, display Digital Pass */}
        {submissionResult ? (
          <div className="success-pass-container">
            <div className="success-badge-icon animate__animated animate__bounceIn">
              <i className="fa-solid fa-circle-check" style={{ fontSize: '2.2rem' }}></i>
            </div>

            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.5rem' }}>
              You're In, {submissionResult.name}!
            </h3>
            <p style={{ color: '#64748b', fontSize: '0.925rem', marginBottom: '1.5rem' }}>
              We've saved your registration to <strong>My Registrations</strong>. Please keep your Ticket ID handy for event check-in.
            </p>

            {/* Ticket Pass representation */}
            <div className="ticket-digital-pass animate__animated animate__fadeInUp">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px dashed rgba(255,255,255,0.2)', paddingBottom: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#a5b4fc' }}>
                  <i className="fa-solid fa-ticket"></i>
                  <span>Official Stackly Pass</span>
                </div>
                <span style={{ background: '#10b981', color: '#ffffff', fontSize: '0.75rem', fontWeight: 700, padding: '0.2rem 0.6rem', borderRadius: '999px' }}>
                  Confirmed
                </span>
              </div>

              <h4 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.5rem' }}>
                {submissionResult.eventTitle}
              </h4>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem', marginTop: '1rem', fontSize: '0.875rem' }}>
                <div>
                  <div style={{ color: '#a5b4fc', fontSize: '0.75rem', textTransform: 'uppercase' }}>Attendee</div>
                  <div style={{ fontWeight: 600 }}>{submissionResult.name}</div>
                </div>
                <div>
                  <div style={{ color: '#a5b4fc', fontSize: '0.75rem', textTransform: 'uppercase' }}>Ticket ID</div>
                  <div style={{ fontWeight: 700, fontFamily: 'monospace', color: '#38bdf8' }}>{submissionResult.ticketId}</div>
                </div>
                <div>
                  <div style={{ color: '#a5b4fc', fontSize: '0.75rem', textTransform: 'uppercase' }}>Date &amp; Time</div>
                  <div>{submissionResult.eventDate}</div>
                </div>
                <div>
                  <div style={{ color: '#a5b4fc', fontSize: '0.75rem', textTransform: 'uppercase' }}>Location</div>
                  <div>{submissionResult.eventLocation}</div>
                </div>
              </div>

              <div style={{ marginTop: '1.25rem', paddingTop: '0.75rem', borderTop: '1px dashed rgba(255,255,255,0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.775rem', color: '#cbd5e1' }}>
                <span>Confirmation sent to {submissionResult.email}</span>
                <span style={{ fontFamily: 'monospace' }}>||||| | ||| ||||</span>
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center' }}>
              <button
                type="button"
                className="btn btn-secondary btn-sm hover-lift"
                onClick={handlePrint}
              >
                <i className="fa-solid fa-print" style={{ marginRight: '0.4rem' }}></i>
                <span>Print Pass</span>
              </button>

              <button
                type="button"
                className="btn btn-primary btn-sm hover-lift"
                onClick={() => {
                  closeRegisterModal();
                  navigate('/registrations');
                }}
              >
                <i className="fa-solid fa-ticket" style={{ marginRight: '0.4rem' }}></i>
                <span>Go to My Registrations</span>
                <i className="fa-solid fa-arrow-right" style={{ marginLeft: '0.4rem' }}></i>
              </button>
            </div>
          </div>
        ) : (
          /* Registration Form */
          <>
            {/* Event Summary Snippet */}
            <div className="modal-event-snippet">
              <img
                src={registeringEvent.image}
                alt={registeringEvent.title}
                className="modal-event-thumb"
              />
              <div style={{ flex: 1, minWidth: 0 }}>
                <span className="badge-category cat-tech" style={{ fontSize: '0.7rem', padding: '0.15rem 0.5rem', marginBottom: '0.25rem' }}>
                  {registeringEvent.category}
                </span>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, wordBreak: 'break-word', lineHeight: 1.35 }}>
                  {registeringEvent.title}
                </h4>
                <div style={{ display: 'flex', gap: '0.85rem', fontSize: '0.8rem', color: '#64748b', marginTop: '0.2rem' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                    <i className="fa-regular fa-calendar" style={{ fontSize: '0.75rem' }}></i>
                    {registeringEvent.displayDate}
                  </span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                    <i className="fa-solid fa-location-dot" style={{ fontSize: '0.75rem' }}></i>
                    {registeringEvent.location.split(',')[0]}
                  </span>
                </div>
              </div>
            </div>

            {/* Duplicate or Availability Warning */}
            {duplicateWarning && (
              <div style={{ margin: '1rem 1.5rem 0 1.5rem', padding: '0.85rem 1rem', background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '8px', display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                <i className="fa-solid fa-triangle-exclamation" style={{ color: '#b45309', marginTop: '0.2rem' }}></i>
                <div style={{ fontSize: '0.875rem', color: '#92400e' }}>
                  <p style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Registration Alert</p>
                  <p>{duplicateWarning}</p>
                  <button
                    type="button"
                    onClick={() => {
                      closeRegisterModal();
                      navigate('/registrations');
                    }}
                    style={{ marginTop: '0.5rem', fontSize: '0.8rem', color: '#4f46e5', fontWeight: 700, textDecoration: 'underline' }}
                  >
                    View in My Registrations →
                  </button>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="modal-form" noValidate>
              {/* Name */}
              <div className="form-group">
                <label htmlFor="reg-name" className="form-label">
                  <span>Full Name <span style={{ color: '#ef4444' }}>*</span></span>
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    id="reg-name"
                    name="name"
                    type="text"
                    placeholder="e.g. Alexandra Vance"
                    value={formData.name}
                    onChange={handleChange}
                    className={`form-input ${errors.name ? 'input-error' : ''}`}
                    autoComplete="name"
                  />
                </div>
                {errors.name && (
                  <span className="field-error-text" style={{ color: '#ef4444', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <i className="fa-solid fa-circle-exclamation" style={{ fontSize: '0.75rem' }}></i>
                    <span>{errors.name}</span>
                  </span>
                )}
              </div>

              {/* Email */}
              <div className="form-group">
                <label htmlFor="reg-email" className="form-label">
                  <span>Email Address <span style={{ color: '#ef4444' }}>*</span></span>
                  <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Pass sent here</span>
                </label>
                <input
                  id="reg-email"
                  name="email"
                  type="email"
                  placeholder="alexandra@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className={`form-input ${errors.email ? 'input-error' : ''}`}
                  autoComplete="email"
                />
                {errors.email && (
                  <span className="field-error-text" style={{ color: '#ef4444', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <i className="fa-solid fa-circle-exclamation" style={{ fontSize: '0.75rem' }}></i>
                    <span>{errors.email}</span>
                  </span>
                )}
              </div>

              {/* Phone */}
              <div className="form-group">
                <label htmlFor="reg-phone" className="form-label">
                  <span>Phone Number <span style={{ color: '#ef4444' }}>*</span></span>
                  <span style={{ fontSize: '0.75rem', color: '#64748b' }}>For workshop updates</span>
                </label>
                <input
                  id="reg-phone"
                  name="phone"
                  type="tel"
                  placeholder="+1 (555) 234-5678"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`form-input ${errors.phone ? 'input-error' : ''}`}
                  autoComplete="tel"
                />
                {errors.phone && (
                  <span className="field-error-text" style={{ color: '#ef4444', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <i className="fa-solid fa-circle-exclamation" style={{ fontSize: '0.75rem' }}></i>
                    <span>{errors.phone}</span>
                  </span>
                )}
              </div>

              {/* Organization (Optional) */}
              <div className="form-group">
                <label htmlFor="reg-org" className="form-label">
                  <span>Company or University</span>
                  <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Optional</span>
                </label>
                <input
                  id="reg-org"
                  name="organization"
                  type="text"
                  placeholder="e.g. Stanford University / Tech Corp"
                  value={formData.organization}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>

              {/* Terms Checkbox */}
              <div className="form-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleChange}
                    className="checkbox-input"
                  />
                  <span>
                    I agree to the Stackly Attendee Terms, attendance guidelines, and confirm that the submitted details are correct.
                  </span>
                </label>
                {errors.agreeTerms && (
                  <span className="field-error-text" style={{ color: '#ef4444', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <i className="fa-solid fa-circle-exclamation" style={{ fontSize: '0.75rem' }}></i>
                    <span>{errors.agreeTerms}</span>
                  </span>
                )}
              </div>

              {/* Modal Actions */}
              <div className="modal-actions">
                <button
                  type="button"
                  className="btn btn-secondary btn-sm hover-lift"
                  onClick={closeRegisterModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary hover-lift"
                >
                  <span>Confirm Registration</span>
                  <i className="fa-solid fa-arrow-right" style={{ marginLeft: '0.35rem' }}></i>
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
