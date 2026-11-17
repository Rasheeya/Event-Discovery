import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function AOSInit() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    const initAOS = () => {
      if (typeof window !== 'undefined' && window.AOS) {
        window.AOS.init({
          duration: 750,
          easing: 'ease-out-cubic',
          once: true,
          offset: 50,
          delay: 50,
          disable: false, // active on all screen sizes safely
          mirror: false
        });
      }
    };

    // Initialize if AOS is available, or wait until script loaded
    if (window.AOS) {
      initAOS();
    } else {
      const timer = setInterval(() => {
        if (window.AOS) {
          initAOS();
          clearInterval(timer);
        }
      }, 50);
      return () => clearInterval(timer);
    }
  }, []);

  // Refresh AOS on every page navigation or query param change
  useEffect(() => {
    const timer = setTimeout(() => {
      if (typeof window !== 'undefined' && window.AOS) {
        window.AOS.refresh();
      }
    }, 120);

    return () => clearTimeout(timer);
  }, [pathname, search]);

  return null;
}
