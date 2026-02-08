import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import PostDetailsClient from './PostDetails.client';
import { fetchPostById } from '@/lib/api';
import { Metadata } from 'next';

type PostDetailsProps = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: PostDetailsProps) : Promise<Metadata> {
  const { id } = await params;
  const idNumber = Number(id);
  const post = await fetchPostById(idNumber);
  return {
    title: post.title,
    description: `${post.body.slice(0, 30)}...`,
    openGraph: {
      title: post.title,
      description: `${post.body.slice(0, 30)}...`,
    },
  };
}

export default async function PostDetails({ params }: PostDetailsProps) {
  const { id } = await params;
  const idNumber = Number(id);
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['post', idNumber],
    queryFn: () => fetchPostById(idNumber),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PostDetailsClient />
    </HydrationBoundary>
  );
}
