import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './store/queryClient';


// 브라우저 + DEV 환경에서만 MSW 실행
if (typeof window !== 'undefined' && import.meta.env.DEV) {
  import('./mocks/browser')
    .then(({ worker }) => worker.start())
    .catch(err => console.error('MSW worker failed to start', err));
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>
);
