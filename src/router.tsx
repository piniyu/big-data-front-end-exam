import { createBrowserRouter } from 'react-router-dom'
import App from './App'

const routerObjectArr = [
  {
    path: '/',
    element: <App />,
    // errorElement: <ErrorPage />,
    children: [],
  },
]

const router = createBrowserRouter(routerObjectArr, {
  basename:
    process.env.NODE_ENV === 'production'
      ? 'big-data-front-end-exam'
      : undefined,
})
export default router
