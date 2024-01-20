"use client";

import { z, ZodType } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormRegisterData } from "../utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

export const RegisterSchema: ZodType<FormRegisterData> = z.object({
  email: z.string().email(),
  name: z.string(),
  password: z.string()
  .min(8, {message: 'Password is too short (min 8 characters)'})
  .max(30, {message: 'Password is too long (max 30 characters)'}),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ['confirmPassword'],
})

export default function Form() {
  const { handleSubmit, register , formState: {errors} } = useForm<FormRegisterData>({
    resolver: zodResolver(RegisterSchema),
  });
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
        {errors.email && <span className="text-red-600 p-2 rounded-md bg-red-200 text-center">{errors.email.message}</span>}
      </Label>
      <Label htmlFor="name" className="flex flex-col gap-y-3">
        Your name
        <Input {...register("name")} type="text" placeholder="Name" />
        {errors.name && <span className="text-red-600 p-2 rounded-md bg-red-200 text-center">{errors.name.message}</span>}
      </Label>
      <Label htmlFor="password" className="flex flex-col gap-y-3">
        Your password
        <Input
          {...register("password")}
          type="password"
          placeholder="Password"
        />
        {errors.password && <span className="text-red-600 p-2 rounded-md bg-red-200 text-center">{errors.password.message}</span>}
      </Label>
      <Label htmlFor="password" className="flex flex-col gap-y-3">
        Confirm password
        <Input
          {...register("confirmPassword")}
          type="password"
          placeholder="Confirm password"
        />
        {errors.confirmPassword && <span className="text-red-600 p-2 rounded-md bg-red-200 text-center">{errors.confirmPassword.message}</span>}
      </Label>
      <Button type="submit" className="w-full py-4">
        Create an account
      </Button>
    </form>
  );
}
