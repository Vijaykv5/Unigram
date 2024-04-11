import React, { useEffect, useState } from "react";
import ShowPosts from "./ShowPosts";
import Tech from "./channels/Tech";

const Post = () => {
  // Define state variables
  const [formData, setFormData] = useState({
    user_id: "", // Initialize with an empty string
    description: "",
    images: [],
  });

  // Load user data from localStorage on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setFormData((prevFormData) => ({
        ...prevFormData,
        user_id: user.user_id,
      }));
    }
  }, []); // Run only once on component mount

  // Update formData when description changes
  const handleDescriptionChange = (e) => {
    setFormData({
      ...formData,
      description: e.target.value,
    });
  };

  // Update formData when images are selected
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const urls = files.map((file) => URL.createObjectURL(file));
    setFormData({
      ...formData,
      images: [...formData.images, ...urls],
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make POST request to the server
      const response = await fetch("http://localhost:3002/home", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        console.log("Post created successfully!");
        // Reset form state after successful post creation
        setFormData({
          ...formData,
          description: "",
          images: [],
        });
      } else {
        console.error("Error1:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <h2 className="text-lg font-semibold mb-2">Share an Update</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          id="description"
          value={formData.description}
          onChange={handleDescriptionChange}
          placeholder="What do you want to talk about?"
          className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-none mb-2"
          rows="3"
          required
        />
        <div className="flex flex-wrap">
          {formData.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Image ${index}`}
              className="max-w-xs mx-1 my-2 rounded-md"
            />
          ))}
        </div>
        <label
          htmlFor="image"
          className="block text-gray-700 cursor-pointer mt-2"
        >
          <svg
            className="w-6 h-6 mr-2 inline-block text-gray-500 hover:text-blue-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          Add Photo
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
            multiple
          />
        </label>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2"
        >
          Post
        </button>
      </form>
      <Tech/>
      <ShowPosts/>
    </div>
  );
};

export default Post;
