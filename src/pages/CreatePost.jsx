import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FaPlus, FaTimes } from 'react-icons/fa';
import '../styles/CreatePost.css';
import { toast } from 'react-toastify';
import { createPost, getMyPosts, updatePost } from '../service/post';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updatePostById } from '../toolkit/postSlice';
import { ClipLoader } from 'react-spinners';

const PostUploadForm = () => {
  const inputRef = useRef(null);
  const [caption, setCaption] = useState('');
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const { posts } = useSelector((state) => state.post);

  const currentMode = window.location.href.includes('/edit-post')
    ? 'edit'
    : 'add';

  const fetchPostById = useCallback(
    (postId) => {
      const data = posts.find((post) => post._id === postId);
      if (data) {
        setCaption(data.text);
        setPreview(data.image);
      }
    },
    [posts]
  );

  useEffect(() => {
    if (currentMode === 'edit') fetchPostById(id);
    else {
      setCaption('');
      setFile(null);
      setPreview(null);
    }
  }, [currentMode, fetchPostById, id]);

  const handleFileRemove = () => {
    setPreview(null);
    setFile(null);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handlePost = async () => {
    if (!caption.trim()) {
      toast.error('Please add a caption');
      return;
    }

    if (currentMode === 'edit') {
      const originalPost = posts.find((post) => post._id === id);

      if (!originalPost) {
        toast.error('Post not found');
        return;
      }

      if (originalPost.text === caption) {
        toast.info('No changes to save');
        return;
      }

      setIsLoading(true);
      try {
        const resultAction = await dispatch(
          updatePostById({
            id,
            payload: { text: caption },
            func: updatePost,
            fetcherFunction: getMyPosts,
          })
        );

        if (!resultAction.payload.success) {
          toast.error(resultAction.payload.message);
        } else {
          toast.success(resultAction.payload.message);
          navigate('/my-posts');
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
      return;
    }

    if (!file) {
      toast.error('Please upload an image');
      return;
    }

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('text', caption);
      formData.append('image', file);

      const { data } = await createPost(formData);
      toast.success(data?.message);
      setCaption('');
      handleFileRemove();
      navigate('/my-posts');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="post-upload-container">
      <div className="input-div">
        {preview ? (
          <div className="image-preview">
            <img src={preview} alt="preview" />
            {currentMode === 'add' && (
              <FaTimes
                className="image-remove-btn"
                onClick={handleFileRemove}
              />
            )}
          </div>
        ) : (
          <div
            className="image-add-btn"
            onClick={() => currentMode === 'add' && inputRef.current.click()}
          >
            <FaPlus size={30} className="add-button" />
          </div>
        )}
        {currentMode === 'add' && (
          <input
            type="file"
            accept="image/*"
            hidden
            ref={inputRef}
            onChange={handleFileChange}
          />
        )}
      </div>
      <textarea
        placeholder="Write a caption..."
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      />
      <button onClick={handlePost} disabled={isLoading} className="post-button">
        {isLoading ? <ClipLoader size={20} color="#fff" /> : 'Post'}
      </button>
    </div>
  );
};

export default PostUploadForm;
