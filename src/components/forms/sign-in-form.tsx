"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card"

import signIn from "@/actions/sign-in"
import { cn } from "@/lib/utils"
import { formSchema, formSchemaType } from "@/lib/validators/auth/sign-in"
import { Loader2 } from "lucide-react"
import { useMutation } from "react-query"
import { buttonVariants } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"

export default function SignInForm() {
  const router = useRouter()
  const { mutate, isLoading } = useMutation({
    mutationKey: ["sign-in"],
    mutationFn: async (data: formSchemaType) => {
      const response = await signIn(data)
      console.log("ran")
      if (response.success) router.push("/")
    },
  })

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<formSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  return (
    <form onSubmit={handleSubmit((e) => mutate(e))}>
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
            disabled={isLoading}
          >
            {isLoading ? <Loader2 /> : "login"}
          </button>
        </CardFooter>
      </Card>
    </form>
  )
}
