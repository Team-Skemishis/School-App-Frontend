// src/components/LoadingModal.jsx
import React from "react";

const LoadingModal = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-5 rounded-lg flex items-center">
        <div className="loader ease-linear rounded-full border-4 border-t-4 border-blue-500 h-12 w-12"></div>
        <span className="ml-4">Loading...</span>
      </div>
    </div>
  );
};

export default LoadingModal;
