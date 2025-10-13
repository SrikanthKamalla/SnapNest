import React, {
  useState,
  useRef,
  useEffect,
  lazy,
  Suspense,
  useCallback,
} from 'react';
import {
  FaComment,
  FaEdit,
  FaHeart,
  FaRegHeart,
  FaShare,
  FaTrash,
} from 'react-icons/fa';
import { CgDetailsMore, CgMoreVertical } from 'react-icons/cg';
import '../styles/PostCard.css';
import { deletePost, likePost, unLikePost } from '../service/post';
import { useNavigate } from 'react-router-dom';
import { getCommentsByPostId } from '../service/Comment';
import { useDispatch, useSelector } from 'react-redux';
import { deletePostById, likePosts, unLikePosts } from '../toolkit/postSlice';
import { toast } from 'react-toastify';

const feUrl = import.meta.env.VITE_FE_URL;
const CommentSection = lazy(() => import('./CommentSection'));

const PostCard = ({ post, reFetch, isSingleView = false }) => {
  const [showOptions, setShowOptions] = useState(false);
  const [showCommentSection, setShowCommentSection] = useState(false);
  const [comments, setComments] = useState([]);

  const menuRef = useRef();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleGetComment = useCallback(async () => {
    if (!post?._id) return;
    const { data } = await getCommentsByPostId(post?._id);
    setComments(data.data.comments);
  }, [post?._id]);

  useEffect(() => {
    handleGetComment();
  }, [handleGetComment]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowOptions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handlePostDelete = async (id) => {
    dispatch(
      deletePostById({ func: deletePost, postId: id, fetcherFunction: reFetch })
    );
  };

  const handleEditPost = (id) => {
    navigate(`/edit-post/${id}`);
  };

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

  const handleCopy = async () => {
    const url = `${feUrl}post/${post._id}`;
    try {
      await navigator.clipboard.writeText(url);
      toast.success('Post link copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy link:', err);
      toast.error('Could not copy the link');
    }
  };

  return (
    <div className="post-card">
      <div className="post-header">
        <div className="user-info">
          <div className="avatar-name">
            <div className="user-avatar user-initials"></div>
            <div>
              <div className="user-name">{post?.user?.name}</div>
              <div className="datetime">
                {post?.createdAt?.split('T')[0].split('-').reverse().join('-')}
              </div>
            </div>
          </div>

          <div>
            {isSingleView && (
              <div className="options-menu-wrapper" ref={menuRef}>
                <CgMoreVertical
                  className="icon"
                  size={20}
                  onClick={() => setShowOptions(!showOptions)}
                  style={{ cursor: 'pointer' }}
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
        {post?.likes?.includes(user?.userId) ? (
          <span onClick={handleUnLike}>
            <FaHeart color="red" /> {post?.likesCount}
          </span>
        ) : (
          <span onClick={handleLike}>
            <FaRegHeart />
            {post?.likesCount}
          </span>
        )}

        <span onClick={() => setShowCommentSection((prev) => !prev)}>
          <FaComment />
        </span>
        <span onClick={handleCopy}>
          <FaShare />
        </span>
      </div>
      {showCommentSection && (
        <Suspense fallback={<div className="comment-text">Loading...</div>}>
          <CommentSection
            postId={post._id}
            comments={comments}
            handleGetComment={handleGetComment}
          />
        </Suspense>
      )}
    </div>
  );
};

export default PostCard;
