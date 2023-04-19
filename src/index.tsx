import * as ReactDOMClient from 'react-dom/client'
import React from 'react'
import { RouterProvider } from 'react-router-dom'
// import App from './App'
import './index.css'
import reportWebVitals from './reportWebVitals'
import { sendToVercelAnalytics } from './vitals'
import router from './routes/router'

const container = document.getElementById('root') as HTMLElement

const root = ReactDOMClient.createRoot(container)

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
    {/* <App /> */}
    {/* </RouterProvider> */}
  </React.StrictMode>,
)

reportWebVitals(sendToVercelAnalytics)
