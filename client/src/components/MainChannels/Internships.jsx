import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";

const Internships = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:3002/admin/posts");
        if (response.ok) {
          const data = await response.json();
          setPosts(data);
          console.log(data);
        } else {
          console.error("Failed to fetch posts");
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  // Function to chunk the posts into groups of 3
  const chunkPosts = (arr, size) => {
    return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
      arr.slice(i * size, i * size + size)
    );
  };

  return (
    <div>
      <Navbar />

      <div className="container mx-auto px-4">
        <div className="bg-blue-100 text-blue-900 rounded-md p-12 mb-6">
          <h2 className="text-4xl font-bold mb-4">Internship Opportunities</h2>
          <p className="text-2xl">
            Explore exciting internship opportunities at RSET to gain valuable
            experience and kickstart your career!
          </p>
        </div>

        <div className="text-center">
          {/* <h2 className="text-xl font-semibold mb-4">Internships</h2> */}
          {/* Chunking posts into groups of 3 */}
          {chunkPosts(posts, 3).map((group, index) => (
            <div
              key={index}
              className="flex  animate-wiggle flex-wrap justify-center"
            >
              {group.map((post, index) => (
                <div
                  key={index}
                  className="mb-6 p-4 bg-white shadow-md rounded-md mr-4"
                  style={{ minWidth: "400px", maxWidth: "450px" }}
                >
                  <h3 className="text-lg font-semibold mb-2">{post.heading}</h3>
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold w-36">Description:</span>{" "}
                    {post.description}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Company:</span>{" "}
                    {post.company}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Skills:</span>{" "}
                    {post.skills.join(", ")}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">preferred year:</span>{" "}
                    {post.preferredyear}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Duration:</span>{" "}
                    {post.duration}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Stipend:</span>{" "}
                    {post.stipend}
                  </p>
                  <p className="mt-3">
                    <a
                      href={post.link}
                      className="text-sm font-semibold rounded-md bg-black text-white px-4 py-2"
                    >
                      Apply
                    </a>
                  </p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Internships;
