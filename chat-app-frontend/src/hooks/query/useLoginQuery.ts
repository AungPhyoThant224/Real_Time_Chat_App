import { useMutation } from "@tanstack/react-query";
import { loginService } from "@/services/authService";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { LoginFormData } from "@/lib/validations";
import { AuthResponse, Response } from "@/types";

export const useLogin = () => {
  const { setUser } = useAuthStore();
  const router = useRouter();

  return useMutation({
    mutationFn: (data: LoginFormData) => loginService.post(data),
    onSuccess: (response: Response<AuthResponse>) => {
      Cookies.set("token", response.data.token, { expires: 1 });
      
      setUser({
        id: response.data.id,
        email: response.data.email,
        role: response.data.role,
      });

      const redirectPath = response.data.role === "ADMIN" ? "/admin/dashboard" : "/chat";
      router.push(redirectPath);
    },
  });
};