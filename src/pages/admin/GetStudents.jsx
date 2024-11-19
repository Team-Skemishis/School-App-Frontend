import React, { useEffect, useState } from 'react';
import { deleteStudent, getStudents } from '../../services/students';
import { Eye, Edit, Trash, ArrowUpDown, UserPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getOneClass } from '../../services/classes';

const GetStudents = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: 'firstName', direction: 'ascending' });
    const [currentPage, setCurrentPage] = useState(1);
    const [classNames, setClassNames] = useState({});
    const studentsPerPage = 5;
    const navigate = useNavigate();

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            setLoading(true);
            const response = await getStudents();
            setStudents(response.data || []);

            // Fetch class details for each student
            const classData = {};
            for (const student of response.data) {
                if (student.classes) {
                    try {
                        const classResponse = await getOneClass(student.classes);
                        classData[student.classes] = `${classResponse.data.classNumber} - ${classResponse.data.classCategory}`;
                    } catch (error) {
                        console.error('Error fetching class:', error);
                        classData[student.classes] = 'Unknown Class';
                    }
                }
            }
            setClassNames(classData);
        } catch (error) {
            console.error('Error details:', error.response || error);
            setError(`Failed to fetch students: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteStudent = async (studentId) => {
        if (window.confirm('Are you sure you want to delete this student? This action cannot be undone.')) {
            try {
                setLoading(true);
                await deleteStudent(studentId);
                await fetchStudents();
                console.log('Student deleted successfully');
            } catch (error) {
                console.error('Error deleting student:', error);
                setError('Failed to delete student');
            } finally {
                setLoading(false);
            }
        }
    };

    const sortedStudents = React.useMemo(() => {
        let sortableStudents = [...students];
        if (sortConfig !== null) {
            sortableStudents.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableStudents;
    }, [students, sortConfig]);

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    // Pagination
    const indexOfLastStudent = currentPage * studentsPerPage;
    const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
    const currentStudents = sortedStudents.slice(indexOfFirstStudent, indexOfLastStudent);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    if (loading)
        return <div>Loading...</div>;

    return (
        <div className="flex flex-col min-h-96 justify-between">
            <div>
                <h2 className="text-2xl font-bold mb-4">List of Students...</h2>
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                        {error}
                    </div>
                )}
                {students.length === 0 ? (
                    <div className="text-center py-4 bg-white dark:bg-gray-800 rounded-lg shadow">
                        <p className="text-gray-600 dark:text-gray-400">No students found. Add some students to get started.</p>
                    </div>
                ) : (
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
                                <th className="py-2 px-4 text-left">Class</th>
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
                            {currentStudents.map(student => (
                                <tr key={student._id} className="border-b border-gray-200 dark:border-gray-700">
                                    <td className="py-4 px-4">{student.firstName}</td>
                                    <td className="py-4 px-4">{student.lastName}</td>
                                    <td className="py-4 px-4">
                                        {classNames[student.classes] || 'No Class Assigned'}
                                    </td>
                                    <td className="py-4 px-4 capitalize">{student.gender || 'Not specified'}</td>
                                    <td className="py-4 px-4">
                                        <div className="flex items-center space-x-2">
                                            <button
                                                className="text-blue-500 hover:text-blue-700"
                                                onClick={() => navigate(`/admin/users/students/${student._id}`)}
                                            >
                                                <Eye className="w-5 h-5" />
                                            </button>
                                            <button
                                                className="text-green-500 hover:text-green-700"
                                                onClick={() => navigate(`/admin/students/edit/${student._id}`)}
                                            >
                                                <Edit className="w-5 h-5" />
                                            </button>
                                            <button
                                                className="text-red-500 hover:text-red-700"
                                                onClick={() => handleDeleteStudent(student._id)}
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
                )}
                <div className="flex justify-center mt-4">
                    {[...Array(Math.ceil(students.length / studentsPerPage)).keys()].map(number => (
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
                    onClick={() => navigate('/admin/users/students/add')}
                    className="absolute bottom-0 right-0 bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600 transition-colors"
                >
                    <UserPlus className="w-7 h-7" />
                </button>
            </div>
        </div>
    );
};

export default GetStudents; 