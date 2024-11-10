import { apiClient } from "./config"

export const userSignUp = async (payload) => {
    return await apiClient.post("/users/register", payload);
}

export const userLogin = async (payload) => {
    return await apiClient.post("/users/login", payload);
}

export const getUserProfile = async () => {
    const token = localStorage.getItem('token');
    return await apiClient.get("/users/profile", {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
}

