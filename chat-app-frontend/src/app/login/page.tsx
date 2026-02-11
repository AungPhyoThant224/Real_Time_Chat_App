import LoginForm from "@/components/auth/LoginForm";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-full max-w-md shadow-2xl bg-base-100">
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold mb-4">
            Login to KBZ Chat
          </h2>

          <LoginForm />

          <div className="text-center mt-6">
            <span className="text-sm opacity-70">New to the bank? </span>
            <Link
              href="/register"
              className="link link-primary text-sm font-semibold"
            >
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
