import { apiClient } from "./config";

export const getStudents = async () => {
    return await apiClient.get("users/students");
}

export const getOneStudent = async (id) => {
    return await apiClient.get(`users/students/${id}`);
}

export const editStudent = async (id, studentData) => {
    return await apiClient.patch(`users/students/${id}`, studentData);
}

export const deleteStudent = async (id) => {
    return await apiClient.delete(`users/students/${id}`);
}

export const addStudent = async (payload) => {
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('firstName', payload.firstName);
    formData.append('lastName', payload.lastName);
    formData.append('email', payload.email);
    formData.append('password', payload.password);
    formData.append('role', 'student');
    formData.append('gender', payload.gender);
    formData.append('classes', payload.classes);
    if (payload.avatar) {
        formData.append('avatar', payload.avatar);
    }

    return await apiClient.post("/students/register", formData, {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    });
}