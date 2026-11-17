import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_EVENTS } from '../data/eventsData';

const EventContext = createContext();

const STORAGE_KEYS = {
  REGISTRATIONS: 'stackly_registrations_v1',
  FAVOURITES: 'stackly_favourites_v1',
  SEATS: 'stackly_event_seats_v1'
};

export function EventProvider({ children }) {
  // 1. Initialise registrations from LocalStorage
  const [registrations, setRegistrations] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.REGISTRATIONS) || localStorage.getItem('eventhub_registrations_v1');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Failed to parse registrations from localStorage', e);
      return [];
    }
  });

  // 2. Initialise favourites from LocalStorage
  const [favourites, setFavourites] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.FAVOURITES) || localStorage.getItem('eventhub_favourites_v1');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Failed to parse favourites from localStorage', e);
      return [];
    }
  });

  // 3. Initialise seats tracker so available seats update dynamically
  const [seatMap, setSeatMap] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SEATS) || localStorage.getItem('eventhub_event_seats_v1');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to parse seatMap from localStorage', e);
    }
    // Default initial seats
    const initialSeats = {};
    INITIAL_EVENTS.forEach(ev => {
      initialSeats[ev.id] = ev.availableSeats;
    });
    return initialSeats;
  });

  // 4. Modal state for global quick registration
  const [registeringEvent, setRegisteringEvent] = useState(null);
  
  // 5. Toast notification state
  const [toast, setToast] = useState(null);

  // Sync registrations with LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.REGISTRATIONS, JSON.stringify(registrations));
    } catch (e) {
      console.error('Failed to save registrations', e);
    }
  }, [registrations]);

  // Sync favourites with LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.FAVOURITES, JSON.stringify(favourites));
    } catch (e) {
      console.error('Failed to save favourites', e);
    }
  }, [favourites]);

  // Sync seatMap with LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SEATS, JSON.stringify(seatMap));
    } catch (e) {
      console.error('Failed to save seatMap', e);
    }
  }, [seatMap]);

  // Toast auto-dismiss
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const showToast = (message, type = 'info') => {
    setToast({ id: Date.now(), message, type });
  };

  const closeToast = () => {
    setToast(null);
  };

  // Combine INITIAL_EVENTS with current available seats from seatMap
  const events = INITIAL_EVENTS.map(event => ({
    ...event,
    availableSeats: seatMap[event.id] !== undefined ? seatMap[event.id] : event.availableSeats
  }));

  const getEventById = (id) => {
    return events.find(ev => ev.id === id);
  };

  // Check if a user is already registered for an event
  const isRegisteredForEvent = (eventId, email = '') => {
    return registrations.some(reg => {
      if (reg.eventId !== eventId) return false;
      if (email && reg.email.trim().toLowerCase() === email.trim().toLowerCase()) {
        return true;
      }
      return true; // user on this device is registered
    });
  };

  // Check by specific email
  const isEmailRegisteredForEvent = (eventId, email) => {
    if (!email) return false;
    return registrations.some(
      reg => reg.eventId === eventId && reg.email.trim().toLowerCase() === email.trim().toLowerCase()
    );
  };

  // Register for an event
  const registerForEvent = (eventId, attendeeData) => {
    const event = getEventById(eventId);
    if (!event) {
      return { success: false, error: 'Event not found.' };
    }

    // Check duplicate registration
    const alreadyRegistered = registrations.some(
      reg => reg.eventId === eventId && (
        reg.email.trim().toLowerCase() === attendeeData.email.trim().toLowerCase() ||
        reg.phone.replace(/\D/g, '') === attendeeData.phone.replace(/\D/g, '')
      )
    );

    if (alreadyRegistered) {
      return {
        success: false,
        error: `You have already registered for "${event.title}" with this contact information on Stackly!`
      };
    }

    // Check seat availability
    const currentSeats = seatMap[eventId] !== undefined ? seatMap[eventId] : event.availableSeats;
    if (currentSeats <= 0) {
      return {
        success: false,
        error: 'Sorry! This workshop is completely sold out.'
      };
    }

    const newTicketId = `STK-${Math.floor(100000 + Math.random() * 900000)}`;
    const newRegistration = {
      id: `reg-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
      ticketId: newTicketId,
      eventId: event.id,
      eventTitle: event.title,
      eventDate: event.displayDate,
      eventRawDate: event.date,
      eventTime: event.time,
      eventLocation: event.location,
      eventVenue: event.venue,
      eventCategory: event.category,
      eventImage: event.image,
      format: event.format,
      name: attendeeData.name.trim(),
      email: attendeeData.email.trim().toLowerCase(),
      phone: attendeeData.phone.trim(),
      organization: attendeeData.organization || 'Independent Attendee',
      registeredAt: new Date().toISOString(),
      status: 'Confirmed'
    };

    // Update state: add registration & decrement seat
    setRegistrations(prev => [newRegistration, ...prev]);
    setSeatMap(prev => ({
      ...prev,
      [eventId]: Math.max(0, currentSeats - 1)
    }));

    showToast(`Successfully registered for ${event.title}!`, 'success');

    return {
      success: true,
      registration: newRegistration,
      message: 'Registration confirmed!'
    };
  };

  // Cancel a registration
  const cancelRegistration = (registrationId) => {
    const regToCancel = registrations.find(r => r.id === registrationId);
    if (!regToCancel) {
      return { success: false, error: 'Registration not found' };
    }

    // Remove from registrations
    setRegistrations(prev => prev.filter(r => r.id !== registrationId));

    // Restore seat
    setSeatMap(prev => {
      const current = prev[regToCancel.eventId] ?? 0;
      return {
        ...prev,
        [regToCancel.eventId]: current + 1
      };
    });

    showToast(`Cancelled registration for "${regToCancel.eventTitle}". Seat restored.`, 'info');
    return { success: true };
  };

  // Toggle favourite
  const toggleFavourite = (eventId) => {
    setFavourites(prev => {
      const exists = prev.includes(eventId);
      if (exists) {
        showToast('Removed from saved favourites', 'info');
        return prev.filter(id => id !== eventId);
      } else {
        showToast('Saved to your favourites on Stackly!', 'success');
        return [...prev, eventId];
      }
    });
  };

  const isFavourite = (eventId) => favourites.includes(eventId);

  const openRegisterModal = (event) => {
    setRegisteringEvent(event);
  };

  const closeRegisterModal = () => {
    setRegisteringEvent(null);
  };

  const value = {
    events,
    registrations,
    favourites,
    registerForEvent,
    cancelRegistration,
    isRegisteredForEvent,
    isEmailRegisteredForEvent,
    toggleFavourite,
    isFavourite,
    getEventById,
    registeringEvent,
    openRegisterModal,
    closeRegisterModal,
    toast,
    showToast,
    closeToast
  };

  return (
    <EventContext.Provider value={value}>
      {children}
    </EventContext.Provider>
  );
}

export function useEvents() {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error('useEvents must be used within an EventProvider');
  }
  return context;
}
