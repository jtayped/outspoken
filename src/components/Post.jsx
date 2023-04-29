import React, { useEffect, useState } from "react";
import { auth } from "../config/firebase";
import {
  AiFillDislike,
  AiOutlineDislike,
  AiFillLike,
  AiOutlineLike,
} from "react-icons/ai";
import getUserData from "../js/getUserData";

const Post = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const [disLiked, setDisLiked] = useState(false);

  function toggleLike() {
    if(disLiked) {
      setDisLiked(false);
    }
    setLiked(!liked)
  }

  function toggleDislike() {
    if(liked) {
      setLiked(false);
    }
    setDisLiked(!disLiked)
  }

  const [user, setUser] = useState({
    photoURL: "",
    firstName: "",
  });

  useEffect(() => {
    async function userData() {
      const userData = await getUserData();
      setUser(userData);
    }
    userData();
  }, []);

  const upDownSize = 25;

  return (
    <li className="w-full p-5 border-t-[1px] border-zinc-700 flex flex-col gap-2">
      {user && (
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <img
              src={user.photoURL}
              alt="Profile"
              className="w-12 aspect-square rounded-full"
            />
            <div className="flex flex-col">
              <p className="font-bold">{user.firstName}</p>
              <p>29 April 2023</p>
            </div>
          </div>
          <div className="text-white flex flex-col gap-2">
            <div className="flex items-center gap-2" onClick={toggleLike}>
              {liked ? (
                <AiFillLike size={upDownSize} />
              ) : (
                <AiOutlineLike size={upDownSize} />
              )}
              <p>{liked ? post.upvotes+1 : post.upvotes}</p>
            </div>
            <div className="flex items-center gap-2" onClick={toggleDislike}>
              {disLiked ? (
                <AiFillDislike size={upDownSize} />
              ) : (
                <AiOutlineDislike size={upDownSize} />
              )}
              <p>{disLiked ? post.downvotes+1 : post.downvotes}</p>
            </div>
          </div>
        </div>
      )}
      <article>
        <h2 className="font-bold text-xl">{post.title}</h2>
        <p className="text-sm">{post.text}</p>
      </article>
    </li>
  );
};

export default Post;
