"use client"
import { z } from "zod"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "../ui/button"
import { Loader2 } from "lucide-react"
import { useTransition } from "react"
import CreateNote from "@/actions/create-note"

export const formSchema = z.object({
  title: z.string().min(3),
})

export default function CreateNoteForm() {
  const [isPending, startTransition] = useTransition()
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  })

  const onSubmit = handleSubmit((data) => {
    startTransition(async () => {
      try {
        const note = await CreateNote(data)
         // redirect the user to markdown with notesId.
      } catch (error) {
        console.log(error)
      }
    })
  })

  return (
    <div className="grid gap-4 py-4">
      <form className="grid grid-cols-4 items-center gap-4" onSubmit={onSubmit}>
        <Label htmlFor="name" className="text-right">
          title
        </Label>
        <Input
          id="title"
          defaultValue="my-Notes"
          className="col-span-3"
          {...register("title")}
        />
        {errors.title && (
          <p className="px-1 text-xs text-red-600">{errors.title.message}</p>
        )}
        <Button type="submit" disabled={isPending}>
          {isPending ? <Loader2 /> : "Create"}
        </Button>
      </form>
    </div>
  )
}
