import React, { useState, useEffect } from "react";
import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { BiUpArrow, BiDownArrow } from "react-icons/bi";

const Post = ({ post }) => {
  const [user, setUser] = useState(null);
  const userCollection = collection(db, "users");

  useEffect(() => {
    async function fetchUser() {
      const docRef = doc(userCollection, post.user);
      const docSnap = await getDoc(docRef);
      const data = docSnap.data();
      setUser(data);
    }

    fetchUser();
  }, [post, userCollection]);

  const upDownSize = 30;

  return (
    <li>
      <div className="flex">
        <div className="w-[400px] p-2 flex flex-col items-center gap-3">
          <img
            className="aspect-square object-cover rounded-full"
            src={user.photoURL}
            alt="user"
          />
          <div className="flex flex-col gap-1 items-center text-white">
            <BiUpArrow size={upDownSize} />
            <BiDownArrow size={upDownSize} />
          </div>
        </div>
        <article>
          <h2>{post.title}</h2>
          <p>{post.text}</p>
        </article>
      </div>
    </li>
  );
};

export default Post;
