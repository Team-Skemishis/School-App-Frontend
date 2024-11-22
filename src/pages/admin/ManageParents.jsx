import React, { useState } from 'react';
import { Plus, Edit, Trash } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ManageParents = () => {
    const navigate = useNavigate();
    const [parents, setParents] = useState([
        { id: 1, firstName: 'Samuel', lastName: 'Owusu', email: 'samuel@gmail.com', children: ['Josephine Owusu Ansah', 'Emmanuel Owusu Ansah'] },
        { id: 2, firstName: 'Isaac', lastName: 'Asamoah', email: 'isaac@gmail.com', children: ['Frederick Asamoah Jr.'] },
        { id: 3, firstName: 'Ishmael', lastName: 'Abdulah', email: 'abdulah@gmail.com', children: ['Fuseina Hakeem', 'Hakeem Ziyech'] },
    ]);
    const [error, setError] = useState('');

    const handleDeleteParent = (id) => {
        if (window.confirm('Are you sure you want to delete this parent? This action cannot be undone.')) {
            setParents(parents.filter(parent => parent.id !== id));
        }
    };

    return (
        <div>
            <div className="p-6 ">
                <div className='flex items-center justify-between '>
                    <h2 className="text-2xl font-bold mb-3">Manage Parents</h2>
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                            {error}
                        </div>
                    )}
                    <button
                        onClick={() => navigate('/admin/parents/add')}
                        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                    >
                        <Plus className="w-5 h-5" />
                        Add Parent
                    </button>
                </div>
                <div className="grid gap-3">
                    {parents.length === 0 ? (
                        <div className="text-center py-8 bg-white dark:bg-gray-800 rounded-lg shadow">
                            <p className="text-gray-600 dark:text-gray-400">No parents found. Add some parents to get started.</p>
                        </div>
                    ) : (
                        parents.map(parent => (
                            <div key={parent.id} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{parent.firstName} {parent.lastName}</h3>
                                <p><strong>Email:</strong> {parent.email}</p>
                                <p><strong>Children:</strong> {parent.children.join(', ')}</p>
                                <div className="flex justify-end gap-2 mt-4">
                                    <button
                                        onClick={() => navigate(`/admin/parents/edit/${parent.id}`)}
                                        className="text-green-600 hover:text-green-700"
                                    >
                                        <Edit className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={() => handleDeleteParent(parent.id)}
                                        className="text-red-600 hover:text-red-700"
                                    >
                                        <Trash className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
            <div className="manage-parents p-6 ">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Feature 1: Parent List */}
                    <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                            Parent Directory
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400">
                            View and manage the list of parents registered under your school. Easily update contact details or verify account credentials.
                        </p>
                        <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                            View Parent List
                        </button>
                    </div>

                    {/* Feature 2: Communication Logs */}
                    <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                            Communication Logs
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400">
                            Keep track of messages exchanged between parents and teachers, or broadcast important notices to parents.
                        </p>
                        <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                            View Logs
                        </button>
                    </div>

                    {/* Feature 3: Student Progress */}
                    <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                            Student Progress Reports
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400">
                            Share detailed academic and attendance reports of students with their parents to keep them informed.
                        </p>
                        <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                            Share Reports
                        </button>
                    </div>

                    {/* Feature 4: Parental Feedback */}
                    <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                            Parental Feedback
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400">
                            Collect and manage feedback from parents regarding school policies, events, or academic updates.
                        </p>
                        <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                            View Feedback
                        </button>
                    </div>

                    {/* Feature 5: Parent-Teacher Meetings */}
                    <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                            Parent-Teacher Meetings
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400">
                            Schedule and manage parent-teacher meetings to discuss student performance and address concerns.
                        </p>
                        <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                            Schedule Meeting
                        </button>
                    </div>

                    {/* Feature 6: Fee Payments */}
                    <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                            Fee Payments
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400">
                            Manage fee payment records and notify parents of pending or completed payments for their children.
                        </p>
                        <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                            View Payment Records
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageParents; 