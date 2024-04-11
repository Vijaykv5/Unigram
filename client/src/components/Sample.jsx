import { useEffect } from "react";
import { Link } from "react-router-dom";

const Sample = () => {
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:4001/getUsers");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json(); // Parse the JSON data from the response
      console.log(data); // Log the actual data
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Link to="/usersList">
      {" "}
      <button>Sample 2</button>
    </Link>
  );
};

export default Sample;