import React, { useCallback, useEffect } from 'react';
import { getMyPosts, getPost } from '../service/post';
import PostCard from '../components/PostCard';
import '../styles/home.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, setPosts } from '../toolkit/postSlice';
import PostCardSkeleton from '../shimmer/PostCardSkeleton';
import { useLocation } from 'react-router-dom';
import { fetchUser } from '../toolkit/userSlice';
import { getUserInfo } from '../service/user';
import { getAuthToken } from '../helpers/localstorage';

const Home = () => {
  const dispatch = useDispatch();
  const token = getAuthToken();

  useEffect(() => {
    if (token) {
      dispatch(fetchUser(getUserInfo));
    }
  }, [dispatch, token]);
  const { posts, loading } = useSelector((state) => state.post);
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
