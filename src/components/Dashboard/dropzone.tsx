"use client"

import { useDropzone } from "react-dropzone"
import { useUploadThing } from "@/lib/uploadthing"
import { Button } from "../ui/button"
import { useCallback, useState } from "react"
import { toast } from "sonner"

export function DropZone() {
  const [file, setFile] = useState<File>()

  const onDrop = useCallback((accpetedFiles: File[]) => {
    setFile(accpetedFiles[0])
  }, [])

  const { startUpload, permittedFileInfo } = useUploadThing("fileUploader", {
    onClientUploadComplete: () => {
      toast("uploaded successfully")
    },
    onUploadError: () => {
      toast("error occurred while uploading")
    },
    onUploadBegin: () => {
      toast("upload has begun")
    },
  })

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    maxSize: 20 * 1024 * 1024,
    accept: {
      "video/*": [],
      "audio/*": [],
    },
    onDrop,
  })

  console.log(file)

  const handleTranscribe = async () => {
    if (file) {
      const response = await startUpload([file])
      console.log(response)
    }
  }

  return (
    <div className="flex items-center justify-center gap-2 text-black">
      <div
        {...getRootProps({ className: "dropzone" })}
        className="border border-border rounded-xl p-4"
      >
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      <Button onClick={handleTranscribe}>Transcribe</Button>
    </div>
  )
}
