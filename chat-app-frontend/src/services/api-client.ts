import axio, { AxiosRequestConfig } from "axios";
import Cookies from "js-cookie";

const axiosInstance = axio.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    Accept: "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = Cookies.get("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

class APIClient<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll = (params?: AxiosRequestConfig) =>
    axiosInstance.get<T>(this.endpoint, params).then((res) => res.data);

  get = (id: number | string) =>
    axiosInstance.get<T>(`${this.endpoint}/${id}`).then((res) => res.data);

  post = <R = T>(data: R) =>
    axiosInstance.post<T>(this.endpoint, data).then((res) => res.data);
}

export default APIClient;
