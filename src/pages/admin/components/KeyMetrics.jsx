import React, { useEffect, useState } from 'react';
import { getUsers } from '../../../services/users';
import { getAllClasses } from '../../../services/classes';

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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold">Teachers</h3>
                <p className="text-2xl">{metrics.teachers}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold">Students</h3>
                <p className="text-2xl">{metrics.students}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold">Parents</h3>
                <p className="text-2xl">{metrics.parents}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold">Classes</h3>
                <p className="text-2xl">{metrics.classes}</p>
            </div>
        </div>
    );
};

export default KeyMetrics; 