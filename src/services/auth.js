import { apiClient } from "./config"

export const userSignUp = async (payload) => {
    return await apiClient.post("/users/register", payload);
}

export const userLogin = async (credentials) => {
    return await apiClient.post("/users/login", credentials, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export const getUserProfile = async () => {
    const token = localStorage.getItem('token');
    return await apiClient.get("/users/profile", {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
}

export const changePassword = async (passwordData) => {
    const token = localStorage.getItem('token');
    return await apiClient.post("/users/change-password", passwordData, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });
};

