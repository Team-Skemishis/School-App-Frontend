import React, { useEffect, useState } from 'react';
import { getUsers } from '../../../services/users';
import { getAllClasses } from '../../../services/classes';
import teacher from '../../../assets/images/teacherIcon.png'
import student from '../../../assets/images/studentIcon.png'
import parent from '../../../assets/images/parentIcon.png'
import classroom from '../../../assets/images/classroomIcon.png'


const KeyMetrics = () => {
    const [metrics, setMetrics] = useState({
        teachers: 0,
        students: 0,
        parents: 0,
        classes: 0,
    });

    useEffect(() => {
        const fetchMetrics = async () => {
            try {
                const teachersResponse = await getUsers();
                const classesResponse = await getAllClasses();

                setMetrics({
                    teachers: teachersResponse.data.filter(user => user.role === 'teacher').length,
                    students: teachersResponse.data.filter(user => user.role === 'student').length,
                    parents: teachersResponse.data.filter(user => user.role === 'parent').length,
                    classes: classesResponse.data.length,
                });
            } catch (error) {
                console.error('Error fetching metrics:', error);
            }
        };

        fetchMetrics();
    }, []);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow flex gap-5">
                <img src={teacher} alt="teacherIcon" className="w-16" />
                <div>
                    <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400">Teachers</h3>
                    <p className="text-3xl">{metrics.teachers}</p>
                </div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow flex gap-5">
                <img src={student} alt="studentIcon" className="w-16" />
                <div>
                    <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400">Students</h3>
                    <p className="text-3xl">{metrics.students}</p>
                </div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow flex gap-5">
                <img src={parent} alt="parentIcon" className="w-16" />
                <div>
                    <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400">Parents</h3>
                    <p className="text-3xl">{metrics.parents}</p>
                </div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow flex gap-5">
                <img src={classroom} alt="parentIcon" className="w-16" />
                <div>
                    <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400">Classes</h3>
                    <p className="text-3xl">{metrics.classes}</p>
                </div>
            </div>
        </div>
    );
};

export default KeyMetrics; 