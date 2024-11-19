import { apiClient } from "./config";

export const getAttendanceByClassID = async (id) => {
    const token = localStorage.getItem('token');
    return await apiClient.get(`/students/attendance/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};

export const getOneAttendance = async (id) => {
    const token = localStorage.getItem('token');
    console.log("Fetching attendance data:", id);
    return await apiClient.get(`/students/attendance/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
}

export const markAttendance = async (payload) => {
    const token = localStorage.getItem('token');
    return await apiClient.post("/students/attendance", payload, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
}

export const updateAttendance = async (id, payload) => {
    const token = localStorage.getItem('token');
    return await apiClient.patch(`/students/attendance/${id}`, payload, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

export const deleteAttendance = async (id) => {
    const token = localStorage.getItem('token');
    return await apiClient.delete(`/students/attendance/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}
