import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Add this 'test' configuration block
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js', // The setup file we'll create next
    css: true, // Optional: if you want to test CSS
  },
});