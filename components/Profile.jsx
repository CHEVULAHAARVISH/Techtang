import React from 'react'
import ContentCard from './ContentCard'
const Profile = ({name,desc,data,handleEdit,handleDelete}) => {
  return (
    
    <section className='w-full'>
      <h1 className='text-left head_text blue_gradient p-3'>
      {name} profile 
      </h1>
     <p className='desc text-left'>
      {desc}
     </p>
     <div className='mt-10 prompt_layout'>
        {data.map((post)=>(
          <ContentCard 
          key={post._id}
          post={post}
          handleEdit={()=>handleEdit && handleEdit(post)}
          handleDelete={()=>handleDelete && handleDelete(post)}/>
        ))}
      </div>  
    </section>
  )
}

export default Profile