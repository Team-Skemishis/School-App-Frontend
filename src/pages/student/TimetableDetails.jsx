import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getOneTimetable } from '../../services/timetable';
import { getOneClass } from '../../services/classes';
import { getOneUser } from '../../services/users';

const TimetableDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [timetableEntry, setTimetableEntry] = useState(null);
    const [classData, setClassData] = useState(null);
    const [teacherData, setTeacherData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchTimetableEntry = async () => {
            try {
                const response = await getOneTimetable(id);
                setTimetableEntry(response.data);

                // Fetch class and teacher details
                if (response.data.classes) {
                    const classResponse = await getOneClass(response.data.classes);
                    setClassData(classResponse.data);
                }
                if (response.data.teacher) {
                    const teacherResponse = await getOneUser(response.data.teacher);
                    setTeacherData(teacherResponse.data);
                }
            } catch (error) {
                console.error('Error fetching timetable details:', error);
                setError('Failed to fetch timetable details');
            } finally {
                setLoading(false);
            }
        };

        fetchTimetableEntry();
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (!timetableEntry) return <div>Timetable entry not found</div>;

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Timetable Details</h2>
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                    {error}
                </div>
            )}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{timetableEntry.subject}</h3>
                <p><strong>Class:</strong> {classData ? `${classData.classNumber} - ${classData.classCategory}` : 'Unknown Class'}</p>
                <p><strong>Teacher:</strong> {teacherData ? `${teacherData.firstName} ${teacherData.lastName}` : 'Unknown Teacher'}</p>
                <p><strong>Day:</strong> {timetableEntry.day}</p>
                <p><strong>Time:</strong> {timetableEntry.startTime} - {timetableEntry.endTime}</p>
                <button
                    onClick={() => navigate('/student/timetable')}
                    className="mt-4 text-blue-600 hover:text-blue-700"
                >
                    Back to Timetable
                </button>
            </div>
        </div>
    );
};

export default TimetableDetails;