import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const Charts = () => {
    // Sample data for charts
    const studentEnrollmentData = [
        { month: 'Jan', students: 23 },
        { month: 'Feb', students: 18 },
        { month: 'Mar', students: 38 },
        { month: 'Apr', students: 34 },
        { month: 'May', students: 53 },
        { month: 'Jun', students: 30 },
        { month: 'Jul', students: 50 },
        { month: 'Aug', students: 59 },
        { month: 'Sep', students: 40 },
        { month: 'Oct', students: 60 },
        { month: 'Nov', students: 54 },
        { month: 'Dec', students: 72 },
    ];

    const attendanceData = [
        { class: 'JHS 3', attendance: 95 },
        { class: 'Primary 6', attendance: 80 },
        { class: 'SHS 1', attendance: 85 },
    ];

    const genderDistributionData = [
        { name: 'Male', value: 184 },
        { name: 'Female', value: 290 },
    ];

    return (
        <div className="flex flex-col gap-5">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                <h3 className="text-xl mb-5 font-semibold">Student Enrollment Trends</h3>
                <LineChart width={930} height={300} data={studentEnrollmentData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="students" stroke="#8884d8" />
                </LineChart>
            </div>
            <div className='grid gap-4 mb-6 grid-cols-3'>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow col-span-2">
                    <h3 className="text-xl mb-5 font-semibold">Attendance Comparison</h3>
                    <BarChart width={600} height={300} data={attendanceData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="class" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="attendance" fill="#82ca9d" />
                    </BarChart>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow col-span-1">
                    <h3 className="text-xl mb-5 font-semibold">Gender Distribution</h3>
                    <PieChart width={200} height={200}>
                        <Pie
                            data={genderDistributionData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
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
        </div>
    );
};

export default Charts; 