import { validateRequest } from "@/lib/auth/helpers"
import { createUploadthing, type FileRouter } from "uploadthing/next"
import { UploadThingError } from "uploadthing/server"

const f = createUploadthing()

export const ourFileRouter = {
  fileUploader: f({
    pdf: { maxFileCount: 1, maxFileSize: "16MB" },
    "text/markdown": { maxFileCount: 1, maxFileSize: "4MB" },
  })
    .middleware(async ({ req }) => {
      const user = await validateRequest()

      if (!user) throw new UploadThingError("Unauthorized")

      return { userId: user.id }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId)

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { userId: metadata.userId, file: file }
    }),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter
