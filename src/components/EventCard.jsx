import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEvents } from '../context/EventContext';

export default function EventCard({ event, onRegisterClick, animDelay = 0 }) {
  const navigate = useNavigate();
  const { isFavourite, toggleFavourite, isRegisteredForEvent } = useEvents();

  const isFav = isFavourite(event.id);
  const isRegistered = isRegisteredForEvent(event.id);

  // Category styling helper
  const getCategoryClass = (category) => {
    switch (category) {
      case 'Technology':
        return 'badge-category cat-tech';
      case 'Business':
        return 'badge-category cat-business';
      case 'Design':
        return 'badge-category cat-design';
      case 'Education':
        return 'badge-category cat-education';
      default:
        return 'badge-category cat-tech';
    }
  };

  // Remaining seats badge styling helper
  const renderSeatsBadge = () => {
    const seats = event.availableSeats;
    if (seats <= 0) {
      return (
        <span className="seats-badge seats-soldout">
          <i className="fa-solid fa-users" style={{ fontSize: '0.75rem' }}></i>
          Sold Out
        </span>
      );
    }
    if (seats <= 15) {
      return (
        <span className="seats-badge seats-low">
          <i className="fa-solid fa-triangle-exclamation" style={{ fontSize: '0.75rem' }}></i>
          Only {seats} seats left!
        </span>
      );
    }
    return (
      <span className="seats-badge seats-healthy">
        <i className="fa-solid fa-users" style={{ fontSize: '0.75rem' }}></i>
        {seats} seats available
      </span>
    );
  };

  const handleCardClick = () => {
    navigate(`/events/${event.id}`);
  };

  const handleRegister = (e) => {
    e.stopPropagation();
    if (onRegisterClick) {
      onRegisterClick(event);
    }
  };

  const handleFav = (e) => {
    e.stopPropagation();
    toggleFavourite(event.id);
  };

  return (
    <article
      className="event-card hover-lift"
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleCardClick()}
      data-aos="fade-up"
      data-aos-delay={animDelay}
      data-aos-duration="650"
    >
      {/* Media thumbnail */}
      <div className="event-card-media">
        <img
          src={event.image}
          alt={event.title}
          className="event-card-img"
          loading="lazy"
        />
        
        {/* Top Overlay Badges */}
        <div className="event-card-overlay">
          <span className={getCategoryClass(event.category)}>
            {event.category}
          </span>
          <button
            type="button"
            className={`btn-fav-round ${isFav ? 'active animate__animated animate__heartBeat' : ''}`}
            onClick={handleFav}
            aria-label={isFav ? 'Remove from favourites' : 'Save to favourites'}
            title={isFav ? 'Saved' : 'Add to favourites'}
          >
            <i
              className={isFav ? 'fa-solid fa-heart' : 'fa-regular fa-heart'}
              style={{ color: isFav ? '#f43f5e' : 'inherit', fontSize: '1rem' }}
            ></i>
          </button>
        </div>

        {/* Format Pill */}
        <span className="event-card-format-pill">
          {event.format}
        </span>
      </div>

      {/* Body Content */}
      <div className="event-card-body">
        {/* Date and Location meta */}
        <div className="event-card-meta">
          <div className="meta-item">
            <i className="fa-regular fa-calendar" style={{ color: 'var(--primary)', fontSize: '0.85rem' }}></i>
            <span>{event.displayDate} • {event.time.split(' - ')[0]}</span>
          </div>
          <div className="meta-item">
            <i className="fa-solid fa-location-dot" style={{ color: 'var(--primary)', fontSize: '0.85rem' }}></i>
            <span title={event.venue}>{event.location}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="event-card-title" title={event.title}>
          {event.title}
        </h3>

        {/* Short Description */}
        <p className="event-card-desc">
          {event.shortDescription || event.description}
        </p>

        {/* Card Footer: Seats & Action Buttons */}
        <div className="event-card-footer">
          <div>
            {renderSeatsBadge()}
          </div>

          <div className="event-card-actions">
            <button
              type="button"
              className="btn btn-secondary btn-sm hover-lift"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/events/${event.id}`);
              }}
              title="View full event details"
            >
              <span>View Details</span>
            </button>

            {isRegistered ? (
              <button
                type="button"
                className="btn btn-sm btn-secondary animate__animated animate__fadeIn"
                style={{ color: '#059669', borderColor: '#a7f3d0', background: '#ecfdf5' }}
                onClick={(e) => {
                  e.stopPropagation();
                  navigate('/registrations');
                }}
                title="View your registration pass"
              >
                <i className="fa-solid fa-circle-check" style={{ marginRight: '0.35rem' }}></i>
                <span>Enrolled</span>
              </button>
            ) : event.availableSeats <= 0 ? (
              <button
                type="button"
                className="btn btn-sm btn-secondary btn-disabled"
                disabled
              >
                <span>Full</span>
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-primary btn-sm hover-lift"
                onClick={handleRegister}
                title="Register for this event"
              >
                <span>Register</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
