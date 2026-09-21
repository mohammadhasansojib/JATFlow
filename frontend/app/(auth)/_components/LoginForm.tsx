"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useActionState } from "react";
import { loginUser } from "../_actions/actions";
import { redirect } from "next/navigation";

export interface ILoginFormState {
    success: boolean
    message: string
}

const initialState = {
    success: false,
    message: "",
}

const LoginForm = () => {

    const [state, formAction, pending] = useActionState(loginUser, initialState);

    if (state.success) {
        setTimeout(() => {
            redirect("/dashboard");
        }, 1500);
    }

  return (
    <div className="m-5">
      <form
        className="w-full max-w-md space-y-6 rounded-lg border bg-card p-6 shadow-sm sm:p-8"
        action={formAction}
      >
        <div className="space-y-1 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome back
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your credentials to login.
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="email..."
            autoComplete="email"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            autoComplete="current-password"
            required
          />
        </div>

        <Button type="submit" className="w-full" disabled={pending}>
          {pending ? "Login..." : "Login"}
        </Button>

        <p className="text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="underline hover:text-primary">
            Register
          </Link>
        </p>
      </form>

      {state?.message && <p aria-live="polite">{state.message}</p>}
    </div>
  );
};


export default LoginForm;