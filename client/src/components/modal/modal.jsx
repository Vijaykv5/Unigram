import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Modal = ({ showModal, handleCloseModal, user }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    user_id: user.user_id,
    name: user.name,
    email: user.email,
    image: null,
    branch: "",
    semester: "",
  });
  const branches = ["CSE", "ECE", "EEE", "MECH", "CIVIL", "IT", "AIDS"]; 
  const semesters = ["Semester 1", "Semester 2", "Semester 3","Semester 4","Semester 5","Semester 6","Semester 7","Semester 8"]; 

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "unigram_users_presets");
      formData.append("cloud_name", "dtkrpgzox");
      formData.append("folder", "unigram/user_profiles");

      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dtkrpgzox/image/upload/",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      setFormData((prevData) => ({
        ...prevData,
        image: data.secure_url,
      }));
    }
  };

  const handleSubmit = async () => {
    console.log("Form Data:", formData);
    try {
      const response = await fetch("http://localhost:3002/home", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to create user");
      }

      const responseData = await response.json();
      console.log(responseData);

      
      const { newUser } = responseData;
      const { user_id } = newUser;

    
      localStorage.setItem("user_details", JSON.stringify(newUser));

      
      navigate(`/home/${user_id}`);
    } catch (error) {
      console.error("Error creating user:", error.message);
      alert("Failed to create user. Please try again later.");
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Welcome {user.name}!</h2>
            <p>
              Please upload your image, select your branch, and choose a
              semester:
            </p>
            <div className="mt-4">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
            {formData.image && (
              <div className="mt-4">
                <img
                  src={formData.image}
                  alt="Uploaded Preview"
                  className="rounded-full w-20 h-20"
                />
              </div>
            )}
            <div className="mt-4">
              <select
                name="branch"
                value={formData.branch}
                onChange={handleChange}
              >
                <option value="">Select Branch</option>
                {branches.map((branch, index) => (
                  <option key={index} value={branch}>
                    {branch}
                  </option>
                ))}
              </select>
            </div>
            <div className="mt-4">
              <select
                name="semester"
                value={formData.semester}
                onChange={handleChange}
              >
                <option value="">Select Semester</option>
                {semesters.map((semester, index) => (
                  <option key={index} value={semester}>
                    {semester}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={handleSubmit}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
