import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getOneStudent, deleteStudent } from '../../services/students';

const StudentDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchStudent = async () => {
            try {
                const response = await getOneStudent(id);
                setStudent(response.data);
            } catch (error) {
                console.error('Error fetching student details:', error);
                setError('Failed to fetch student details');
            } finally {
                setLoading(false);
            }
        };

        fetchStudent();
    }, [id]);

    const handleDeleteStudent = async () => {
        if (window.confirm('Are you sure you want to delete this student? This action cannot be undone.')) {
            try {
                setLoading(true);
                await deleteStudent(id);
                navigate('/admin/students');
            } catch (error) {
                console.error('Error deleting student:', error);
                setError('Failed to delete student');
            } finally {
                setLoading(false);
            }
        }
    };

    if (loading) return <div>Loading...</div>;
    if (!student) return <div>Student not found</div>;

    return (
        <div className="p-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <h2 className="text-2xl font-bold mb-6">Student Details</h2>
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                        {error}
                    </div>
                )}
                <div className="space-y-4">
                    <p><strong>First Name:</strong> {student.firstName}</p>
                    <p><strong>Last Name:</strong> {student.lastName}</p>
                    <p><strong>Email:</strong> {student.email}</p>
                    <p><strong>Role:</strong> {student.role}</p>
                </div>
                <div className="flex gap-4 mt-6">
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
        </div>
    );
};

export default StudentDetails; 