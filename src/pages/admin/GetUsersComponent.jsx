/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { deleteUser, editUser, getOneUser, getUsers } from '../../services/users';
import { Eye, Edit, Trash, ArrowUpDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const GetUsersComponent = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: 'firstName', direction: 'ascending' });
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 10;
    const navigate = useNavigate();

    // Fetch users on component mount
    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const response = await getUsers();
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
            setError('Failed to fetch users');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteUser = async (userId) => {
        if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
            try {
                setLoading(true);
                await deleteUser(userId);
                // Refresh the users list after deletion
                await fetchUsers();
                // Show success message (you could add a toast notification here)
                console.log('User deleted successfully');
            } catch (error) {
                console.error('Error deleting user:', error);
                setError('Failed to delete user');
            } finally {
                setLoading(false);
            }
        }
    };

    // calculating the number of users to display per page...
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    // function for changing the pages...
    const paginate = (pageNumber) =>
        setCurrentPage(pageNumber);

    const sortedUsers = React.useMemo(() => {
        let sortableUsers = [...users];
        if (sortConfig !== null) {
            sortableUsers.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableUsers;
    }, [users, sortConfig]);

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const viewUser = (_id) => {
        navigate(`/admin/users/${_id}`);
    };

    const editUser = async (_id) => {
        console.log('Edit user with ID:', _id);
        navigate(`/admin/edit-user/${_id}`);
    };

    if (loading)
        return <div>Loading...</div>

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">List of Users in the system...</h2>
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
                        <th className="py-2 px-4 text-left cursor-pointer" onClick={() => requestSort('role')}>
                            <div className="flex items-center">
                                Role
                                <ArrowUpDown size={16} strokeWidth={1} className="ml-1" />
                            </div>
                        </th>
                        <th className="py-2 px-4 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedUsers.slice(indexOfFirstUser, indexOfLastUser).map(user => (
                        <tr key={user._id} className="border-b border-gray-200 dark:border-gray-700">
                            <td className="py-4 px-4">{user.firstName}</td>
                            <td className="py-4 px-4">{user.lastName}</td>
                            <td className="py-4 px-4">{user.email}</td>
                            <td className="py-4 px-4">{user.role}</td>
                            <td className="py-4 px-4">
                                <div className="flex items-center space-x-2">
                                    <button
                                        className="text-blue-500 hover:text-blue-700"
                                        onClick={() => navigate(`/admin/users/${user._id}`)}
                                    >
                                        <Eye className="w-5 h-5" />
                                    </button>
                                    <button
                                        className="text-green-500 hover:text-green-700"
                                        onClick={() => navigate(`/admin/edit-user/${user._id}`)}
                                    >
                                        <Edit className="w-5 h-5" />
                                    </button>
                                    <button
                                        className="text-red-500 hover:text-red-700"
                                        onClick={() => handleDeleteUser(user._id)}
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
                {[...Array(Math.ceil(users.length / usersPerPage)).keys()].map(number => (
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
    );
}

export default GetUsersComponent;