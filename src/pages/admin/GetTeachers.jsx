/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { deleteTeacher, getTeachers } from '../../services/teachers';
import { Eye, Edit, Trash, ArrowUpDown, UserPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const GetTeachers = () => {
    const [teachers, setTeachers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: 'firstName', direction: 'ascending' });
    const [currentPage, setCurrentPage] = useState(1);
    const teachersPerPage = 4;
    const navigate = useNavigate();

    // Fetch teachers on component mount
    useEffect(() => {
        fetchTeachers();
    }, []);

    const fetchTeachers = async () => {
        try {
            setLoading(true);
            const response = await getTeachers();
            // Directly use the response data without filtering
            setTeachers(response.data);
        } catch (error) {
            console.error('Error fetching teachers:', error);
            if (error.response?.status === 401) {
                setError('Session expired. Please login again.');
                // Optionally redirect to login
                // navigate('/login');
            } else {
                setError('Failed to fetch teachers');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteTeacher = async (teacherId) => {
        if (window.confirm('Are you sure you want to delete this teacher? This action cannot be undone.')) {
            try {
                setLoading(true);
                await deleteTeacher(teacherId);
                // Refresh the teachers list after deletion
                await fetchTeachers();
                console.log('Teacher deleted successfully');
            } catch (error) {
                console.error('Error deleting teacher:', error);
                setError('Failed to delete teacher');
            } finally {
                setLoading(false);
            }
        }
    };

    // calculating the number of teachers to display per page...
    const indexOfLastTeacher = currentPage * teachersPerPage;
    const indexOfFirstTeacher = indexOfLastTeacher - teachersPerPage;

    // function for changing the pages...
    const paginate = (pageNumber) =>
        setCurrentPage(pageNumber);

    const sortedTeachers = React.useMemo(() => {
        let sortableTeachers = [...teachers];
        if (sortConfig !== null) {
            sortableTeachers.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableTeachers;
    }, [teachers, sortConfig]);

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const viewTeacher = (_id) => {
        navigate(`/admin/teachers/${_id}`);
    };

    const editTeacher = async (_id) => {
        console.log('Edit teacher with ID:', _id);
        navigate(`/admin/teachers/edit/${_id}`);
    };

    if (loading)
        return <div>Loading...</div>

    return (
        <div className="flex flex-col min-h-96 justify-between">
            <div>
                <h2 className="text-2xl font-bold mb-4">List of Teachers in the system...</h2>
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                        {error}
                    </div>
                )}
                <table className="min-w-full bg-white dark:bg-gray-800 text-black dark:text-gray-200 shadow-md rounded-lg overflow-hidden">
                    <thead>
                        <tr className="bg-gray-200 dark:bg-gray-700">
                            <th className="py-2 px-4 text-left cursor-pointer" onClick={() => requestSort('firstName')}>
                                <div className="flex items-center">
                                    First Name
                                    <ArrowUpDown size={16} strokeWidth={1} className="ml-1" />
                                </div>
                            </th>
                            <th className="py-2 px-4 text-left cursor-pointer" onClick={() => requestSort('lastName')}>
                                <div className="flex items-center">
                                    Last Name
                                    <ArrowUpDown size={16} strokeWidth={1} className="ml-1" />
                                </div>
                            </th>
                            <th className="py-2 px-4 text-left cursor-pointer" onClick={() => requestSort('email')}>
                                <div className="flex items-center">
                                    Email
                                    <ArrowUpDown size={16} strokeWidth={1} className="ml-1" />
                                </div>
                            </th>
                            <th className="py-2 px-4 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedTeachers.slice(indexOfFirstTeacher, indexOfLastTeacher).map(teacher => (
                            <tr key={teacher._id} className="border-b border-gray-200 dark:border-gray-700">
                                <td className="py-4 px-4">{teacher.firstName}</td>
                                <td className="py-4 px-4">{teacher.lastName}</td>
                                <td className="py-4 px-4">{teacher.email}</td>
                                <td className="py-4 px-4">
                                    <div className="flex items-center space-x-2">
                                        <button
                                            className="text-blue-500 hover:text-blue-700"
                                            onClick={() => navigate(`/admin/users/teachers/${teacher._id}`)}
                                        >
                                            <Eye className="w-5 h-5" />
                                        </button>
                                        <button
                                            className="text-green-500 hover:text-green-700"
                                            onClick={() => navigate(`/admin/users/teachers/edit-teacher/${teacher._id}`)}
                                        >
                                            <Edit className="w-5 h-5" />
                                        </button>
                                        <button
                                            className="text-red-500 hover:text-red-700"
                                            onClick={() => handleDeleteTeacher(teacher._id)}
                                            disabled={loading}
                                        >
                                            <Trash className="w-5 h-5" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="flex justify-center mt-4">
                    {[...Array(Math.ceil(teachers.length / teachersPerPage)).keys()].map(number => (
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
                    onClick={() => navigate('/admin/users/teachers/add')}
                    className="absolute bottom-0 right-0 bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600 transition-colors"
                >
                    <UserPlus className="w-7 h-7" />
                </button>
            </div>
        </div>
    );
}

export default GetTeachers;