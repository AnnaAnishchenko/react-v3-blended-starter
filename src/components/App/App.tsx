import PostList from "../PostList/PostList";
import SearchBox from "../SearchBox/SearchBox";
import Pagination from "../Pagination/Pagination";
import CreatePostForm from "../CreatePostForm/CreatePostForm";
import Modal from "../Modal/Modal";
import css from "./App.module.css";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchPosts } from "../../services/postService";
import { Post } from "../../types/post";
import EditPostForm from "../EditPostForm/EditPostForm";

export default function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [debounceSearchQuery] = useDebounce(searchQuery, 500);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreatePost, setIsCreatePost] = useState(false);

  const [isEditPost, setIsEditPost] = useState(false);
  const [editAtPost, setEditAtPost] = useState<Post | null>(null);

  const { data } = useQuery({
    queryKey: ["posts", debounceSearchQuery, currentPage],
    queryFn: () => fetchPosts(debounceSearchQuery, currentPage),
    placeholderData: keepPreviousData,
  });

  const handleChange = (newQuery: string) => {
    //  console.log(newQuery);
    setSearchQuery(newQuery);
    setCurrentPage(1);
  };
  // console.log(debouncedSearchQuery);
  console.log(data);

  const posts = data?.posts ?? [];
  const totalPages = data?.totalCount ? Math.ceil(data.totalCount / 8) : 0;

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const toggleCreate = () => {
    setIsCreatePost(!isCreatePost);
  };

  const toggleEditPost = (post?: Post) => {
    if (post) {
      setEditAtPost(post);
    }
    setIsEditPost(!isEditPost);
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onSearch={handleChange} />

        {totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}
        <button
          onClick={() => {
            toggleModal();
            toggleCreate();
          }}
          className={css.button}
        >
          Create post
        </button>
      </header>

      {isModalOpen && (
        <Modal onClose={toggleModal}>
          {isCreatePost && (
            <CreatePostForm
              onClose={() => {
                toggleModal();
                toggleCreate();
              }}
            />
          )}{" "}
          {isEditPost && editAtPost && (
            <EditPostForm
              initialValue={editAtPost}
              onClose={() => {
                toggleModal();
                toggleEditPost(); setEditAtPost(null);
              }}
            />
          )}
        </Modal>
      )}

      {posts.length > 0 && (
        <PostList posts={posts} toggleModal={toggleModal} toggleEditPost={toggleEditPost} />
      )}
    </div>
  );
}
