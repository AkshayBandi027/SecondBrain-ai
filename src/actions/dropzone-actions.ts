"use server"

import {RecursiveCharacterTextSplitter} from "langchain/text_splitter"
import { TextLoader } from "langchain/document_loaders/fs/text";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { embeddings } from "@/lib/embeddings";
import { v4 as uuidv4 } from 'uuid';

type PDFpage = {
  pageContent: string
  metadata: {
    loc: {
      pageNumber: number
    }
  }
}

export const extractText = async (url: string,fileName: string,fileType: string) => {
 try {
  let loader;
  console.log(`fileType---`,fileType)

   if(fileType === "text/plain" || fileType === "text/markdown"){
    const response = await fetch(url)
    if(!response.ok) {
      throw new Error("Failed to fetch file")
    }
    const text = await response.text()
    loader = new TextLoader(new Blob([text]))
 } 
 
 else if (fileType === "application/pdf" || fileType === "pdf") {
  const response = await fetch(url)
  const arrayBuffer = await response.arrayBuffer()
  console.log(`processing`)
   loader = new PDFLoader(new Blob([arrayBuffer], { type: fileType }))
 }

 const docs = await loader?.load()
 console.log(`docs---`,docs)

 if(!docs) {
  throw new Error("Failed to load document")
 }

 const textSplitter = new RecursiveCharacterTextSplitter({
  chunkSize: 1000,
  chunkOverlap: 200,
 })

 const splitDocs = await textSplitter.splitDocuments(docs)
 
 const serializedDocs = splitDocs.map((doc: PDFpage) => ({
  pageContent: doc.pageContent.replace(/\n/g, " "),
  metadata: {
     pageNumber: doc.metadata.loc.pageNumber
  }
 }))

 const vectorEmbeddings =  await Promise.all(serializedDocs.map(async(doc: {pageContent: string, metadata: {pageNumber: number}}) => {
   const embedding =  await embeddings.embedQuery(doc.pageContent)
   console.log(doc)
   const id = uuidv4()
   return {
      id,
      values: embedding,
      metadata: {
        pageNumber: doc.metadata.pageNumber,
      }
   }
 }
))

console.log(vectorEmbeddings, `--- vectorEmbeddings`)

} catch (error) {
  console.log(error)
 }
}

