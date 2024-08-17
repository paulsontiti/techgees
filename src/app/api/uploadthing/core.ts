import { auth } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
 
const f = createUploadthing();
 
const handleAuth = () => {
     const {userId} = auth()
     if(!userId) throw new Error("Unauthorized")

        return {userId}
}
 
// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
courseImage: f({
    image:{maxFileCount:1, maxFileSize:"4MB"}
})
.middleware(()=>handleAuth())
.onUploadComplete(()=>{}),

sessionVideo: f({
    video:{maxFileCount:1, maxFileSize:"1GB"}
})
.middleware(()=>handleAuth())
.onUploadComplete(()=>{}),
sessionAttachment: f(
    ["text","image","video","pdf"]
)
.middleware(()=>handleAuth())
.onUploadComplete(()=>{}),
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;