import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CATEGORIES } from '../data/eventsData';

export default function CategorySection() {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryId) => {
    if (categoryId === 'All') {
      navigate('/events');
    } else {
      navigate(`/events?category=${encodeURIComponent(categoryId)}`);
    }
  };

  // Filter out 'All' to show the 4 core categories prominently
  const mainCategories = CATEGORIES.filter(c => c.id !== 'All');

  return (
    <section className="section-padding" style={{ backgroundColor: '#ffffff' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header" data-aos="fade-up">
          <span className="section-tag">
            <i className="fa-solid fa-wand-magic-sparkles" style={{ fontSize: '0.8rem' }}></i>
            Specialized Disciplines
          </span>
          <h2 className="section-title">Explore by Domain</h2>
          <p className="section-subtitle">
            Whether you want to build frontier multi-agent architectures, scale a venture-backed startup, 
            or master interactive design systems, find the right cohort for your goals on Stackly.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="categories-grid">
          {mainCategories.map((cat, index) => (
            <div
              key={cat.id}
              className="category-card hover-lift"
              onClick={() => handleCategoryClick(cat.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleCategoryClick(cat.id)}
              data-aos="fade-up"
              data-aos-delay={(index + 1) * 100}
              data-aos-duration="650"
            >
              <div className="category-icon-box">
                <i className={cat.icon} style={{ fontSize: '1.35rem' }}></i>
              </div>

              <h3 className="category-name">{cat.name}</h3>
              <p className="category-description">{cat.description}</p>

              <div className="category-footer">
                <span>{cat.count} Events Available</span>
                <i className="fa-solid fa-arrow-right" style={{ fontSize: '0.85rem' }}></i>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
