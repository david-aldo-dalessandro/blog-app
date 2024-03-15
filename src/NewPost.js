import React from "react";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import DataContext from "./context/DataContext";
import api from "./api/posts.js";

const NewPost = () => {
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const { posts, setPosts, format } = useContext(DataContext);
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = posts.length
      ? (parseFloat(posts[posts.length - 1].id) + 1).toString()
      : "1";
    const dateTime = format(new Date(), "MMMM dd, yyyy pp");
    const newPost = { id, title: postTitle, dateTime, body: postBody };

    /* const postOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPost),
    };
    const result = await fetch(`${URL}posts`, postOptions);
    if (result) {
      console.log(result);
    } */

    try {
      const result = await api.post(`/posts`, JSON.stringify(newPost));
      const allPosts = [...posts, newPost];
      setPosts(allPosts);
      setPostTitle("");
      setPostBody("");
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <main className="NewPost">
      <h2>New Post </h2>
      <form className="newPostForm" onSubmit={handleSubmit}>
        <label htmlFor="postTitle"> Title:</label>
        <input
          id="postTitle"
          type="text"
          required
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
        ></input>
        <label htmlFor="postBody"> Post:</label>
        <textarea
          id="postBody"
          required
          value={postBody}
          onChange={(e) => setPostBody(e.target.value)}
        ></textarea>
        <button type="submit"> Submit </button>
      </form>
    </main>
  );
};

export default NewPost;
