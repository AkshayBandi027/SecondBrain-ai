"use server"

import { RecursiveCharacterTextSplitter } from "langchain/text_splitter"
import { TextLoader } from "langchain/document_loaders/fs/text"
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf"
import { embeddings } from "@/lib/embeddings"
import { v4 as uuidv4 } from "uuid"
import { index } from "@/lib/pinecone"
import { convertToAscii } from "@/lib/utils"
import { db } from "@/db"
import { chat } from "@/db/schema"
import { validateRequest } from "@/lib/auth/helpers"

const loader = async (url: string, fileType: string) => {
  try {
    let loader

    if (fileType === "text/plain" || fileType === "text/markdown") {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error("Failed to fetch file")
      }
      const text = await response.text()
      loader = new TextLoader(new Blob([text]))
    } else if (fileType === "application/pdf" || fileType === "pdf") {
      const response = await fetch(url)
      const arrayBuffer = await response.arrayBuffer()
      loader = new PDFLoader(new Blob([arrayBuffer], { type: fileType }))
    }
    return await loader?.load()
  } catch (error) {
    console.log(`error while loading file`, error)
  }
}

export const extractText = async (
  url: string,
  fileName: string,
  fileType: string
) => {
  try {
    const docs = await loader(url, fileType)

    if (!docs) {
      throw new Error("Failed to load document")
    }

    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    })

    const splitDocs = await textSplitter.splitDocuments(docs)

    const processedDocs = splitDocs.map(
      (doc: {
        pageContent: string
        metadata: { loc: { pageNumber: number } }
      }) => ({
        pageContent: doc.pageContent.replace(/\n/g, " "),
        metadata: {
          pageNumber: doc.metadata.loc.pageNumber,
        },
      })
    )

    const vectorEmbeddings = await Promise.all(
      processedDocs.map(
        async (doc: {
          pageContent: string
          metadata: { pageNumber: number }
        }) => {
          const embedding = await embeddings.embedQuery(doc.pageContent)
          const id = uuidv4()
          return {
            id,
            values: embedding,
            metadata: {
              pageNumber: doc.metadata.pageNumber,
            },
          }
        }
      )
    )

    const namespace = index.namespace(convertToAscii(fileName))
    await namespace.upsert(vectorEmbeddings)
    return {
      success: true,
      message: "File extracted successfully",
    }
  } catch (error) {
    console.log(error)
    return {
      success: false,
      message: "Failed to extract file",
    }
  }
}

export const CreateChat = async ({
  fileName,
  fileUrl,
}: {
  fileName: string
  fileUrl: string
}) => {
  try {
    const user = await validateRequest()
    if (!user) throw new Error("Unauthorized")
    const id = uuidv4()
    const response = await db.insert(chat).values({
      id,
      userId: user.id,
      documentName: fileName,
      documentUrl: fileUrl,
      createdAt: new Date(),
    })
    if (!response) throw new Error("Failed to create chat")
      return {
        success: true,
        message: "Chat created successfully",
        data: id
      }
    
  } catch (error) {
    console.log(error)
    return {
      success: false,
      message: "Failed to create chat",
      data: null
    }
  }
}
