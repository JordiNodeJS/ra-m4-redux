import React from 'react'
import ReactDOM from 'react-dom/client'
import 'modern-normalize/modern-normalize.css'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Home, Data, Profile } from './pages'
import { paths } from './constants'
import { store } from './store/store'

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

const state = store
// eslint-disable-next-line no-console
console.log('state', state)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
