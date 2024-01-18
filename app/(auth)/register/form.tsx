"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { FormRegisterData } from "../utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

export default function Form() {
  const { handleSubmit, register } = useForm<FormRegisterData>();
  const router = useRouter();

  const onSubmit: SubmitHandler<FormRegisterData> = async (values) => {
      const {email, password, confirmPassword, name} = values;
      const response = await fetch('/api/auth/register', {
          method: 'POST',
          body: JSON.stringify({
              email: email,
              name: name,
              password: password,
              confirmPassword: confirmPassword
          })
      })
      const accountCreation = await response;
      if(accountCreation.status === 200) {
        router.push('/');
        router.refresh();
      }
  }
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-y-5 mb-4"
    >
      <Label htmlFor="email" className="flex flex-col gap-y-3">
        Your email address
        <Input {...register("email")} type="email" placeholder="Email" />
      </Label>
      <Label htmlFor="name" className="flex flex-col gap-y-3">
        Your name
        <Input {...register("name")} type="text" placeholder="Name" />
      </Label>
      <Label htmlFor="password" className="flex flex-col gap-y-3">
        Your password
        <Input
          {...register("password")}
          type="password"
          placeholder="Password"
        />
      </Label>
      <Label htmlFor="password" className="flex flex-col gap-y-3">
        Confirm password
        <Input
          {...register("confirmPassword")}
          type="password"
          placeholder="Confirm password"
        />
      </Label>
      <Button type="submit" className="w-full py-4">
        Create an account
      </Button>
    </form>
  );
}
