import { apiClient } from "./config";

export const addAnnouncement = async (payload) => {
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('title', payload.title);
    formData.append('content', payload.content);
    formData.append('userType', payload.userType);
    if (payload.coverImage) {
        formData.append('coverImage', payload.coverImage);
    }
    // createdBy will be handled by the backend using the token

    return await apiClient.post("/announcements", formData, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
}

export const getAllAnnouncements = async () => {
    const token = localStorage.getItem('token');
    return await apiClient.get("/announcements", {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
}

export const getOneAnnouncement = async (id) => {
    const token = localStorage.getItem('token');
    return await apiClient.get(`/announcements/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
}

export const updateAnnouncement = async (id, payload) => {
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('title', payload.title);
    formData.append('content', payload.content);
    formData.append('userType', payload.userType);
    if (payload.coverImage) {
        formData.append('coverImage', payload.coverImage);
    }

    return await apiClient.patch(`/announcements/${id}`, formData, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
        }
    });
}

export const deleteAnnouncement = async (id) => {
    const token = localStorage.getItem('token');
    return await apiClient.delete(`/announcements/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
}
