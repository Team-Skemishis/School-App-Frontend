import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { userSignUp } from '../services/auth';
import { Eye, EyeOff } from 'lucide-react';
import logo from '../assets/images/eSukuu.png'
import illustration from '../assets/images/SignUpIllustration.png'


const AdminRegister = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        schoolName: '',
        password: '',
        confirmPassword: '',
        role: 'admin'
    });

    const validateForm = () => {
        if (!formData.firstName.trim()) {
            setError('First name is required');
            return false;
        }
        if (!formData.lastName.trim()) {
            setError('Last name is required');
            return false;
        }
        if (!formData.email.trim()) {
            setError('Email is required');
            return false;
        }
        if (!formData.email.includes('@')) {
            setError('Please enter a valid email address');
            return false;
        }
        if (!formData.password.trim()) {
            setError('Password is required');
            return false;
        }
        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters long');
            return false;
        }
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return false;
        }
        return true;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!validateForm()) {
            return;
        }

        try {
            setLoading(true);
            console.log('Form data before submission:', formData);
            const response = await userSignUp(formData);
            console.log('Registration response:', response);
            navigate('/login');
        } catch (error) {
            console.error('Registration error:', error);
            setError(error.response?.data?.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="signup flex justify-center items-center h-screen bg-[#F0F8FF] signupPage">
            <form onSubmit={handleSubmit} className="backdrop-blur-sm text-black dark:text-gray-200 w-full h-full items-center justify-center flex flex-col">
                <div className='items-center justify-center flex flex-col bg-white rounded-2xl'>
                    <Link to="/" className='cursor-pointer pt-5'>
                        <img src={logo} alt="eSukuuLogo" className=" w-40" />
                    </Link>
                    <section className='flex shadow-xl '>
                        <div className='w-[450px] space-y-3 items-center flex flex-col p-6 rounded-2xl'>
                            <img src={illustration} alt="eSukuu Logo" className=" w-52" />
                            <h2 className='text-4xl text-gray-800 font-semibold font-dancingScript text-center'>Welcome to eSukuu... </h2>
                            <h2 className='text-2xl text-gray-800  font-righteousStatic text-center'>&quot;Empower Your School Management Today!&quot;</h2>
                            <p className='text-right'>Take the first step toward seamless school management. </p>
                            <p>Create your admin account now and unlock a smarter way to run your institution</p>
                        </div>
                        <div className='space-y-4 dark:bg-gray-800 p-6 rounded-2xl w-full max-w-md'>
                            <p className="text-2xl font-semibold text-[#0E345A] dark:text-gray-200 relative pl-10 ">
                                Sign Up as Admin
                                <span className="mt-[4px] absolute left-[4px] top-[5px] w-4 h-4 bg-[#0E345A] dark:bg-gray-200 rounded-full"></span>
                                <span className="mt-[5px] absolute left-0 top-0 w-6 h-6 animate-pulse bg-[#0E345A] dark:bg-gray-200 rounded-full opacity-10"></span>
                            </p>

                            {error && (
                                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                                    {error}
                                </div>
                            )}

                            <div className='flex space-x-4'>
                                <div>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        placeholder="Enter your first name..."
                                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        required
                                    />
                                </div>

                                <div>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        placeholder="Enter your last name..."
                                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter your email..."
                                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    required
                                />
                            </div>
                            <div>
                                <input
                                    type="text"
                                    name="schoolName"
                                    value={formData.schoolName}
                                    onChange={handleChange}
                                    placeholder="Enter the name of your school..."
                                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    required
                                />
                            </div>

                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Enter a secure password..."
                                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:border-gray-600 dark:text-white pr-10"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-5 w-5" />
                                    ) : (
                                        <Eye className="h-5 w-5" />
                                    )}
                                </button>
                            </div>

                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="Confirm Password..."
                                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:border-gray-600 dark:text-white pr-10"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                                >
                                    {showConfirmPassword ? (
                                        <EyeOff className="h-5 w-5" />
                                    ) : (
                                        <Eye className="h-5 w-5" />
                                    )}
                                </button>
                            </div>

                            <button
                                type="submit"
                                className={`w-full bg-[#0E345A] text-white py-3 rounded-lg mb-5 transition-colors ${loading ? "cursor-wait" : "hover:bg-[#0e345ade] cursor-pointer"}`}
                                disabled={loading}
                            >
                                {loading ? "Creating Account..." : "Register"}
                            </button>

                            <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-5">
                                Already have an account?{" "}
                                <Link
                                    className="text-blue-600 font-semibold hover:underline dark:text-blue-400"
                                    to="/login"
                                >
                                    Login
                                </Link>
                            </p>
                        </div>
                    </section>
                </div>
            </form>
        </div>
    );
};

export default AdminRegister; 