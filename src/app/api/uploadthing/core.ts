import { getUserCookie } from "@/lib/get-user-cookie";
import { createUploadthing, type FileRouter } from "uploadthing/next";

 
const f = createUploadthing();
 
const handleAuth = async() => {
     const userId = await getUserCookie();
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
nationalIDImage: f({
    image:{maxFileCount:1, maxFileSize:"4MB"}
})
.middleware(()=>handleAuth())
.onUploadComplete(()=>{}),
schoolIDImage: f({
    image:{maxFileCount:1, maxFileSize:"4MB"}
})
.middleware(()=>handleAuth())
.onUploadComplete(()=>{}),
scholarshipImage: f({
    image:{maxFileCount:1, maxFileSize:"4MB"}
})
.middleware(()=>handleAuth())
.onUploadComplete(()=>{}),
sessionVideo: f({
    video:{maxFileCount:1, maxFileSize:"1GB"}
})
.middleware(()=>handleAuth())
.onUploadComplete(()=>{}),
video: f({
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