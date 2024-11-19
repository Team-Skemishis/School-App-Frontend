import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getOneTeacher, deleteTeacher } from '../../services/teachers';
import { getOneClass } from '@/services/classes';

const TeacherDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [teacher, setTeacher] = useState(null);
    const [classData, setClassData] = useState(null)

    useEffect(() => {
        const fetchTeacher = async () => {
            try {
                const response = await getOneTeacher(id);
                setTeacher(response.data);

                // fetch class details if teacher has a class assigned to him/her...
                if (response.data.classes) {
                    const classResponse = await getOneClass(response.data.classes)
                    setClassData(classResponse.data);
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
                <div className='flex items-center mb-6 justify-between'>
                    <h2 className="text-2xl font-bold">Teacher Details</h2>
                    <div className="flex gap-4 ">
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
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                        {error}
                    </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-nowrap">
                    {/* Profile Picture */}
                    {teacher.avatar && (
                        <div className="col-span-1">
                            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Profile Picture</h3>
                            <div className="w-48 h-48 rounded-full overflow-hidden border-2 border-gray-200 dark:border-gray-700">
                                {teacher ? (
                                    <>
                                        <img
                                            src={`https://savefiles.org/${teacher.avatar}?shareable_link=484`}
                                            alt="Teacher profile"
                                            className="w-full h-full object-cover"
                                        />
                                    </>
                                ) : (
                                    <p className="text-gray-500 dark:text-gray-400">No profile picture added yet</p>
                                )}

                            </div>
                        </div>
                    )}
                    {/* Basic Information */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Basic Information</h3>
                        <p><strong>First Name:</strong> {teacher.firstName}</p>
                        <p><strong>Last Name:</strong> {teacher.lastName}</p>
                        <p><strong>Email:</strong> {teacher.email}</p>
                        <p><strong>Gender:</strong> {teacher.gender.charAt(0).toUpperCase() + teacher.gender.slice(1)}</p>
                        <p><strong>Role:</strong> {teacher.role.charAt(0).toUpperCase() + teacher.role.slice(1)}</p>
                    </div>
                    {/* Class Information */}
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Academic Responsibilities</h3>
                            <div className="mt-2 space-y-2">
                                {teacher.classes ? (
                                    <>
                                        <p><strong>Assigned Class:</strong> {classData ? `${classData.classNumber} - ${classData.classCategory}` : 'No Class Assigned'}</p>

                                    </>
                                ) : (
                                    <>
                                        <p className="text-gray-500 dark:text-gray-400">No class assigned</p>
                                    </>
                                )}
                            </div>
                            <p className="text-gray-500 dark:text-gray-400">No courses assigned</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default TeacherDetails;