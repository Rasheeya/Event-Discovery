import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useEvents } from '../context/EventContext';
import EventCard from '../components/EventCard';
import { CATEGORIES, LOCATIONS } from '../data/eventsData';

export default function ExploreEventsPage() {
  const { events, favourites, openRegisterModal } = useEvents();
  const [searchParams, setSearchParams] = useSearchParams();

  // URL query params initialization
  const categoryParam = searchParams.get('category') || 'All';
  const filterParam = searchParams.get('filter') || 'all';

  // State management for filters and sorting
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [sortBy, setSortBy] = useState('date-asc'); // 'date-asc' | 'date-desc' | 'seats-desc' | 'title-asc'
  const [showFavouritesOnly, setShowFavouritesOnly] = useState(filterParam === 'favourites');

  // Keep state synced if URL parameter changes (e.g. from navbar or category click)
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) {
      setSelectedCategory(cat);
    }
    const filter = searchParams.get('filter');
    if (filter === 'favourites') {
      setShowFavouritesOnly(true);
    }
  }, [searchParams]);

  // Handle Category selection
  const handleCategoryChange = (catId) => {
    setSelectedCategory(catId);
    const newParams = new URLSearchParams(searchParams);
    if (catId === 'All') {
      newParams.delete('category');
    } else {
      newParams.set('category', catId);
    }
    setSearchParams(newParams);
  };

  // Toggle Favourites filter
  const handleToggleFavourites = () => {
    const nextVal = !showFavouritesOnly;
    setShowFavouritesOnly(nextVal);
    const newParams = new URLSearchParams(searchParams);
    if (nextVal) {
      newParams.set('filter', 'favourites');
    } else {
      newParams.delete('filter');
    }
    setSearchParams(newParams);
  };

  // Quick tag click handler
  const handleTagClick = (tag) => {
    setSearchQuery(tag);
  };

  // Reset all filters
  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedLocation('All Locations');
    setSortBy('date-asc');
    setShowFavouritesOnly(false);
    setSearchParams({});
  };

  // Check if any filter is active
  const isFiltered =
    searchQuery.trim() !== '' ||
    selectedCategory !== 'All' ||
    selectedLocation !== 'All Locations' ||
    showFavouritesOnly ||
    sortBy !== 'date-asc';

  // Filter and Sort events dynamically
  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      // 1. Search Query filter (by name, description, tags, speaker)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesTitle = event.title.toLowerCase().includes(query);
        const matchesDesc = event.description.toLowerCase().includes(query);
        const matchesTags = event.tags?.some(tag => tag.toLowerCase().includes(query));
        const matchesSpeaker = event.speaker?.name.toLowerCase().includes(query);
        if (!matchesTitle && !matchesDesc && !matchesTags && !matchesSpeaker) {
          return false;
        }
      }

      // 2. Category filter
      if (selectedCategory !== 'All' && event.category !== selectedCategory) {
        return false;
      }

      // 3. Location filter
      if (selectedLocation !== 'All Locations') {
        if (!event.location.toLowerCase().includes(selectedLocation.toLowerCase().split('/')[0].trim())) {
          return false;
        }
      }

      // 4. Favourites filter
      if (showFavouritesOnly && !favourites.includes(event.id)) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      // Sort logic
      if (sortBy === 'date-asc') {
        return new Date(a.date) - new Date(b.date);
      }
      if (sortBy === 'date-desc') {
        return new Date(b.date) - new Date(a.date);
      }
      if (sortBy === 'seats-desc') {
        return b.availableSeats - a.availableSeats;
      }
      if (sortBy === 'title-asc') {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });
  }, [events, searchQuery, selectedCategory, selectedLocation, showFavouritesOnly, favourites, sortBy]);

  // Refresh AOS when filtered events change so newly matching cards animate smoothly
  useEffect(() => {
    const timer = setTimeout(() => {
      if (typeof window !== 'undefined' && window.AOS) {
        window.AOS.refresh();
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [filteredEvents]);

  const trendingTags = [
    { label: 'Generative AI', query: 'AI' },
    { label: 'React 19', query: 'React' },
    { label: 'Kubernetes', query: 'Kubernetes' },
    { label: 'Design Tokens', query: 'Figma' },
    { label: 'Cybersecurity', query: 'Security' },
    { label: 'FinTech', query: 'FinTech' },
    { label: 'Python ML', query: 'Python' }
  ];

  return (
    <div style={{ backgroundColor: 'var(--bg-main)' }}>
      {/* 1. Explore Hero Banner with Background WebP Image */}
      <section className="explore-hero-banner">
        <div className="container">
          <div data-aos="fade-up">
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--primary)', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>
              <i className="fa-solid fa-compass" style={{ fontSize: '0.9rem' }}></i>
              <span>Curated Stackly Catalog</span>
            </div>
            <h1 style={{ fontSize: '2.75rem', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '0.75rem' }}>
              Explore Events &amp; Workshops
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: '720px', lineHeight: 1.6, margin: 0 }}>
              Discover and reserve seats for 14+ industry summits, coding bootcamps, and executive roundtables.
              Filter by category, search by event title, and bookmark your favourites.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Main Explore Toolbar & Catalog Section */}
      <div className="section-padding" style={{ minHeight: '60vh', paddingTop: '2.5rem', paddingBottom: '3rem' }}>
        <div className="container">
          {/* Explore Toolbar: Search & Filters */}
          <div className="explore-toolbar" data-aos="fade-up" data-aos-delay="100">
            {/* Search Input Bar */}
            <div className="search-input-wrapper">
              <i className="fa-solid fa-magnifying-glass search-icon"></i>
              <input
                type="text"
                className="search-input"
                placeholder="Search events by name, topic (e.g. 'React', 'AI', 'Startup', 'Figma')..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search events by title or keyword"
              />
              {searchQuery && (
                <button
                  type="button"
                  className="search-clear-btn"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
              )}
            </div>

            {/* Filter Controls Row */}
            <div className="filter-controls-row">
              {/* Category Pills */}
              <div className="category-pills-scroll" role="tablist" aria-label="Event Categories">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat.id}
                    role="tab"
                    aria-selected={selectedCategory === cat.id}
                    className={`filter-pill ${selectedCategory === cat.id ? 'active' : ''}`}
                    onClick={() => handleCategoryChange(cat.id)}
                  >
                    <span>{cat.name}</span>
                    <span style={{ fontSize: '0.75rem', opacity: 0.85 }}>
                      ({cat.id === 'All' ? events.length : events.filter(e => e.category === cat.id).length})
                    </span>
                  </button>
                ))}
              </div>

              {/* Secondary Filters: Location, Sort, Favourites */}
              <div className="secondary-filters-group">
                {/* Location Select */}
                <div className="custom-select-wrapper">
                  <select
                    className="custom-select"
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    aria-label="Filter events by location"
                  >
                    {LOCATIONS.map(loc => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    ))}
                  </select>
                  <i className="fa-solid fa-chevron-down select-arrow-icon"></i>
                </div>

                {/* Sort By Date/Seats Select */}
                <div className="custom-select-wrapper">
                  <select
                    className="custom-select"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    aria-label="Sort events"
                  >
                    <option value="date-asc">Date: Upcoming Earliest</option>
                    <option value="date-desc">Date: Latest First</option>
                    <option value="seats-desc">Seats: Most Available</option>
                    <option value="title-asc">Title: Alphabetical (A-Z)</option>
                  </select>
                  <i className="fa-solid fa-chevron-down select-arrow-icon"></i>
                </div>

                {/* Favourites Only Toggle */}
                <button
                  type="button"
                  className={`fav-filter-toggle ${showFavouritesOnly ? 'active' : ''}`}
                  onClick={handleToggleFavourites}
                  title="Filter by bookmarked favourites"
                >
                  <i
                    className={`${showFavouritesOnly ? 'fa-solid' : 'fa-regular'} fa-heart`}
                    style={{ color: showFavouritesOnly ? '#f43f5e' : 'currentColor' }}
                  ></i>
                  <span>Saved ({favourites.length})</span>
                </button>
              </div>
            </div>
          </div>

          {/* NEW SECTION 1: Trending Topic Tags Quick Bar */}
          <div style={{ marginTop: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }} data-aos="fade-up" data-aos-delay="150">
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              <i className="fa-solid fa-fire" style={{ color: '#f59e0b' }}></i>
              Trending Tags:
            </span>
            {trendingTags.map((tag) => (
              <button
                key={tag.label}
                type="button"
                className="hover-lift"
                onClick={() => handleTagClick(tag.query)}
                style={{
                  background: searchQuery === tag.query ? 'var(--primary)' : '#ffffff',
                  color: searchQuery === tag.query ? '#ffffff' : 'var(--text-main)',
                  border: '1px solid var(--border-light)',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '999px',
                  fontSize: '0.785rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                #{tag.label}
              </button>
            ))}
          </div>

          {/* Filter Summary & Active Chips Bar */}
          <div className="filter-summary-bar">
            <div className="filter-summary-count">
              Showing <strong>{filteredEvents.length}</strong> of {events.length} dynamic events
            </div>

            {isFiltered && (
              <div className="filter-chips-list">
                {searchQuery && (
                  <span className="filter-chip">
                    <span className="filter-chip-label">Query:</span> "{searchQuery}"
                    <button type="button" className="filter-chip-remove" onClick={() => setSearchQuery('')} aria-label="Remove search query filter">
                      <i className="fa-solid fa-xmark"></i>
                    </button>
                  </span>
                )}
                {selectedCategory !== 'All' && (
                  <span className="filter-chip">
                    <span className="filter-chip-label">Category:</span> {selectedCategory}
                    <button type="button" className="filter-chip-remove" onClick={() => handleCategoryChange('All')} aria-label="Remove category filter">
                      <i className="fa-solid fa-xmark"></i>
                    </button>
                  </span>
                )}
                {selectedLocation !== 'All Locations' && (
                  <span className="filter-chip">
                    <span className="filter-chip-label">Location:</span> {selectedLocation}
                    <button type="button" className="filter-chip-remove" onClick={() => setSelectedLocation('All Locations')} aria-label="Remove location filter">
                      <i className="fa-solid fa-xmark"></i>
                    </button>
                  </span>
                )}
                {showFavouritesOnly && (
                  <span className="filter-chip filter-chip-fav">
                    <i className="fa-solid fa-heart" style={{ fontSize: '0.75rem', color: '#f43f5e' }}></i>
                    <span>Only Favourites</span>
                    <button type="button" className="filter-chip-remove" onClick={handleToggleFavourites} aria-label="Remove favourites filter">
                      <i className="fa-solid fa-xmark"></i>
                    </button>
                  </span>
                )}
                <button
                  type="button"
                  className="btn-clear-all"
                  onClick={resetFilters}
                  title="Clear all active filters"
                >
                  <i className="fa-solid fa-rotate-left"></i>
                  <span>Reset All Filters</span>
                </button>
              </div>
            )}
          </div>

          {/* Events Grid or Empty State */}
          {filteredEvents.length > 0 ? (
            <div className="events-grid">
              {filteredEvents.map((event, index) => (
                <EventCard
                  key={event.id}
                  event={event}
                  onRegisterClick={openRegisterModal}
                  animDelay={(index % 3) * 100}
                />
              ))}
            </div>
          ) : (
            <div className="empty-state-box" data-aos="zoom-in">
              <div className="empty-state-icon">
                <i className="fa-solid fa-magnifying-glass" style={{ fontSize: '1.75rem', color: 'var(--primary)' }}></i>
              </div>
              <h3 className="empty-state-title">No Matching Events Found</h3>
              <p className="empty-state-text">
                We couldn't find any workshops matching your current search terms and filter criteria. 
                Try resetting your filters or searching for different keywords.
              </p>
              <button
                type="button"
                className="btn btn-primary"
                onClick={resetFilters}
              >
                <i className="fa-solid fa-rotate-left"></i>
                <span>Reset All Filters</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
