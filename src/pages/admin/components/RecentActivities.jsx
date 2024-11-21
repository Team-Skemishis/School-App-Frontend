import React from 'react';

const RecentActivities = () => {
    // Sample recent activities data
    const activities = [
        { id: 1, message: 'New student registration: John Doe', timestamp: '2023-10-01 10:00 AM' },
        { id: 2, message: 'Teacher approval: Jane Smith', timestamp: '2023-10-01 09:30 AM' },
        { id: 3, message: 'Attendance issue reported for Class A', timestamp: '2023-10-01 09:00 AM' },
    ];

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-6">
            <h3 className="text-lg font-semibold mb-4">Recent Activities</h3>
            <ul className="space-y-2">
                {activities.map(activity => (
                    <li key={activity.id} className="text-gray-700 dark:text-gray-300">
                        {activity.message} <span className="text-gray-500">({activity.timestamp})</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RecentActivities; 