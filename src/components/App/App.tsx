import Modal from "../Modal/Modal";
import PostList from "../PostList/PostList";
import SearchBox from "../SearchBox/SearchBox";
import Pagination from "../Pagination/Pagination";

import css from "./App.module.css";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchPosts } from "../../services/postService";

export default function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [debounceSearchQuery] = useDebounce(searchQuery, 500);
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
        <button className={css.button}>Create post</button>
      </header>
      {/* <Modal>Передати через children компонент CreatePostForm або EditPostForm</Modal> */}

      {posts.length > 0 && <PostList posts={posts} />}
    </div>
  );
}
