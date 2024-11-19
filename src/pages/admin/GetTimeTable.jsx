import React, { useState, useEffect } from 'react';
import { getTimetable, deleteTimetable } from '../../services/timetable';
import { getAllClasses } from '../../services/classes';
import { getUsers } from '../../services/users';
import { Edit, Trash, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const GetTimeTable = () => {
    const [timetable, setTimetable] = useState([]);
    const [classes, setClasses] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const timetableResponse = await getTimetable();
                const classesResponse = await getAllClasses();
                const teachersResponse = await getUsers();

                setTimetable(timetableResponse.data);
                setClasses(classesResponse.data);
                setTeachers(teachersResponse.data.filter(user => user.role === 'teacher'));
            } catch (error) {
                console.error('Error fetching timetable:', error);
                setError('Failed to fetch timetable');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleDeleteTimetable = async (id) => {
        if (window.confirm('Are you sure you want to delete this timetable entry? This action cannot be undone.')) {
            try {
                setLoading(true);
                await deleteTimetable(id);
                setTimetable(timetable.filter(item => item._id !== id)); // Update local state
            } catch (error) {
                console.error('Error deleting timetable:', error);
                setError('Failed to delete timetable entry');
            } finally {
                setLoading(false);
            }
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Manage Timetable</h2>
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                    {error}
                </div>
            )}
            <button
                onClick={() => navigate('/admin/timetable/add')}
                className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
                <Plus className="w-5 h-5" />
                Add Timetable Entry
            </button>
            <div className="grid gap-6">
                {timetable.length === 0 ? (
                    <div className="text-center py-8 bg-white dark:bg-gray-800 rounded-lg shadow">
                        <p className="text-gray-600 dark:text-gray-400">No timetable entries available.</p>
                    </div>
                ) : (
                    timetable.map(entry => {
                        const classItem = classes.find(cls => cls._id === entry.classes);
                        const teacherItem = teachers.find(teacher => teacher._id === entry.teacher);
                        return (
                            <div key={entry._id} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{entry.subject}</h3>
                                <p><strong>Class:</strong> {classItem ? classItem.classNumber : 'Unknown Class'}</p>
                                <p><strong>Teacher:</strong> {teacherItem ? `${teacherItem.firstName} ${teacherItem.lastName}` : 'Unknown Teacher'}</p>
                                <p><strong>Day:</strong> {entry.day.charAt(0).toUpperCase() + entry.day.slice(1)}</p>
                                <p><strong>Time:</strong> {entry.startTime} - {entry.endTime}</p>
                                <div className="flex justify-end gap-2 mt-4">
                                    <button
                                        onClick={() => navigate(`/admin/timetable/edit/${entry._id}`)}
                                        className="text-green-600 hover:text-green-700"
                                    >
                                        <Edit className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={() => handleDeleteTimetable(entry._id)}
                                        className="text-red-600 hover:text-red-700"
                                    >
                                        <Trash className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default GetTimeTable;