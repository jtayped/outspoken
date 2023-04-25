import React from "react";
import { Posts } from "../containers";

const Home = ({ postsList }) => {
  return (
    <main>
      <Posts postsList={postsList} />
    </main>
  );
};

export default Home;
