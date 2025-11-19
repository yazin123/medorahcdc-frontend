'use client'
import { useEffect } from 'react';

export default function ChunkErrorHandler() {
  useEffect(() => {
    // Handle chunk loading errors
    const handleChunkError = (event) => {
      const error = event.error;
      const target = event.target;
      
      // Check for chunk loading errors in error messages
      if (error && error.message && error.message.includes('Loading chunk')) {
        console.warn('Chunk loading error detected, reloading page...');
        // Reload the page to get the latest chunks
        setTimeout(() => window.location.reload(), 100);
        return;
      }
      
      // Check for 404 errors on chunk files
      if (target && target.tagName === 'SCRIPT' && target.src) {
        const src = target.src;
        if (src.includes('/_next/static/chunks/') && target.onerror) {
          // This is a script loading error, check if it's a chunk
          console.warn('Chunk script failed to load, reloading page...', src);
          setTimeout(() => window.location.reload(), 100);
        }
      }
    };

    // Listen for script loading errors
    const handleScriptError = (event) => {
      const target = event.target;
      if (target && target.tagName === 'SCRIPT' && target.src) {
        const src = target.src;
        // Check if it's a Next.js chunk file
        if (src.includes('/_next/static/chunks/app/') || 
            src.includes('/_next/static/chunks/')) {
          console.warn('Chunk script 404 error detected, reloading page...', src);
          // Prevent infinite reload loop
          if (!sessionStorage.getItem('chunk-reload-attempted')) {
            sessionStorage.setItem('chunk-reload-attempted', 'true');
            setTimeout(() => {
              sessionStorage.removeItem('chunk-reload-attempted');
              window.location.reload();
            }, 100);
          }
        }
      }
    };

    // Listen for unhandled errors
    window.addEventListener('error', handleChunkError, true);
    window.addEventListener('error', handleScriptError, true);
    
    // Also listen for unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      const error = event.reason;
      if (error && error.message && error.message.includes('Loading chunk')) {
        console.warn('Chunk loading error detected, reloading page...');
        event.preventDefault();
        if (!sessionStorage.getItem('chunk-reload-attempted')) {
          sessionStorage.setItem('chunk-reload-attempted', 'true');
          setTimeout(() => {
            sessionStorage.removeItem('chunk-reload-attempted');
            window.location.reload();
          }, 100);
        }
      }
    });

    return () => {
      window.removeEventListener('error', handleChunkError, true);
      window.removeEventListener('error', handleScriptError, true);
    };
  }, []);

  return null;
}

