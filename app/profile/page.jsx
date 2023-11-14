'use client'
import  { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Profile from '@components/Profile';
  
const MyProfile = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [post, setPost] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      if (session?.user) {
        const response = await fetch(`/api/users/${session.user.id}/posts`,{cache:'no-store'},{next:{revalidate:2}});
        const data = await response.json();
        setPost(data);
      }
    };

    if (session) fetchPosts();
  }, [session]);

  const handleEdit = (post) => {
    router.push(`/update-post?id=${post._id}`);
    // Handle edit functionality here
  };

  const handleDelete = async (postToDelete) => {
    const hasConfirmed = confirm("Are you sure you want to delete the post?");
    if (hasConfirmed) {
      try {
        await fetch(`/api/post/${postToDelete._id}`,{cache:'no-cache'},{next:{revalidate:2}}, {
          method: 'DELETE',
        });
        const filteredPosts = post.filter((p) => p._id !== postToDelete._id);
        setPost(filteredPosts);
      } catch (error) {
        console.log('Error deleting a post', error);
      }
    }
  };

  return (
    <Profile
      name='My'
      desc='Welcome to your personalized profile page'
      data={post}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
