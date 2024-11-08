import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const TeacherSchedule = () => {
  const [currentWeek, setCurrentWeek] = useState(new Date());

  // Mock schedule data
  const scheduleData = {
    'Monday': [
      { time: '9:00 AM - 10:30 AM', subject: 'Mathematics', grade: '10th', room: 'Room 101' },
      { time: '11:00 AM - 12:30 PM', subject: 'Physics', grade: '11th', room: 'Room 203' },
    ],
    'Tuesday': [
      { time: '9:00 AM - 10:30 AM', subject: 'Mathematics', grade: '11th', room: 'Room 101' },
    ],
    'Wednesday': [
      { time: '9:00 AM - 10:30 AM', subject: 'Mathematics', grade: '10th', room: 'Room 101' },
      { time: '2:00 PM - 3:30 PM', subject: 'Physics', grade: '11th', room: 'Lab 2' },
    ],
    'Thursday': [
      { time: '11:00 AM - 12:30 PM', subject: 'Mathematics', grade: '11th', room: 'Room 101' },
    ],
    'Friday': [
      { time: '9:00 AM - 10:30 AM', subject: 'Mathematics', grade: '10th', room: 'Room 101' },
      { time: '11:00 AM - 12:30 PM', subject: 'Physics', grade: '11th', room: 'Room 203' },
    ],
  };

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  const getWeekDates = () => {
    const dates = [];
    const startOfWeek = new Date(currentWeek);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay() + 1);

    for (let i = 0; i < 5; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const navigateWeek = (direction) => {
    const newDate = new Date(currentWeek);
    newDate.setDate(currentWeek.getDate() + (direction === 'next' ? 7 : -7));
    setCurrentWeek(newDate);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Class Schedule</h1>
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigateWeek('prev')}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-gray-600 dark:text-gray-300">
            Week of {formatDate(getWeekDates()[0])}
          </span>
          <button
            onClick={() => navigateWeek('next')}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-4">
        {days.map((day, index) => (
          <div key={day} className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
            <div className="text-center mb-4">
              <p className="font-semibold text-gray-800 dark:text-white">{day}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {formatDate(getWeekDates()[index])}
              </p>
            </div>
            <div className="space-y-3">
              {scheduleData[day]?.map((schedule, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800"
                >
                  <p className="text-sm font-medium text-blue-800 dark:text-blue-200">
                    {schedule.time}
                  </p>
                  <p className="text-sm font-semibold text-gray-800 dark:text-white mt-1">
                    {schedule.subject}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {schedule.grade} • {schedule.room}
                  </p>
                </div>
              ))}
              {!scheduleData[day]?.length && (
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">
                  No classes scheduled
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeacherSchedule; 