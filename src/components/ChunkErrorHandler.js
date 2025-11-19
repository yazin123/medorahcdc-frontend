'use client'
import { useEffect } from 'react';

export default function ChunkErrorHandler() {
  useEffect(() => {
    // Handle chunk loading errors
    const handleChunkError = (event) => {
      const error = event.error;
      
      if (error && error.message && error.message.includes('Loading chunk')) {
        console.warn('Chunk loading error detected, reloading page...');
        // Reload the page to get the latest chunks
        window.location.reload();
      }
    };

    // Listen for unhandled errors
    window.addEventListener('error', handleChunkError);
    
    // Also listen for unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      const error = event.reason;
      if (error && error.message && error.message.includes('Loading chunk')) {
        console.warn('Chunk loading error detected, reloading page...');
        event.preventDefault();
        window.location.reload();
      }
    });

    return () => {
      window.removeEventListener('error', handleChunkError);
    };
  }, []);

  return null;
}

