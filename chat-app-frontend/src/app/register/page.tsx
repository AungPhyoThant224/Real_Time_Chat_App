import { RegisterForm } from "@/components/auth/RegisterForm";
import { UserPlus } from "lucide-react";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-tr from-base-300 to-base-100 p-4">
      <div className="card w-full max-w-md shadow-xl bg-base-100 border border-base-300">
        <div className="card-body gap-4">
          <div className="flex flex-col items-center text-center gap-2">
            <div className="p-3 rounded-2xl bg-secondary/10 text-secondary mb-2">
              <UserPlus size={40} />
            </div>
            <h2 className="card-title text-3xl font-black tracking-tight text-secondary uppercase">
              Join Chat
            </h2>
            <p className="text-sm text-base-content/60 font-medium">
              Register for real-time support
            </p>
          </div>
          
          <div className="mt-4">
            <RegisterForm />
          </div>

          <div className="space-y-4 mt-6">
            <div className="divider text-[10px] uppercase opacity-40 font-bold tracking-widest">
              Already Registered?
            </div>
            <div className="text-center">
              <Link 
                href="/login" 
                className="btn btn-outline btn-block btn-sm border-base-300 font-bold hover:bg-base-200"
              >
                Sign In Instead
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}