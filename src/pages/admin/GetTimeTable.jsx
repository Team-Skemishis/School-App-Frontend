import React, { useState, useEffect } from 'react';
import { getTimetable, deleteTimetable } from '../../services/timetable';
import { getAllClasses } from '../../services/classes';
import { getUsers } from '../../services/users';
import { Edit, Trash, Plus, Eye } from 'lucide-react';
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

    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

    const renderDayTimetable = (day) => {
        const dayEntries = timetable.filter(entry => entry.day.toLowerCase() === day.toLowerCase());
        if (dayEntries.length === 0) {
            return <p className="text-gray-500">No classes scheduled.</p>;
        }

        return dayEntries.map(entry => (
            <div
                key={entry._id}
                className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow mb-2 border border-gray-200 flex flex-col"
            >
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{entry.subject}</h3>
                <p>
                    <strong className='text-gray-400'>Class:</strong>{' '}
                    {classes.find(cls => cls._id === entry.classes)?.classNumber || 'Unknown Class'}
                </p>
                <p>
                    <strong className='text-gray-400'>Teacher:</strong>{' '}
                    {teachers.find(teacher => teacher._id === entry.teacher)?.firstName +
                        ' ' +
                        teachers.find(teacher => teacher._id === entry.teacher)?.lastName || 'Unknown Teacher'}
                </p>
                <p>
                    <strong className='text-gray-400'>Time:</strong> {entry.startTime} - {entry.endTime}
                </p>
                <div className="flex gap-2 mt-4 justify-end">
                    <button
                        onClick={() => navigate(`/admin/timetable/${entry._id}`)}
                        className="text-blue-600 hover:text-blue-700"
                    >
                        <Eye className="w-5 h-5" />
                    </button>
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
        ));
    };

    return (
        <div className="p-2">
            <div className='flex justify-between'>
                <h2 className="text-2xl font-bold mb-6">Timetable</h2>
                <button
                    onClick={() => navigate('/admin/timetable/add')}
                    className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                    <Plus className="w-5 h-5" />
                    Add Timetable Entry
                </button>
            </div>
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                    {error}
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
                {daysOfWeek.map(day => (
                    <div key={day} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-2 shadow-md">
                        <h3 className="text-xl font-bold text-gray-700 dark:text-gray-200 mb-4 text-center">{day}</h3>
                        {renderDayTimetable(day)}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GetTimeTable;
