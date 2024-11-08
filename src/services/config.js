import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;

// Adding role management
export const setAuthToken = (token) => {
    if (token) {
        localStorage.setItem("token", token);
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
}

export const setUserRole = (role) => {
    if (role) {
        localStorage.setItem("userRole", role);
    }
}

export const getUserRole = () => {
    return localStorage.getItem("userRole");
}

// Update logout to clear role
export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    delete axios.defaults.headers.common["Authorization"];
}

export const isAuthenticated = () => {
    return !!localStorage.getItem("token");
}

export const apiClient = axios.create({
    baseURL: baseURL,
});

