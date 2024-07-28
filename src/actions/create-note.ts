"use server"

import { z } from "zod"
import { formSchema } from "@/components/forms/create-note-form"
import { db } from "@/db"
import { notes } from "@/db/schema"
import getUser from "@/lib/auth/helpers"

export default async function CreateNote(values: z.infer<typeof formSchema>) {
  try {
    const user = await getUser()
    if (!user) return null

    const notesId = await db
      .insert(notes)
      .values({
        userId: user?.id,
        title: values.title,
      })
      .returning({ insertedId: notes.id })
      // returning gives us back all the ids of notes.

    return { note_id: notesId[0].insertedId }
    // return the newly created Note id.
  } catch (error) {
    console.log(error)
  }
}
