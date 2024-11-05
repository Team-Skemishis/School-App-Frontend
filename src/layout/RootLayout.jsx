/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import Footer from '../components/Footer'
import { Outlet } from 'react-router-dom'

// eslint-disable-next-line no-unused-vars
const RootLayout = ({ children }) => {
    const [darkMode, setDarkMode] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(prevState => !prevState);
    }

    return (
        <div className={`${darkMode && "dark"}`}>
            <Sidebar isSidebarOpen={isSidebarOpen} />
            <div className='flex-1 sm:ml-48' >
                <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} toggleSidebar={toggleSidebar} />
                <Outlet />
                <Footer />
            </div>

        </div>
    )
}

export default RootLayout