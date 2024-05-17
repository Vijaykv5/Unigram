import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BiUpvote } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa";
import Trending from "./trending/Trending";
import RightSidebar from "./RightSidebar";

const TrendingPage = () => {
  const channel = useParams().channel;
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`http://localhost:3002/posts/${channel}`);
        const data = await response.json();
        setPosts(data);
        console.log("Posts:", data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [channel]);

  const handleLike = (postId) => {
    const updatedPosts = posts.map((post) => {
      if (post._id === postId) {
        return { ...post, likes: post.likes + 1 };
      }
      return post;
    });
    setPosts(updatedPosts);
  };

  const handleUnlike = (postId) => {
    
   
  };

  return (
    <div>
      {/* <div>
        <Trending />
      </div> */}
      <div className="ml-[80%]">
        <RightSidebar />
      </div>
     
      {posts.map((post, index) => (
        
        <div
          key={post._id}
          className="post m-40  w-[40%] bg-white hover:bg-gray-50 rounded-lg shadow-md mb-4 transition-all duration-300 ease-in-out transform hover:-translate-y-1"
        >
          <Link to={`/profile/${post.userid}`} className="block">
            <div className="post-header flex items-center p-4">
              <img
                src={post.userimage}
                className="profile-picture w-11 h-11 rounded-full mr-4"
                alt="Profile"
              />
              <div className="post-info">
                <h3 className="post-author text-lg font-bold">
                  {post.username}
                </h3>
                <p className="post-time text-gray-600">
                  {new Date(post.dateTime).toLocaleString()}
                </p>
              </div>
            </div>
          </Link>
          <div className="post-content p-4">
            <p>{post.description}</p>
            <div className="flex flex-wrap -mx-1 my-2">
              {post.images &&
                post.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Image ${index}`}
                    className="w-1/2 sm:w-2/4 px-1 my-1 rounded-md"
                  />
                ))}
            </div>
          </div>
          <div className="post-actions p-4 border-t border-gray-200">
            <button
              onClick={() => handleLike(post._id)}
              className={`like-button bg-blue-400 text-white px-4 py-2 rounded-2xl mr-2`}
            >
              <div className="flex">
                <BiUpvote size={24} color="bg-blue-500" />
                <span className="">{post.likes}</span>
              </div>
            </button>
            <button className="comment-button bg-blue-400 text-white px-4 py-2 rounded-2xl mr-2">
              <div className="flex">
                <FaRegComment size={24} color="bg-blue-500" />
                <span className="ml-1">{post.comments.length}</span>
              </div>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TrendingPage;
