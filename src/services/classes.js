import { apiClient } from "./config";

export const addClass = async (payload) => {
    const token = localStorage.getItem('token');
    const classData = {
        classNumber: payload.classNumber,
        classCategory: payload.classCategory,
        classTeacher: payload.classTeacher
    };

    console.log('Sending class data:', classData);

    return await apiClient.post("/class", classData, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });
}

export const getAllClasses = async () => {
    const token = localStorage.getItem('token');
    return await apiClient.get("/class", {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
}

export const getOneClass = async (id) => {
    const token = localStorage.getItem('token');
    return await apiClient.get(`/class/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
}

export const updateClass = async (id, payload) => {
    const token = localStorage.getItem('token');
    return await apiClient.patch(`/class/${id}`, payload, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });
}

export const deleteClass = async (id) => {
    const token = localStorage.getItem('token');
    return await apiClient.delete(`/class/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
}
