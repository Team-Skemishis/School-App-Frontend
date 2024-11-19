import React from 'react';
import PropTypes from 'prop-types';
import { AlignLeft, Bell, Sun, Moon, ChevronDown } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useUser } from '../context/UserContext';
import defaultAvatar from '../assets/images/wink.gif';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ toggleSidebar }) => {
    const { darkMode, toggleDarkMode } = useTheme();
    const { user } = useUser();
    const navigate = useNavigate();

    // Function to get correct shareable link based on role
    const getShareableLink = (role) => {
        switch (role) {
            case 'teacher':
                return '484';
            case 'student':
                return '485';
            case 'admin':
                return '484'; // Assuming admin uses same as teacher
            default:
                return '484';
        }
    };

    // Function to get correct profile path based on role
    const getProfilePath = (role) => {
        switch (role) {
            case 'admin':
                return '/admin/profile';
            case 'teacher':
                return '/teacher/profile';
            case 'student':
                return '/student/profile';
            default:
                return '/';
        }
    };

    const getAnnouncementPath = (role) => {
        switch (role) {
            case 'admin':
                return '/admin/announcements';
            case 'teacher':
                return '/teacher/announcements';
            case 'student':
                return '/student/announcements';
            default:
                return '/';
        }
    }

    // Handle profile click
    const handleProfileClick = () => {
        if (user && user.role) {
            navigate(getProfilePath(user.role));
        }
    };

    const handleAnnouncementClick = () => {
        if (user && user.role) {
            navigate(getAnnouncementPath(user.role));
        }
    }

    return (
        <nav className="flex justify-between items-center py-2 px-6 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
            {/* Left side - Menu toggle */}
            <button
                onClick={toggleSidebar}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
                <AlignLeft className="h-6 w-6 text-gray-500 dark:text-gray-400" />
            </button>

            {/* Right side - User info, notifications, and theme toggle */}
            <div className="flex items-center space-x-2">
                {/* Theme toggle */}
                <button
                    onClick={toggleDarkMode}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                    {darkMode ? (
                        <Sun className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                    ) : (
                        <Moon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                    )}
                </button>

                {/* Notifications */}
                <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 relative" onClick={handleAnnouncementClick}>
                    <Bell className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                    {/* Notification badge */}
                    <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
                </button>

                {/* User info */}
                <button
                    className="flex items-center space-x-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg py-1 px-2"
                    onClick={handleProfileClick}
                >
                    <div className="flex-shrink-0">
                        <img
                            src={user?.avatar
                                ? `https://savefiles.org/${user.avatar}?shareable_link=${getShareableLink(user.role)}`
                                : defaultAvatar}
                            alt="User avatar"
                            className="h-10 w-10 rounded-full object-cover border-2 p-[1px] border-gray-200 dark:border-gray-600"
                        />
                    </div>
                    <div className="hidden md:flex flex-col">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {user ? `${user.firstName} ${user.lastName}` : 'Loading...'}
                        </span>
                        <div className='flex items-center gap-2'>
                            <span className="text-xs self-center text-gray-500 dark:text-gray-400">
                                {user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1) || 'User'}
                            </span>
                            <ChevronDown size={16} className='self-center text-gray-500 dark:text-gray-400' />
                        </div>
                    </div>
                </button>
            </div>
        </nav>
    );
};

Navbar.propTypes = {
    toggleSidebar: PropTypes.func.isRequired
};

export default Navbar;