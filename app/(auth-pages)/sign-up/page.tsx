"use client";

import { signUpAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useThemeStore } from "@/store";
import React from "react";

export default function Signup(props: { searchParams: Promise<Message> }) {
  const searchParams = React.use(props.searchParams);
  if ("message" in searchParams) {
    return (
      <div className="w-full flex-1 flex items-center h-screen sm:max-w-md justify-center gap-2 p-4">
        <FormMessage message={searchParams} />
      </div>
    );
  }

  const theme = useThemeStore((state) => state.theme);

  return (
    <div
      className={`w-full h-screen flex justify-center items-center ${theme ? "bg-[#181A2A] text-white" : "bg-white text-[#232536]"}`}
    >
      <form className="flex flex-col w-[400px] p-5 border border-zinc-300 rounded-md">
        <h1 className="text-2xl font-medium">Sign up</h1>
        <p className="text-sm">
          Already have an account?{" "}
          <Link className="font-medium underline" href="/sign-in">
            Sign in
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

          <Label htmlFor="password">Password</Label>
          <Input
            className={`${theme ? "bg-[#181A2A] text-white" : "bg-white text-[#232536]"}`}
            type="password"
            name="password"
            placeholder="Your password"
            minLength={6}
            required
          />

          <SubmitButton
            className="bg-red-700"
            formAction={signUpAction}
            pendingText="Signing up..."
          >
            Sign up
          </SubmitButton>
          <FormMessage message={searchParams} />
        </div>
      </form>
    </div>
  );
}
