import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

console.log('Main.tsx: Starting application...');

try {
  const rootElement = document.getElementById("root");
  console.log('Main.tsx: Root element found:', rootElement);
  
  if (!rootElement) {
    throw new Error('Root element not found');
  }
  
  const root = createRoot(rootElement);
  console.log('Main.tsx: React root created');
  
  root.render(<App />);
  console.log('Main.tsx: App rendered');
} catch (error) {
  console.error('Main.tsx: Error rendering app:', error);
  document.body.innerHTML = `<div style="padding: 20px; color: red;">Error loading app: ${error}</div>`;
}
