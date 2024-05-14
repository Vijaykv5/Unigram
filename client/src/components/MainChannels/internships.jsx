import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";

const Internship = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:3002/internships");
        if (response.ok) {
          const data = await response.json();
          setPosts(data); // Update state with fetched data
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
          <h2 className="text-xl font-semibold mb-4">Internships</h2>
          <ul className="mx-auto max-w-md">
            {posts.map((post, index) => (
              <li
                key={index}
                className="mb-2 p-4 bg-white shadow-md rounded-md"
              >
                {post.content}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Internship;
