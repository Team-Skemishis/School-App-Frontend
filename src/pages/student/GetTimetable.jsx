import React, { useState, useEffect } from 'react';
import { getTimetable } from '../../services/timetable';
import { getAllClasses } from '../../services/classes';
import { getUsers } from '../../services/users';
import { Eye } from 'lucide-react';
import LoadingState from '../../components/shared/LoadingState';
import { useNavigate } from 'react-router-dom';

const GetTimetable = () => {
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

    if (loading) return <LoadingState />;

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">My Timetable</h2>
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                    {error}
                </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {timetable.length === 0 ? (
                    <div className="text-center py-8 bg-white dark:bg-gray-800 rounded-lg shadow">
                        <p className="text-gray-600 dark:text-gray-400">No timetable entries available.</p>
                    </div>
                ) : (
                    timetable.map(entry => (
                        <div key={entry._id} className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{entry.subject}</h3>
                            <p><strong>Class:</strong> {classes.find(cls => cls._id === entry.classes)?.classNumber || 'Unknown Class'}</p>
                            <p><strong>Teacher:</strong> {teachers.find(teacher => teacher._id === entry.teacher)?.firstName + ' ' + teachers.find(teacher => teacher._id === entry.teacher)?.lastName || 'Unknown Teacher'}</p>
                            <p><strong>Day:</strong> {entry.day.charAt(0).toUpperCase() + entry.day.slice(1)}</p>
                            <p><strong>Time:</strong> {entry.startTime} - {entry.endTime}</p>
                            <div className="flex justify-end gap-2 mt-4">
                                <button
                                    onClick={() => navigate(`/student/timetable/${entry._id}`)} // Navigate to the details page
                                    className="text-blue-600 hover:text-blue-700"
                                >
                                    <Eye className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default GetTimetable;