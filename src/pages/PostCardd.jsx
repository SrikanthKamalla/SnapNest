import React, { useState, useRef, useEffect } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

const PostCardd = () => {
  const [showOptions, setShowOptions] = useState(false);
  const menuRef = useRef();

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowOptions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className="post-card"
      style={{
        position: "relative",
        padding: "1rem",
        border: "1px solid #ccc",
      }}
    >
      <div className="post-header">
        <h4>Post Title</h4>
        <BsThreeDotsVertical
          size={20}
          onClick={() => setShowOptions(!showOptions)}
          style={{ cursor: "pointer", float: "right" }}
        />
      </div>

      {showOptions && (
        <div
          ref={menuRef}
          className="options-menu"
          style={{
            position: "absolute",
            top: "2.5rem",
            right: "1rem",
            backgroundColor: "white",
            border: "1px solid #ccc",
            borderRadius: "8px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            zIndex: 100,
            padding: "0.5rem",
          }}
        >
          <div style={{ padding: "0.5rem", cursor: "pointer" }}>Edit</div>
          <div style={{ padding: "0.5rem", cursor: "pointer" }}>Delete</div>
          <div style={{ padding: "0.5rem", cursor: "pointer" }}>Share</div>
        </div>
      )}
    </div>
  );
};

export default PostCardd;
