import React from 'react';
import BaseSidebar from '../../components/shared/BaseSidebar';
import {
    LayoutDashboard,
    UserCircle,
    BookOpen,
    Calendar,
    Book,
    Bell,
    GraduationCap
} from 'lucide-react';

const StudentSidebar = () => {
    const navItems = [
        {
            path: '/student/dashboard',
            name: 'Dashboard',
            icon: <LayoutDashboard className="h-5 w-5" />,
        },
        {
            path: '/student/courses',
            name: 'My Courses',
            icon: <BookOpen className="h-5 w-5" />,
        },
        {
            path: '/student/schedule',
            name: 'Schedule',
            icon: <Calendar className="h-5 w-5" />,
        },
        {
            path: '/student/grades',
            name: 'Grades',
            icon: <GraduationCap className="h-5 w-5" />,
        },
        {
            path: '/student/assignments',
            name: 'Assignments',
            icon: <Book className="h-5 w-5" />,
        },
        {
            path: '/student/announcements',
            name: 'Announcements',
            icon: <Bell className="h-5 w-5" />,
        },
        {
            path: '/student/profile',
            name: 'Profile',
            icon: <UserCircle className="h-5 w-5" />,
        },
    ];

    return <BaseSidebar navItems={navItems} role="student" />;
};

export default StudentSidebar;