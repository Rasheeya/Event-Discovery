
import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { EventProvider } from './context/EventContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import RegistrationModal from './components/RegistrationModal';
import ToastNotification from './components/ToastNotification';
import ScrollToTop from './components/ScrollToTop';
import AOSInit from './components/AOSInit';

const routerBasename = import.meta.env.BASE_URL === '/' ? undefined : import.meta.env.BASE_URL.replace(/\/$/, '');

// Pages
import HomePage from './pages/HomePage';
import ExploreEventsPage from './pages/ExploreEventsPage';
import EventDetailsPage from './pages/EventDetailsPage';
import MyRegistrationsPage from './pages/MyRegistrationsPage';
import NotFoundPage from './pages/NotFoundPage';

// Standard site layout
function MainLayout() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh'
    }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <EventProvider>
      <BrowserRouter>
        <ScrollToTop />
        <AOSInit />

        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/events" element={<ExploreEventsPage />} />
            <Route path="/events/:id" element={<EventDetailsPage />} />
            <Route path="/registrations" element={<MyRegistrationsPage />} />
          </Route>

          <Route path="/404" element={<NotFoundPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>

        <RegistrationModal />
        <ToastNotification />
      </BrowserRouter>
    </EventProvider>
  );
}
