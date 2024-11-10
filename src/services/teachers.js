import { apiClient } from "./config";

export const getTeachers = async () => {
    return await apiClient.get("users/teachers");
}

export const getOneTeacher = async (id) => {
    return await apiClient.get(`users/teachers/${id}`);
}

export const editTeacher = async (id, teacherData) => {
    return await apiClient.patch(`users/teachers/${id}`, teacherData);
}

export const deleteTeacher = async (id) => {
    return await apiClient.delete(`users/teachers/${id}`);
}

export const addTeacher = async (payload) => {
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('firstName', payload.firstName);
    formData.append('lastName', payload.lastName);
    formData.append('email', payload.email);
    formData.append('password', payload.password);
    formData.append('gender', payload.gender);
    formData.append('role', 'teacher');
    if (payload.avatar) {
        formData.append('avatar', payload.avatar);
    }

    return await apiClient.post("/teachers/register", formData, {
        headers: {
            'Authorization': `Bearer ${token}`,
            // 'Content-Type': 'application/json'
        }
    });
}