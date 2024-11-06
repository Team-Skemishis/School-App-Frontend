import axios from "axios";

// taking token from the localStorage to be stored here...
const baseURL = import.meta.env.VITE_BASE_URL;

const token = localStorage.getItem("token") // accessing token from localStorage...

if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
} // putting token in/on headers to be used for whatever...

export const apiClient = axios.create({
    baseURL: baseURL,
})

// creating the logout functionality...
export const logout = () => {
    localStorage.removeItem("token")
    delete axios.defaults.headers.common["Authorization"];
}

// creating an authentication check function to allow access to the homepage only when user has logged in (i.e, when token is present in localStorage)
export const isAuthenticated = () => {
    return !!localStorage.getItem("token");
}

