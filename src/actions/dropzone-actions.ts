"use server"
import {RecursiveCharacterTextSplitter} from "langchain/text_splitter"
import { TextLoader } from "langchain/document_loaders/fs/text";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";


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
 const serializedDocs = splitDocs.map((doc) => ({
  pageContent: doc.pageContent,
  metadata: {...doc.metadata}
 }))

 console.log(`serializedDocs---`,serializedDocs)

} catch (error) {
  console.log(error)
 }
}

