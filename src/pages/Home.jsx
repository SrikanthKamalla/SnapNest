import React, { useCallback, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { getMyPosts, getPost } from '../service/post';
import PostCard from '../components/PostCard';
import '../styles/home.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, setPosts } from '../../toolkit/postSlice';
import { ShimmerPostItem } from 'react-shimmer-effects';
import PostCardSkeleton from '../shimmer/PostCardSkeleton';
import { useLocation } from 'react-router-dom';

const Home = () => {
  const { posts, loading } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const location = useLocation();
  const fetcherFunction = location.pathname.includes('/my-posts')
    ? getMyPosts
    : getPost;

  const handleFetchPost = useCallback(async () => {
    dispatch(fetchPosts(fetcherFunction));
  }, [dispatch, fetcherFunction]);

  useEffect(() => {
    handleFetchPost();
  }, [fetcherFunction, handleFetchPost]);

  useEffect(() => {
    dispatch(setPosts());
  }, [dispatch]);

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
          : [...posts]
              .reverse()
              .map((post) => (
                <PostCard
                  post={post}
                  key={post._id}
                  reFetch={handleFetchPost}
                  isSingleView={
                    window.location.href.includes('/my-posts') ? true : false
                  }
                />
              ))}
      </div>
    </div>
  );
};

export default Home;
