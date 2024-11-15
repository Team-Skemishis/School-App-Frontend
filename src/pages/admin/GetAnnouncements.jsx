import React, { useState, useEffect } from 'react';
import { getAllAnnouncements, deleteAnnouncement } from '../../services/announcements';
import { Eye, Edit, Trash, ArrowUpDown, Plus, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getOneUser } from '../../services/users';

const GetAnnouncements = () => {
    const [announcements, setAnnouncements] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: 'createdAt', direction: 'descending' });
    const [currentPage, setCurrentPage] = useState(1);
    const [creatorNames, setCreatorNames] = useState({});
    const announcementsPerPage = 4;
    const navigate = useNavigate();
    const [selectedUserType, setSelectedUserType] = useState('all');

    const userTypes = [
        { value: 'all', label: 'All Announcements' },
        { value: 'teachers', label: 'Teachers Only' },
        { value: 'students', label: 'Students Only' }
    ];

    useEffect(() => {
        fetchAnnouncements();
    }, []);

    const fetchAnnouncements = async () => {
        try {
            setLoading(true);
            const response = await getAllAnnouncements();
            setAnnouncements(response.data);

            // Fetch creator names
            const creatorData = {};
            for (const announcement of response.data) {
                if (announcement.createdBy && !creatorData[announcement.createdBy]) {
                    try {
                        const userResponse = await getOneUser(announcement.createdBy);
                        creatorData[announcement.createdBy] = `${userResponse.data.firstName} ${userResponse.data.lastName}`;
                    } catch (error) {
                        console.error('Error fetching creator details:', error);
                        creatorData[announcement.createdBy] = 'Unknown User';
                    }
                }
            }
            setCreatorNames(creatorData);
        } catch (error) {
            console.error('Error fetching announcements:', error);
            setError('Failed to fetch announcements');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteAnnouncement = async (id) => {
        if (window.confirm('Are you sure you want to delete this announcement? This action cannot be undone.')) {
            try {
                setLoading(true);
                await deleteAnnouncement(id);
                await fetchAnnouncements();
            } catch (error) {
                console.error('Error deleting announcement:', error);
                setError('Failed to delete announcement');
            } finally {
                setLoading(false);
            }
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

    const filteredAnnouncements = announcements.filter(announcement => {
        if (selectedUserType === 'all') return true;
        return announcement.userType === selectedUserType;
    });

    if (loading) return <div>Loading...</div>;

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Announcements</h2>
                <button
                    onClick={() => navigate('/admin/announcements/add')}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                    <Plus className="w-5 h-5" />
                    New Announcement
                </button>
            </div>

            <div className="mb-6 flex items-center gap-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                <Filter className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                <div className="flex gap-2">
                    {userTypes.map(type => (
                        <button
                            key={type.value}
                            onClick={() => setSelectedUserType(type.value)}
                            className={`px-4 py-2 rounded-lg transition-colors ${
                                selectedUserType === type.value
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                            }`}
                        >
                            {type.label}
                        </button>
                    ))}
                </div>
            </div>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                    {error}
                </div>
            )}

            <div className="grid gap-6">
                {filteredAnnouncements.length === 0 ? (
                    <div className="text-center py-8 bg-white dark:bg-gray-800 rounded-lg shadow">
                        <p className="text-gray-600 dark:text-gray-400">
                            No announcements found for this filter.
                        </p>
                    </div>
                ) : (
                    filteredAnnouncements.map(announcement => (
                        <div key={announcement._id}
                            className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                                        {announcement.title}
                                    </h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Posted by {creatorNames[announcement.createdBy]} on {formatDate(announcement.createdAt)}
                                    </p>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getUserTypeColor(announcement.userType)}`}>
                                    {announcement.userType}
                                </span>
                            </div>

                            {announcement.coverImage && (
                                <img
                                    src={`https://savefiles.org/${announcement.coverImage}?shareable_link=485`}
                                    alt="Announcement cover"
                                    className="w-full h-48 object-cover rounded-lg mb-4 border-[0.1px]"
                                />
                            )}

                            <p className="text-gray-600 dark:text-gray-300 mb-4">
                                {announcement.content.length > 200
                                    ? `${announcement.content.substring(0, 200)}...`
                                    : announcement.content}
                            </p>

                            <div className="flex justify-end gap-2">
                                <button
                                    onClick={() => navigate(`/admin/announcements/${announcement._id}`)}
                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                                >
                                    <Eye className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={() => navigate(`/admin/announcements/edit/${announcement._id}`)}
                                    className="p-2 text-green-600 hover:bg-green-50 rounded-lg"
                                >
                                    <Edit className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={() => handleDeleteAnnouncement(announcement._id)}
                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                                >
                                    <Trash className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default GetAnnouncements;