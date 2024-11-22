import React, { useState, useEffect } from 'react';
import { getAttendanceByClassID } from '../../services/attendance';
import { getOneUser } from '../../services/users';
import { getOneClass } from '../../services/classes';
import { useParams } from 'react-router-dom';
import LoadingState from '@/components/shared/LoadingState';

const GetAttendance = () => {
    const { classID } = useParams(); // Assuming classID is passed as a URL parameter
    const [attendanceRecords, setAttendanceRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [studentNames, setStudentNames] = useState({});

    useEffect(() => {
        const fetchAttendance = async () => {
            try {
                const response = await getAttendanceByClassID(classID);
                setAttendanceRecords(response.data);

                // Fetch student names
                const studentData = {};
                for (const record of response.data) {
                    if (record.studentID && !studentData[record.studentID]) {
                        const studentResponse = await getOneUser(record.studentID);
                        studentData[record.studentID] = `${studentResponse.data.firstName} ${studentResponse.data.lastName}`;
                    }
                }
                setStudentNames(studentData);
            } catch (error) {
                console.error('Error fetching attendance:', error);
                setError('Failed to fetch attendance records');
            } finally {
                setLoading(false);
            }
        };

        fetchAttendance();
    }, [classID]);

    if (loading) return <div><LoadingState /></div>;

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Attendance Records for Class ID: {classID}</h2>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                    {error}
                </div>
            )}

            <div className="grid gap-6">
                {attendanceRecords.length === 0 ? (
                    <div className="text-center py-8 bg-white dark:bg-gray-800 rounded-lg shadow">
                        <p className="text-gray-600 dark:text-gray-400">No attendance records available for this class.</p>
                    </div>
                ) : (
                    attendanceRecords.map(record => (
                        <div key={record._id} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                                {studentNames[record.studentID] || 'Unknown Student'}
                            </h3>
                            <p><strong>Status:</strong> {record.status}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default GetAttendance;