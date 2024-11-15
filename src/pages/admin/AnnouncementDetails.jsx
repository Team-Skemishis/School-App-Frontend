import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getOneAnnouncement, deleteAnnouncement } from '../../services/announcements';
import { getOneUser } from '../../services/users';
import { Calendar, Clock, Users } from 'lucide-react';

const AnnouncementDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [announcement, setAnnouncement] = useState(null);
    const [creator, setCreator] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchAnnouncementAndCreator = async () => {
            try {
                const announcementResponse = await getOneAnnouncement(id);
                setAnnouncement(announcementResponse.data);

                // Fetch creator details if announcement has a creator
                if (announcementResponse.data.createdBy) {
                    try {
                        const creatorResponse = await getOneUser(announcementResponse.data.createdBy);
                        setCreator(creatorResponse.data);
                    } catch (error) {
                        console.error('Error fetching creator details:', error);
                    }
                }
            } catch (error) {
                console.error('Error fetching announcement details:', error);
                setError('Failed to fetch announcement details');
            } finally {
                setLoading(false);
            }
        };

        fetchAnnouncementAndCreator();
    }, [id]);

    const handleDeleteAnnouncement = async () => {
        if (window.confirm('Are you sure you want to delete this announcement? This action cannot be undone.')) {
            try {
                setLoading(true);
                await deleteAnnouncement(id);
                navigate('/admin/announcements');
            } catch (error) {
                console.error('Error deleting announcement:', error);
                setError('Failed to delete announcement');
            } finally {
                setLoading(false);
            }
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getUserTypeColor = (userType) => {
        switch (userType) {
            case 'all':
                return 'bg-blue-100 text-blue-800';
            case 'teachers':
                return 'bg-green-100 text-green-800';
            case 'students':
                return 'bg-purple-100 text-purple-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    if (loading) return <div>Loading...</div>;
    if (!announcement) return <div>Announcement not found</div>;

    return (
        <div className="p-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                {/* Cover Image */}
                {announcement.coverImage && (
                    <div className="w-full h-64 relative">
                        <img
                            src={`https://savefiles.org/${announcement.coverImage}?shareable_link=484`}
                            alt="Announcement cover"
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}

                <div className="p-6">
                    {/* Header Section */}
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                                {announcement.title}
                            </h1>
                            <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                                <div className="flex items-center gap-1">
                                    <Calendar className="w-4 h-4" />
                                    <span>{formatDate(announcement.createdAt)}</span>
                                </div>
                                {creator && (
                                    <div className="flex items-center gap-1">
                                        <Clock className="w-4 h-4" />
                                        <span>Posted by {creator.firstName} {creator.lastName}</span>
                                    </div>
                                )}
                                <div className="flex items-center gap-1">
                                    <Users className="w-4 h-4" />
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getUserTypeColor(announcement.userType)}`}>
                                        {announcement.userType}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3">
                            <button
                                onClick={() => navigate(`/admin/announcements/edit/${id}`)}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Edit
                            </button>
                            <button
                                onClick={handleDeleteAnnouncement}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                            >
                                Delete
                            </button>
                        </div>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                            {error}
                        </div>
                    )}

                    {/* Content */}
                    <div className="prose dark:prose-invert max-w-none">
                        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 mt-6">
                            <p className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
                                {announcement.content}
                            </p>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <button
                            onClick={() => navigate('/admin/announcements')}
                            className="text-blue-600 dark:text-blue-400 hover:underline"
                        >
                            ← Back to Announcements
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnnouncementDetails; 