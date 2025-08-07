import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import BookListPage from './pages/BookListPage.jsx'
import App from './App.jsx'
import Layout from './layout/Layout.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8080';
const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <Layout> */}
     <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
    {/* </Layout> */}
  </StrictMode>,
)
