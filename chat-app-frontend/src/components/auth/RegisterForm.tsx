"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterFormData } from "@/lib/validations";
import { useRegister } from "@/hooks/query/useRegisterQuery";
import { cn } from "@/lib/utils"; // Your clsx + twMerge helper
import { AlertCircle } from "lucide-react";

export const RegisterForm = () => {
  const { mutate, isPending, error } = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });
console.log(errors);
  return (
    <form onSubmit={handleSubmit((data) => mutate(data))} className="space-y-4">
      {error && (
        <div className="alert alert-error py-3 rounded-xl flex items-start gap-3">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span className="text-xs font-medium">
            {(error as any)?.response?.data?.error || "Registration failed"}
          </span>
        </div>
      )}

      <div className="form-control">
        <label className="label py-1">
          <span className="label-text font-semibold text-base-content/70">Email</span>
        </label>
        <div className="relative">
          <input
            {...register("email")}
            type="email"
            placeholder="your@email.com"
            className={cn("input input-bordered w-full", errors.email && "input-error")}
          />
        </div>
        {errors.email && <span className="text-error text-[10px] mt-1 font-bold italic">{errors.email.message}</span>}
      </div>

      <div className="form-control">
        <label className="label py-1">
          <span className="label-text font-semibold text-base-content/70">Account Role</span>
        </label>
        <div className="relative">
          <select 
            {...register("role")}
            className={cn("select select-bordered w-full", errors.role && "select-error")}
          >
            <option value="USER">Standard User</option>
            <option value="ADMIN">Administrator</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="form-control">
          <label className="label py-1">
            <span className="label-text font-semibold text-base-content/70">Password</span>
          </label>
          <div className="relative">
            <input
              {...register("password")}
              type="password"
              placeholder="••••••••"
              className={cn("input input-bordered w-full", errors.password && "input-error")}
            />
          </div>
        </div>

        <div className="form-control">
          <label className="label py-1">
            <span className="label-text font-semibold text-base-content/70">Confirm</span>
          </label>
          <div className="relative">
            <input
              {...register("confirmPassword")}
              type="password"
              placeholder="••••••••"
              className={cn("input input-bordered w-full", errors.confirmPassword && "input-error")}
            />
          </div>
        </div>
      </div>
      {(errors.password || errors.confirmPassword) && (
        <span className="text-error text-[10px] font-bold italic">
          {errors.password?.message || errors.confirmPassword?.message}
        </span>
      )}

      <button className="btn btn-primary w-full shadow-lg shadow-primary/20 mt-4" disabled={isPending}>
        {isPending ? <span className="loading loading-spinner"></span> : "Create Secure Account"}
      </button>
    </form>
  );
};