import React from 'react'
import Link from 'next/link'

const Form = ({ type,post,setPost,submitting,handleSubmit}) => {
  return (
    <section className='text-white w-full max-w-full flex-start flex-col'>
    <h1 className='head_text text-left'>
    <span className='blue_gradient'>{type} post</span>  
    </h1>
    <p className='desc text-left' max-w-md>You can {type} and share amazing posts with the world, and let your tips and tricks get noticed.</p>
    <form
    onSubmit={handleSubmit}
    className='w-full max-w-2xl mt-8 flex-col flex gap-7 glassmorphism'>
      <label>
        <span className='font-satoshi font-semibold text-base text-white'>Your Tips&Trick</span>
        <textarea 
        value={post.post}
        onChange={(e)=>setPost({...post,post:e.target.value})}
        placeholder='Share your post here...'
        required
        className='form_textarea'/>
      </label>
      <label>
        <span className='font-satoshi font-semibold text-base text-white'>
          Tag {"  "}
          <span className='font-normal'>(#webdevlopment #Crypto #Web2)</span>
        </span>
        <input 
        value={post.tag}
        onChange={(e)=>setPost({...post,tag:e.target.value})}
        placeholder='#tag'
        required
        className='form_input'/>
      </label>
      <div className='flex-end mx-3 mb-5 gap-4'>
        <Link href="/" className='text-grey-700 text-sm'>Cancel</Link>
        <button type='submit' disabled={submitting} className='px-5 py-1.5 text-sm bg-blue-600 text-white rounded-full'>
          {submitting ? `${type}...`:type}
        </button>
      </div>


    </form>
    </section>
  )
}

export default Form