import React from "react";
import { Posts, CreatePost } from "../containers";

const Home = ({ postsList }) => {
  return (
    <main className="flex flex-col">
      <CreatePost />
      <Posts postsList={postsList} />
    </main>
  );
};

export default Home;
