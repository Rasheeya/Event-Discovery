import React, { useState, useEffect, useRef } from 'react';

/**
 * AnimatedCounter component with smooth 60fps requestAnimationFrame
 * and scroll-triggered IntersectionObserver.
 *
 * @param {number} end - Target value to count up to
 * @param {number} duration - Animation duration in ms (default: 2000ms)
 * @param {number} decimals - Number of decimal places (e.g. 1 for 4.9 or 98.6)
 * @param {string} prefix - Optional text before the number
 * @param {string} suffix - Optional text after the number (e.g. '+', '%')
 * @param {string} className - Optional CSS class
 * @param {object} style - Optional inline styling
 */
export default function AnimatedCounter({
  end,
  duration = 2000,
  decimals = 0,
  prefix = '',
  suffix = '',
  className = '',
  style = {}
}) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    // If IntersectionObserver is unavailable in older browsers, start immediately
    if (typeof IntersectionObserver === 'undefined') {
      setHasStarted(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const currentEl = elementRef.current;
    if (currentEl) {
      observer.observe(currentEl);
    }

    return () => {
      if (currentEl) observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!hasStarted) return;

    let startTimestamp = null;
    let animationFrameId;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = timestamp - startTimestamp;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out cubic easing formula: 1 - (1 - progress)^3
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentVal = easeProgress * end;

      setCount(currentVal);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };

    animationFrameId = requestAnimationFrame(step);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [hasStarted, end, duration]);

  const formattedNumber = decimals > 0
    ? count.toFixed(decimals)
    : Math.floor(count).toLocaleString();

  return (
    <span ref={elementRef} className={`animated-counter-value ${className}`} style={style}>
      {prefix}{formattedNumber}{suffix}
    </span>
  );
}
