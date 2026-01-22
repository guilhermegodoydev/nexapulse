import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { QueryProvider } from './providers/query.jsx'
import { router } from './providers/router'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryProvider>
      <RouterProvider router={router}/>
    </QueryProvider>
  </StrictMode>,
)
