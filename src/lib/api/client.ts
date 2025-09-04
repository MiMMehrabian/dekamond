import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { config } from "@/config";

export interface ApiResponse<T = unknown> {
  data: T;
  status: number;
  message?: string;
}

export interface ApiError {
  message: string;
  status: number;
  code?: string;
}

const createApiClient = (): AxiosInstance => {
  const client = axios.create({
    baseURL: config.api.baseUrl,
    timeout: config.api.timeout,
    headers: {
      "Content-Type": "application/json",
    },
  });

  client.interceptors.request.use(
    config => {
      const token = localStorage.getItem("auth-token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      config.headers["X-Request-ID"] = crypto.randomUUID();

      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );

  client.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    error => {
      if (error.response) {
        const { status } = error.response;

        switch (status) {
          case 401:
            localStorage.removeItem("auth-token");
            localStorage.removeItem("user");
            window.location.href = "/login";
            break;
          case 403:
            console.error("Access forbidden");
            break;
          case 404:
            console.error("Resource not found");
            break;
          case 500:
            console.error("Server error");
            break;
        }
      } else if (error.request) {
        console.error("Network error");
      }

      return Promise.reject(error);
    }
  );

  return client;
};

export const apiClient = createApiClient();

export const api = {
  get: <T>(url: string, config?: AxiosRequestConfig) =>
    apiClient.get<T>(url, config),

  post: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    apiClient.post<T>(url, data, config),

  put: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    apiClient.put<T>(url, data, config),

  patch: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    apiClient.patch<T>(url, data, config),

  delete: <T>(url: string, config?: AxiosRequestConfig) =>
    apiClient.delete<T>(url, config),
};

export const handleApiError = (error: unknown): ApiError => {
  if (axios.isAxiosError(error)) {
    return {
      message: error.response?.data?.message || error.message,
      status: error.response?.status || 500,
      code: error.code,
    };
  }

  return {
    message:
      error instanceof Error ? error.message : "An unexpected error occurred",
    status: 500,
  };
};
