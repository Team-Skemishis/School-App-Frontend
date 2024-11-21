import React, { useState, useEffect } from 'react';
import { getAllAnnouncements } from '../../services/announcements';
import { Calendar, Clock } from 'lucide-react';

const StudentAnnouncements = () => {
    const [announcements, setAnnouncements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchAnnouncements();
    }, []);

    const fetchAnnouncements = async () => {
        try {
            setLoading(true);
            const response = await getAllAnnouncements();
            // Filter announcements for students (userType: 'all' or 'students')
            const studentAnnouncements = response.data.filter(
                announcement => announcement.userType === 'all' || announcement.userType === 'students'
            );
            setAnnouncements(studentAnnouncements);
        } catch (error) {
            console.error('Error fetching announcements:', error);
            setError('Failed to fetch announcements');
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Announcements</h2>
            
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                    {error}
                </div>
            )}

            <div className="space-y-6">
                {announcements.length === 0 ? (
                    <div className="text-center py-8 bg-white dark:bg-gray-800 rounded-lg shadow">
                        <p className="text-gray-600 dark:text-gray-400">No announcements available.</p>
                    </div>
                ) : (
                    announcements.map(announcement => (
                        <div 
                            key={announcement._id}
                            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
                        >
                            {announcement.coverImage && (
                                <img
                                    src={`https://savefiles.org/${announcement.coverImage}?shareable_link=521`}
                                    alt="Announcement cover"
                                    className="w-full h-48 object-cover"
                                />
                            )}
                            <div className="p-6">
                                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                                    {announcement.title}
                                </h3>
                                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                                    <div className="flex items-center gap-1">
                                        <Calendar className="w-4 h-4" />
                                        <span>{formatDate(announcement.createdAt)}</span>
                                    </div>
                                </div>
                                <p className="text-gray-600 dark:text-gray-300 mb-4 whitespace-pre-wrap">
                                    {announcement.content}
                                </p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default StudentAnnouncements; 