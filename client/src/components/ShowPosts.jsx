import React, { useEffect, useState } from 'react'

const ShowPosts = () => {
    const [posts, setPosts] = useState([]);
    
   

    const fetchPosts = async () => {
        try {
          const response = await fetch("http://localhost:3002/Home", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          if (response.ok) {
            const data = await response.json();
            setPosts(data);
          } else {
            console.error("Failed to fetch posts");
          }
        } catch {
          console.error("Error:", error);
        }
    }
     useEffect(() => {
       fetchPosts();
     }, []);
  return (
    <div>
        <h1 className="text-3xl font-semibold text-center">Posts</h1>
        <div className="grid grid-cols-1 gap-4 px-4 py-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
            <div key={post._id} className="bg-white rounded-lg shadow-md">
                {/* <img
                src={post?.images[0]}
                alt="Post"
                className="w-full h-48 object-cover rounded-t-lg"
                /> */}
                <div className="p-4">
                <h2 className="text-xl font-semibold">{post?.description}</h2>
                {/* <p className="mt-2 text-gray-600">
                    {new Date(post?.createdAt).toDateString()}
                </p> */}
                </div>
            </div>
            ))}
        </div>
    </div>
  )
}

export default ShowPosts