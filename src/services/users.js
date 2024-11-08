import { apiClient } from "./config";

export const getUsers = async () => {
    return await apiClient.get("/users");
}

export const getOneUser = async (id) => {
    return await apiClient.get(`/users/${id}`);
}

export const editUser = async (id, userData) => {
    return await apiClient.patch(`/users/${id}`, userData);
}

export const deleteUser = async (id) => {
    return await apiClient.delete(`/users/${id}`);
}
