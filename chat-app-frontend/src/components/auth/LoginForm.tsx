"use client";
import { useLogin } from "@/hooks/query/useLoginQuery";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginFormData } from "@/lib/validations";
import React from "react";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import { AlertCircle } from "lucide-react";

const LoginForm = () => {
  const { mutate, isPending, error } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  return (
    <form onSubmit={handleSubmit((data) => mutate(data))} className="space-y-5">
      {error && (
        <div className="alert alert-error shadow-sm py-3 rounded-xl flex items-start gap-3">
          <AlertCircle className="w-5 h-5 shrink-5" />
          <span className="font-medium text-white">
            {(error as any)?.response?.data?.error || "Invalid Credentials"}
          </span>
        </div>
      )}

      <div className="form-control w-full">
        <label className="label px-1 py-1.5">
          <span className="label-text font-semibold text-base-content/70">Email Address</span>
        </label>
        <div className="relative">
          <input
            {...register("email")}
            type="email"
            placeholder="name@example.com"
            className={cn(
              "input input-bordered w-full focus:input-primary transition-all",
              errors.email && "input-error bg-error/5"
            )}
          />
        </div>
        {errors.email && (
          <label className="label py-1">
            <span className="label-text-alt text-error font-medium">{errors.email.message}</span>
          </label>
        )}
      </div>

      <div className="form-control w-full">
        <label className="label px-1 py-1.5">
          <span className="label-text font-semibold text-base-content/70">Password</span>
        </label>
        <div className="relative">
          <input
            {...register("password")}
            type="password"
            placeholder="••••••••"
            className={cn(
              "input input-bordered w-full focus:input-primary transition-all",
              errors.password && "input-error bg-error/5"
            )}
          />
        </div>
        {errors.password && (
          <label className="label py-1">
            <span className="label-text-alt text-error font-medium">{errors.password.message}</span>
          </label>
        )}
      </div>

      <button 
        className="btn btn-primary w-full shadow-lg shadow-primary/20 mt-2" 
        disabled={isPending}
      >
        {isPending ? <span className="loading loading-spinner loading-sm"></span> : "Sign In"}
      </button>
    </form>
  );
};

export default LoginForm;
