import React, { useState, useEffect } from 'react';
import { useUser } from '../../context/UserContext';
import { getOneUser } from '../../services/users';
import { Edit, Mail, User as UserIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminProfile = () => {
    const { user } = useUser();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [profileData, setProfileData] = useState(null);

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                if (user?._id) {
                    const response = await getOneUser(user._id);
                    setProfileData(response.data);
                }
            } catch (error) {
                console.error('Error fetching profile:', error);
                setError('Failed to fetch profile data');
            } finally {
                setLoading(false);
            }
        };

        fetchProfileData();
    }, [user?._id]);

    if (loading) return <div>Loading...</div>;
    if (!profileData) return <div>Profile not found</div>;

    return (
        <div className="p-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                <div className="p-8">
                    <div className="flex justify-between items-start mb-6">
                        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">My Profile</h1>
                        <button
                            onClick={() => navigate('/admin/profile/edit')}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            <Edit className="w-4 h-4" />
                            Edit Profile
                        </button>
                    </div>

                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                            {error}
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Profile Picture */}
                        <div className="col-span-1">
                            <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-blue-600 mx-auto">
                                {profileData.avatar ? (
                                    <img
                                        src={`https://savefiles.org/${profileData.avatar}?shareable_link=484`}
                                        alt="Profile"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                                        <UserIcon className="w-24 h-24 text-gray-400" />
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Basic Information */}
                        <div className="col-span-2 space-y-6">
                            <div>
                                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                                    Basic Information
                                </h2>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm text-gray-500 dark:text-gray-400">First Name</label>
                                        <p className="text-gray-800 dark:text-white font-medium">{profileData.firstName}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm text-gray-500 dark:text-gray-400">Last Name</label>
                                        <p className="text-gray-800 dark:text-white font-medium">{profileData.lastName}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm text-gray-500 dark:text-gray-400">Email</label>
                                        <div className="flex items-center gap-2">
                                            <Mail className="w-4 h-4 text-gray-400" />
                                            <p className="text-gray-800 dark:text-white font-medium">{profileData.email}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-sm text-gray-500 dark:text-gray-400">Role</label>
                                        <p className="text-gray-800 dark:text-white font-medium capitalize">{profileData.role}</p>
                                    </div>
                                    {profileData.schoolName && (
                                        <div className="col-span-2">
                                            <label className="text-sm text-gray-500 dark:text-gray-400">School Name</label>
                                            <p className="text-gray-800 dark:text-white font-medium">{profileData.schoolName}</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Account Information */}
                            <div>
                                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                                    Account Information
                                </h2>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm text-gray-500 dark:text-gray-400">Account Created</label>
                                        <p className="text-gray-800 dark:text-white font-medium">
                                            {new Date(profileData.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <div>
                                        <label className="text-sm text-gray-500 dark:text-gray-400">Last Updated</label>
                                        <p className="text-gray-800 dark:text-white font-medium">
                                            {new Date(profileData.updatedAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminProfile;