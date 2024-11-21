import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { logout } from '../../services/config';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import logo from '../../assets/images/eSukuu-colored.jpg'


const BaseSidebar = ({ navItems, role }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="flex flex-col w-64 bg-white dark:bg-gray-800 border-r dark:border-gray-700 h-screen ">
            {/* Header */}
            {/* <div className="flex items-center justify-center h-16 bg-[#0E345A] dark:bg-gray-900">
                <span className="text-white text-lg font-semibold">
                    {role.toUpperCase()} Dashboard
                </span>
            </div> */}
            <Link to="/" className='cursor-pointer py-1 text-center justify-center flex  bg-[#0E345A]'>
                <img src={logo} alt="eSukuuLogo" className=" w-44" />
            </Link>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto">
                <ul className="p-4">
                    {navItems.map((item) => (
                        <li key={item.path}>
                            <Link
                                to={item.path}
                                className={`flex items-center p-3 rounded-lg transition-colors
                                    ${location.pathname === item.path
                                        ? 'bg-[#0E345A] text-white'
                                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                    }`}
                            >
                                {item.icon}
                                <span className="ml-3">{item.name}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Logout Button */}
            <div className="p-4 border-t dark:border-gray-700">
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center p-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                >
                    <LogOut />
                    <span className="ml-2">Logout</span>
                </button>
            </div>
        </div>
    );
};

BaseSidebar.propTypes = {
    navItems: PropTypes.arrayOf(
        PropTypes.shape({
            path: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            icon: PropTypes.element.isRequired,
        })
    ).isRequired,
    role: PropTypes.string.isRequired,
};

export default BaseSidebar; 