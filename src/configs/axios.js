import axios from "axios";
const URL_API = "http://localhost:3000/api";
const token = () => {
    return JSON.parse(sessionStorage.getItem("token"));
};
const axiosApi = axios.create({
    baseURL: URL_API,
    headers: {
        "Content-Type": "application/json",
    },
});

const authHeader = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
};

const uploadHeader = {
    "Content-Type": "multipart/form-data",
    Authorization: `Bearer ${token}`,
};

export { axiosApi, authHeader, uploadHeader };
