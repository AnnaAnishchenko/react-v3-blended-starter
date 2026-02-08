import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import PostPreviewClient from './PostPreview.client';
import { fetchPostById } from '@/lib/api';

type PostDetailsProps = { params: Promise<{ id: string }> };

export default async function PostPreview({ params }: PostDetailsProps) {
  const { id } = await params;
    const idNumber = Number(id);
    const queryClient = new QueryClient();
    
    await queryClient.prefetchQuery({
      queryKey: ['post', idNumber],
      queryFn: () => fetchPostById(idNumber),
    });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PostPreviewClient />
    </HydrationBoundary>
  );
}
