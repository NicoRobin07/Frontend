import { useState } from "react";
import staffinixLogo from "@/assets/staffinix-logo.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#050B1A] via-[#0A1630] to-[#050B1A]">
      <div className="w-full max-w-md rounded-2xl bg-[#0B1733]/80 backdrop-blur-xl border border-white/10 p-8 shadow-2xl">
        {/* Logo */}
<div className="flex justify-center mb-6">
  <img
    src={staffinixLogo}
    alt="Staffinix Logo"
    className="h-20 w-20 rounded-full object-contain"
  />
</div>


        {/* Heading */}
        <h1 className="text-2xl font-semibold text-center text-white">
          Welcome Back
        </h1>
        <p className="text-center text-sm text-muted-foreground mt-1">
          Sign in to your Staffinix CRM account
        </p>

        {/* Form */}
        <div className="mt-8 space-y-4">
          {/* Email */}
          <div>
            <label className="text-sm text-muted-foreground">
              Email Address
            </label>
            <div className="relative mt-1">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                className="pl-9 h-11"
                placeholder="you@example.com"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-sm text-muted-foreground">
              Password
            </label>
            <div className="relative mt-1">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type={showPassword ? "text" : "password"}
                className="pl-9 pr-10 h-11"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Remember / Forgot */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <Checkbox id="remember" />
              <label htmlFor="remember" className="text-muted-foreground">
                Remember me
              </label>
            </div>
            <button className="text-cyan-400 hover:underline">
              Forgot password?
            </button>
          </div>

          {/* Sign In */}
          <Button className="w-full h-11 mt-2 bg-cyan-400 hover:bg-cyan-500 text-black font-semibold">
            → Sign In
          </Button>

          {/* Divider */}
          <div className="flex items-center gap-3 my-4">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-xs text-muted-foreground">
              New to Staffinix?
            </span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Create Account */}
          <Button
            variant="outline"
            className="w-full h-11 border-white/15"
          >
            Create an Account
          </Button>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-muted-foreground mt-6">
          Secure authentication powered by Staffinix
        </p>
      </div>
    </div>
  );
}
