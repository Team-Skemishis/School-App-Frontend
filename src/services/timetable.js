import { apiClient } from "./config";

export const getTimetable = async () => {
    const token = localStorage.getItem('token');
    return await apiClient.get("/timetable", {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
}

export const getOneTimetable = async (id) => {
    const token = localStorage.getItem('token');
    console.log('Fetching timetable with ID:', id);
    return await apiClient.get(`/timetable/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
}

export const addTimetable = async (payload) => {
    const token = localStorage.getItem('token');
    return await apiClient.post("/timetable", payload, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
}

export const updateTimetable = async (id, payload) => {
    const token = localStorage.getItem('token');
    return await apiClient.patch(`/timetable/${id}`, payload, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });
}

export const deleteTimetable = async (id) => {
    const token = localStorage.getItem('token');
    return await apiClient.delete(`/timetable/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
}
