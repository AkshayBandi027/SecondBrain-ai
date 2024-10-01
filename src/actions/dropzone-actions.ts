"use server"

import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf"

export const extractText = async (fileUrl: string) => {
  try {
    const loader = new PDFLoader(fileUrl)
    const docs = await loader.load()
    console.log(docs)
  } catch (error) {
    console.log(error)
  }
}
