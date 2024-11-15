import React from 'react';
import BaseSidebar from '../../components/shared/BaseSidebar';
import {
    LayoutDashboard,
    UserCircle,
    Users,
    Settings,
    School,
    Bell,
    User,
    UserRound,
    GraduationCap
} from 'lucide-react';

const AdminSidebar = () => {
    const navItems = [
        {
            path: '/admin/dashboard',
            name: 'Dashboard',
            icon: <LayoutDashboard className="h-5 w-5" />,
        },
        {
            path: '/admin/users',
            name: 'Manage Users',
            icon: <Users className="h-5 w-5" />,
        },
        {
            path: '/admin/users/teachers',
            name: 'Manage Teachers',
            icon: <User className="h-5 w-5" />,
        },
        {
            path: '/admin/users/students',
            name: 'Manage Students',
            icon: <GraduationCap className="h-5 w-5" />,
        },
        {
            path: '/admin/parents',
            name: 'Manage Parents',
            icon: <UserRound className="h-5 w-5" />,
        },
        {
            path: '/admin/classes',
            name: 'Manage Classes',
            icon: <School className="h-5 w-5" />,
        },
        {
            path: '/admin/announcements',
            name: 'Announcements',
            icon: <Bell className="h-5 w-5" />,
        },
        {
            path: '/admin/settings',
            name: 'Settings',
            icon: <Settings className="h-5 w-5" />,
        },
        {
            path: '/admin/profile',
            name: 'Profile',
            icon: <UserCircle className="h-5 w-5" />,
        },
    ];

    return <BaseSidebar navItems={navItems} role="admin" />;
};

export default AdminSidebar;