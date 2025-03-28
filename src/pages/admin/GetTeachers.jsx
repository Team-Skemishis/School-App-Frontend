/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteTeacher, getTeachers } from '../../services/teachers';
import { getOneClass } from '../../services/classes';
import { Eye, Edit, Trash, ArrowUpDown, UserPlus } from 'lucide-react';
import LoadingState from '@/components/shared/LoadingState';

const GetTeachers = () => {
    const [teachers, setTeachers] = useState([]);
    const [classNames, setClassNames] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: 'firstName', direction: 'ascending' });
    const [currentPage, setCurrentPage] = useState(1);
    const teachersPerPage = 7;
    const navigate = useNavigate();

    const fetchTeachers = async () => {
        try {
            setLoading(true);
            const response = await getTeachers();
            const teacherList = response.data;
            setTeachers(teacherList);

            // Fetch classes for each teachers...
            const classData = {};
            for (const teacher of teacherList) {
                if (teacher.classes) {
                    try {
                        const classResponse = await getOneClass(teacher.classes);
                        if (classResponse.data) {
                            classData[teacher.classes] = `${classResponse.data.classNumber} - ${classResponse.data.classCategory}`;
                        } else {
                            classData[teacher.classes] = 'Class not found';
                        }
                    } catch (error) {
                        console.error('Error fetching class:', error);
                        classData[teacher.classes] = 'Unknown Class';
                    }
                } else {
                    classData[teacher.classes] = 'No Class Assigned';
                }
            }
            setClassNames(classData);
        } catch (error) {
            console.error('Error fetching teachers:', error);
            setError('Failed to fetch teachers');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTeachers();
    }, []);

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


    if (loading)
        return <div><LoadingState /></div>;

    return (
        <div className="flex flex-col min-h-96 justify-between">
            <div>
            <div className='flex justify-between'>
                    <h2 className="text-2xl font-bold mb-4">Teacher Database</h2>
                    <div>
                        <input type="search" name="search" id="search"
                            placeholder='Search Teachers'
                            className='w-24 sm:w-full bg-transparent border-[0.1px] hover:border-theme-color rounded-md px-2 py-1 border-gray-300  focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 ' />
                    </div>
                </div>
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
                            <th className="py-2 px-4 text-left" onClick={() => requestSort('classes')}>
                                <div className="flex items-center">
                                    Assigned Class
                                    <ArrowUpDown size={16} strokeWidth={1} className="ml-1" />
                                </div>
                            </th>
                            <th className="py-2 px-4 text-left" onClick={() => requestSort('gender')}>
                                <div className="flex items-center">
                                    Gender
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
                                <td className="py-4 px-4 capitalize">{classNames[teacher.classes] || 'Not Specified'}</td>
                                <td className="py-4 px-4 capitalize">{teacher.gender || 'Not Specified'}</td>
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