import { apiClient } from "./config";

export const getUsers = async () => {
    return await apiClient.get("/users");
}

export const getOneUser = async (id) => {
    const token = localStorage.getItem('token');
    return await apiClient.get(`/users/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
        
    });
}

export const editUser = async (id, userData) => {
    return await apiClient.patch(`/users/${id}`, userData);
}

export const deleteUser = async (id) => {
    return await apiClient.delete(`/users/${id}`);
}
