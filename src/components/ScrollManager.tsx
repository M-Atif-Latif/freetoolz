import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollManager() {
  const { pathname } = useLocation();
  const lastPath = useRef(pathname);

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    const savedPosition = sessionStorage.getItem(`scroll-${pathname}`);

    // Wait slightly for DOM (like Suspense boundaries) to settle before resetting scroll
    const timeout = setTimeout(() => {
      window.scrollTo({
        top: savedPosition ? parseInt(savedPosition, 10) : 0, 
        behavior: 'instant'
      });
    }, 10);

    return () => {
      clearTimeout(timeout);
      sessionStorage.setItem(`scroll-${pathname}`, window.scrollY.toString());
      lastPath.current = pathname;
    };
  }, [pathname]);

  return null;
}
