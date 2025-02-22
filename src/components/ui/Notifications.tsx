"use client";

import { Toaster, toast } from 'react-hot-toast';

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
        color: '#fff',
        padding: '16px',
        borderRadius: '8px',
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

export default function Notifications() {
  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      gutter={8}
      containerClassName=""
      containerStyle={{}}
      toastOptions={{
        // Default options for all toasts
        className: '',
        duration: 3000,
        style: {
          background: '#fb923c',
          color: '#fff',
        },
        // Custom success styles
        success: {
          duration: 3000,
          iconTheme: {
            primary: '#fff',
            secondary: '#fb923c',
          },
        },
        // Custom error styles
        error: {
          duration: 4000,
          iconTheme: {
            primary: '#fff',
            secondary: '#ef4444',
          },
        },
      }}
    />
  );
} 