import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { QueryProvider } from './providers/query.jsx'
import { ToastProvider } from './providers/toast.jsx'
import { router } from './providers/router'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryProvider>
      <ToastProvider>
        <RouterProvider router={router}/>
      </ToastProvider>
    </QueryProvider>
  </StrictMode>,
)
