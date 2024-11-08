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
    const teacherData = {
        firstName: payload.firstName,
        lastName: payload.lastName,
        email: payload.email,
        password: payload.password,
        role: "teacher"
    };

    return await apiClient.post("/teachers/register", teacherData, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });
}