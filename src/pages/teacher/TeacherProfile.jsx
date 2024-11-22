import React, { useState, useEffect } from 'react';
import { useUser } from '../../context/UserContext';
import { getOneUser } from '../../services/users';
import { Mail, User as UserIcon, Key, X } from 'lucide-react';
import { changePassword } from '../../services/auth';
import LoadingState from '@/components/shared/LoadingState';

const TeacherProfile = () => {
    const { user } = useUser();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [profileData, setProfileData] = useState(null);
    const [showPasswordModal, setShowPasswordModal] = useState(false);

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

    const PasswordChangeModal = () => {
        const [localPasswordData, setLocalPasswordData] = useState({
            currentPassword: '',
            newPassword: '',
            confirmNewPassword: ''
        });
        const [localError, setLocalError] = useState('');
        const [localSuccess, setLocalSuccess] = useState('');

        const handleLocalSubmit = async (e) => {
            e.preventDefault();
            setLocalError('');
            setLocalSuccess('');

            // Validate passwords
            if (!localPasswordData.currentPassword) {
                setLocalError('Current password is required');
                return;
            }
            if (!localPasswordData.newPassword) {
                setLocalError('New password is required');
                return;
            }
            if (localPasswordData.newPassword.length < 6) {
                setLocalError('New password must be at least 6 characters long');
                return;
            }
            if (localPasswordData.newPassword !== localPasswordData.confirmNewPassword) {
                setLocalError('New passwords do not match');
                return;
            }

            try {
                const passwordPayload = {
                    currentPassword: localPasswordData.currentPassword,
                    newPassword: localPasswordData.newPassword,
                    confirmNewPassword: localPasswordData.confirmNewPassword
                };

                console.log('Sending password data:', passwordPayload); // Debug log

                await changePassword(passwordPayload);
                setLocalSuccess('Password changed successfully');
                setLocalPasswordData({
                    currentPassword: '',
                    newPassword: '',
                    confirmNewPassword: ''
                });
                setTimeout(() => {
                    setShowPasswordModal(false);
                    setLocalSuccess('');
                }, 2000);
            } catch (error) {
                console.error('Error changing password:', error);
                setLocalError(error.response?.data?.message || 'Failed to change password');
            }
        };

        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6 relative">
                    <button
                        onClick={() => setShowPasswordModal(false)}
                        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Change Password</h3>

                    {localError && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                            {localError}
                        </div>
                    )}

                    {localSuccess && (
                        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
                            {localSuccess}
                        </div>
                    )}

                    <form onSubmit={handleLocalSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Current Password
                            </label>
                            <input
                                type="password"
                                value={localPasswordData.currentPassword}
                                onChange={(e) => setLocalPasswordData(prev => ({
                                    ...prev,
                                    currentPassword: e.target.value
                                }))}
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                New Password
                            </label>
                            <input
                                type="password"
                                value={localPasswordData.newPassword}
                                onChange={(e) => setLocalPasswordData(prev => ({
                                    ...prev,
                                    newPassword: e.target.value
                                }))}
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Confirm New Password
                            </label>
                            <input
                                type="password"
                                value={localPasswordData.confirmNewPassword}
                                onChange={(e) => setLocalPasswordData(prev => ({
                                    ...prev,
                                    confirmNewPassword: e.target.value
                                }))}
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Change Password
                        </button>
                    </form>
                </div>
            </div>
        );
    };

    if (loading) return <div><LoadingState /></div>;
    if (!profileData) return <div>Profile not found</div>;

    return (
        <div className="p-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                <div className="p-8">
                    <div className="flex justify-between items-start mb-6">
                        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">My Profile</h1>
                        <button
                            onClick={() => setShowPasswordModal(true)}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            <Key className="w-4 h-4" />
                            Change Password
                        </button>
                    </div>

                    {error && !showPasswordModal && (
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

            {showPasswordModal && <PasswordChangeModal />}
        </div>
    );
};

export default TeacherProfile;