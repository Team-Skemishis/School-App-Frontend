import React from 'react';
import { useNavigate } from 'react-router-dom'
import logo from '../assets/images/wink.gif';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Bell, Calendar, ChevronDown, FileText, Home, LogOut, MessageCircle, PieChart, Settings, Users, Users2 } from 'lucide-react';
import { logout } from '../services/config';

// Define sections with titles and items
const sections = [
    {
        title: 'Users',
        items: [
            { icon: Home, label: 'Dashboard', path: '/system' },
            { icon: Users2, label: 'Teachers', path: 'teachers' },
            { icon: Users, label: 'Students', path: 'students' },
            { icon: Users, label: 'Parents', path: 'parents' },
        ]
    },
    {
        title: 'Academics',
        items: [
            { icon: Calendar, label: 'Subjects', path: 'subjects' },
            { icon: FileText, label: 'Classes', path: 'classes' },
            { icon: FileText, label: 'Lessons', path: 'lessons' },
            { icon: FileText, label: 'Exams', path: 'exams' },
            { icon: FileText, label: 'Assignments', path: 'assignments' },
            { icon: PieChart, label: 'Results', path: 'results' },
        ]
    },
    {
        title: 'Events',
        items: [
            { icon: Calendar, label: 'Attendance', path: 'attendance' },
            { icon: Calendar, label: 'Events', path: 'events' },
        ]
    },
    {
        title: 'Communication',
        items: [
            { icon: MessageCircle, label: 'Messages', path: 'messages' },
            { icon: Bell, label: 'Announcements', path: 'announcements' },
        ]
    }
];

const Sidebar = ({ isSidebarOpen = true }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };
    return (
        <aside className={`bg-[#F0F8FF] border-r border-gray-200 sm:translate-x-0 w-48 fixed top-0 left-0 text-nowrap h-screen text-theme-color dark:text-white dark:bg-gray-800 dark:border-gray-700 transition-transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} overflow-scroll`}>
            <Link to="/">
                <div className='flex justify-center items-center gap-3 cursor-pointer py-8 w-full sticky top-0 '>
                    <img src={logo} alt="logo-image" className='w-7' />
                    <h2 className='font-semibold text-2xl text-theme-color dark:text-white font-righteousStatic whitespace-nowrap'>EduBridge</h2>
                </div>
            </Link>
            <nav>
                {sections.map((section, sectionIndex) => (
                    <div key={sectionIndex}>
                        {/* Section title */}
                        <h3 className="px-4 text-xs font-semibold text-theme-color dark:text-gray-400 uppercase ">
                            {section.title}
                        </h3>
                        {section.items.map((item) => (
                            <Link key={item.path} to={item.path} className={`flex items-center gap-3 px-4 py-2 text-base 
                                text-gray-700 dark:text-gray-300 
                                hover:bg-[#d1e6f5] dark:hover:bg-[#4A5568]
                                active:bg-[#c7dbed] dark:active:bg-[#3B4755]
                                focus:bg-[#d1e6f5] dark:focus:bg-[#4A5568]
                                transition-colors duration-200`}>
                                <item.icon className="h-4 w-4" />
                                <span>{item.label}</span>
                            </Link>
                        ))}
                        {/* Divider between sections */}
                        {sectionIndex < sections.length - 1 && <hr className="border-t border-gray-300 dark:border-gray-600 my-2" />}
                    </div>
                ))}
                {/* Settings and Logout */}
                <hr className="border-t border-gray-300 dark:border-gray-600 my-2" />
                <Link to="/settings" className="flex items-center gap-3 px-4 py-2 text-base text-gray-700 dark:text-gray-300 hover:bg-[#d1e6f5] dark:hover:bg-[#4A5568] active:bg-[#c7dbed] dark:active:bg-[#3B4755] focus:bg-[#d1e6f5] dark:focus:bg-[#4A5568] transition-colors duration-200">
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                </Link>
                <Link className='flex items-center gap-3 px-4 py-2 text-base text-gray-700 dark:text-gray-300 hover:bg-[#d1e6f5] dark:hover:bg-[#4A5568] active:bg-[#c7dbed] dark:active:bg-[#3B4755] focus:bg-[#d1e6f5] dark:focus:bg-[#4A5568] transition-colors duration-200' onClick={handleLogout}>
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                </Link>
            </nav>
        </aside>
    );
};

Sidebar.propTypes = {
    isSidebarOpen: PropTypes.bool,
};

export default Sidebar;
