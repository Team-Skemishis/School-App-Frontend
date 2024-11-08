import "./App.css";

import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './layouts/AdminLayout';
import TeacherLayout from './layouts/TeacherLayout';
import StudentLayout from './layouts/StudentLayout';
import Login from './auth/Login';
import AdminRegister from './auth/AdminRegister';
import LandingPage from './pages/landingPage/LandingPage';

// Admin Components
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProfile from './pages/admin/AdminProfile';
import GetUsersComponent from './pages/admin/GetUsersComponent';
import UserDetails from './pages/admin/UserDetails';
import EditUser from './pages/admin/EditUser';
import GetTeachers from './pages/admin/GetTeachers';
import EditTeacher from './pages/admin/EditTeacher';
import AddTeacher from './pages/admin/AddTeacher';
import GetStudents from './pages/admin/GetStudents';
import AddStudent from './pages/admin/AddStudent';
import EditStudent from './pages/admin/EditStudent';
import StudentDetails from './pages/admin/StudentDetails';
import ManageClasses from './pages/admin/ManageClasses';
import AddClass from './pages/admin/AddClass';
import ClassDetails from './pages/admin/ClassDetails';
import EditClass from './pages/admin/EditClass';
import Settings from './pages/admin/Settings';


// Teacher Components
import TeacherDashboard from './pages/teacher/TeacherDashboard';
import TeacherProfile from './pages/teacher/TeacherProfile';
import TeacherStudents from './pages/teacher/TeacherStudents';
import TeacherClasses from './pages/teacher/TeacherClasses';
import TeacherSchedule from './pages/teacher/TeacherSchedule';

// Student Components
import StudentDashboard from './pages/student/StudentDashboard';
import StudentProfile from './pages/student/StudentProfile';
import StudentCourses from './pages/student/StudentCourses';
import StudentSchedule from './pages/student/StudentSchedule';
import StudentGrades from './pages/student/StudentGrades';
import TeacherDetails from "./pages/admin/TeacherDetails";

const App = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<AdminRegister />} />
      <Route path="/admin-register" element={<AdminRegister />} />

      {/* Admin routes */}
      <Route path="/admin/*" element={<AdminLayout />}>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="settings" element={<Settings />} />
        <Route path="profile" element={<AdminProfile />} />
        <Route path="users" element={<GetUsersComponent />} />
        <Route path="users/:id" element={<UserDetails />} />
        <Route path="edit-user/:id" element={<EditUser />} />
        <Route path="users/teachers" element={<GetTeachers />} />
        <Route path="users/teachers/:id" element={<TeacherDetails />} />
        <Route path="users/teachers/edit-teacher/:id" element={<EditTeacher />} />
        <Route path="users/teachers/add" element={<AddTeacher />} />
        <Route path="users/students" element={<GetStudents />} />
        <Route path="users/students/add" element={<AddStudent />} />
        <Route path="users/students/:id" element={<StudentDetails />} />
        <Route path="students/edit/:id" element={<EditStudent />} />
        <Route path="classes" element={<ManageClasses />} />
        <Route path="classes/add" element={<AddClass />} />
        <Route path="classes/:id" element={<ClassDetails />} />
        <Route path="classes/edit/:id" element={<EditClass />} />
      </Route>

      {/* Teacher routes */}
      <Route path="/teacher/*" element={<TeacherLayout />}>
        <Route path="dashboard" element={<TeacherDashboard />} />
        <Route path="students" element={<TeacherStudents />} />
        <Route path="classes" element={<TeacherClasses />} />
        <Route path="schedule" element={<TeacherSchedule />} />
        <Route path="profile" element={<TeacherProfile />} />
      </Route>

      {/* Student routes */}
      <Route path="/student/*" element={<StudentLayout />}>
        <Route path="dashboard" element={<StudentDashboard />} />
        <Route path="courses" element={<StudentCourses />} />
        <Route path="schedule" element={<StudentSchedule />} />
        <Route path="grades" element={<StudentGrades />} />
        <Route path="profile" element={<StudentProfile />} />
      </Route>

      {/* Catch all route - 404 */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
