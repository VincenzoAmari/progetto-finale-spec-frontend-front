import React from "react";

const Navbar = () => {
  return (
    <nav
      style={{
        padding: "1rem",
        background: "#222",
        color: "#fff",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h2>Game Library</h2>
      <input
        type="text"
        placeholder="Cerca giochi..."
        style={{
          padding: "0.5rem",
          borderRadius: "4px",
          border: "1px solid #ccc",
        }}
      />
    </nav>
  );
};

export default Navbar;
