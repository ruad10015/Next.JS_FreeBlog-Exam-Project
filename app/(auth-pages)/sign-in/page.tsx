"use client";

import { signInAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useThemeStore } from "@/store";
import React from "react";

export default function Login(props: { searchParams: Promise<Message> }) {
  const searchParams = React.use(props.searchParams);
  const theme = useThemeStore((state) => state.theme);

  return (
    <div
      className={`w-full h-screen flex items-center justify-center ${theme ? "bg-[#181A2A] text-white" : "bg-white text-[#232536]"}`}
    >
      <form className="flex flex-col w-[400px] border border-zinc-300 p-5 rounded-md">
        <h1 className="text-2xl font-medium">Sign in</h1>
        <p className="text-sm">
          Don't have an account?{" "}
          <Link className="font-medium underline" href="/sign-up">
            Sign up
          </Link>
        </p>
        <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
          <Label htmlFor="email">Email</Label>
          <Input
            className={`${theme ? "bg-[#181A2A] text-white" : "bg-white text-[#232536]"}`}
            name="email"
            placeholder="you@example.com"
            required
          />
          <div className="flex justify-between items-center">
            <Label htmlFor="password">Password</Label>
            <Link className="text-xs underline" href="/forgot-password">
              Forgot Password?
            </Link>
          </div>
          <Input
            className={`${theme ? "bg-[#181A2A] text-white" : "bg-white text-[#232536]"}`}
            type="password"
            name="password"
            placeholder="Your password"
            required
          />

          <SubmitButton
            className="bg-red-700"
            pendingText="Signing In..."
            formAction={signInAction}
          >
            Sign in
          </SubmitButton>
          <FormMessage message={searchParams} />
        </div>
      </form>
    </div>
  );
}
