import React from "react";
import ContentLoader from "react-content-loader";
import "../styles/PostCard.css";

const PostCardSkeleton = () => {
  return (
    <div className="post-card">
      <ContentLoader
        speed={2}
        width="100%"
        height={460}
        viewBox="0 0 450 400"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
        {/* Avatar */}
        <circle cx="30" cy="30" r="20" />
        {/* Name & date */}
        <rect x="60" y="15" rx="4" ry="4" width="120" height="10" />
        <rect x="60" y="35" rx="4" ry="4" width="80" height="10" />

        {/* Options icon */}
        <rect x="360" y="20" rx="4" ry="4" width="20" height="20" />

        {/* Image */}
        <rect x="0" y="70" rx="5" ry="5" width="500" height="250" />

        {/* Caption */}
        <rect x="10" y="280" rx="4" ry="4" width="90%" height="12" />
        <rect x="10" y="300" rx="4" ry="4" width="80%" height="12" />

        {/* Actions */}
        <rect x="20" y="330" rx="4" ry="4" width="60" height="15" />
        <rect x="180" y="330" rx="4" ry="4" width="60" height="15" />
        <rect x="350" y="330" rx="4" ry="4" width="60" height="15" />
      </ContentLoader>
    </div>
  );
};

export default PostCardSkeleton;
