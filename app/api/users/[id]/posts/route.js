import React from 'react'
import { connectToDb } from "@utils/database";
import Post from "@models/post";


export const GET = async(request,{params})=>{
    try {
        await connectToDb();
        const posts = await Post.find({
            creator: params.id
        }).populate('creator');
        return new Response(JSON.stringify(posts),{status:200})
    } catch (error) {
        return new Response('Failed to Fetch all Posts',{status:500})
        console.log(error);
    }
}