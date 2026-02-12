import LoginForm from "@/components/auth/LoginForm";
import { ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-base-300 to-base-100 p-4">
      <div className="card w-full max-w-md shadow-xl bg-base-100 border border-base-300">
        <div className="card-body gap-6">
          <div className="flex flex-col items-center text-center gap-2">
            <div className="p-3 rounded-2xl bg-primary/10 text-primary mb-2">
              <ShieldCheck size={40} />
            </div>
            <h2 className="card-title text-3xl font-black tracking-tight text-primary uppercase">
              Login
            </h2>
            <p className="text-sm text-base-content/60 font-medium">
              Real Time Chat Application
            </p>
          </div>

          <LoginForm />

          <div className="space-y-4">
            <div className="text-center">
              <span className="text-sm opacity-70">New to Chat? </span>
              <Link
                href="/register"
                className="link link-primary no-underline hover:underline text-sm font-bold"
              >
                Create an account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
