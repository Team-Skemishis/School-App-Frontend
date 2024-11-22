import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getOneClass, deleteClass } from '../../services/classes';
import { getOneUser } from '../../services/users';
import LoadingState from '@/components/shared/LoadingState';

const ClassDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [classData, setClassData] = useState(null);
    const [teacher, setTeacher] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchClassAndTeacher = async () => {
            try {
                const classResponse = await getOneClass(id);
                setClassData(classResponse.data);

                if (classResponse.data.classTeacher) {
                    const teacherResponse = await getOneUser(classResponse.data.classTeacher);
                    setTeacher(teacherResponse.data);
                }
            } catch (error) {
                console.error('Error fetching class details:', error);
                setError('Failed to fetch class details');
            } finally {
                setLoading(false);
            }
        };

        fetchClassAndTeacher();
    }, [id]);

    const handleDeleteClass = async () => {
        if (window.confirm('Are you sure you want to delete this class? This action cannot be undone.')) {
            try {
                setLoading(true);
                await deleteClass(id);
                navigate('/admin/classes');
            } catch (error) {
                console.error('Error deleting class:', error);
                setError('Failed to delete class');
            } finally {
                setLoading(false);
            }
        }
    };

    if (loading) return <div><LoadingState /></div>;
    if (!classData) return <div>Class not found</div>;

    return (
        <div className="p-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <h2 className="text-2xl font-bold mb-6">Class Details</h2>
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                        {error}
                    </div>
                )}
                <div className="space-y-4">
                    <p><strong>Class Number:</strong> {classData.classNumber}</p>
                    <p><strong>Category:</strong> {classData.classCategory}</p>
                    <p><strong>Class Teacher:</strong> {teacher ? `${teacher.firstName} ${teacher.lastName}` : 'No teacher assigned'}</p>
                </div>
                <div className="flex gap-4 mt-6">
                    <button
                        onClick={() => navigate(`/admin/classes/edit/${id}`)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Edit Class
                    </button>
                    <button
                        onClick={handleDeleteClass}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                        disabled={loading}
                    >
                        {loading ? 'Deleting...' : 'Delete Class'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ClassDetails; 