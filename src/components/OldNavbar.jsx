import React from 'react'
import { AlignLeft, UserRound, Moon, Sun, BellDot } from 'lucide-react'
import logo from '../assets/images/wink.gif'
import { Link } from 'react-router-dom'
6
// eslint-disable-next-line react/prop-types
const OldNavbar = ({ darkMode, toggleDarkMode, toggleSidebar }) => {
    return (
        <nav className='flex justify-between py-5 bg-[#F0F8FF]  px-2 sm:px-5 md:px-10  sticky top-0 z-50 w-full items-center border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700'>
            <div className='flex items-center md:gap-4 sm:gap-2 gap-1'>
                <button className='cursor-pointer sm:hidden inline-flex items-center hover:bg-gray-100 p-1 rounded-md focus:outline-none focus:ring-2  text-theme-color dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-600' onClick={toggleSidebar}>
                    <AlignLeft size={28} />
                </button>
                <Link to="/">
                    <div className='flex items-center md:gap-4 sm:gap-2 gap-1 cursor-pointer sm:hidden'>
                        <img src={logo} alt="logo-image" className='w-7' />
                        <h2 className='font-semibold text-2xl text-theme-color dark:text-white font-righteousStatic whitespace-nowrap'>EduBridge</h2>
                    </div>
                </Link>
            </div>
            <div className='flex gap-1 md:gap-4'>
                <div>
                    <input type="search" name="search" id="search"
                        placeholder='Search'
                        className='w-24 sm:w-full bg-transparent border-[0.1px] hover:border-theme-color rounded-md px-2 py-1 border-gray-300  focus:outline-none focus:ring-2 focus:ring-blue-600 ' />
                </div>
                <button className='cursor-pointer w-10 h-10 text-theme-color dark:text-white bg-[#F0FFFF]  dark:bg-slate-900 hover:bg-gray-100 focus:outline-none p-2 dark:hover:bg-gray-700 rounded-full' onClick={toggleDarkMode}>{darkMode ? <Sun /> : <Moon />}</button>
                <div className='cursor-pointer w-10 h-10 text-theme-color dark:text-white hover:bg-gray-100 focus:outline-none p-2 dark:hover:bg-gray-700 rounded-full'>
                    <BellDot className='cursor-pointer text-theme-color dark:text-white' />
                </div>
                <div className='p-1 border-[0.1px] border-theme-color dark:border-white rounded-full'>

                    <UserRound className='cursor-pointer text-theme-color dark:text-white' />
                </div>
            </div>
        </nav>
    )
}

export default OldNavbar