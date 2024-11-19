import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { addStudent } from '../../services/students';
import { getAllClasses } from '../../services/classes';
import { Upload, Eye, EyeOff } from 'lucide-react';
import { getBaseURL } from '../../lib/utils';

const AddStudent = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [classes, setClasses] = useState([]);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [studentData, setStudentData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        gender: '',
        classes: '',
        role: 'student',
        avatar: null,
        redirectURL: ""
    });

    const validateForm = () => {
        if (!studentData.firstName.trim()) {
            setError('First name is required');
            return false;
        }
        if (!studentData.lastName.trim()) {
            setError('Last name is required');
            return false;
        }
        if (!studentData.email.trim()) {
            setError('Email is required');
            return false;
        }
        if (!studentData.email.includes('@')) {
            setError('Please enter a valid email address');
            return false;
        }
        if (!studentData.password.trim()) {
            setError('Password is required');
            return false;
        }
        if (studentData.password.length < 6) {
            setError('Password must be at least 6 characters long');
            return false;
        }
        if (!studentData.gender) {
            setError('Please select a gender');
            return false;
        }
        if (studentData.password !== studentData.confirmPassword) {
            setError('Passwords do not match');
            return false;
        }
        return true;
    };

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const response = await getAllClasses();
                setClasses(response.data);
            } catch (error) {
                console.error('Error fetching classes:', error);
                setError('Failed to fetch classes');
            }
        };

        fetchClasses();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Validate form before submission
        if (!validateForm()) {
            return;
        }

        try {
            setLoading(true);
            const payload = {
                ...studentData,
                avatar: selectedFile,
                redirectURL: getBaseURL()
            };
            console.log('Submitting student data:', payload);
            await addStudent(payload);
            navigate('/admin/users/students');
        } catch (error) {
            console.error('Error adding student:', error);
            setError(error.response?.data?.message || 'Failed to add student');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStudentData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Add file type validation
            const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg'];
            if (!allowedTypes.includes(file.type)) {
                setError('Please upload only image files (JPEG, PNG, GIF, JPG)');
                return;
            }
            if (file.size > 5 * 1024 * 1024) {
                setError('File size should not exceed 5MB');
                return;
            }
            setSelectedFile(file);
            setError(''); // Clear any previous errors
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Add New Student</h2>
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                    {error}
                </div>
            )}
            <form onSubmit={handleSubmit} className="max-w-lg">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            First Name
                        </label>
                        <input
                            type="text"
                            name="firstName"
                            value={studentData.firstName}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-800 dark:text-gray-300"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Last Name
                        </label>
                        <input
                            type="text"
                            name="lastName"
                            value={studentData.lastName}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-800 dark:text-gray-300"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={studentData.email}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-800 dark:text-gray-300"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Gender
                        </label>
                        <select
                            name="gender"
                            value={studentData.gender}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-800 dark:text-gray-300"
                            required
                        >
                            <option value="" disabled>Select gender...</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Assign Class
                        </label>
                        <select
                            name="classes"
                            value={studentData.classes}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-800 dark:text-gray-300"
                            required
                        >
                            <option value="" disabled>Select a class...</option>
                            {classes.map(classItem => (
                                <option key={classItem._id} value={classItem._id}>
                                    {classItem.classNumber} - {classItem.classCategory}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 ">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={studentData.password}
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
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 ">
                            Confirm Password
                        </label>
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                value={studentData.confirmPassword}
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
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Profile Picture
                        </label>
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                            <div className="space-y-1 text-center">
                                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                                <div className="flex text-sm text-gray-600">
                                    <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
                                        <span>Upload a file</span>
                                        <input
                                            type="file"
                                            name="avatar"
                                            className="sr-only"
                                            onChange={handleFileChange}
                                            accept="image/*"
                                        />
                                    </label>
                                    <p className="pl-1">or drag and drop</p>
                                </div>
                                <p className="text-xs text-gray-500">
                                    PNG, JPG, GIF up to 5MB
                                </p>
                            </div>
                        </div>
                        {selectedFile && (
                            <p className="mt-2 text-sm text-gray-500">
                                Selected file: {selectedFile.name}
                            </p>
                        )}
                    </div>
                </div>

                <div className="mt-6 flex gap-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors dark:bg-blue-800 dark:hover:bg-blue-900"
                    >
                        {loading ? 'Adding...' : 'Add Student'}
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate('/admin/users/students')}
                        className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 border-[1px] border-gray-300 dark:hover:bg-gray-700 transition-colors"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddStudent; 