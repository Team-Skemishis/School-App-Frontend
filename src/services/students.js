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
    const studentData = {
        firstName: payload.firstName,
        lastName: payload.lastName,
        email: payload.email,
        password: payload.password,
        role: "student"
    }

    return await apiClient.post("/students/register", studentData, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });
}