import React, { useEffect, useState } from "react";
import { auth } from "../config/firebase";
import { BiUpArrow, BiDownArrow } from "react-icons/bi";
import getUserData from "../js/getUserData";

const PostDetail = ({ icon, text }) => {
  return (
    <div className="flex gap-1 items-center">
      {icon}
      {text}
    </div>
  );
};

const Post = ({ post }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function userData() {
      if (auth?.currentUser?.uid) {
        setUser(await getUserData());
      }
    }
    setUser(userData());
  }, []);

  const upDownSize = 30;

  return (
    <li className="w-full p-3 border-t-[1px] border-zinc-700">
      <div className="flex">
        <div className="p-2 flex flex-col items-center gap-3">
          <img
            className="w-10 aspect-square object-cover rounded-full"
            src={user && user.photoURL}
            alt="user"
          />
        </div>
        <article>
          <h2 className="text-3xl font-bold">{post.title}</h2>
          <div className="flex text-white">
            <PostDetail
              icon={<BiUpArrow size={upDownSize} />}
              text={post.upvotes}
            />
            <PostDetail
              icon={<BiDownArrow size={upDownSize} />}
              text={post.upvotes}
            />
          </div>
        </article>
      </div>
    </li>
  );
};

export default Post;
