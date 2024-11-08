import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getOneTeacher, deleteTeacher } from '../../services/teachers';

const TeacherDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [teacher, setTeacher] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchTeacher = async () => {
            try {
                const response = await getOneTeacher(id);
                setTeacher(response.data);
            } catch (error) {
                console.error('Error fetching teacher details:', error);
                setError('Failed to fetch teacher details');
            } finally {
                setLoading(false);
            }
        };

        fetchTeacher();
    }, [id]);

    const handleDeleteTeacher = async () => {
        if (window.confirm('Are you sure you want to delete this teacher? This action cannot be undone.')) {
            try {
                setLoading(true);
                await deleteTeacher(id);
                navigate('/admin/users/teachers');
            } catch (error) {
                console.error('Error deleting teacher:', error);
                setError('Failed to delete teacher');
            } finally {
                setLoading(false);
            }
        }
    };

    if (loading) return <div>Loading...</div>;
    if (!teacher) return <div>Teacher not found</div>;

    return (
        <div className="p-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <h2 className="text-2xl font-bold mb-6">Teacher Details</h2>
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                        {error}
                    </div>
                )}
                <div className="space-y-4">
                    <p><strong>First Name:</strong> {teacher.firstName}</p>
                    <p><strong>Last Name:</strong> {teacher.lastName}</p>
                    <p><strong>Email:</strong> {teacher.email}</p>
                    <p><strong>Role:</strong> {teacher.role}</p>
                    <p><strong>Gender:</strong> {teacher.gender}</p>
                    <p><strong>Image:</strong> {teacher.image}</p>
                    {/* Add any additional teacher-specific fields here */}
                </div>
                <div className="flex gap-4 mt-6">
                    <button
                        onClick={() => navigate(`/admin/users/teachers/edit-teacher/${id}`)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Edit Teacher
                    </button>
                    <button
                        onClick={handleDeleteTeacher}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                        disabled={loading}
                    >
                        {loading ? 'Deleting...' : 'Delete Teacher'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TeacherDetails;