import axios from "axios";

export const api = axios.create({
    baseURL: "https://astro.astrotring.com/api"
})

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        config.headers["Content-Type"] = "multipart/form-data";
    }
    return config;
});



// Response interceptor – handle token expiry (401)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("role_id");
      const { store } = await import("./store");  // dynamic import
      const {logout} = await import("./slice/UserAuth")
      store.dispatch(logout());
      if (window.location.pathname !== "/" && window.location.pathname !== "/astro-login") {
        window.location.href = "/";
      }
    }
    return Promise.reject(error);
  }
);