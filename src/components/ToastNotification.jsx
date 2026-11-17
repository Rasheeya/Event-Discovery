import React from 'react';
import { useEvents } from '../context/EventContext';

export default function ToastNotification() {
  const { toast, closeToast } = useEvents();

  if (!toast) return null;

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <i className="fa-solid fa-circle-check" style={{ color: '#10b981', fontSize: '1.15rem' }}></i>;
      case 'error':
        return <i className="fa-solid fa-circle-xmark" style={{ color: '#ef4444', fontSize: '1.15rem' }}></i>;
      case 'info':
      default:
        return <i className="fa-solid fa-circle-info" style={{ color: '#4f46e5', fontSize: '1.15rem' }}></i>;
    }
  };

  const getToastClass = () => {
    switch (toast.type) {
      case 'success':
        return 'toast-banner toast-success animate__animated animate__slideInUp animate__faster';
      case 'error':
        return 'toast-banner toast-error animate__animated animate__shakeX animate__faster';
      default:
        return 'toast-banner toast-info animate__animated animate__slideInUp animate__faster';
    }
  };

  return (
    <div className="toast-container" role="status" aria-live="polite">
      <div className={getToastClass()}>
        {getIcon()}
        <span style={{ flex: 1, fontSize: '0.9rem' }}>{toast.message}</span>
        <button
          onClick={closeToast}
          aria-label="Dismiss notification"
          style={{ padding: '0.2rem', color: '#94a3b8' }}
        >
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>
    </div>
  );
}
