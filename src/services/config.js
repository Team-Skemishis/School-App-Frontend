import axios from "axios";
import { jwtDecode } from "jwt-decode";

const baseURL = import.meta.env.VITE_BASE_URL;

export const apiClient = axios.create({
    baseURL: baseURL,
});


// Adding role management
export const setAuthToken = (token) => {
    if (token) {
        localStorage.setItem("token", token);
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        apiClient.defaults.headers.common[
            "Authorization"] = `Bearer ${token}`;
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

export const getUserIdFromToken = () => {
    const token = localStorage.getItem('token');
    if (token) {
        const decoded = jwtDecode(token);
        return decoded.id;  // Assuming your token contains the user ID
    }
    return null;
};

