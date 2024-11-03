import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import Footer from '../components/Footer'
import { Outlet } from 'react-router-dom'

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
            <Navbar
                darkMode={darkMode}
                toggleDarkMode={toggleDarkMode}
                toggleSidebar={toggleSidebar} />
            <div className='flex'>
                <Sidebar isSidebarOpen={isSidebarOpen} />
                <div >
                    <Outlet />
                    <Footer />
                </div>
            </div>

        </div>
    )
}

export default RootLayout