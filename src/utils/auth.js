import axios from "axios";

async function refreshToken() {
    try {
        const refreshToken = localStorage.getItem("refreshToken");

        if (!refreshToken) {
            console.warn(
                "Refresh token not found. User may need to log in again."
            );
            return null;
        }

        const response = await axios.post("/api/auth/refresh-token", {
            refreshToken,
        });

        if (response.status === 200) {
            const { accessToken, refreshToken: newRefreshToken } =
                response.data;

            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", newRefreshToken);

            return accessToken;
        } else {
            throw new Error("Refresh token failed");
        }
    } catch (error) {
        console.error("Error refreshing token:", error);
        return null;
    }
}

function setToken(token) {
    if (token) {
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else {
        console.warn("Unable to set token: token is null or undefined.");
    }
}

export { refreshToken, setToken };
