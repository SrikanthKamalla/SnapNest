
import React, { useCallback, useEffect, useRef } from 'react';
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
  const isFetchingRef = useRef(false);

  const { posts, loading, page, hasMore } = useSelector((state) => state.post);

  const location = useLocation();
  const fetcherFunction = location.pathname.includes('/my-posts')
    ? getMyPosts
    : getPost;

  // Fetch user once
  useEffect(() => {
    if (token) {
      dispatch(fetchUser(getUserInfo));
    }
  }, [dispatch, token]);

  // Safe fetch function (prevents duplicate calls)
  const handleFetchPost = useCallback(
    async (pageNumber = 1) => {
      if (isFetchingRef.current) return; 

      isFetchingRef.current = true;

      dispatch(fetchPosts({ func: fetcherFunction, page: pageNumber }))
        .unwrap()
        .finally(() => {
          isFetchingRef.current = false;
        });
    },
    [dispatch, fetcherFunction]
  );

  useEffect(() => {
    dispatch(setPosts());
    handleFetchPost(1);
  }, [fetcherFunction, handleFetchPost, dispatch]);

  // Infinite scroll
  useEffect(() => {
    const onScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 200 &&
        hasMore &&
        !isFetchingRef.current
      ) {
        handleFetchPost(page + 1);
      }
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [page, hasMore, handleFetchPost]);

  if (!loading && posts.length === 0) {
    return <div className="no-post">No posts found</div>;
  }

  return (
    <div>
      <div className="post-list">
        {loading && posts.length === 0
          ? Array.from({ length: 3 }).map((_, index) => (
              <PostCardSkeleton key={index} />
            ))
          : posts.map((post) => (
              <PostCard
                key={post._id}
                post={post}
                reFetch={handleFetchPost}
                isSingleView={location.pathname.includes('/my-posts')}
              />
            ))}
      </div>

      {loading && posts.length > 0 && <PostCardSkeleton />}
    </div>
  );
};

export default Home;
