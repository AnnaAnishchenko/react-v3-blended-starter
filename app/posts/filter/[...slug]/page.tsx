import { fetchPosts } from '@/lib/api';
import PostsClient from './Posts.client';

type PostPageProps = { params: Promise<{ slug: string[] }> };

export async function generateMetadata({ params }: PostPageProps) : Promise<Metadata> {
 const { slug } = await params;
const userId: string = slug[0];
  
  return {
    title: userId === 'All' ? 'Posts - All Users' : `Posts - User ${userId}`,
  };
}



export default async function PostsPage({ params }: PostPageProps) {
  const { slug } = await params;
  const userId: string = slug[0];

  const data = await fetchPosts({
    searchText: '',
    page: 1,
    ...(userId && userId !== 'All' && { userId }),
  });

  console.log('Posts data:', data);
  
  return <>
  <PostsClient initialData={data} userId={userId} />
  </>;
}
