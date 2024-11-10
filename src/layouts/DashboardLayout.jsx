import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';
import Navbar from '../components/Navbar';

const DashboardLayout = ({ Sidebar }) => {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
            {/* Sidebar */}
            <div className={`${sidebarOpen ? 'w-64' : 'w-14 overflow-hidden -ml-4'} transition-all duration-300`}>
                <Sidebar />
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <Navbar toggleSidebar={toggleSidebar} />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900">
                    <div className="container mx-auto px-6 py-8">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

DashboardLayout.propTypes = {
    Sidebar: PropTypes.elementType.isRequired
};

export default DashboardLayout; 