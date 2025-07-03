import React, { useEffect, useState } from "react";
import { viewPost } from "../service/post";
import { API_ENDPOINTS } from "../service/endpoints";
import PostCard from "../components/PostCard";
import CommentSection from "../components/CommentSection";
import { FaComment, FaHeart, FaRegHeart, FaShare } from "react-icons/fa";
import { useSelector } from "react-redux";

const ViewPost = () => {
  let postId = window.location.href.split("/").filter(Boolean).pop();

  const { user } = useSelector((state) => state.user);
  const [post, setPost] = useState(null);

  const fetchViewPost = async () => {
    try {
      const { data } = await viewPost(postId);
      console.log("Success:", data);
      setPost(data);
    } catch (err) {
      console.error("❌ Error fetching post:", err.response?.data);
      console.error("❗ Full error:", err);
    }
  };

  useEffect(() => {
    fetchViewPost();
  }, []);

  return (
    <div>
      <div className="post-card">
        <div className="post-header">
          <div className="user-info">
            <div className="avatar-name">
              <div className="user-avatar user-initials"></div>
              <div className="user-name">Name</div>
            </div>
          </div>
          <div className="datetime">{post?.createdAt?.split("T")[0]}</div>
        </div>

        <div className="post-image">
          <img src={post?.image} alt="post" />
        </div>
        <div className="post-caption">
          <p>{post?.text}</p>
        </div>

        <div className="post-actions">
          {post?.likes?.includes(user?.userId) ? (
            <span>
              <FaHeart /> ({post?.likesCount})
            </span>
          ) : (
            <span>
              <FaRegHeart /> ({post?.likesCount})
            </span>
          )}

          <span>
            <FaComment />
          </span>
          <span>
            <FaShare />
          </span>
        </div>
        {/* {showCommentSection && (
          <CommentSection
            postId={post._id}
            comments={comments}
            handleGetComment={handleGetComment}
          />
        )} */}
      </div>
    </div>
  );
};

export default ViewPost;
