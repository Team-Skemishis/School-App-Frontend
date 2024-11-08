import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getOneClass, updateClass } from '../../services/classes';

const EditClass = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [classData, setClassData] = useState({
        classNumber: '',
        classCategory: '',
    });

    const classCategories = [
        'Lower primary',
        'Upper primary',
        'Junior high',
        'Senior high'
    ];

    const classNumbers = {
        'Lower primary': ['Primary 1', 'Primary 2', 'Primary 3'],
        'Upper primary': ['Primary 4', 'Primary 5', 'Primary 6'],
        'Junior high': ['JHS 1', 'JHS 2', 'JHS 3'],
        'Senior high': ['SHS 1', 'SHS 2', 'SHS 3']
    };

    useEffect(() => {
        const fetchClass = async () => {
            try {
                const response = await getOneClass(id);
                const classDetails = response.data;
                setClassData({
                    classNumber: classDetails.classNumber,
                    classCategory: classDetails.classCategory,
                });
            } catch (error) {
                console.error('Error fetching class details:', error);
                setError('Failed to fetch class details');
            } finally {
                setLoading(false);
            }
        };

        fetchClass();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            setLoading(true);
            await updateClass(id, classData);
            navigate('/admin/classes');
        } catch (error) {
            console.error('Error updating class:', error);
            setError(error.response?.data?.message || 'Failed to update class');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setClassData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Edit Class</h2>
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                    {error}
                </div>
            )}
            <form onSubmit={handleSubmit} className="max-w-lg">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Class Category
                        </label>
                        <select
                            name="classCategory"
                            value={classData.classCategory}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                            required
                        >
                            <option value="">Select class category...</option>
                            {classCategories.map(category => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Class Number
                        </label>
                        <select
                            name="classNumber"
                            value={classData.classNumber}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                            required
                            disabled={!classData.classCategory}
                        >
                            <option value="">Select class number...</option>
                            {classData.classCategory && classNumbers[classData.classCategory].map(number => (
                                <option key={number} value={number}>
                                    {number}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="mt-6 flex gap-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        {loading ? 'Saving...' : 'Save Changes'}
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate('/admin/classes')}
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditClass; 