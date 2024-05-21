import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
import { Base_URL } from "../../utils/constants";

const Modal = ({ showModal, handleCloseModal, user }) => {
  const { width, height } = useWindowSize();
  const navigate = useNavigate();
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 5000); //adding a 5 sec for confetti

    return () => clearTimeout(timer);
  }, []);

  const [formData, setFormData] = useState({
    user_id: user.user_id,
    name: user.name,
    email: user.email,
    image: null,
    branch: "",
    semester: "",
    linkedin: "",
    github: "",
  });
  const branches = ["CSE", "ECE", "EEE", "MECH", "CIVIL", "IT", "AIDS"];
  const semesters = [
    "Semester 1",
    "Semester 2",
    "Semester 3",
    "Semester 4",
    "Semester 5",
    "Semester 6",
    "Semester 7",
    "Semester 8",
  ];

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
    // Ensure that LinkedIn and GitHub fields are not empty
    if (!formData.linkedin || !formData.github) {
      console.error("LinkedIn and GitHub URLs are required");
      return;
    }

    try {
      console.log("Form Data:", formData);
      const response = await fetch(`${Base_URL}/home`, {
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
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(25, 120, 151, 0.5)",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "2rem",
              borderRadius: "1rem",
              boxShadow: "0 0 20px rgba(22, 22, 22, 0.2)",
              maxWidth: "400px",
            }}
          >
            <h2
              style={{
                fontSize: "1.8rem",
                fontWeight: "bold",
                marginBottom: "1.5rem",
                color: "#1f96b7",
              }}
            >
              Welcome {user.name}!
            </h2>
            <p>Please upload Profile Picture</p>
            <div style={{ marginTop: "1rem" }}>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
            {formData.image && (
              <div style={{ marginTop: "1rem" }}>
                <img
                  src={formData.image}
                  alt="Uploaded Preview"
                  style={{
                    borderRadius: "50%",
                    width: "100px",
                    height: "100px",
                    marginTop: "1rem",
                  }}
                />
              </div>
            )}

            <div style={{ marginTop: "1rem" }}>
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
            <div style={{ marginTop: "1rem" }}>
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
            <div style={{ marginTop: "1rem" }}>
              <input
                type="text"
                name="linkedin"
                placeholder="LinkedIn URL"
                value={formData.linkedin}
                onChange={handleChange}
                style={{
                  border: "1px solid #1f96b7",
                  borderRadius: "0.5rem",
                  padding: "0.75rem",
                  width: "100%",
                }}
              />
            </div>

            <div style={{ marginTop: "1rem" }}>
              <input
                type="text"
                name="github"
                placeholder="GitHub URL"
                value={formData.github}
                onChange={handleChange}
                style={{
                  border: "1px solid #1f96b7",
                  borderRadius: "0.5rem",
                  padding: "0.75rem",
                  width: "100%",
                }}
              />
            </div>
            <button
              onClick={handleSubmit}
              style={{
                marginTop: "1.5rem",
                backgroundColor: "#1f96b7",
                color: "white",
                padding: "0.75rem 1.5rem",
                borderRadius: "0.5rem",
                cursor: "pointer",
                transition: "background-color 0.3s ease",
              }}
            >
              Submit
            </button>
          </div>
          {showConfetti && (
            <Confetti width={width} height={height} opacity={20} />
          )}
        </div>
      )}
    </>
  );
};

export default Modal;
