import React from 'react';
import DashboardLayout from './DashboardLayout';
import StudentSidebar from '../pages/student/StudentSidebar';
import ProtectedRoute from '../auth/ProtectedRoute';

const StudentLayout = () => {
  return (
    <ProtectedRoute allowedRoles={['student']}>
      <DashboardLayout Sidebar={StudentSidebar} />
    </ProtectedRoute>
  );
};

export default StudentLayout; 