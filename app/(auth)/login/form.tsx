"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { FormLoginData } from "../utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Form() {
  const router = useRouter();
  const [authError, setAuthError] = useState<string | null>(null);
  const { handleSubmit, register } = useForm<FormLoginData>();
  const onSubmit: SubmitHandler<FormLoginData> = async (values) => {
    const { email, password } = values;
    const login = await signIn("credentials", {
      email: email,
      password: password,
      redirect: false,
    });

    if(login?.ok === false && login?.status === 401) {
        setAuthError('This account does not exist')
    }

    if (!login?.error) {
      authError && setAuthError(null);
      router.push("/");
      router.refresh();
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-y-5 mb-4"
    >
      <Label htmlFor="email" className="flex flex-col gap-y-3">
        Your email address
        <Input {...register("email")} type="email" placeholder="Email" />
      </Label>
      <Label htmlFor="password" className="flex flex-col gap-y-3">
        Your password
        <Input
          {...register("password")}
          type="password"
          placeholder="Password"
        />
      </Label>
      {authError &&  <span className="text-red-600 p-2 rounded-md bg-red-200 text-center">{authError}</span>}
      <Button type="submit" className="w-full py-4">
        Login
      </Button>
    </form>
  );
}
