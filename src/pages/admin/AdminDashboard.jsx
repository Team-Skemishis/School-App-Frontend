import React from 'react';
import KeyMetrics from './components/KeyMetrics';
import Charts from './components/Charts';
import RecentActivities from './components/RecentActivities';

const AdminDashboard = () => {
    return (
        <div className="p-5">
            <h2 className="text-2xl font-bold mb-6">Welcome to the Admin Dashboard!</h2>
            <KeyMetrics />
            <Charts />
            <RecentActivities />
        </div>
    );
};

export default AdminDashboard;