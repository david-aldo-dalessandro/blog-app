import React from "react";
import Post from "./Post";

const Feed = (props) => {
  return (
    <>
      {props.posts.map((post) => (
        <Post key={post.id} post={post}></Post>
      ))}
    </>
  );
};

export default Feed;
