import React, { useState } from 'react';
import { Table } from '../../components/shared/Table';
import { BarChart, ChevronDown } from 'lucide-react';

const StudentGrades = () => {
  const [selectedSemester, setSelectedSemester] = useState('Spring 2024');

  const grades = [
    {
      id: 1,
      subject: 'Mathematics',
      assignments: 92,
      midterm: 88,
      final: 90,
      overall: 'A-',
      teacher: 'Dr. Smith',
    },
    {
      id: 2,
      subject: 'Physics',
      assignments: 85,
      midterm: 78,
      final: 88,
      overall: 'B+',
      teacher: 'Prof. Johnson',
    },
    {
      id: 3,
      subject: 'English Literature',
      assignments: 95,
      midterm: 92,
      final: 94,
      overall: 'A',
      teacher: 'Ms. Davis',
    },
  ];

  const columns = [
    { header: 'Subject', accessor: 'subject' },
    { header: 'Assignments (%)', accessor: 'assignments' },
    { header: 'Midterm (%)', accessor: 'midterm' },
    { header: 'Final (%)', accessor: 'final' },
    { 
      header: 'Overall Grade', 
      accessor: 'overall',
      cell: (row) => (
        <span className={`px-2 py-1 rounded-full text-xs font-semibold
          ${row.overall.startsWith('A') ? 'bg-green-100 text-green-800' :
            row.overall.startsWith('B') ? 'bg-blue-100 text-blue-800' :
            'bg-yellow-100 text-yellow-800'}`}>
          {row.overall}
        </span>
      ),
    },
    { header: 'Teacher', accessor: 'teacher' },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">My Grades</h1>
        
        {/* Semester Selector */}
        <div className="relative">
          <select
            value={selectedSemester}
            onChange={(e) => setSelectedSemester(e.target.value)}
            className="appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Spring 2024">Spring 2024</option>
            <option value="Fall 2023">Fall 2023</option>
            <option value="Spring 2023">Spring 2023</option>
          </select>
          <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        </div>
      </div>

      {/* GPA Summary */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">Current GPA</p>
            <p className="text-3xl font-bold text-gray-800 dark:text-white mt-1">3.75</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">Cumulative GPA</p>
            <p className="text-3xl font-bold text-gray-800 dark:text-white mt-1">3.82</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">Credits Completed</p>
            <p className="text-3xl font-bold text-gray-800 dark:text-white mt-1">45</p>
          </div>
        </div>
      </div>

      {/* Grades Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
              Course Grades
            </h2>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors">
              <BarChart className="w-4 h-4" />
              View Analytics
            </button>
          </div>
          <Table 
            data={grades}
            columns={columns}
          />
        </div>
      </div>
    </div>
  );
};

export default StudentGrades; 