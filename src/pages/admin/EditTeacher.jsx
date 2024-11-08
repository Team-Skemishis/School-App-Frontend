import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getOneTeacher, editTeacher } from '../../services/teachers';

const EditTeacher = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [teacherData, setTeacherData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        gender: '',
        image: ''
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
                    gender: teacher.gender,
                    image: teacher.image
                });
            } catch (error) {
                console.error('Error fetching teacher details:', error);
                setError('Failed to fetch teacher details');
            } finally {
                setLoading(false);
            }
        };

        fetchTeacher();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            setLoading(true);
            const updateData = {
                firstName: teacherData.firstName,
                lastName: teacherData.lastName,
                email: teacherData.email,
                gender: teacherData.gender,
                image: teacherData.image
            };
            await editTeacher(id, updateData);
            navigate('/admin/users/teachers');
        } catch (error) {
            console.error('Error updating teacher:', error);
            setError(error.response?.data?.message || 'Failed to update teacher');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image') {
            setTeacherData(prev => ({
                ...prev,
                [name]: files[0]
            }));
        } else {
            setTeacherData(prev => ({
                ...prev,
                [name]: value
            }));
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
                        className="px-5 py-2 bg-gray-100 text-gray-700 rounded-lg border-[1px] border-gray-300 hover:bg-gray-200 transition-colors"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditTeacher; 