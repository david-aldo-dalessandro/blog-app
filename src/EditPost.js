import { useState, useEffect, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import DataContext from "./context/DataContext";
import api from "./api/posts.js";

const EditPost = () => {
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");
  let navigate = useNavigate();

  const { posts, setPosts, format } = useContext(DataContext);
  const { id } = useParams();
  let post = null;
  if (posts) {
    post = posts.find((post) => post.id === id);
  }

  const handleEdit = async (id) => {
    const dateTime = format(new Date(), "MMMM dd, yyyy pp");
    const updatedPost = { id, title: editTitle, dateTime, body: editBody };
    try {
      const result = await api.put(`/posts/${id}`, updatedPost);

      setPosts(
        posts.map((post) => (post.id === id ? { ...result.data } : post))
      );

      setEditTitle("");
      setEditBody("");
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (post) {
      setEditTitle(post.title);
      setEditBody(post.body);
    }
  }, [post, setEditTitle, setEditBody]);

  return (
    <main className="NewPost">
      {editTitle && (
        <>
          <h2>New Post </h2>
          <form className="newPostForm" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="postTitle"> Title:</label>
            <input
              id="postTitle"
              type="text"
              required
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            ></input>
            <label htmlFor="postBody"> Post:</label>
            <textarea
              id="postBody"
              required
              value={editBody}
              onChange={(e) => setEditBody(e.target.value)}
            ></textarea>
            <button type="submit" onClick={() => handleEdit(post.id)}>
              Submit
            </button>
          </form>
        </>
      )}
      {!editTitle && (
        <>
          <h2> Post not found</h2>
          <Link to="/">Back Home</Link>
        </>
      )}
    </main>
  );
};

export default EditPost;
