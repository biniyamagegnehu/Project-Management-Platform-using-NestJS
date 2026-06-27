"use client";

import { useState } from "react";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

import { login } from "@/services/auth.service";

export default function LoginPage() {
  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  async function handleSubmit() {
    const result =
      await login(
        email,
        password
      );

    console.log(result);
  }

  return (
    <main
      className="
      min-h-screen
      flex
      items-center
      justify-center
      "
    >
      <div
        className="
        w-full
        max-w-md
        border
        rounded-xl
        p-8
        space-y-5
        "
      >
        <h1
          className="
          text-3xl
          font-bold
          "
        >
          Login
        </h1>

        <Input
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
        />

        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
        />

        <Button
          onClick={
            handleSubmit
          }
          className="
          w-full
          "
        >
          Login
        </Button>

      </div>
    </main>
  );
}