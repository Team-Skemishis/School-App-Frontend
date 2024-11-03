import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import RootLayout from './layout/RootLayout'
import Home from './pages/Home'
import SignUp from './auth/SignUp'
import Login from './auth/Login'
import ProtectedRoute from './auth/ProtectedRoute'

function App() {

  const router = createBrowserRouter([
    // {
    //   path: "/",
    //   element: <Home />
    // },
    // {
    //   path: "/sidebar",
    //   element: <Sidebar />
    // },
    // {
    //   path: "/navbar",
    //   element: <Navbar />
    // },
    {
      path: "/",
      element: <RootLayout />,
      children: [ // takes an array of objects...
        {
          index: true,
          // path: "home",
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          )
        },
        {
          path: "signup",
          element: <SignUp />
        },
        {
          path: "login",
          element: <Login />
        },
      ]
    }
  ])

  return (
    <RouterProvider router={router} />
  )
}

export default App
