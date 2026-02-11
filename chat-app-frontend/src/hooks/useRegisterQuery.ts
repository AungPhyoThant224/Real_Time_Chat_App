import { useMutation } from "@tanstack/react-query";
import { registerService } from "@/services/authService";
import { useRouter } from "next/navigation";
import { RegisterFormData } from "@/lib/validations";

export const useRegister = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: RegisterFormData) => registerService.post(data),
    onSuccess: () => {
      router.push("/login");
    },
  });
};