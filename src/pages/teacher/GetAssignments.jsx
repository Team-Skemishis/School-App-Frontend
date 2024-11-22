import React, { useState, useEffect } from 'react';
import { getAllAssignments, deleteAssignment } from '../../services/assignments';
import { Eye, Edit, Trash, ArrowUpDown, BookPlus, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import LoadingState from '@/components/shared/LoadingState';

const GetAssignments = () => {
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: 'title', direction: 'ascending' });
    const [currentPage, setCurrentPage] = useState(1);
    const assignmentsPerPage = 4;
    const navigate = useNavigate();

    useEffect(() => {
        fetchAssignments();
    }, []);

    const fetchAssignments = async () => {
        try {
            setLoading(true);
            const response = await getAllAssignments();
            setAssignments(response.data);
        } catch (error) {
            console.error('Error fetching assignments:', error);
            setError('Failed to fetch assignments');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteAssignment = async (assignmentId) => {
        if (window.confirm('Are you sure you want to delete this assignment? This action cannot be undone.')) {
            try {
                setLoading(true);
                await deleteAssignment(assignmentId);
                await fetchAssignments();
                console.log('Assignment deleted successfully');
            } catch (error) {
                console.error('Error deleting assignment:', error);
                setError('Failed to delete assignment');
            } finally {
                setLoading(false);
            }
        }
    };

    const sortedAssignments = React.useMemo(() => {
        let sortableAssignments = [...assignments];
        if (sortConfig !== null) {
            sortableAssignments.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableAssignments;
    }, [assignments, sortConfig]);

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    // Format deadline date
    const formatDeadline = (deadline) => {
        const date = new Date(deadline);
        const now = new Date();
        const isOverdue = date < now;

        return {
            formattedDate: date.toLocaleDateString(),
            isOverdue
        };
    };

    // Pagination
    const indexOfLastAssignment = currentPage * assignmentsPerPage;
    const indexOfFirstAssignment = indexOfLastAssignment - assignmentsPerPage;
    const currentAssignments = sortedAssignments.slice(indexOfFirstAssignment, indexOfLastAssignment);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    if (loading) return <div><LoadingState /></div>;

    return (
        <div className="flex flex-col min-h-96 justify-between">
            <div>
                <h2 className="text-2xl font-bold mb-4">Assignments</h2>
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                        {error}
                    </div>
                )}
                {assignments.length === 0 ? (
                    <div className="text-center py-4 bg-white dark:bg-gray-800 rounded-lg shadow">
                        <p className="text-gray-600 dark:text-gray-400">No assignments found. Create some assignments to get started.</p>
                    </div>
                ) : (
                    <table className="min-w-full bg-white dark:bg-gray-800 text-black dark:text-gray-200 shadow-md rounded-lg overflow-hidden">
                        <thead>
                            <tr className="bg-gray-200 dark:bg-gray-700">
                                <th className="py-2 px-4 text-left cursor-pointer" onClick={() => requestSort('title')}>
                                    <div className="flex items-center">
                                        Title
                                        <ArrowUpDown size={16} strokeWidth={1} className="ml-1" />
                                    </div>
                                </th>
                                <th className="py-2 px-4 text-left">Questions</th>
                                <th className="py-2 px-4 text-left cursor-pointer" onClick={() => requestSort('deadline')}>
                                    <div className="flex items-center">
                                        Deadline
                                        <ArrowUpDown size={16} strokeWidth={1} className="ml-1" />
                                    </div>
                                </th>
                                <th className="py-2 px-4 text-left">Attachment</th>
                                <th className="py-2 px-4 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentAssignments.map(assignment => {
                                const { formattedDate, isOverdue } = formatDeadline(assignment.deadline);
                                return (
                                    <tr key={assignment._id} className="border-b border-gray-200 dark:border-gray-700">
                                        <td className="py-4 px-4">{assignment.title}</td>
                                        <td className="py-4 px-4">
                                            {assignment.questions.length > 50
                                                ? `${assignment.questions.substring(0, 50)}...`
                                                : assignment.questions}
                                        </td>
                                        <td className="py-4 px-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${isOverdue
                                                    ? 'bg-red-100 text-red-800'
                                                    : 'bg-green-100 text-green-800'
                                                }`}>
                                                {formattedDate}
                                            </span>
                                        </td>
                                        <td className="py-4 px-4">
                                            {assignment.file ? (
                                                <FileText className="w-5 h-5 text-blue-500" />
                                            ) : (
                                                <span className="text-gray-400">No file</span>
                                            )}
                                        </td>
                                        <td className="py-4 px-4">
                                            <div className="flex items-center space-x-2">
                                                <button
                                                    className="text-blue-500 hover:text-blue-700"
                                                    onClick={() => navigate(`/teacher/assignments/${assignment._id}`)}
                                                >
                                                    <Eye className="w-5 h-5" />
                                                </button>
                                                <button
                                                    className="text-green-500 hover:text-green-700"
                                                    onClick={() => navigate(`/teacher/assignments/edit/${assignment._id}`)}
                                                >
                                                    <Edit className="w-5 h-5" />
                                                </button>
                                                <button
                                                    className="text-red-500 hover:text-red-700"
                                                    onClick={() => handleDeleteAssignment(assignment._id)}
                                                    disabled={loading}
                                                >
                                                    <Trash className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                )}
                <div className="flex justify-center mt-4">
                    {[...Array(Math.ceil(assignments.length / assignmentsPerPage)).keys()].map(number => (
                        <button
                            key={number}
                            onClick={() => paginate(number + 1)}
                            className={`mx-1 px-3 py-1 border ${currentPage === number + 1 ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'}`}
                        >
                            {number + 1}
                        </button>
                    ))}
                </div>
            </div>
            <div className="relative">
                <button
                    onClick={() => navigate('/teacher/assignments/add')}
                    className="absolute bottom-0 right-0 bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600 transition-colors"
                >
                    <BookPlus className="w-7 h-7" />
                </button>
            </div>
        </div>
    );
};

export default GetAssignments;