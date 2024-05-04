import React, { useEffect, useState } from "react";
import { BiUpvote } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa";
import { FaShareFromSquare } from "react-icons/fa6";
import { Link } from "react-router-dom";




// console.log(posts)
const FeedPost = ({ post, updatePostLikes }) => {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    // Check if the post has been liked before
    const likedPosts = JSON.parse(sessionStorage.getItem("likedPosts")) || [];
    if (likedPosts.includes(post._id)) {
      setLiked(true);
    }
  }, [post._id]);

  const handleLike = async () => {
    if (!liked) {
      try {
        
        updatePostLikes(post._id, post.likes + 1);

        // likes
        const response = await fetch(`http://localhost:3002/Home/${post._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ likes: post.likes + 1 }), // Increment likes
        });

        if (!response.ok) {
          console.error("Failed to update post likes");
          
          updatePostLikes(post._id, post.likes);
        } else {
          
          setLiked(true);
          const likedPosts =
            JSON.parse(sessionStorage.getItem("likedPosts")) || [];
          sessionStorage.setItem(
            "likedPosts",
            JSON.stringify([...likedPosts, post._id])
          );
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

 const handleUnlike = async () => {
  if (liked) {
    try {
      // Update frontend likes
      updatePostLikes(post._id, post.likes - 1);

     
      const response = await fetch(`http://localhost:3002/Home/${post._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ likes: post.likes - 1 }), 
      });

      if (!response.ok) {
        console.error("Failed to update post likes");
      
        updatePostLikes(post._id, post.likes);
      } else {
      
        const likedPosts =
          JSON.parse(sessionStorage.getItem("likedPosts")) || [];
        const updatedLikedPosts = likedPosts.filter((id) => id !== post._id);
        sessionStorage.setItem(
          "likedPosts",
          JSON.stringify(updatedLikedPosts)
        );
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
};
console.log("post-details",post);

  const shareLink = `http://example.com/share/${post._id}`;

  return (
    <div className="post w-full bg-white hover:bg-gray-50 rounded-lg shadow-md mb-4 transition-all duration-300 ease-in-out transform hover:-translate-y-1">
      <Link to={`/profile/${post.userid}`} className="block">
        <div className="post-header flex items-center p-4">
          <img
            src={post.userimage}
            className="profile-picture w-11 h-11 rounded-full mr-4"
          />
          <div className="post-info">
            <h3 className="post-author text-lg font-bold">{post.username}</h3>
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
                className="w-1/2 sm:w-1/4 px-1 my-1 rounded-md"
              />
            ))}
        </div>
      </div>
      <div className="post-actions p-4 border-t border-gray-200">
        <button
          onClick={liked ? handleUnlike : handleLike}
          className={`like-button bg-blue-400 text-white px-4 py-2 rounded-2xl mr-2 ${
            liked && "cursor-not-allowed bg-blue-900"
          }`}
          disabled={liked}
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
        {/* <a
      href={shareLink}
      className="share-button bg-blue-500 text-white px-4 py-2 rounded"
    >
      Share
    </a> */}
      </div>
    </div>
  );
};

const Feed = () => {
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
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const updatePostLikes = async (postId, newLikes) => {
    try {
      const response = await fetch(`http://localhost:3002/Home/${postId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ likes: newLikes }),
      });
      if (!response.ok) {
        console.error("Failed to update post likes");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>
      {posts.map((post) => (
        <FeedPost
          key={post._id}
          post={post}
          updatePostLikes={updatePostLikes}
        />
      ))}
      
    </div>
  );
};

export default Feed;
