import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getOneTeacher, editTeacher } from '../../services/teachers';
import { Upload, FileText } from 'lucide-react';

const EditTeacher = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [currentAvatar, setCurrentAvatar] = useState('');
    const [teacherData, setTeacherData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        gender: '',
        role: 'teacher', // Set default role
    });

    useEffect(() => {
        const fetchTeacher = async () => {
            try {
                const response = await getOneTeacher(id);
                const teacher = response.data;
                setTeacherData({
                    firstName: teacher.firstName,
                    lastName: teacher.lastName,
                    email: teacher.email,
                    gender: teacher.gender || '',
                    role: teacher.role
                });

                if (teacher.avatar) {
                    setCurrentAvatar(teacher.avatar);
                }

            } catch (error) {
                console.error('Error fetching teacher details:', error);
                setError('Failed to fetch teacher details');
            } finally {
                setLoading(false);
            }
        };

        fetchTeacher();
    }, [id]);

    const validateForm = () => {
        if (!teacherData.firstName.trim()) {
            setError('First name is required');
            return false;
        }
        if (!teacherData.lastName.trim()) {
            setError('Last name is required');
            return false;
        }
        if (!teacherData.email.trim()) {
            setError('Email is required');
            return false;
        }
        if (!teacherData.email.includes('@')) {
            setError('Please enter a valid email address');
            return false;
        }
        if (!teacherData.gender) {
            setError('Please select a gender');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Validate form before submission
        if (!validateForm()) {
            return;
        }

        try {
            setLoading(true);
            const formData = new FormData();
            Object.keys(teacherData).forEach(key => {
                formData.append(key, teacherData[key]);
            });
            if (selectedFile) {
                formData.append('avatar', selectedFile);
            }
            await editTeacher(id, formData);
            navigate('/admin/users/teachers');
        } catch (error) {
            console.error('Error updating teacher:', error);
            setError(error.response?.data?.message || 'Failed to update teacher');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTeacherData(prev => ({
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

    if (loading) return <div>Loading...</div>;

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Edit Teacher</h2>
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                    {error}
                </div>
            )}
            <form onSubmit={handleSubmit} className="max-w-lg">
                <div className="space-y-2">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            First Name
                        </label>
                        <input
                            type="text"
                            name="firstName"
                            value={teacherData.firstName}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
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
                            value={teacherData.lastName}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
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
                            value={teacherData.email}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                            required disabled
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Gender
                        </label>
                        <select
                            name="gender"
                            value={teacherData.gender}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                            required
                        >
                            <option value="">Select gender...</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Profile Picture
                        </label>
                        {currentAvatar && !selectedFile && (
                            <div className="flex items-center gap-2 mb-2 p-2 bg-gray-50 dark:bg-gray-700 rounded">
                                <FileText className="w-5 h-5 text-blue-500" />
                                <span className="text-sm text-gray-600 dark:text-gray-300">
                                    Current avatar: {currentAvatar}
                                </span>
                            </div>
                        )}
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                            <div className="space-y-1 text-center">
                                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                                <div className="flex text-sm text-gray-600">
                                    <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
                                        <span>Upload a new image</span>
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
                                New file selected: {selectedFile.name}
                            </p>
                        )}
                    </div>
                </div>
                <div className="mt-6 flex gap-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        {loading ? 'Saving...' : 'Save Changes'}
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate('/admin/users/teachers')}
                        className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 border-[1px] border-gray-300 dark:hover:bg-gray-700 transition-colors"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditTeacher; 