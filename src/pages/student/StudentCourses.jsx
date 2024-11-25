import React, { useState } from 'react';
import { Book, Users, Clock } from 'lucide-react';

const StudentCourses = () => {
  const [courses] = useState([
    {
      id: 1,
      name: 'Advanced Mathematics',
      teacher: 'Dr. Smith',
      schedule: 'Mon, Wed, Fri - 9:00 AM',
      progress: 75,
      students: 30,
      description: 'Advanced calculus and mathematical analysis',
    },
    {
      id: 2,
      name: 'Physics',
      teacher: 'Prof. Johnson',
      schedule: 'Tue, Thu - 11:00 AM',
      progress: 60,
      students: 25,
      description: 'Classical mechanics and thermodynamics',
    },
    {
      id: 3,
      name: 'English Literature',
      teacher: 'Ms. Davis',
      schedule: 'Mon, Wed - 2:00 PM',
      progress: 90,
      students: 28,
      description: 'Analysis of classic literature and composition',
    },
  ]);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">My Courses</h1>
        <div className="flex gap-4">
          <input
            type="search"
            placeholder="Search courses..."
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 "
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-shadow"
          >
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                {course.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                {course.description}
              </p>

              <div className="space-y-3">
                <div className="flex items-center text-gray-600 dark:text-gray-300">
                  <Users className="w-5 h-5 mr-2" />
                  <span>Teacher: {course.teacher}</span>
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-300">
                  <Clock className="w-5 h-5 mr-2" />
                  <span>{course.schedule}</span>
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-300">
                  <Book className="w-5 h-5 mr-2" />
                  <span>{course.students} Students</span>
                </div>
              </div>

              <div className="mt-4">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Course Progress
                  </span>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {course.progress}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="mt-6">
                <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  View Course Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentCourses; 