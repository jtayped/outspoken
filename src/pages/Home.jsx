import React from "react";
import { Posts, CreatePost, Auth } from "../containers";
import { auth } from "../config/firebase";

const Home = ({ postsList, isLoading, userData }) => {

  return (
    <main className="flex flex-col items-center w-full font-poppins mt-10">
      {!auth.currentUser && !isLoading ? <Auth /> : null}
      <div className="w-full">
        <div className="w-full flex items-center p-5">
          <p className="text-3xl font-sans font-bold">
            {isLoading || userData.firstName === undefined
              ? "Loading..."
              : `Good day ${userData.firstName}! 👋`}
          </p>
        </div>
        <CreatePost />
        <Posts postsList={postsList} />
      </div>
    </main>
  );
};

export default Home;
