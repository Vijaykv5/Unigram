import { useEffect, useState } from "react";
import { BiUpvote } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa";
import { FaShareFromSquare } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { toast , Toaster } from "react-hot-toast";
import { Base_URL } from "../utils/constants";
import {Frontend_URL} from "../utils/constants";

const FeedPost = ({ post, updatePostLikes, updatePostComments }) => {
  const user = JSON.parse(localStorage.getItem("user_details"));
  console.log(user);

  console.log("vijay", post?.comments);
  const [liked, setLiked] = useState(false);
  const [commentInputVisible, setCommentInputVisible] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState(post.comments);

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
        setLiked(true);
        const likedPosts =
          JSON.parse(sessionStorage.getItem("likedPosts")) || [];
        sessionStorage.setItem(
          "likedPosts",
          JSON.stringify([...likedPosts, post._id])
        );
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const handleUnlike = async () => {
    if (liked) {
      try {
        updatePostLikes(post._id, post.likes - 1);
        setLiked(false);
        const likedPosts =
          JSON.parse(sessionStorage.getItem("likedPosts")) || [];
        const updatedLikedPosts = likedPosts.filter((id) => id !== post._id);
        sessionStorage.setItem("likedPosts", JSON.stringify(updatedLikedPosts));
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const handleCommentToggle = () => {
    setCommentInputVisible((prev) => !prev);
    console.log("Comment input visible:", commentInputVisible);
  };

  const handleCommentSubmit = async () => {
    // console.log('nnam',name,profileImage);
    console.log("Submitting comment:", post._id);
    toast("Commented", {
      icon: "👏",
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });



    try {
      const response = await fetch(
        `${Base_URL}/Home/${post._id}/comment`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content: commentText,
            name: user.name,
            time: new Date().toLocaleTimeString(),
            day: new Date().toLocaleDateString(),
            profileImage: user.image,
            profilelink: `${Frontend_URL}`+"/profile/"+`${user.user_id}`,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setComments([...comments, data.comments[data.comments.length - 1]]);
        setCommentText(""); // Clear comment text field
        setCommentInputVisible(false); // Hide comment input field
      } else {
        console.error("Failed to submit comment");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // const shareLink = `http://example.com/share/${post._id}`;

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
        <p>{post.description.split("\r\n")}</p>
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
        <button
          onClick={handleCommentToggle}
          className="comment-button bg-blue-400 text-white px-4 py-2 rounded-2xl mr-2"
        >
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
      {commentInputVisible && (
        <div className="comment-input p-4">
          <input
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Add a comment..."
            className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <button
            onClick={handleCommentSubmit}
            className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2  px-4 rounded focus:outline-none focus:shadow-outline my-3"
          >
            Comment
          </button>
          {/* style comments here */}
          <div className=" border border-x-zinc-700">
            {post?.comments.map((comment, index) => (
              <div
                key={index}
                className="comment p-3 border-b-gray-300 border-x-2"
              >
                <div className="flex items-start">
                  <Link to={comment.profilelink}>
                    <img
                      src={comment.profileImage}
                      alt="Profile"
                      className="comment-profile-picture rounded-full w-12 h-12 mr-2"
                    />
                  </Link>
                  <div>
                    {comment.name && (
                      <p className="comment-name text-lg font-bold">
                        {comment.name}
                      </p>
                    )}
                    <p className="comment-time text-gray-600">
                      {new Date(comment.dateTime).toLocaleString()}
                    </p>
                    <p className="comment-content mt-2">{comment.content}</p>
                  </div>
                </div>
                <p className="comment-time text-gray-600 h-1 w-fit bg-gray-400"></p>
              </div>
            ))}
          </div>
        </div>
      )}
     
    </div>
  );
};

const Feed = () => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const response = await fetch(`${Base_URL}/Home`, {
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
      const response = await fetch(`${Base_URL}/Home/${postId}`, {
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

  const updatePostComments = async (postId, newComments) => {
    try {
      const response = await fetch(
        `${Base_URL}/Home/${postId}/comment`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newComments),
        }
      );
      if (!response.ok) {
        console.error("Failed to update post comments");
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
          updatePostComments={updatePostComments}
        />
      ))}
     
    </div>
  );
};

export default Feed;
