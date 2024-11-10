import { apiClient } from "./config";

export const addAssignment = async (payload) => {
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('title', payload.title);
    formData.append('questions', payload.questions);
    formData.append('deadline', payload.deadline);
    if (payload.file) {
        formData.append('file', payload.file);
    }

    return await apiClient.post("/assignments", formData, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
}

export const getAllAssignments = async () => {
    const token = localStorage.getItem('token');
    return await apiClient.get("/assignments", {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
}

export const getOneAssignment = async (id) => {
    const token = localStorage.getItem('token');
    return await apiClient.get(`/assignments/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
}

export const updateAssignment = async (id, payload) => {
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('title', payload.title);
    formData.append('questions', payload.questions);
    formData.append('deadline', payload.deadline);
    if (payload.file) {
        formData.append('file', payload.file);
    }

    return await apiClient.patch(`/assignments/${id}`, formData, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
        }
    });
}

export const deleteAssignment = async (id) => {
    const token = localStorage.getItem('token');
    return await apiClient.delete(`/assignments/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
}
