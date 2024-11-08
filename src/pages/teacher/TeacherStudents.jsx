import React, { useState, useEffect } from 'react';
import { Table } from '../../components/shared/Table';

const TeacherStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch students data from API
    // Temporary mock data
    const mockStudents = [
      { id: 1, name: 'John Doe', email: 'john@example.com', grade: '10th', attendance: '95%' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', grade: '10th', attendance: '88%' },
    ];
    setStudents(mockStudents);
    setLoading(false);
  }, []);

  const columns = [
    { header: 'Name', accessor: 'name' },
    { header: 'Email', accessor: 'email' },
    { header: 'Grade', accessor: 'grade' },
    { header: 'Attendance', accessor: 'attendance' },
    {
      header: 'Actions',
      accessor: 'actions',
      cell: (row) => (
        <div className="flex gap-2">
          <button 
            onClick={() => handleViewDetails(row.id)}
            className="px-3 py-1 text-sm text-blue-600 hover:text-blue-800"
          >
            View Details
          </button>
          <button 
            onClick={() => handleMarkAttendance(row.id)}
            className="px-3 py-1 text-sm text-green-600 hover:text-green-800"
          >
            Mark Attendance
          </button>
        </div>
      ),
    },
  ];

  const handleViewDetails = (studentId) => {
    // TODO: Implement view details functionality
    console.log('View details for student:', studentId);
  };

  const handleMarkAttendance = (studentId) => {
    // TODO: Implement mark attendance functionality
    console.log('Mark attendance for student:', studentId);
  };

  if (loading) {
    return <div className="flex justify-center items-center h-full">Loading...</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">My Students</h1>
        <div className="flex gap-4">
          <input
            type="search"
            placeholder="Search students..."
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Export List
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <Table 
          data={students}
          columns={columns}
        />
      </div>
    </div>
  );
};

export default TeacherStudents; 