import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { QueryProvider } from './providers/query.jsx'
import { ModalProvider } from './providers/modal.jsx'
import { router } from './providers/router'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryProvider>
      <ModalProvider>
        <RouterProvider router={router}/>
      </ModalProvider>
    </QueryProvider>
  </StrictMode>,
)
