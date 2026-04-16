import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

/**
 * Custom hook for proper back button navigation
 * - Detects if browser history is available
 * - Falls back to home page when no history exists
 * - Returns canGoBack boolean for UI feedback
 */
export function useBackNavigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const [canGoBack, setCanGoBack] = useState(false);

  // Detect if we can go back in browser history
  useEffect(() => {
    // Check if there's a history entry before current
    // On initial page load, history length is typically 1
    const hasHistory = window.history.length > 1;
    setCanGoBack(hasHistory);
  }, [location]);

  const goBack = () => {
    if (canGoBack) {
      // Use proper browser history navigation
      window.history.back();
    } else {
      // Fallback to home when no history exists
      navigate('/', { replace: true });
    }
  };

  return { goBack, canGoBack };
}
