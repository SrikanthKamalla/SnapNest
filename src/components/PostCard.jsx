import React, { useState, useRef, useEffect } from "react";
import {
  FaComment,
  FaEdit,
  FaHeart,
  FaRegHeart,
  FaShare,
  FaTrash,
} from "react-icons/fa";
import { CgDetailsMore, CgMoreVertical } from "react-icons/cg";
import "../styles/PostCard.css";
import { deletePost, likePost, unLikePost } from "../service/post";
import { useNavigate } from "react-router-dom";
import CommentSection from "./CommentSection";
import { getCommentsByPostId } from "../service/Comment";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePostById,
  likePosts,
  unLikePosts,
} from "../../toolkit/postSlice";

const PostCard = ({ post, reFetch }) => {
  const [showOptions, setShowOptions] = useState(false);
  const [showCommentSection, setShowCommentSection] = useState(false);
  const [comments, setComments] = useState([]);

  const handleGetComment = async () => {
    const { data } = await getCommentsByPostId(post._id);
    setComments(data.data);
  };
  useEffect(() => {
    handleGetComment();
  }, []);

  const menuRef = useRef();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handlePostDelete = async (id) => {
    console.log("id", id);
    dispatch(
      deletePostById({ func: deletePost, postId: id, fetcherFunction: reFetch })
    );
  };

  const handleEditPost = (id) => {
    navigate(`/edit-post/${id}`);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowOptions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLike = async () => {
    dispatch(
      likePosts({ func: likePost, postId: post._id, fetcherFunction: reFetch })
    );
  };
  const handleUnLike = async () => {
    dispatch(
      unLikePosts({
        func: unLikePost,
        postId: post._id,
        fetcherFunction: reFetch,
      })
    );
  };

  return (
    <div className="post-card">
      <div className="post-header">
        <div className="user-info">
          <div className="avatar-name">
            <div className="user-avatar user-initials"></div>
            <div>
              <div className="user-name">Name</div>
              <div className="datetime">
                {post.createdAt.split("T")[0].split("-").reverse().join("-")}
              </div>
            </div>
          </div>

          <div>
            {window.location.href.includes("/my-posts") && (
              <div className="options-menu-wrapper" ref={menuRef}>
                <CgMoreVertical
                  className="icon"
                  size={20}
                  onClick={() => setShowOptions(!showOptions)}
                  style={{ cursor: "pointer" }}
                />
                {showOptions && (
                  <div className="dropdown-menu">
                    <div
                      className="dropdown-item"
                      onClick={() => handleEditPost(post._id)}
                    >
                      <FaEdit /> Edit
                    </div>
                    <div
                      className="dropdown-item"
                      onClick={() => handlePostDelete(post._id)}
                    >
                      <FaTrash /> Delete
                    </div>
                    {/* <div className="dropdown-item">
                      <CgDetailsMore /> Details
                    </div> */}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="post-image">
        <img src={post.image} alt="post" />
      </div>
      <div className="post-caption">
        <p>{post.text}</p>
      </div>

      <div className="post-actions">
        {post.likes.includes(user?.userId) ? (
          <span onClick={handleUnLike}>
            <FaHeart /> ({post.likesCount})
          </span>
        ) : (
          <span onClick={handleLike}>
            <FaRegHeart /> ({post.likesCount})
          </span>
        )}

        <span onClick={() => setShowCommentSection((prev) => !prev)}>
          <FaComment />
        </span>
        <span>
          <FaShare />
        </span>
      </div>
      {showCommentSection && (
        <CommentSection
          postId={post._id}
          comments={comments}
          handleGetComment={handleGetComment}
        />
      )}
    </div>
  );
};

export default PostCard;
