import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { QueryProvider } from './providers/query.jsx'
import { ToastProvider } from './providers/toast.jsx'
import { router } from './providers/router'
import './index.css'
import { SessionProvider } from '@entities/user/model/sessionContext.jsx'
import { RootFallback } from './ui/RootFallback.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryProvider>
      <ToastProvider>
        <SessionProvider>
          <RouterProvider router={router} fallbackElement={<RootFallback/>}/>
        </SessionProvider>
      </ToastProvider>
    </QueryProvider>
  </StrictMode>,
)
