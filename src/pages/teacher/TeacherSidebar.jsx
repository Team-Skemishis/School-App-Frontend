import React from 'react';
import BaseSidebar from '../../components/shared/BaseSidebar';
import {
    LayoutDashboard,
    UserCircle,
    Users,
    Calendar,
    BookOpen,
    Bell,
    Book,
    CheckSquare
} from 'lucide-react';

const TeacherSidebar = () => {
    const navItems = [
        {
            path: '/teacher/dashboard',
            name: 'Dashboard',
            icon: <LayoutDashboard className="h-5 w-5" />,
        },
        {
            path: '/teacher/students',
            name: 'My Students',
            icon: <Users className="h-5 w-5" />,
        },
        {
            path: '/teacher/schedule',
            name: 'Schedule',
            icon: <Calendar className="h-5 w-5" />,
        },
        {
            path: '/teacher/classes',
            name: 'Classes',
            icon: <BookOpen className="h-5 w-5" />,
        },
        {
            path: '/teacher/classs',
            name: 'Classes',
            icon: <BookOpen className="h-5 w-5" />,
        },
        {
            path: '/teacher/assignments',
            name: 'Assignments',
            icon: <Book className="h-5 w-5" />,
        },
        {
            path: '/teacher/students/attendance/:id',
            name: 'Attendance',
            icon: <CheckSquare className="h-5 w-5" />,
        },
        {
            path: '/teacher/announcements',
            name: 'Announcements',
            icon: <Bell className="h-5 w-5" />,
        },
        {
            path: '/teacher/profile',
            name: 'Profile',
            icon: <UserCircle className="h-5 w-5" />,
        },
    ];

    return <BaseSidebar navItems={navItems} role="teacher" />;
};

export default TeacherSidebar;