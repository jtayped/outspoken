import React from "react";
import { Posts, CreatePost } from "../containers";

const Home = ({ postsList }) => {
  return (
    <main className="flex flex-col items-center w-full">
      <div className="w-[500px] border-1">
        <CreatePost />
        <Posts postsList={postsList} />
      </div>
    </main>
  );
};

export default Home;
