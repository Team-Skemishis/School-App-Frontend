import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getOneAssignment, updateAssignment } from '../../services/assignments';
import { Upload, FileText } from 'lucide-react';

const EditAssignment = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [currentFileName, setCurrentFileName] = useState('');
    const [assignmentData, setAssignmentData] = useState({
        title: '',
        questions: '',
        deadline: ''
    });

    useEffect(() => {
        const fetchAssignment = async () => {
            try {
                const response = await getOneAssignment(id);
                const assignment = response.data;
                setAssignmentData({
                    title: assignment.title,
                    questions: assignment.questions,
                    deadline: new Date(assignment.deadline).toISOString().split('T')[0]
                });
                if (assignment.file) {
                    setCurrentFileName(assignment.file);
                }
            } catch (error) {
                console.error('Error fetching assignment:', error);
                setError('Failed to fetch assignment details');
            } finally {
                setLoading(false);
            }
        };

        fetchAssignment();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (new Date(assignmentData.deadline) < new Date()) {
            setError('Deadline must be in the future');
            return;
        }

        try {
            setLoading(true);
            const payload = {
                ...assignmentData,
                file: selectedFile
            };
            await updateAssignment(id, payload);
            navigate('/teacher/assignments');
        } catch (error) {
            console.error('Error updating assignment:', error);
            setError(error.response?.data?.message || 'Failed to update assignment');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAssignmentData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
    };

    const getMinDate = () => {
        const today = new Date();
        return today.toISOString().split('T')[0];
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Edit Assignment</h2>
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
                            Assignment Title
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={assignmentData.title}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Questions/Instructions
                        </label>
                        <textarea
                            name="questions"
                            value={assignmentData.questions}
                            onChange={handleChange}
                            rows="6"
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Deadline
                        </label>
                        <input
                            type="date"
                            name="deadline"
                            value={assignmentData.deadline}
                            onChange={handleChange}
                            min={getMinDate()}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Attachment
                        </label>
                        {currentFileName && !selectedFile && (
                            <div className="flex items-center gap-2 mb-2 p-2 bg-gray-50 dark:bg-gray-700 rounded">
                                <FileText className="w-5 h-5 text-blue-500" />
                                <span className="text-sm text-gray-600 dark:text-gray-300">
                                    Current file: {currentFileName}
                                </span>
                            </div>
                        )}
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                            <div className="space-y-1 text-center">
                                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                                <div className="flex text-sm text-gray-600">
                                    <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                                        <span>Upload a new file</span>
                                        <input
                                            type="file"
                                            className="sr-only"
                                            onChange={handleFileChange}
                                        />
                                    </label>
                                    <p className="pl-1">or drag and drop</p>
                                </div>
                                <p className="text-xs text-gray-500">
                                    PDF, DOC, DOCX up to 10MB
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
                        onClick={() => navigate('/teacher/assignments')}
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditAssignment; 