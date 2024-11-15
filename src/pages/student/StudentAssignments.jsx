import React, { useState, useEffect } from 'react';
import { getAllAssignments } from '../../services/assignments';
import { Calendar, Clock, FileUp, FileDown, CheckCircle, XCircle } from 'lucide-react';
import { Upload } from 'lucide-react';

const StudentAssignments = () => {
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [submissionModal, setSubmissionModal] = useState(false);
    const [selectedAssignment, setSelectedAssignment] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetchAssignments();
    }, []);

    const fetchAssignments = async () => {
        try {
            setLoading(true);
            const response = await getAllAssignments();
            setAssignments(response.data);
        } catch (error) {
            console.error('Error fetching assignments:', error);
            setError('Failed to fetch assignments');
        } finally {
            setLoading(false);
        }
    };

    const handleDownload = (file) => {
        if (file) {
            const fileUrl = `${import.meta.env.VITE_BASE_URL}/uploads/${file}`;
            window.open(fileUrl, '_blank');
        }
    };

    const handleSubmitAssignment = async (e) => {
        e.preventDefault();
        if (!selectedFile) {
            setError('Please select a file to submit');
            return;
        }

        try {
            setSubmitting(true);
            // Add your submission API call here
            // await submitAssignment(selectedAssignment._id, selectedFile);
            setSubmissionModal(false);
            setSelectedFile(null);
            await fetchAssignments(); // Refresh assignments list
        } catch (error) {
            console.error('Error submitting assignment:', error);
            setError('Failed to submit assignment');
        } finally {
            setSubmitting(false);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Add file validation here
            const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
            if (!allowedTypes.includes(file.type)) {
                setError('Please upload only PDF or DOC/DOCX files');
                return;
            }
            if (file.size > 10 * 1024 * 1024) {
                setError('File size should not exceed 10MB');
                return;
            }
            setSelectedFile(file);
            setError('');
        }
    };

    const SubmissionModal = () => (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
                    Submit Assignment
                </h3>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmitAssignment}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Upload Your Work
                        </label>
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                            <div className="space-y-1 text-center">
                                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                                <div className="flex text-sm text-gray-600 dark:text-gray-400">
                                    <label className="relative cursor-pointer bg-white dark:bg-gray-700 rounded-md font-medium text-blue-600 hover:text-blue-500">
                                        <span>Upload a file</span>
                                        <input
                                            type="file"
                                            className="sr-only"
                                            onChange={handleFileChange}
                                            accept=".pdf,.doc,.docx"
                                        />
                                    </label>
                                    <p className="pl-1">or drag and drop</p>
                                </div>
                                <p className="text-xs text-gray-500">
                                    PDF, DOC up to 10MB
                                </p>
                            </div>
                        </div>
                        {selectedFile && (
                            <p className="mt-2 text-sm text-gray-500">
                                Selected file: {selectedFile.name}
                            </p>
                        )}
                    </div>

                    <div className="flex justify-end gap-4 mt-6">
                        <button
                            type="button"
                            onClick={() => {
                                setSubmissionModal(false);
                                setSelectedFile(null);
                            }}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-transparent rounded-md hover:bg-gray-200"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={submitting || !selectedFile}
                            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 disabled:bg-blue-400"
                        >
                            {submitting ? 'Submitting...' : 'Submit'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );

    if (loading) return <div>Loading...</div>;

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">My Assignments</h2>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                    {error}
                </div>
            )}

            <div className="grid gap-6">
                {assignments.length === 0 ? (
                    <div className="text-center py-8 bg-white dark:bg-gray-800 rounded-lg shadow">
                        <p className="text-gray-600 dark:text-gray-400">No assignments available.</p>
                    </div>
                ) : (
                    assignments.map(assignment => (
                        <div
                            key={assignment._id}
                            className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                                        {assignment.title}
                                    </h3>
                                    <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mt-2">
                                        <div className="flex items-center gap-1">
                                            <Calendar className="w-4 h-4" />
                                            <span>Due: {new Date(assignment.deadline).toLocaleDateString()}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Clock className="w-4 h-4" />
                                            <span>{new Date(assignment.deadline).toLocaleTimeString()}</span>
                                        </div>
                                    </div>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                    assignment.submitted 
                                        ? 'bg-green-100 text-green-800' 
                                        : new Date(assignment.deadline) < new Date()
                                            ? 'bg-red-100 text-red-800'
                                            : 'bg-yellow-100 text-yellow-800'
                                }`}>
                                    {assignment.submitted 
                                        ? 'Submitted' 
                                        : new Date(assignment.deadline) < new Date()
                                            ? 'Overdue'
                                            : 'Pending'}
                                </span>
                            </div>

                            <div className="mt-4">
                                <p className="text-gray-600 dark:text-gray-300">
                                    {assignment.questions}
                                </p>
                            </div>

                            <div className="flex justify-between items-center mt-6">
                                <div className="flex gap-4">
                                    {assignment.file && (
                                        <button
                                            onClick={() => handleDownload(assignment.file)}
                                            className="flex items-center gap-2 px-4 py-2 text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100"
                                        >
                                            <FileDown className="w-4 h-4" />
                                            Download Instructions
                                        </button>
                                    )}
                                </div>
                                {!assignment.submitted && new Date(assignment.deadline) > new Date() && (
                                    <button
                                        onClick={() => {
                                            setSelectedAssignment(assignment);
                                            setSubmissionModal(true);
                                        }}
                                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                    >
                                        <FileUp className="w-4 h-4" />
                                        Submit Assignment
                                    </button>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>

            {submissionModal && <SubmissionModal />}
        </div>
    );
};

export default StudentAssignments;