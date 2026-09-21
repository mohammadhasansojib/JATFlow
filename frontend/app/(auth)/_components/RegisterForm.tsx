"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createUser } from "../_actions/actions";
import { useActionState } from "react";
import { redirect } from "next/navigation";
import Link from "next/link";

export interface IFormState {
  success: boolean
  message: string
}

const initialState = {
  success: false,
  message: '',
}

const RegisterForm = () => {

  const [state, formAction, pending] = useActionState(createUser, initialState);

  if (state.success) {
    setTimeout(() => {
      redirect("/login");
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
            Create an account
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your details to register.
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            name="username"
            type="text"
            placeholder="username..."
            autoComplete="username"
            required
          />
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
            autoComplete="new-password"
            required
          />
        </div>

        <Button type="submit" className="w-full" disabled={pending}>
          {pending ? "Register..." : "Register"}
        </Button>

        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="underline hover:text-primary">
            Login
          </Link>
        </p>
        
      </form>
      {state?.message && <p aria-live="polite">{state.message}</p>}
    </div>
  );
};

export default RegisterForm;