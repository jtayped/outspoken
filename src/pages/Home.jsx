import React from "react";
import { Posts, CreatePost, Auth } from "../containers";

const Home = ({ postsList }) => {
  return (
    <main className="flex flex-col items-center w-full">
      <Auth />
      <div className="w-full">
        <CreatePost />
        <Posts postsList={postsList} />
      </div>
    </main>
  );
};

export default Home;
