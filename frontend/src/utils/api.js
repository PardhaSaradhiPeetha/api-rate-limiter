const rawApiBaseUrl = import.meta.env.VITE_API_URL;

if (!rawApiBaseUrl) {
    throw new Error("Missing VITE_API_URL in frontend/.env");
}

const API_BASE_URL = rawApiBaseUrl.replace(/\/?api\/?$/i, "").replace(/\/$/, "");

export const apiUrl = (path) => `${API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;

export async function apiFetch(path, options = {}) {
    const headers = {
        "Content-Type": "application/json",
        ...(options.headers || {})
    };

    const token = localStorage.getItem("token");
    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(apiUrl(path), {
        credentials: "include",
        headers,
        ...options
    });

    const contentType = response.headers.get("content-type") || "";
    const data = contentType.includes("application/json")
        ? await response.json()
        : await response.text();

    if (!response.ok) {
        const message = typeof data === "string" ? data : data?.error || data?.message || "Request failed";
        throw new Error(message);
    }

    return data;
}
