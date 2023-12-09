import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'




import { Toaster } from 'react-hot-toast'
import { HelmetProvider } from 'react-helmet-async'
import AuthProvider from './providers/AuthProvider'
import {  QueryClient, QueryClientProvider } from '@tanstack/react-query'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { router } from './routes/Routes'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <HelmetProvider>

    <AuthProvider>
     <QueryClientProvider client={queryClient}>
     <Toaster />
      <RouterProvider router={router} />

     </QueryClientProvider>
    </AuthProvider>
  </HelmetProvider>
)
