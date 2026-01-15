import axios from "axios";
import { Post } from "../types/post";

axios.defaults.baseURL = "https://jsonplaceholder.typicode.com";

export const fetchPosts = async (
  searchText: string,
  page: number
): Promise<{ posts: Post[]; totalCount: number }> => {
  const response = await axios.get<Post[]>("/posts", {
    params: { ...(searchText !== "" && { q: searchText }), _page: page, _limit: 8 },
  });
  const totalCount = Number(response.headers["x-total-count"]);
  return { posts: response.data, totalCount };
};

interface NewPost {
  title: string;
  body: string;
}

export const createPost = async (newPost: NewPost): Promise<Post> => {
  const response = await axios.post<Post>("/posts", newPost);
  return response.data;
};

interface EditPost {
  id: number;
  title?: string;
  body?: string;
}
export const editPost = async (newDataPost: EditPost): Promise<Post> => {
  const response = await axios.patch<Post>(`/posts/${newDataPost.id}`, newDataPost);
  return response.data;
};

export const deletePost = async (postId: number): Promise<Post> => {
  const response = await axios.delete<Post>(`/posts/${postId}`);
  return response.data;
};
