import React from 'react';
import { Bell, BookOpen, Calendar } from 'lucide-react';

const TeacherDashboard = () => {
  // Hard-coded data for demonstration
  const upcomingClasses = [
    { subject: 'Mathematics', time: '9:00 AM - 10:30 AM', date: 'Monday, Oct 2' },
    { subject: 'Physics', time: '11:00 AM - 12:30 PM', date: 'Monday, Oct 2' },
    { subject: 'English Literature', time: '1:00 PM - 2:30 PM', date: 'Tuesday, Oct 3' },
  ];

  const recentAssignments = [
    { title: 'Math Homework', dueDate: 'Oct 5', status: 'Pending' },
    { title: 'Physics Lab Report', dueDate: 'Oct 7', status: 'Submitted' },
  ];

  const notifications = [
    { message: 'New student registered: John Doe', timestamp: 'Oct 1, 2023' },
    { message: 'Class schedule updated for next week', timestamp: 'Oct 1, 2023' },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Welcome to the Teacher Dashboard!</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <h3 className="text-lg font-semibold mb-4">Upcoming Classes</h3>
          {upcomingClasses.length === 0 ? (
            <p>No upcoming classes.</p>
          ) : (
            upcomingClasses.map((cls, index) => (
              <div key={index} className="flex justify-between mb-2">
                <div>
                  <p className="font-semibold">{cls.subject}</p>
                  <p className="text-sm text-gray-500">{cls.date} | {cls.time}</p>
                </div>
                <Calendar className="w-5 h-5 text-gray-500" />
              </div>
            ))
          )}
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <h3 className="text-lg font-semibold mb-4">Recent Assignments</h3>
          {recentAssignments.length === 0 ? (
            <p>No recent assignments.</p>
          ) : (
            recentAssignments.map((assignment, index) => (
              <div key={index} className="flex justify-between mb-2">
                <div>
                  <p className="font-semibold">{assignment.title}</p>
                  <p className="text-sm text-gray-500">Due: {assignment.dueDate} | Status: {assignment.status}</p>
                </div>
                <BookOpen className="w-5 h-5 text-gray-500" />
              </div>
            ))
          )}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
        <h3 className="text-lg font-semibold mb-4">Notifications</h3>
        {notifications.length === 0 ? (
          <p>No notifications.</p>
        ) : (
          notifications.map((notification, index) => (
            <div key={index} className="flex justify-between mb-2">
              <p className="text-gray-700 dark:text-gray-300">{notification.message}</p>
              <span className="text-sm text-gray-500">{notification.timestamp}</span>
              <Bell className="w-5 h-5 text-gray-500" />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TeacherDashboard;