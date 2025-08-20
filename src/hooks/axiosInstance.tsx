// src/lib/axiosInstance.ts
import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://13.61.49.212:3000", // Change this to your API base URL
    headers: {
        "Content-Type": "application/json",
    },
});

// Request interceptor for adding custom headers
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");

        // ✅ Ensure headers object exists
        config.headers = config.headers || {};

        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }

        // Example: custom header
        config.headers["X-Custom-Header"] = "MyCustomValue";

        return config;
    },
    (error) => Promise.reject(error)
);

export default axiosInstance;
