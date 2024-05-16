import React, { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import {
  FaRegBuilding,
  FaFileAlt,
  FaBriefcase,
  FaChalkboardTeacher,
  FaClock,
  FaMoneyBillAlt,
} from "react-icons/fa";

const PostContent = () => {
  const [heading, setHeading] = useState("");
  const [company, setCompany] = useState("");
  const [description, setDescription] = useState("");
  const [skills, setSkills] = useState("");
  const [preferredyear, setPreferredyear] = useState("");
  const [duration, setDuration] = useState("");
  const [stipend, setStipend] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !heading.trim() ||
      !description.trim() ||
      !company.trim() ||
      !skills.trim() ||
      !preferredyear.trim() ||
      !duration.trim() ||
      !stipend.trim()
    ) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      const response = await fetch("http://localhost:3002/admin/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          heading,
          description,
          company,
          skills: skills.split(",").map((skill) => skill.trim()), // Convert skills to array
          preferredyear,
          duration,
          stipend,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Success:", data);
        toast.success("Post successful");
        setHeading("");
        setDescription("");
        setCompany("");
        setSkills("");
        setPreferredyear("");
        setDuration("");
        setStipend("");
      } else {
        const errorMessage = await response.text();
        console.error("Error:", errorMessage || response.statusText);
        toast.error("Failed to post");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred");
    }
  };

  return (
    <div>
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-4xl font-bold mb-4 text-white">Create New Internship Opportunities</h2>
      </div>

      {/* <div className="mt-6 text-black text-4xl px-6 pt-6 font-bold">
        <FaFileAlt className="inline-block mr-2" />
        Internships
      </div> */}
      <form onSubmit={handleSubmit} className="mt-8 px-6">
        <div className="mb-4">
          <label className="text-sm font-semibold mb-1 block">Heading</label>
          <div className="flex items-center">
            <FaChalkboardTeacher className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Heading"
              className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={heading}
              onChange={(e) => setHeading(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="mb-2">
          <label className="text-sm font-semibold mb-1 block">
            Description
          </label>
          <div className="flex items-center">
            <FaRegBuilding className="text-gray-500 mr-2" />
            <textarea
              placeholder="Description"
              className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="mb-2">
          <label className="text-sm font-semibold mb-1 block">Company</label>
          <div className="flex items-center">
            <FaBriefcase className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Company"
              className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="mb-2">
          <label className="text-sm font-semibold mb-1 block">
            Skills (comma-separated)
          </label>
          <div className="flex items-center">
            <FaChalkboardTeacher className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Skills"
              className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="mb-2">
          <label className="text-sm font-semibold mb-1 block">
            Year of Study
          </label>
          <div className="flex items-center">
            <FaChalkboardTeacher className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Year of Study"
              className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={preferredyear}
              onChange={(e) => setPreferredyear(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="mb-2">
          <label className="text-sm font-semibold mb-1 block">Duration</label>
          <div className="flex items-center">
            <FaClock className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Duration"
              className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="mb-2">
          <label className="text-sm font-semibold mb-1 block">Stipend</label>
          <div className="flex items-center">
            <FaMoneyBillAlt className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Stipend"
              className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={stipend}
              onChange={(e) => setStipend(e.target.value)}
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Post
        </button>
      </form>

      <Toaster position="top-right" />
    </div>
  );
};

export default PostContent;
