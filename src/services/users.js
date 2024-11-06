import { apiClient } from "./config";


export const getUsers = () => { // all users
    return apiClient.get("/users");
};

// export const getOneUser = async (id) => // one user
//     apiClient.get(`users/${id}`);

export const getOneUser = async (id) => { // one user
    console.log("Fetching user with ID:", id); // Debugging line
    try {
        return await apiClient.get(`/users/${id}`);
    } catch (error) {
        console.error("Error fetching user:", error);
        throw error; // Re-throw the error after logging
    }
};

export const editUser = async (id, payload) => { // edit user
    return apiClient.patch(`/users/${id}`, payload);
};

export const deleteUser = async (userID) => { // delete user
    return await apiClient.delete(`/users/${userID}`);
};
