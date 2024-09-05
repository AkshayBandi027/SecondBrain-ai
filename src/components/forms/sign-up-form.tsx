"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
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

import signUp from "@/actions/sign-up"
import { cn } from "@/lib/utils"
import { formSchema, formSchemaType } from "@/lib/validators/auth/sign-up"
import { useMutation } from "react-query"
import { buttonVariants } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"

export default function SignUpForm() {
  const router = useRouter()
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<formSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  const { mutate, isLoading } = useMutation({
    mutationKey: ["sign-up"],
    mutationFn: async (data: formSchemaType) => {
      const response = await signUp(data)
      if (response.success) router.push("/")
    },
  })

  return (
    <form onSubmit={handleSubmit((e) => mutate(e))}>
      <Card className="min-w-[700px]">
        <CardHeader>
          <CardTitle>Create your account</CardTitle>
          <CardDescription>
            Welcome! Please fill in the details to get started.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="">
            <Label className="" htmlFor="name">
              Name
            </Label>
            <Input
              id="name"
              className="w-[400px]"
              size={32}
              {...register("name")}
            />
            {errors.name && (
              <p className="px-1 text-xs text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div className="grid gap-1">
            <Label className="" htmlFor="name">
              Email
            </Label>
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
            <Label className="" htmlFor="name">
              Password
            </Label>
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
          <div className="grid gap-1">
            <Label className="" htmlFor="name">
              ConfirmPassword
            </Label>
            <Input
              id="confirmPassword"
              className="w-[400px]"
              size={32}
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <p className="px-1 text-xs text-red-600">
                {errors.confirmPassword.message}
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
            {isLoading ? <Loader2 /> : "create"}
          </button>
        </CardFooter>
      </Card>
    </form>
  )
}
