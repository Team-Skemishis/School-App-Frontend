import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getOneTimetable } from '../../services/timetable';
import { getOneClass } from '../../services/classes';
import { getOneUser } from '../../services/users';
import { Edit, Trash } from 'lucide-react';
import { deleteTimetable } from '../../services/timetable';
import LoadingState from '@/components/shared/LoadingState';

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

    const handleDeleteTimetable = async () => {
        if (window.confirm('Are you sure you want to delete this timetable entry? This action cannot be undone.')) {
            try {
                setLoading(true);
                // Call your delete timetable API here
                await deleteTimetable(id); // Ensure you have this function in your timetable service
                navigate('/admin/timetable');
            } catch (error) {
                console.error('Error deleting timetable:', error);
                setError('Failed to delete timetable');
            } finally {
                setLoading(false);
            }
        }
    };

    if (loading) return <div><LoadingState /></div>;
    
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
                <p><strong>Day:</strong> {timetableEntry.day.charAt(0).toUpperCase() + timetableEntry.day.slice(1)}</p>
                <p><strong>Time:</strong> {timetableEntry.startTime} - {timetableEntry.endTime}</p>

                <div className="flex justify-end gap-2 mt-4">
                    <button
                        onClick={() => navigate(`/admin/timetable/edit/${id}`)}
                        className="text-green-600 hover:text-green-700"
                    >
                        <Edit className="w-5 h-5" />
                    </button>
                    <button
                        onClick={handleDeleteTimetable}
                        className="text-red-600 hover:text-red-700"
                    >
                        <Trash className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TimetableDetails; 