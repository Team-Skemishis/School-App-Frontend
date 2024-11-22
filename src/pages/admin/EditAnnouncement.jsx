import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getOneAnnouncement, updateAnnouncement } from '../../services/announcements';
import { Upload, FileText } from 'lucide-react';
import LoadingState from '@/components/shared/LoadingState';

const EditAnnouncement = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [currentImage, setCurrentImage] = useState('');
    const [announcementData, setAnnouncementData] = useState({
        title: '',
        content: '',
        userType: ''
    });

    const userTypes = [
        { value: 'all', label: 'All Users' },
        { value: 'teachers', label: 'Teachers Only' },
        { value: 'students', label: 'Students Only' }
    ];

    useEffect(() => {
        const fetchAnnouncement = async () => {
            try {
                const response = await getOneAnnouncement(id);
                const announcement = response.data;
                setAnnouncementData({
                    title: announcement.title,
                    content: announcement.content,
                    userType: announcement.userType
                });
                if (announcement.coverImage) {
                    setCurrentImage(announcement.coverImage);
                }
            } catch (error) {
                console.error('Error fetching announcement:', error);
                setError('Failed to fetch announcement details');
            } finally {
                setLoading(false);
            }
        };

        fetchAnnouncement();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Validate form
        if (!announcementData.title.trim()) {
            setError('Title is required');
            return;
        }
        if (!announcementData.content.trim()) {
            setError('Content is required');
            return;
        }
        if (!announcementData.userType) {
            setError('Please select target audience');
            return;
        }

        try {
            setLoading(true);
            const payload = {
                ...announcementData,
                coverImage: selectedFile
            };
            await updateAnnouncement(id, payload);
            navigate('/admin/announcements');
        } catch (error) {
            console.error('Error updating announcement:', error);
            setError(error.response?.data?.message || 'Failed to update announcement');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAnnouncementData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Add file type validation
            const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg'];
            if (!allowedTypes.includes(file.type)) {
                setError('Please upload only image files (JPEG, PNG, GIF, JPG)');
                return;
            }
            // Add file size validation (e.g., 5MB limit)
            if (file.size > 5 * 1024 * 1024) {
                setError('File size should not exceed 5MB');
                return;
            }
            setSelectedFile(file);
            setError(''); // Clear any previous errors
        }
    };

    if (loading) return <div><LoadingState /></div>;

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Edit Announcement</h2>
            </div>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="max-w-2xl bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Title
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={announcementData.title}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Target Audience
                        </label>
                        <select
                            name="userType"
                            value={announcementData.userType}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            required
                        >
                            <option value="">Select target audience</option>
                            {userTypes.map(type => (
                                <option key={type.value} value={type.value}>
                                    {type.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Content
                        </label>
                        <textarea
                            name="content"
                            value={announcementData.content}
                            onChange={handleChange}
                            rows="6"
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Cover Image
                        </label>
                        {currentImage && !selectedFile && (
                            <div className="flex items-center gap-2 mb-2 p-2 bg-gray-50 dark:bg-gray-700 rounded">
                                <FileText className="w-5 h-5 text-blue-500" />
                                <span className="text-sm text-gray-600 dark:text-gray-300">
                                    Current image: {currentImage}
                                </span>
                            </div>
                        )}
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                            <div className="space-y-1 text-center">
                                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                                <div className="flex text-sm text-gray-600 dark:text-gray-400">
                                    <label className="relative cursor-pointer bg-white dark:bg-gray-700 rounded-md font-medium text-blue-600 hover:text-blue-500">
                                        <span>Upload a new image</span>
                                        <input
                                            type="file"
                                            className="sr-only"
                                            onChange={handleFileChange}
                                            accept="image/*"
                                        />
                                    </label>
                                    <p className="pl-1">or drag and drop</p>
                                </div>
                                <p className="text-xs text-gray-500">
                                    PNG, JPG, GIF up to 5MB
                                </p>
                            </div>
                        </div>
                        {selectedFile && (
                            <p className="mt-2 text-sm text-gray-500">
                                New file selected: {selectedFile.name}
                            </p>
                        )}
                    </div>
                </div>

                <div className="mt-6 flex gap-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400"
                    >
                        {loading ? 'Saving...' : 'Save Changes'}
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate('/admin/announcements')}
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditAnnouncement; 