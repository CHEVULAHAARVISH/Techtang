import { connectToDb } from "@utils/database";
import Post from "@models/post";
// get 
export const GET = async(request,{params})=>{
    try {
        await connectToDb();
        const post = await Post.findById(params.id).populate('creator');
        if(!post) return new Response("Post not found",{status:404})
        return new Response(JSON.stringify(post),{status:200})
    } catch (error) {
        return new Response('Failed to Fetch all Posts',{status:500})
    
    }
}

//patch
export const PATCH = async(request,{params})=>{
    const {post,tag} = await request.json();
    try {
        await connectToDb();
        const existingPost = await Post.findById(params.id);
        if(!existingPost) return new Response("Post doesnt exist",{status:404})
        existingPost.post = post;
        existingPost.tag = tag;
        await existingPost.save();
        return new Response(JSON.stringify(existingPost),{status:200})
    } catch (error) {
        return new Response('Failed to update the Post',{status:500});
        
    }
}
//delete
export const DELETE = async(request,{params})=>{
    try {
        await connectToDb();
        await Post.findByIdAndRemove(params.id);
        return new RESPONSE("Post got deleted",{status:200})
    } catch (error) {
        return new RESPONSE("Couldnt delete Post",{status:500});
    }
}
