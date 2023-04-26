import React, { useState, useEffect } from "react";
import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { BiUpArrow, BiDownArrow } from "react-icons/bi";

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
    const userCollection = collection(db, "users");
    async function fetchUser() {
      try {
        const docRef = doc(userCollection, post.user);
        const docSnap = await getDoc(docRef);
        const data = docSnap.data();
        setUser(data);
      } catch (err) {
        console.error(err);
      }
    }

    fetchUser();
  }, [post]);

  const upDownSize = 30;

  return (
    <li className="w-full p-3">
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
