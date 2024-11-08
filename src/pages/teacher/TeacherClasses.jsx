import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Users } from 'lucide-react';

const TeacherClasses = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch classes data from API
    // Temporary mock data
    const mockClasses = [
      {
        id: 1,
        subject: 'Mathematics',
        grade: '10th',
        students: 25,
        schedule: 'Mon, Wed, Fri',
        time: '9:00 AM - 10:30 AM',
      },
      {
        id: 2,
        subject: 'Physics',
        grade: '11th',
        students: 20,
        schedule: 'Tue, Thu',
        time: '11:00 AM - 12:30 PM',
      },
    ];
    setClasses(mockClasses);
    setLoading(false);
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-full">Loading...</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">My Classes</h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Create New Class
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes.map((classItem) => (
          <div
            key={classItem.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
          >
            <h3 className="text-xl font-semibold mb-4">{classItem.subject}</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-2">Grade: {classItem.grade}</p>
            
            <div className="space-y-3 mt-4">
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <Users className="w-5 h-5 mr-2" />
                <span>{classItem.students} Students</span>
              </div>
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <Calendar className="w-5 h-5 mr-2" />
                <span>{classItem.schedule}</span>
              </div>
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <Clock className="w-5 h-5 mr-2" />
                <span>{classItem.time}</span>
              </div>
            </div>

            <div className="mt-6 flex gap-2">
              <button className="flex-1 px-4 py-2 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition-colors">
                View Details
              </button>
              <button className="flex-1 px-4 py-2 bg-green-100 text-green-600 rounded hover:bg-green-200 transition-colors">
                Take Attendance
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeacherClasses; 