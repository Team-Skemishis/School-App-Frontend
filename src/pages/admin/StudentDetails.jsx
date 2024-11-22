import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getOneStudent, deleteStudent } from '../../services/students';
import { getOneClass } from '../../services/classes';
import LoadingState from '@/components/shared/LoadingState';

const StudentDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [student, setStudent] = useState(null);
    const [studentClass, setStudentClass] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchStudentAndClass = async () => {
            try {
                const studentResponse = await getOneStudent(id);
                setStudent(studentResponse.data);

                // Fetch class details if student has a class assigned
                if (studentResponse.data.classes) {
                    try {
                        const classResponse = await getOneClass(studentResponse.data.classes);
                        setStudentClass(classResponse.data);
                    } catch (error) {
                        console.error('Error fetching class details:', error);
                    }
                }
            } catch (error) {
                console.error('Error fetching student details:', error);
                setError('Failed to fetch student details');
            } finally {
                setLoading(false);
            }
        };

        fetchStudentAndClass();
    }, [id]);

    const handleDeleteStudent = async () => {
        if (window.confirm('Are you sure you want to delete this student? This action cannot be undone.')) {
            try {
                setLoading(true);
                await deleteStudent(id);
                navigate('/admin/users/students');
            } catch (error) {
                console.error('Error deleting student:', error);
                setError('Failed to delete student');
            } finally {
                setLoading(false);
            }
        }
    };

    if (loading) return <div><LoadingState /></div>;

    if (!student) return <div>Student not found</div>;

    return (
        <div className="p-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Student Details</h2>
                    <div className="flex gap-4">
                        <button
                            onClick={() => navigate(`/admin/students/edit/${id}`)}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Edit Student
                        </button>
                        <button
                            onClick={handleDeleteStudent}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                            disabled={loading}
                        >
                            {loading ? 'Deleting...' : 'Delete Student'}
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
                    {student.avatar && (
                        <div className="col-span-1">
                            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Profile Picture</h3>
                            <div className="w-48 h-48 rounded-full overflow-hidden border-2 border-gray-200 dark:border-gray-700">
                                <img
                                    src={`https://savefiles.org/${student.avatar}?shareable_link=485`}
                                    alt="Student profile"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    )}
                    {/* Basic Information */}
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Basic Information</h3>
                            <div className="mt-2 space-y-2">
                                <p><strong>First Name:</strong> {student.firstName}</p>
                                <p><strong>Last Name:</strong> {student.lastName}</p>
                                <p><strong>Email:</strong> {student.email}</p>
                                <p><strong>Gender:</strong> {student.gender || 'Not specified'}</p>
                                <p><strong>Role:</strong> {student.role}</p>
                            </div>
                        </div>
                    </div>

                    {/* Class Information */}
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Class Information</h3>
                            <div className="mt-2 space-y-2">
                                {studentClass ? (
                                    <>
                                        <p><strong>Class Number:</strong> {studentClass.classNumber}</p>
                                        <p><strong>Class Category:</strong> {studentClass.classCategory}</p>
                                    </>
                                ) : (
                                    <p className="text-gray-500 dark:text-gray-400">No class assigned</p>
                                )}
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    );
};

export default StudentDetails; 