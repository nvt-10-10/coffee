import { axiosApi } from "@/configs/axios";

async function login(params) {
    try {
        let response = await axiosApi.post("/auth/login", params);
        if (response.data) {
            response = response.data;
        }
        console.log(response);
        if (response.data && response.data.token) {
            sessionStorage.setItem("token", response.data.token);
            return { success: true };
        } else {
            return { success: false, message: "No token received" };
        }
    } catch (error) {
        if (error.response) {
            return { success: false, message: error.response.data.message };
        } else {
            return { success: false, message: "Network error" };
        }
    }
}

async function logout() {
    try {
        sessionStorage.removeItem("token");
        let response = await axiosApi.get("/auth/logout");
        if (response.data) {
            response = response.data;
        }
        if (response.success) {
            return { success: true };
        } else {
            return { success: false, message: "No token received" };
        }
    } catch (error) {
        if (error.response) {
            return { success: false, message: error.response.data.message };
        } else {
            return { success: false, message: "Network error" };
        }
    }
}

export { login, logout };
