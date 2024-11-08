import React from 'react';
import DashboardLayout from './DashboardLayout';
import TeacherSidebar from '../pages/teacher/TeacherSidebar';
import ProtectedRoute from '../auth/ProtectedRoute';

const TeacherLayout = () => {
  return (
    <ProtectedRoute allowedRoles={['teacher']}>
      <DashboardLayout Sidebar={TeacherSidebar} />
    </ProtectedRoute>
  );
};

export default TeacherLayout; 