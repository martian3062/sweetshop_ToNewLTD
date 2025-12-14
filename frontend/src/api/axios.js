import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;
// example: http://127.0.0.1:8000/api

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/* =========================
   REQUEST INTERCEPTOR
   Attach access token
========================= */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access");

    if (token && !config.url.includes("/auth/")) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/* =========================
   RESPONSE INTERCEPTOR
   Refresh token on 401
========================= */
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 🔒 Do NOT try refresh on login / refresh endpoints
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/auth/")
    ) {
      originalRequest._retry = true;

      try {
        const refresh = localStorage.getItem("refresh");
        if (!refresh) throw new Error("No refresh token");

        const res = await axios.post(
          `${BASE_URL}/auth/refresh/`,
          { refresh },
          { headers: { "Content-Type": "application/json" } }
        );

        localStorage.setItem("access", res.data.access);

        originalRequest.headers.Authorization =
          `Bearer ${res.data.access}`;

        return api(originalRequest);
      } catch (refreshError) {
        // ❌ refresh failed → force logout
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
