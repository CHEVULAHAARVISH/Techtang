'use client'

import React from 'react'
import { useState } from 'react'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { usePathname,useRouter } from 'next/navigation'
const ContentCard = ({post,handleTagClick,handleEdit,handleDelete}) => {
  const {data:session} = useSession();
  const pathName = usePathname();
  const router = useRouter();
  const [copy, setCopy] = useState('')
  const handleCopy =()=>{
    setCopy(post.post);
    navigator.clipboard.writeText(post.post);
    setTimeout(()=>setCopy(""),3000)
  }
  return (
    <div className=' prompt_card'>
      <div className='flex justify-between items-start gap-5'>
        <div className='flex-1 flex justify-start items-center gap-3 cursor-pointer'>
          <Image 
          src={post.creator?.image}
          alt='use-image'
          height={40}
          width={40}
          className='rounded-full object-contain'/>
          <div className='flex flex-col'>
            <h3 className='font-satoshi font-semibold blue_gradient'>
              {post.creator?.username}
            </h3>
            <p className='font-inter text-sm text-white'>
              {post.creator?.email}
            </p>
            
          </div>
        </div>
        <div className='copy_btn' onClick={handleCopy}>
          <Image 
          src={copy === post.post ? '/assets/icons/tick.svg' : '/assets/icons/copy.svg'}
          width={15}
          height={15}/>

        </div>
      </div>
      <p className='text-white my-4 font-satoshi text-sm '>{post.post}</p>
      <p className='text-white font-inter text-sm blue_gradient cursor-pointer' 
      onClick={()=> handleTagClick && handleTagClick(post.tag)}>
        {post.tag}
      </p>
      {session?.user.id === post.creator?._id && pathName ==='/profile'&&(
        <div className='mt-5 flex-center gap-4 border-t border-gray-100 pt-3'>
          <p className='font-inter text-sm green_gradient cursor-pointer' onClick={handleEdit}>
            Edit
          </p>
          <p className='font-inter text-sm orange_gradient cursor-pointer' onClick={handleDelete}>
            Delete
          </p>
        </div>
      )}
    </div>
  )
}

export default ContentCard