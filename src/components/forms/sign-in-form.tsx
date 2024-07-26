"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { redirect, useRouter } from "next/navigation"
import { Form, useForm } from "react-hook-form"
import { z } from "zod"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card"

import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { cn } from "@/lib/utils"
import { buttonVariants } from "../ui/button"
import { useTransition } from "react"
import { Loader2 } from "lucide-react"
import signIn from "@/actions/sign-in"

export const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

export default function SignInForm() {
  const [isPending, startTransition] = useTransition()

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = handleSubmit((data) => {
    startTransition(async () => {
      const response = await signIn(data)
      if (response.success) redirect("/")
    })
  })

  return (
    <form onSubmit={onSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Sign In to SecondBrain </CardTitle>
          <CardDescription>
            Welcome back! Please sign in to continue
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="grid gap-1">
            <Label htmlFor="name">Email</Label>
            <Input
              id="Email"
              className="w-[400px]"
              size={32}
              {...register("email")}
            />
            {errors.email && (
              <p className="px-1 text-xs text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="grid gap-1">
            <Label htmlFor="name">Password</Label>
            <Input
              id="password"
              className="w-[400px]"
              size={32}
              {...register("password")}
            />
            {errors.password && (
              <p className="px-1 text-xs text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <button
            type="submit"
            className={cn(buttonVariants())}
            disabled={isPending}
          >
            {isPending ? <Loader2 /> : "login"}
          </button>
        </CardFooter>
      </Card>
    </form>
  )
}
