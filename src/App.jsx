import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import RootLayout from './layout/RootLayout'
import Home from './pages/Home'
import Login from './auth/Login'
import ProtectedRoute from './auth/ProtectedRoute'
import LandingPage from './pages/landingPage/LandingPage'
import AdminRegister from './auth/AdminRegister'
import AdminDashboard from './pages/admin/AdminDashboard'
import TeacherDashboard from './pages/teacher/TeacherDashboard'
import SidebarComponent from './components/Sidebar'
import StudentDashboard from './pages/student/StudentDashboard'
import UserDetails from './pages/admin/UserDetails'
function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage />
    },
    {
      path: "/register",
      element: <AdminRegister />
    },
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/users/:id",
      element: <UserDetails />
    },
    {
      path: "/system",
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          )
        },
        {
          path: "admin",
          element: (
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          )
        },
        {
          path: "teachers",
          element: (
            <ProtectedRoute>
              <TeacherDashboard />
            </ProtectedRoute>
          )
        },
        {
          path: "students",
          element: (
            <ProtectedRoute>
              <StudentDashboard />
            </ProtectedRoute>
          )
        },
        // {
        //   path: "parents",
        //   element: (
        //     <ProtectedRoute>
        //       <TeacherDashboard />
        //     </ProtectedRoute>
        //   )
        // },
        // {
        //   path: "assignments",
        //   element: (
        //     <ProtectedRoute>
        //       <TeacherDashboard />
        //     </ProtectedRoute>
        //   )
        // },
      ]
    }
  ])

  return (
    <RouterProvider router={router} />
  )
}

export default App
