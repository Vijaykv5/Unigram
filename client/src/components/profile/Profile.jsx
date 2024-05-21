import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BiUpvote } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { Base_URL } from "../../utils/constants";



const Profile = () => {
  const { userId } = useParams();
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const response = await fetch(`${Base_URL}/profile/${userId}`);
        if (response.ok) {
          const data = await response.json();
          setUserPosts(data);
        } else {
          console.error("Failed to fetch user posts");
        }
      } catch (error) {
        console.error("Error: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserPosts();
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const { user, posts } = userPosts;
  console.log("usersssss",user.github);

  return (
    <div>
      <div className="user-info bg-blue-200 p-8 rounded-lg shadow-md mb-8">
        <div className="flex items-center">
          <img
            src={user.image}
            alt="Profile Picture"
            className="profile-picture w-32 h-32 rounded-full mr-4"
          />
          <div>
            <p className="text-xl font-semibold">{user.name}</p>
            <p className="text-gray-600">Branch: {user.branch}</p>
            <p className="text-gray-600">Semester: {user.semester}</p>
            <div className="flex items-center mt-2">
              <p className="text-gray-600 flex items-center mr-4">
                <MdOutlineMail size={24} className="mr-1" />
                {user.email}
              </p>
              <a
                href={user.github}
                target="_blank"
                rel="noopener noreferrer"
                className="mr-4"
              >
                <FaGithub
                  size={28}
                  className="text-gray-600 hover:text-gray-800"
                />
              </a>
              <a href={user.linkedin} target="_blank" rel="noopener noreferrer">
                <FaLinkedin
                  size={28}
                  className="text-gray-600 hover:text-gray-800"
                />
              </a>
            </div>
          </div>
        </div>
      </div>

      {posts.length === 0 ? (
        <h2 className="text-2xl font-bold mt-8 text-center">No Posts Yet</h2>
      ) : (
        <h2 className="text-2xl font-bold mt-8 mb-4 text-center">Your Posts</h2>
      )}

      <div className="flex">
        <div>
          {posts.map((post) => (
            <div
              key={post._id}
              className="post  mx-56 w-[130%] bg-white hover:bg-gray-50 rounded-lg shadow-md mb-4"
            >
              <div className="post-header flex items-center p-4">
                <img
                  src={post.userimage}
                  alt="Profile Picture"
                  className="profile-picture w-10 h-10 rounded-full mr-4"
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
                <button className="like-button bg-blue-400 text-white px-4 py-2 rounded-2xl mr-2">
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
        <div></div>
      </div>
    </div>
  );
};

export default Profile;
