import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import DataContext from "./context/DataContext";
import api from "./api/posts.js";

const PostPage = () => {
  const { posts, setPosts } = useContext(DataContext);
  const { id } = useParams();
  let navigate = useNavigate();

  const handleDelete = async (id) => {
    const postList = posts.filter((post) => post.id !== id);

    /* const deleteOptions = {
      method: "DELETE",
    };

    const result = await fetch(`${URL}posts/${id}`, deleteOptions);
    if (result) {
      console.log(result);
    } */

    try {
      const result = await api.delete(`/posts/${id}`);
      setPosts(postList);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  let post = "";
  if (posts) {
    post = posts.find((post) => post.id === id);
  }
  return (
    <div className="PostPage">
      <article className="post">
        {post && (
          <>
            <h2> {post.title}</h2>
            <p className="postDate">{post.dateTime}</p>
            <p className="postBody">{post.body}</p>
            <Link to={`/edit/${post.id}`}>
              <button className="editButton">Edit Post</button>{" "}
            </Link>
            <button
              className="deleteButton"
              onClick={() => handleDelete(post.id)}
            >
              {" "}
              Delete
            </button>
          </>
        )}
        {!post && (
          <>
            <h2> Post not found</h2>
            <Link to="/">Back Home</Link>
          </>
        )}
      </article>
    </div>
  );
};

export default PostPage;
