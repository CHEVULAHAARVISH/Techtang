import { connectToDb } from "@utils/database";
import Post from "@models/post";
export const POST = async (request) => {
  const { userId, post, tag } = await request.json();
  try {
    // Establish a database connection
    await connectToDb();
    // Create a new Post instance
    const newPost = new Post({
      creator: userId,
      post,
      tag,
    });
    // Save the new post to the database
    await newPost.save();
    // Respond with the created post and a 201 status code
    return new Response(JSON.stringify(newPost), { status: 201 });
  } catch (error) {
    // Log the error for debugging purposes
    console.error("Error creating a new post:", error);
    // Return an error response with a 500 status code
    return new Response("Failed to Create a New Post", { status: 500 });
  }
};
