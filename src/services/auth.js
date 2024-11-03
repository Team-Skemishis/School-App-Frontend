import { apiClient } from "./config"

export const userSignUp = async (payload) => {
    return await apiClient.post("/users/register", payload);
}

export const userLogin = async (payload) => {
    return await apiClient.post("/users/login", payload);
}