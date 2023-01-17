import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/store'
import { Home, Data, Profile } from './pages'
import 'modern-normalize/modern-normalize.css'
import { paths } from './constants'

const { home, data, profile } = paths
const router = createBrowserRouter([
  {
    path: home,
    element: <Home />,
  },
  {
    path: data,
    element: <Data />,
  },
  {
    path: profile,
    element: <Profile />,
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
