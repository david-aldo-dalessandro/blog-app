import React from "react";
import { Link } from "react-router-dom";

const Post = (props) => {
  return (
    <article className="Post">
      <Link to={`/post/${props.post.id}`}>
        <h2>{props.post.title}</h2>
        <p className="postDate">{props.post.dateTime}</p>
      </Link>
      <p className="postBody">
        {props.post.body.length <= 25
          ? props.post.body
          : `${props.post.body.slice(0, 25)}...`}
      </p>
    </article>
  );
};

export default Post;
