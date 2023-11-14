'use client';
import {useState} from 'react'
import { useRouter } from 'next/navigation';
import {useSession } from 'next-auth/react';
import Form from '@components/Form';
const abortController = new AbortController();
const signal = abortController.signal;
const CreatePost = () => {
  const router = useRouter();
  const {data:session} = useSession();
    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        post:'',
        tag:'',
    });

    const createPost = async(e)=>{
      e.preventDefault();
      setSubmitting(true);
      try {
        const response = await fetch("/api/post/new",{
          cache:"force-cache",
          signal,
          method:'POST',        
          body:JSON.stringify({
            post:post.post,
            userId:session?.user.id,
            tag:post.tag,
          })
        })
        console.log("Response Status:", response.status);
        if(response.ok){
          router.push('/');
        }
      } catch (error) {
        console.log(error); 
      }finally{
      setSubmitting(false);
    }}
  return (
    <Form 
        type="Create"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={createPost} 
    />
  )
}

export default CreatePost