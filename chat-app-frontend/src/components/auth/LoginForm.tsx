'use client';
import { useLogin } from "@/hooks/useLoginQuery";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginFormData } from "@/lib/validations";
import React from "react";
import { useForm } from "react-hook-form";

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
    <form onSubmit={handleSubmit((data) => mutate(data))} className="space-y-4">
      {error && (
        <div className="alert alert-error text-sm py-2">
          <span>{(error as any)?.response?.data?.error || "Invalid Credentials"}</span>
        </div>
      )}

      <div className="form-control">
        <label className="label"><span className="label-text">Email</span></label>
        <input
          {...register("email")}
          type="email"
          className={`input input-bordered ${errors.email ? "input-error" : ""}`}
        />
        {errors.email && <span className="text-error text-xs mt-1">{errors.email.message}</span>}
      </div>

      <div className="form-control">
        <label className="label"><span className="label-text">Password</span></label>
        <input
          {...register("password")}
          type="password"
          className={`input input-bordered ${errors.password ? "input-error" : ""}`}
        />
        {errors.password && <span className="text-error text-xs mt-1">{errors.password.message}</span>}
      </div>

      <button className="btn btn-primary w-full mt-4" disabled={isPending}>
        {isPending && <span className="loading loading-spinner"></span>}
        Login
      </button>
    </form>
  );
};

export default LoginForm;
