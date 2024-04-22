import React, { useEffect, useState } from "react";
import { TagField, useTagInput } from "./Tags/Keyword";
import { Toaster, toast } from "react-hot-toast";

const MainContainer = () => {
  const { tags, handleAddTag, handleRemoveTag } = useTagInput();
  const [isOpen, setIsOpen] = useState(false);
  console.log(tags);

  const [formData, setFormData] = useState({
    username: "", // Initialize with an empty string
    userid: "", // Initialize with an empty string
    description: "",
    images: [],
    keyword: [],
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);

      setFormData((prevFormData) => ({
        ...prevFormData,
        username: user.name,
        userid: user.user_id,
      }));
    }
  }, []);

  const handleDescriptionChange = (e) => {
    setFormData({
      ...formData,
      description: e.target.value,
    });
  };

  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = [];

    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "unigram_users_presets"); // Replace with your upload preset
      formData.append("cloud_name", "dtkrpgzox"); // Replace with your cloud name
      formData.append("folder", "unigram/users_posts"); // Optional: Specify a folder

      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dtkrpgzox/image/upload/",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      imageUrls.push(data.secure_url); // Store the Cloudinary URL
    }

    setFormData({
      ...formData,
      images: [...formData.images, ...imageUrls],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    formData.keyword = tags;
    console.log(formData);

    try {
      const response = await fetch("http://localhost:3002/home", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Successfully Posted!");
        setFormData({
          ...formData,
          description: "",
          images: [],
          keyword: [],
        });
      } else {
        const errorMessage = await response.text();
        console.error("Error:", errorMessage || response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <div>
        <div className="bg-white p-4 rounded-md shadow-lg">
          <>
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
              <TagField
                tags={tags}
                addTag={handleAddTag}
                removeTag={handleRemoveTag}
                maxTags={5}
              />
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
          </>
        </div>
      </div>
      <Toaster position="top-right" timeout={3000} reverseOrder={false} />
    </div>
  );
};

export default MainContainer;
