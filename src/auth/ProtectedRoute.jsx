import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { isAuthenticated, getUserRole } from '../services/config'

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children, allowedRoles }) => {
    const location = useLocation();
    const isAuth = isAuthenticated();
    const userRole = getUserRole();

    if (!isAuth) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // eslint-disable-next-line react/prop-types
    if (allowedRoles && !allowedRoles.includes(userRole)) {
        // Redirect to appropriate dashboard based on role
        const dashboardRoutes = {
            admin: '/admin/dashboard',
            teacher: '/teacher/dashboard',
            student: '/student/dashboard'
        };
        return <Navigate to={dashboardRoutes[userRole] || '/'} replace />;
    }

    return children;
}

export default ProtectedRoute;