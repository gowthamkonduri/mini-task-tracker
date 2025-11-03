import '@testing-library/jest-dom';

// mock localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => {
      store[key] = value.toString();
    },
    clear: () => {
      store = {};
    },
    removeItem: (key) => {
      delete store[key];
    },
  };
})();

// assign the mock to the global window object
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
  writable: true, // Make it writable so tests can clear it if needed
});

// mock randomUUID
Object.defineProperty(global, 'crypto', {
  value: {
    // Return a predictable string for our test
    randomUUID: () => 'mock-uuid-12345'
  },
  configurable: true,
});