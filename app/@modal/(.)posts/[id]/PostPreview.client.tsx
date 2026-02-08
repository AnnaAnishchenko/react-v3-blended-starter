'use client';

import { useQuery } from '@tanstack/react-query';
import Modal from '@/components/Modal/Modal';
import { fetchPostById, fetchUserById } from '@/lib/api';
import { useParams, useRouter } from 'next/navigation';

import css from './PostPreview.module.css';
import { useEffect, useState } from 'react';
import { User } from '@/types/user';

export default function PostPreviewClient() {
  const [user, setUser] = useState<User | null>(null);

  const { id } = useParams<{ id: string }>();
  const idNumber = Number(id);

  const {
    data: post,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['post', idNumber],
    queryFn: () => fetchPostById(idNumber),
    refetchOnMount: false,
  });

  useEffect(() => {
    if (!post) return;
    const fn = async () => {
      const data = await fetchUserById(post.userId);
      setUser(data);
    };
    fn();
  }, [post]);

  const router = useRouter();

  const handleClickBack = () => {
    router.back();
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (error || !post) {
    return <p>Something went wrong. Please try again </p>;
  }

  return (
    <Modal onClose={handleClickBack}>
      <button className={css.backBtn} onClick={handleClickBack}>
        ← Back
      </button>
      {post && (
        <div className={css.post}>
          <div className={css.wrapper}>
            <div className={css.header}>
              <h2>{post.title}</h2>
            </div>

            <p className={css.content}>{post.body}</p>
          </div>
          {user && <p className={css.user}>User: {user?.name} </p>}
        </div>
      )}
    </Modal>
  );
}
