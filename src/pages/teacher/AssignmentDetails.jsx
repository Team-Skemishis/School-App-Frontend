import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getOneAssignment, deleteAssignment } from '../../services/assignments';
import { getOneUser } from '../../services/users';
import { FileDown } from 'lucide-react'; // Import FileDown icon
import LoadingState from '@/components/shared/LoadingState';

const AssignmentDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [assignment, setAssignment] = useState(null);
    const [teacher, setTeacher] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchAssignmentAndTeacher = async () => {
            try {
                const assignmentResponse = await getOneAssignment(id);
                setAssignment(assignmentResponse.data);

                if (assignmentResponse.data.user) {
                    const teacherResponse = await getOneUser(assignmentResponse.data.user);
                    setTeacher(teacherResponse.data);
                }
            } catch (error) {
                console.error('Error fetching assignment details:', error);
                setError('Failed to fetch assignment details');
            } finally {
                setLoading(false);
            }
        };

        fetchAssignmentAndTeacher();
    }, [id]);

    const handleDeleteAssignment = async () => {
        if (window.confirm('Are you sure you want to delete this assignment? This action cannot be undone.')) {
            try {
                setLoading(true);
                await deleteAssignment(id);
                navigate('/teacher/assignments');
            } catch (error) {
                console.error('Error deleting assignment:', error);
                setError('Failed to delete assignment');
            } finally {
                setLoading(false);
            }
        }
    };

    const handleDownload = () => {
        // Create a URL for the file and trigger download
        if (assignment.file) {
            const fileUrl = `${import.meta.env.VITE_BASE_URL}/uploads/${assignment.file}`;
            window.open(fileUrl, '_blank');
        }
    };

    if (loading) return <div><LoadingState /></div>;
    if (!assignment) return <div>Assignment not found</div>;

    return (
        <div className="p-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Assignment Details</h2>
                    <div className="flex gap-4">
                        <button
                            onClick={() => navigate(`/teacher/assignments/edit/${id}`)}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Edit Assignment
                        </button>
                        <button
                            onClick={handleDeleteAssignment}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                            disabled={loading}
                        >
                            {loading ? 'Deleting...' : 'Delete Assignment'}
                        </button>
                    </div>
                </div>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                        {error}
                    </div>
                )}

                <div className="space-y-6">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Title</h3>
                        <p className="text-gray-600 dark:text-gray-400 mt-1">{assignment.title}</p>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Questions/Instructions</h3>
                        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mt-1">
                            <p className="text-gray-600 dark:text-gray-400 whitespace-pre-wrap">
                                {assignment.questions}
                            </p>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Deadline</h3>
                        <p className="text-gray-600 dark:text-gray-400 mt-1">
                            {new Date(assignment.deadline).toLocaleString()}
                        </p>
                    </div>

                    {assignment.file && (
                        <div>
                            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Attachment</h3>
                            <button
                                onClick={handleDownload}
                                className="mt-2 flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors dark:bg-gray-700 dark:text-gray-300"
                            >
                                <FileDown className="w-5 h-5" />
                                <span>Download Attachment</span>
                            </button>
                        </div>
                    )}

                    <div>
                        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Created By</h3>
                        <p className="text-gray-600 dark:text-gray-400 mt-1">
                            {teacher ? `${teacher.firstName} ${teacher.lastName}` : 'Unknown Teacher'}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AssignmentDetails; 