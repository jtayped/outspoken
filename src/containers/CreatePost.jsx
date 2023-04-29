import React, { useState } from "react";
import { BsPlus } from "react-icons/bs";
import { setDoc, doc, collection } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import GenerateRandomCode from "react-random-code-generator";

const Tag = ({ tagName, tagList, setTagList }) => {
  const [selected, setSelected] = useState(false);
  function toggleSelection() {
    setSelected(!selected);
  }

  return (
    <li
      className={`flex justify-between gap-0.5 items-center px-2 py-0.5 border-[1px] rounded-full transition-all duration-100 ${
        selected ? "bg-white text-black" : null
      }`}
      onClick={() => toggleSelection()}
    >
      <BsPlus size={15} />
      <p
        className={`text-xs transition-all duration-100  ${
          selected ? "text-black" : null
        }`}
      >
        {tagName}
      </p>
    </li>
  );
};

const CreatePost = () => {
  const tags = ["Unpopular", "Opinion", "Controversial"];

  const [title, setTitle] = useState("");
  const [opinion, setOpinion] = useState("");
  const [tagList, setTagList] = useState([]);

  async function uploadPost(event) {
    event.preventDefault();

    const postCollection = collection(db, "posts");
    const postID = `${
      auth.currentUser.uid
    }_${title}_${GenerateRandomCode.NumCode(5)}`;

    await setDoc(doc(postCollection, postID), {
      title: title,
      text: opinion,
      user: auth.currentUser.uid,
      downvotes: 0,
      upvotes: 0,
    }).then(() => {
      // clear the form and refresh the page
      setTitle("");
      setOpinion("");
      setTagList([]);
      event.target.reset();
      window.location.reload();
    });
  }

  return (
    <form
      className="text-white p-5 flex flex-col gap-2 border-t-[1px] border-zinc-800"
      onSubmit={(event) => uploadPost(event)}
    >
      <div className="max-w-[250px] border-b-2 px-1">
        <input
          type="text"
          placeholder="Title"
          className="bg-transparent focus:outline-none text-2xl placeholder:text-2xl"
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="border-[1px] p-1">
        <textarea
          cols="30"
          rows="3"
          placeholder="Opinion"
          className="bg-transparent focus:outline-none w-full"
          onChange={(e) => setOpinion(e.target.value)}
        ></textarea>
      </div>
      <ul className="flex flex-wrap gap-1">
        {tags.map((tag, index) => (
          <Tag
            key={index}
            tagName={tag}
            tagList={tagList}
            setTagList={setTagList}
          />
        ))}
      </ul>
      <button
        type="submit"
        className="bg-gradient-to-r from-sky-400 to-blue-400 px-[75px] py-1 text-lg font-bold rounded-full max-w-min"
      >
        Post
      </button>
    </form>
  );
};

export default CreatePost;
