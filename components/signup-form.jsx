"use client";

import { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import Confetti from "react-confetti-boom";

import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";

/* ---------- Password Field ---------- */
function PasswordField({ id, label, visible, onToggle }) {
  return (
    <Field>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>

      <div className="relative">
        <Input
          id={id}
          name={id}
          type={visible ? "text" : "password"}
          minLength={8}
          required
          className="pr-10"
        />

        <button
          type="button"
          onClick={onToggle}
          className="absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground hover:text-foreground"
        >
          {visible ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
        </button>
      </div>
    </Field>
  );
}

/* ---------- Signup Form ---------- */
export function SignupForm({ className }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);

  const { data: session, isLoading } = authClient.useSession();

  /* ---------- AUTO REDIRECT IF LOGGED IN ---------- */
  useEffect(() => {
    if (!isLoading && session) {
      window.location.replace("/hyratic/dashboard");
    }
  }, [session, isLoading]);

  /* ---------- SESSION LOADING SCREEN ---------- */
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-60">
        <Spinner />
      </div>
    );
  }

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirm-password");

    if (password.length < 8) {
      alert("Password must be at least 8 characters long");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      await authClient.signUp.email(
        {
          name,
          email,
          password,
          callbackURL: "/hyratic/dashboard",
        },
        {
          onSuccess: () => {
            setIsSuccessful(true);

            setTimeout(() => {
              window.location.replace("/hyratic/dashboard");
            }, 1500);
          },

          onError: (ctx) => {
            alert(ctx.error.message);
          },
        }
      );
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6 relative", className)}>

      {/* 🎉 SUCCESS OVERLAY */}
      {isSuccessful && (
        <>
          <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center text-white flex-col">
            <h1 className="text-2xl font-bold">🎉 Account Created!</h1>
            <p className="text-sm opacity-80 mt-2 flex items-center gap-2">
              <Spinner /> Redirecting...
            </p>
          </div>

          <div className="fixed inset-0 z-[60] pointer-events-none">
            <Confetti
              mode="boom"
              particleCount={150}
              colors={["#ff577f", "#ff884b", "#4ade80", "#60a5fa"]}
            />
          </div>
        </>
      )}

      {/* FORM */}
      <Card className={isSuccessful ? "opacity-40 pointer-events-none" : ""}>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create your account</CardTitle>
          <CardDescription>
            Enter your information below to create your account.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={onSubmit}>
            <FieldGroup>

              <Field>
                <FieldLabel htmlFor="name">Full Name</FieldLabel>
                <Input id="name" name="name" required placeholder="John Doe" />
              </Field>

              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="m@example.com"
                />
              </Field>

              <div className="grid gap-4 md:grid-cols-2">
                <PasswordField
                  id="password"
                  label="Password"
                  visible={showPassword}
                  onToggle={() => setShowPassword((p) => !p)}
                />

                <PasswordField
                  id="confirm-password"
                  label="Confirm Password"
                  visible={showConfirmPassword}
                  onToggle={() => setShowConfirmPassword((p) => !p)}
                />
              </div>

              <FieldDescription>
                Password must be at least 8 characters long.
              </FieldDescription>

              <Button
                type="submit"
                disabled={loading || isSuccessful}
                className="w-full flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Spinner /> Creating Account...
                  </>
                ) : (
                  "Create Account"
                )}
              </Button>

              <FieldDescription className="text-center mt-2">
                Already have an account?{" "}
                <a href="/auth/login" className="underline hover:text-primary">
                  Sign in
                </a>
              </FieldDescription>

            </FieldGroup>
          </form>
        </CardContent>
      </Card>

      {/* FOOTER */}
      <FieldDescription className="text-center px-6">
        By continuing you agree to our{" "}
        <a href="/terms" className="underline">Terms</a> and{" "}
        <a href="/privacy" className="underline">Privacy Policy</a>.
      </FieldDescription>

    </div>
  );
}