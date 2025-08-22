import React, { useEffect, useRef, useState } from "react";
import { FaPlus, FaTimes } from "react-icons/fa";
import "../styles/CreatePost.css";
import { ColorRing } from "react-loader-spinner";
import { toast } from "react-toastify";
import {
  createPost,
  fileUpload,
  getPostById,
  updatePost,
} from "../service/post";
import { useNavigate, useParams } from "react-router-dom";

const PostUploadForm = () => {
  const inputRef = useRef(null);
  const [caption, setCaption] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const currentMode = window.location.href.includes("/edit-post")
    ? "edit"
    : "add";

  const { id } = useParams();

  const fetchPostById = async (postId) => {
    const { data } = await getPostById(postId);
    if (data.success) {
      setCaption(data.data.text);
      setPreview(data.data.image);
    }
  };
  useEffect(() => {
    if (currentMode === "add") return;
    if (currentMode === "edit") {
      fetchPostById(id);
    }
  }, []);

  const handleFileRemove = () => {
    setPreview(null);
    setFile(null);
    // setCaption("");
  };
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handlePost = async () => {
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
        const { data } = await updatePost(payload, id);
        if (!data.success) return;
        toast.success(data?.message);
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
            <FaPlus size={30} />
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
      <button onClick={handlePost} disabled={isLoading}>
        {isLoading ? (
          <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="color-ring-loading"
            wrapperStyle={{}}
            wrapperClass="color-ring-wrapper"
            colors={["#000000"]}
          />
        ) : (
          "Post"
        )}
      </button>
    </div>
  );
};

export default PostUploadForm;
