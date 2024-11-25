import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getOneTimetable, updateTimetable } from '../../services/timetable';
import { getAllClasses } from '../../services/classes';
import { getUsers } from '../../services/users';
import LoadingState from '@/components/shared/LoadingState';

const EditTimetable = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [timetableData, setTimetableData] = useState({
        classes: '',
        teacher: '',
        day: '',
        startTime: '',
        endTime: '',
        subject: ''
    });
    const [classes, setClasses] = useState([]);
    const [teachers, setTeachers] = useState([]);

    useEffect(() => {
        const fetchTimetableAndClasses = async () => {
            try {
                const timetableResponse = await getOneTimetable(id);
                const classesResponse = await getAllClasses();
                const teachersResponse = await getUsers();

                setTimetableData(timetableResponse.data);
                setClasses(classesResponse.data);
                setTeachers(teachersResponse.data.filter(user => user.role === 'teacher'));
            } catch (error) {
                console.error('Error fetching timetable or classes:', error);
                setError('Failed to fetch timetable or classes');
            } finally {
                setLoading(false);
            }
        };

        fetchTimetableAndClasses();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Validate form fields
        if (!timetableData.classes || !timetableData.teacher || !timetableData.day || !timetableData.startTime || !timetableData.endTime || !timetableData.subject) {
            setError('All fields are required');
            return;
        }

        try {
            setLoading(true);
            const { ...payload } = timetableData; // Destructure to remove _id ... i removed _id from the declarations of timetableData...
            await updateTimetable(id, payload); // Send the payload without _id
            navigate('/admin/timetable');
        } catch (error) {
            console.error('Error updating timetable:', error);
            setError(error.response?.data?.message || 'Failed to update timetable');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTimetableData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    if (loading) return <div><LoadingState /></div>;

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Edit Timetable Entry</h2>
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                    {error}
                </div>
            )}
            <form onSubmit={handleSubmit} className="max-w-lg">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Class</label>
                        <select
                            name="classes"
                            value={timetableData.classes}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 "
                            required
                        >
                            <option value="">Select a class...</option>
                            {classes.map(classItem => (
                                <option key={classItem._id} value={classItem._id}>
                                    {classItem.classNumber} - {classItem.classCategory}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Teacher</label>
                        <select
                            name="teacher"
                            value={timetableData.teacher}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 "
                            required
                        >
                            <option value="">Select a teacher...</option>
                            {teachers.map(teacher => (
                                <option key={teacher._id} value={teacher._id}>
                                    {teacher.firstName} {teacher.lastName}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Day</label>
                        <select
                            name="day"
                            value={timetableData.day}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 "
                            required
                        >
                            <option value="">Select a day...</option>
                            <option value="monday">Monday</option>
                            <option value="tuesday">Tuesday</option>
                            <option value="wednesday">Wednesday</option>
                            <option value="thursday">Thursday</option>
                            <option value="friday">Friday</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Start Time</label>
                        <input
                            type="time"
                            name="startTime"
                            value={timetableData.startTime}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 "
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">End Time</label>
                        <input
                            type="time"
                            name="endTime"
                            value={timetableData.endTime}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 "
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Subject</label>
                        <input
                            type="text"
                            name="subject"
                            value={timetableData.subject}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 "
                            required
                        />
                    </div>
                </div>

                <div className="mt-6 flex gap-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        {loading ? 'Updating...' : 'Update Timetable'}
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate('/admin/timetable')}
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditTimetable;