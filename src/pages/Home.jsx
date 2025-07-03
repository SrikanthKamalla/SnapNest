// import React, { useEffect } from "react";
// import Navbar from "../components/Navbar";
// import { getMyPosts, getPost } from "../service/post";
// import PostCard from "../components/PostCard";
// import "../styles/home.css";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchPosts } from "../../toolkit/postSlice";
// import { LineWave } from "react-loader-spinner";
// import Modal from "react-modal";

// const Home = () => {
//   const { posts, loading } = useSelector((state) => state.post);
//   const dispatch = useDispatch();

//   const fetcherFunction = window.location.href.includes("/my-posts")
//     ? getMyPosts
//     : getPost;

//   const handleFetchPost = async () => {
//     dispatch(fetchPosts(fetcherFunction));
//   };

//   useEffect(() => {
//     handleFetchPost();
//   }, [fetcherFunction]);

//   if (!loading && posts && posts.length === 0) {
//     return <div className="no-post">No posts found</div>;
//   }

//   if (loading) {
//     return (
//       <Modal
//         isOpen={loading}
//         contentLabel="Loading"
//         className="login-modal"
//         overlayClassName="login-modal-overlay"
//       >
//         <LineWave
//           visible={true}
//           height="100"
//           width="100"
//           color="#2c3e50"
//           ariaLabel="line-wave-loading"
//         />
//       </Modal>
//     );
//   }
//   return (
//     <div>
//       <div className="post-list">
//         {posts?.map((post) => (
//           <PostCard post={post} key={post._id} reFetch={handleFetchPost} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Home;
import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import { getMyPosts, getPost } from "../service/post";
import PostCard from "../components/PostCard";
import "../styles/home.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../../toolkit/postSlice";
import { ShimmerPostItem } from "react-shimmer-effects";
import PostCardSkeleton from "../shimmer/PostCardSkeleton";

const Home = () => {
  const { posts, loading } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  const fetcherFunction = window.location.href.includes("/my-posts")
    ? getMyPosts
    : getPost;

  const handleFetchPost = async () => {
    dispatch(fetchPosts(fetcherFunction));
  };

  useEffect(() => {
    handleFetchPost();
  }, [fetcherFunction]);

  if (!loading && posts && posts.length === 0) {
    return <div className="no-post">No posts found</div>;
  }

  return (
    <div>
      <div className="post-list">
        {loading
          ? Array.from({ length: 3 }).map((_, index) => (
              <PostCardSkeleton key={index} />
            ))
          : posts?.map((post) => (
              <PostCard post={post} key={post._id} reFetch={handleFetchPost} />
            ))}
      </div>
    </div>
  );
};

export default Home;
