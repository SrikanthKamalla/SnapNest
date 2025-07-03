import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { PiPaperPlaneRightFill } from "react-icons/pi";
import { toast } from "react-toastify";
import { addComment, deleteComment } from "../service/Comment.js";
import "../styles/commentSection.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchDeleteComment } from "../../toolkit/commentSlice.js";

const CommentSection = ({ postId, comments, handleGetComment }) => {
  // console.log("comments", comments);
  const [input, setInput] = useState("");
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleAddComment = async () => {
    if (!input) {
      toast.error("Please enter comment");
      return;
    }
    try {
      const { data } = await addComment(postId, { text: input });
      if (data.success) {
        toast.success(data.message);
      }
      setInput("");
      handleGetComment();
    } catch (error) {
      console.log("error", error);
      toast.error("something went wrong");
    }
  };

  const handleDeleteComment = async (commentId) => {
    const resultAction = await dispatch(
      fetchDeleteComment({ deleteComment, commentId })
    );
    const { success, message } = resultAction.payload;
    if (success) {
      handleGetComment();
      toast.success(message);
    }
  };

  const getInitials = (name) => {
    return name
      ?.split(" ")
      ?.map((ele) => ele[0])
      ?.join("");
  };

  function timeAgo(pastTime) {
    const pastDate = new Date(pastTime);
    const currentDate = new Date();
    const diffMs = currentDate - pastDate;
    const diffSeconds = Math.floor(diffMs / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0) {
      return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
    } else if (diffHours > 0) {
      return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
    } else if (diffMinutes > 0) {
      return `${diffMinutes} minute${diffMinutes > 1 ? "s" : ""} ago`;
    } else {
      return `${diffSeconds} second${diffSeconds !== 1 ? "s" : ""} ago`;
    }
  }

  return (
    <div className="comment-section">
      {comments.length == 0 ? (
        <div>No comments</div>
      ) : (
        comments.map((comment) => (
          <div className="comment-item" key={comment._id}>
            <div className="comment-user">
              <div className="user-avatar comment-initials">
                <span>{getInitials(comment?.user?.name)}</span>
                {/* <span>{comment?.user?.name}</span> */}
              </div>
              <div className="comment-date">{timeAgo(comment.createdAt)}</div>
            </div>
            <p className="comment-text">{comment.text}</p>
            <div className="comment-delete">
              {user?.userId === comment?.user?._id ? (
                <FaTrash onClick={() => handleDeleteComment(comment._id)} />
              ) : null}
            </div>
          </div>
        ))
      )}

      <div className="comment-input-wrapper">
        <input
          type="text"
          placeholder="Add a comment"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit" onClick={handleAddComment}>
          <PiPaperPlaneRightFill />
        </button>
      </div>
    </div>
  );
};

export default CommentSection;
