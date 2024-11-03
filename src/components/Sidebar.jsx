import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = ({ isSidebarOpen = true }) => {
    return (
        <aside className={`bg-[#F0F8FF] border-r border-gray-200 sm:translate-x-0 w-48 fixed left-0 top-0 h-screen text-theme-color dark:text-white pt-20 z-40 dark:bg-gray-800 dark:border-gray-700 transition-transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} font-arima`}>
            <Link to="/">
                <p className='text-2xl px-3 py-1 font-semibold focus:ring focus:ring-violet-300 hover:bg-red-500 focus:bg-green-600'>Home</p>
            </Link>
            <Link to="/signup">
                <p className='text-2xl px-3 py-1 font-semibold focus:ring focus:ring-violet-300 hover:bg-red-500 focus:bg-green-600'>Sign Up</p>
            </Link>
            <Link to="/login">
                <p className='text-2xl px-3 py-1 font-semibold focus:ring focus:ring-violet-300 hover:bg-red-500 focus:bg-green-600'>Login</p>
            </Link>
        </aside>
    )
}

export default Sidebar