import React, { useEffect, useRef, useState } from "react";
import { FaPlus, FaTimes } from "react-icons/fa";
import "../styles/CreatePost.css";
import { ColorRing } from "react-loader-spinner";
import { toast } from "react-toastify";
import {
  createPost,
  fileUpload,
  getMyPosts,
  updatePost,
} from "../service/post";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updatePostById } from "../../toolkit/postSlice";

const PostUploadForm = () => {
  const inputRef = useRef(null);
  const [caption, setCaption] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { posts, success, message } = useSelector((state) => state.post);
  useEffect(() => {
    console.log("success", success);
  }, [success]);

  const currentMode = window.location.href.includes("/edit-post")
    ? "edit"
    : "add";

  const fetchPostById = async (postId) => {
    const data = posts.find((post) => post._id === postId);
    // console.log(data);
    if (data) {
      setCaption(data.text);
      setPreview(data.image);
    }
  };

  useEffect(() => {
    if (currentMode === "add") {
      setFile(null);
      setCaption("");
      return;
    }
    if (currentMode === "edit") {
      fetchPostById(id);
    }
  }, []);

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

  const { id } = useParams();

  const handlePost = async () => {
    // console.log("id", id);
    if (currentMode === "edit" && !file) {
      toast.error("Please change the image");
      return;
    }

    if (!file || !caption.trim()) {
      toast.error("Please fill all the fields");
      return;
    }

    setIsLoading(true);
    try {
      let uploadUrl = "";
      if (!file) return;
      const formData = new FormData();
      formData.append("file", file);
      const response = await fileUpload(formData);
      uploadUrl = response.data.data.file_url;

      const payload = {
        text: caption,
        image: uploadUrl,
      };
      if (currentMode === "edit") {
        dispatch(
          updatePostById({
            payload: payload,
            id: id,
            func: updatePost,
            fetcherFunction: getMyPosts,
          })
        );
        if (!success) return;
        toast.success(message);
        setCaption("");
        handleFileRemove();
        navigate("/my-posts");
        return;
      }
      const { data } = await createPost(payload);
      console.log("data.success", data);
      toast.success(data?.message);
      setCaption("");
      handleFileRemove();
    } catch (error) {
      console.log("err", error);
      toast.error("Something went wrong. Please try again.");
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
            <FaTimes className="image-remove-btn" onClick={handleFileRemove} />
          </div>
        ) : (
          <div
            className="image-add-btn"
            onClick={() => inputRef.current.click()}
          >
            <FaPlus size={30} className="add-button" />
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          hidden
          ref={inputRef}
          onChange={handleFileChange}
        />
      </div>
      <textarea
        placeholder="Write a caption..."
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      />
      <button onClick={handlePost} disabled={isLoading} className="post-button">
        {isLoading ? (
          <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="color-ring-loading"
            wrapperStyle={{}}
            wrapperClass="color-ring-wrapper"
            colors={["#2c3e50"]}
          />
        ) : (
          "Post"
        )}
      </button>
    </div>
  );
};

export default PostUploadForm;
