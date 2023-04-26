import React from "react";
import { Post } from "../components";

const Posts = ({ postsList }) => {
  return (
    <ul className="flex flex-col">
      {postsList.map((post) => (
        <Post post={post} key={post.id} />
      ))}
    </ul>
  );
};

export default Posts;
