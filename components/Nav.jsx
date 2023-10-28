'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState,useEffect } from 'react'
import {signIn,signOut,useSession,getProviders} from 'next-auth/react'
const Nav = () => {
  const {data:session}= useSession();
  const [toggledown, setToggledown] = useState(false);
  const[providers,setProviders] = useState(null);
  useEffect(() => {
    const setUpProviders = async()=>{
      const response = await getProviders();
      setProviders(response);
    }
    setUpProviders();
  }, [])
  
  return (
    <nav className='text-white flex-between w-full mb-16 pt-3'>
      <Link href='/' className='flex gap-2 flex-center'>
        <Image src='/assets/images/logo.svg' alt='logo' className='object-contain' width={30} height={30}/>
        <p className='logo_text'>TechTango</p>
      </Link>
      {/* Desktop Navigation */}
      <div className='sm:flex hidden'>
      {session?.user  ?(
      <div className='flex gap-3 md:gap-5'>
        <Link href='/create-post' className='blue_btn'>
          Create Post
        </Link>
        <button type='button' onClick={signOut} className='outline_btn'>
          Sign Out
        </button>
        <Link href='/profile'>
          <Image src={session?.user.image}
          width={29}
          height={29}
          className='rounded-full'
          alt='profilepic'/>
        </Link>

      </div>

    ):(
      <>
      {providers && Object.values(providers).map((provider)=>(
        <button 
        type='button'
        className='blue_btn' 
        onClick={()=>signIn(provider.id)} 
        key={provider.name}>
          Sign In
        </button>
      ))}
      </>
    )}
      </div>
      {/* Mobile Navigation */}
      <div className='sm:hidden flex relative'>
        {session?.user ?(
          <div className='flex'>
            <Image 
            src={session?.user.image}
            width={27}
            height={27}
            className='rounded-full'
            alt='profilepic'

            onClick={()=>setToggledown((prev)=> !prev)}/>
            {toggledown && (
              <div className='dropdown'>
                <Link href='/profile' className='dropdown_link' onClick={() => setToggledown(false)}>
                  My Profile
                </Link>
                <Link href='/create-post' className='dropdown_link' onClick={() => setToggledown(false)}>
                  Create Post
                </Link>
                <button type='button' className='mt-5 w-full blue_btn' onClick={() => setToggledown(false)}>
                  Sign Out
                </button>
              </div>
            )}

          </div>

        ):(
          <>
          {providers && Object.values(providers).map((provider)=>(
            <button 
            type='button'
            className='blue_btn' 
            onClick={()=>signIn(provider.id)} 
            key={provider.name}>
              Sign In
            </button>
          ))}
          </>
        )}
      </div>
    </nav>


  )
}

export default Nav