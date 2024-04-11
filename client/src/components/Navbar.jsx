import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <div style={styles.logo}>Navbar</div>
     <Link to="/Signup">poweel</Link>
    </nav>
  );
};

const styles = {
  navbar: {
    backgroundColor: "#4e6bff", // Light dark bluish color
    color: "#fff", // White text
    padding: "10px 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    fontSize: "1.5rem",
    fontWeight: "bold",
  },
  // Add more styles for other navbar elements as needed
};

export default Navbar;
