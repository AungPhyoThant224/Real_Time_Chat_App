"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterFormData } from "@/lib/validations";
import { useRegister } from "@/hooks/useRegisterQuery";
import { cn } from "@/lib/utils"; // Your clsx + twMerge helper

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
        <div className="alert alert-error text-sm py-2">
          <span>{(error as any)?.response.error || "Registration failed"}</span>
        </div>
      )}

      <div className="form-control">
        <label className="label"><span className="label-text">Email</span></label>
        <input
          {...register("email")}
          type="email"
          placeholder="your@email.com"
          className={cn("input input-bordered", errors.email && "input-error")}
        />
        {errors.email && <span className="text-error text-xs mt-1">{errors.email.message}</span>}
      </div>

      <div className="form-control">
        <label className="label"><span className="label-text font-medium">Account Type (Testing Only)</span></label>
        <select 
          {...register("role")}
          className={cn("select select-bordered w-full", errors.role && "select-error")}
        >
          <option value="USER">User</option>
          <option value="ADMIN">Admin</option>
        </select>
        {errors.role && <span className="text-error text-xs mt-1">{errors.role.message}</span>}
      </div>

      <div className="form-control">
        <label className="label"><span className="label-text">Password</span></label>
        <input
          {...register("password")}
          type="password"
          placeholder="••••••••"
          className={cn("input input-bordered", errors.password && "input-error")}
        />
        {errors.password && <span className="text-error text-xs mt-1">{errors.password.message}</span>}
      </div>

      <div className="form-control">
        <label className="label"><span className="label-text">Confirm Password</span></label>
        <input
          {...register("confirmPassword")}
          type="password"
          placeholder="••••••••"
          className={cn("input input-bordered", errors.confirmPassword && "input-error")}
        />
        {errors.confirmPassword && <span className="text-error text-xs mt-1">{errors.confirmPassword.message}</span>}
      </div>

      <button className="btn btn-primary w-full mt-4" disabled={isPending}>
        {isPending && <span className="loading loading-spinner"></span>}
        Sign Up
      </button>
    </form>
  );
};