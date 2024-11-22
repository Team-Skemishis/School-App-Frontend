import React, { useState, useEffect } from 'react';
import { getAllClasses, deleteClass } from '../../services/classes';
import { Eye, Edit, Trash, ArrowUpDown, BookPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getOneUser } from '../../services/users';
import LoadingState from '@/components/shared/LoadingState';

const ManageClasses = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'ascending' });
  const [currentPage, setCurrentPage] = useState(1);
  const classesPerPage = 7;
  const navigate = useNavigate();
  const [teacherNames, setTeacherNames] = useState({});

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      setLoading(true);
      const response = await getAllClasses();
      setClasses(response.data);

      // Fetch teacher names for each class
      const teacherData = {};
      for (const classItem of response.data) {
        if (classItem.classTeacher) {
          try {
            const teacherResponse = await getOneUser(classItem.classTeacher);
            teacherData[classItem.classTeacher] = `${teacherResponse.data.firstName} ${teacherResponse.data.lastName}`;
          } catch (error) {
            console.error('Error fetching teacher:', error);
            teacherData[classItem.classTeacher] = 'Unknown Teacher';
          }
        }
      }
      setTeacherNames(teacherData);
    } catch (error) {
      console.error('Error fetching classes:', error);
      setError('Failed to fetch classes');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClass = async (classId) => {
    if (window.confirm('Are you sure you want to delete this class? This action cannot be undone.')) {
      try {
        setLoading(true);
        await deleteClass(classId);
        await fetchClasses();
        console.log('Class deleted successfully');
      } catch (error) {
        console.error('Error deleting class:', error);
        setError('Failed to delete class');
      } finally {
        setLoading(false);
      }
    }
  };

  const sortedClasses = React.useMemo(() => {
    let sortableClasses = [...classes];
    if (sortConfig !== null) {
      sortableClasses.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableClasses;
  }, [classes, sortConfig]);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Pagination
  const indexOfLastClass = currentPage * classesPerPage;
  const indexOfFirstClass = indexOfLastClass - classesPerPage;
  const currentClasses = sortedClasses.slice(indexOfFirstClass, indexOfLastClass);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) return <div><LoadingState /></div>;

  return (
    <div className="flex flex-col min-h-96 justify-between">
      <div>
        <h2 className="text-2xl font-bold mb-4">Manage Classes</h2>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            {error}
          </div>
        )}
        <table className="min-w-full bg-white dark:bg-gray-800 text-black dark:text-gray-200 shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-700">
              <th className="py-2 px-4 text-left cursor-pointer" onClick={() => requestSort('classNumber')}>
                <div className="flex items-center">
                  Class Number
                  <ArrowUpDown size={16} strokeWidth={1} className="ml-1" />
                </div>
              </th>
              <th className="py-2 px-4 text-left cursor-pointer" onClick={() => requestSort('classCategory')}>
                <div className="flex items-center">
                  Category
                  <ArrowUpDown size={16} strokeWidth={1} className="ml-1" />
                </div>
              </th>
              <th className="py-2 px-4 text-left cursor-pointer" onClick={() => requestSort('teacher')}>
                <div className="flex items-center">
                  Teacher
                  <ArrowUpDown size={16} strokeWidth={1} className="ml-1" />
                </div>
              </th>
              <th className="py-2 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentClasses.map(classItem => (
              <tr key={classItem._id} className="border-b border-gray-200 dark:border-gray-700">
                <td className="py-4 px-4">{classItem.classNumber}</td>
                <td className="py-4 px-4">{classItem.classCategory}</td>
                <td className="py-4 px-4">
                  {teacherNames[classItem.classTeacher] || 'No teacher assigned'}
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center space-x-2">
                    <button
                      className="text-blue-500 hover:text-blue-700"
                      onClick={() => navigate(`/admin/classes/${classItem._id}`)}
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                    <button
                      className="text-green-500 hover:text-green-700"
                      onClick={() => navigate(`/admin/classes/edit/${classItem._id}`)}
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDeleteClass(classItem._id)}
                      disabled={loading}
                    >
                      <Trash className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-center mt-4">
          {[...Array(Math.ceil(classes.length / classesPerPage)).keys()].map(number => (
            <button
              key={number}
              onClick={() => paginate(number + 1)}
              className={`mx-1 px-3 py-1 border ${currentPage === number + 1 ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'}`}
            >
              {number + 1}
            </button>
          ))}
        </div>
      </div>
      <div className="relative">
        <button
          onClick={() => navigate('/admin/classes/add')}
          className="absolute bottom-0 right-0 bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600 transition-colors"
        >
          <BookPlus className="w-7 h-7" />
        </button>
      </div>
    </div>
  );
};

export default ManageClasses; 