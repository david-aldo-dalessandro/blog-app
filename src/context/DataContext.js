import { createContext, useState, useEffect } from "react";

import { format } from "date-fns";
import api from "../api/posts.js";
import useAxiosFetch from "../useAxiosFetch";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const URL = "http://localhost:3003/";
  const [posts, setPosts] = useState("");
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState("");

  const { data, fetchError, isLoading } = useAxiosFetch(`${URL}posts`);

  useEffect(() => {
    setPosts(data);
  }, [data]);

  useEffect(() => {
    if (posts) {
      const filteredResults = posts.filter(
        (post) =>
          post.body.toLowerCase().includes(search.toLocaleLowerCase()) ||
          post.title.toLowerCase().includes(search.toLocaleLowerCase())
      );
      setSearchResults(filteredResults.reverse());
    }
  }, [posts, search]);

  return (
    <DataContext.Provider
      value={{
        search,
        setSearch,
        searchResults,
        fetchError,
        isLoading,
        posts,
        setPosts,
        format,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
