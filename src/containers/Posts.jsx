import React from "react";
import { Post } from "../components";

const Posts = ({ postsList }) => {
  return (
    <ul>
      {postsList.map((post) => (
        <Post post={post} key={post.id}/>
      ))}
    </ul>
  );
};

export default Posts;
