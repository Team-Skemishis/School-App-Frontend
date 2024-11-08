import React from 'react';
import DashboardLayout from './DashboardLayout';
import AdminSidebar from '../pages/admin/AdminSidebar';
import ProtectedRoute from '../auth/ProtectedRoute';

const AdminLayout = () => {
    return (
        <ProtectedRoute allowedRoles={['admin']}>
            <DashboardLayout Sidebar={AdminSidebar} />
        </ProtectedRoute>
    );
};

export default AdminLayout; 