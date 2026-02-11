import { RegisterForm } from "@/components/auth/RegisterForm";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 p-4">
      <div className="card w-full max-w-md shadow-2xl bg-base-100">
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold mb-2">Create Account</h2>
          <p className="text-sm opacity-60 mb-4">Join the KBZ Secure Chat platform</p>
          
          <RegisterForm />

          <div className="divider">OR</div>

          <div className="text-center">
            <span className="text-sm opacity-70">Already have an account? </span>
            <Link href="/login" className="link link-primary text-sm font-semibold">
              Login here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}