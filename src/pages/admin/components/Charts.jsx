import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const Charts = () => {
    // Sample data for charts
    const studentEnrollmentData = [
        { month: 'Jan', students: 30 },
        { month: 'Feb', students: 50 },
        { month: 'Mar', students: 70 },
        { month: 'Apr', students: 40 },
        { month: 'May', students: 60 },
    ];

    const attendanceData = [
        { class: 'Class A', attendance: 95 },
        { class: 'Class B', attendance: 80 },
        { class: 'Class C', attendance: 85 },
    ];

    const genderDistributionData = [
        { name: 'Male', value: 60 },
        { name: 'Female', value: 40 },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold">Student Enrollment Trends</h3>
                <LineChart width={500} height={300} data={studentEnrollmentData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="students" stroke="#8884d8" />
                </LineChart>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold">Attendance Comparison</h3>
                <BarChart width={500} height={300} data={attendanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="class" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="attendance" fill="#82ca9d" />
                </BarChart>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold">Gender Distribution</h3>
                <PieChart width={400} height={400}>
                    <Pie
                        data={genderDistributionData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        label
                    >
                        {genderDistributionData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={index === 0 ? '#0088FE' : '#FFBB28'} />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </div>
        </div>
    );
};

export default Charts; 