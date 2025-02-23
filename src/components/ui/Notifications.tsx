"use client";

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Custom notification types
export const showNotification = {
  success: (message: string) => {
    toast.success(message, {
      style: {
        background: '#fb923c',
        color: '#fff',
        padding: '16px',
        borderRadius: '8px',
      },
      iconTheme: {
        primary: '#fff',
        secondary: '#fb923c',
      },
    });
  },

  error: (message: string) => {
    toast.error(message, {
      style: {
        background: '#ef4444',
        color: '#fff',
        padding: '16px',
        borderRadius: '8px',
      },
      iconTheme: {
        primary: '#fff',
        secondary: '#ef4444',
      },
    });
  },

  info: (message: string) => {
    toast(message, {
      icon: 'ℹ️',
      style: {
        background: '#fb923c',
      },
    });
  },

  loading: (message: string) => {
    return toast.loading(message, {
      style: {
        background: '#fb923c',
        color: '#fff',
        padding: '16px',
        borderRadius: '8px',
      },
    });
  },
};

// Export the ToastContainer to be used in your main component
export const NotificationContainer = () => (
  <ToastContainer />
);

export default showNotification; 