import React from "react";
import { Posts, CreatePost, Auth } from "../containers";
import { auth } from "../config/firebase";
import { Header } from "../containers";

const Home = ({ postsList, isLoading, userData }) => {
  return (
    <main className="flex flex-col w-full font-poppins mt-20">
      <Header userData={userData} isLoading={isLoading} />
      {!auth.currentUser && !isLoading ? <Auth /> : null}
      <CreatePost />
      {isLoading ? (
        <p className="text-3xl m-6">Loading posts... 🌐</p>
      ) : (
        <Posts postsList={postsList} />
      )}
    </main>
  );
};

export default Home;
