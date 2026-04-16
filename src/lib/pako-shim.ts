// Pako shim to handle ESM/CJS interop in Vite dev mode
// This ensures pako is properly imported as a module
let pakoModule: any;

async function initPako() {
  if (!pakoModule) {
    try {
      // Dynamic import to handle ESM/CJS properly
      pakoModule = await import('pako');
      // If pako is exported as default, use it; otherwise use the module itself
      return pakoModule.default || pakoModule;
    } catch (err) {
      console.error('Failed to import pako:', err);
      // Fallback to global pako if available
      return (globalThis as any).pako;
    }
  }
  return pakoModule;
}

export default initPako;
