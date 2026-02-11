import ApiClient from "./api-client";
import { AuthResponse, Response } from "@/types";

export const loginService = new ApiClient<Response<AuthResponse>>("/auth/login");
export const registerService = new ApiClient<Response<AuthResponse>>(
  "/auth/register"
);
