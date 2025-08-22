import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PostCard from '../components/PostCard';
import { getPostById } from '../service/post';
import { toast } from 'react-toastify';

const PostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        const { data } = await getPostById(id);
        setPost(data.data.post);
      } catch (err) {
        console.error('Failed to fetch post:', err);
        toast.error('Post not found or failed to load.');
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  if (loading) return <div>Loading post...</div>;
  if (!post) return <div>Post not found.</div>;

  return (
    <div style={{ maxWidth: '600px', margin: '20px auto' }}>
      <PostCard post={post} reFetch={() => {}} isSingleView={true} />
    </div>
  );
};

export default PostPage;
