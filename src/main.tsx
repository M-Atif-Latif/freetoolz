import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ThemeProvider } from './context/ThemeContext';
import ErrorBoundary from './components/ErrorBoundary';
import CookieConsent from './components/CookieConsent';

// Get root element with error handling
const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found');
}

// Create root with concurrent features enabled (React 18)
const root = createRoot(rootElement);

// Render immediately for fastest FCP/LCP
root.render(
  <StrictMode>
    <ErrorBoundary>
      <ThemeProvider>
        <App />
        <CookieConsent />
      </ThemeProvider>
    </ErrorBoundary>
  </StrictMode>
);
