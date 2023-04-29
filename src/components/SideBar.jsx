import React from "react";
import { IoCloseOutline, IoLogOutOutline } from "react-icons/io5";
import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const SideBar = ({ userData, toggleMenu }) => {
  const navigate = useNavigate();
  function logOut() {
    try {
      console.log(auth.currentUser);
      signOut(auth).then(navigate("/"));
      console.log(auth.currentUser);
    } catch (err) {
      console.error(err);
    }
  }
  return (
    <div className="fixed top-0 left-0 w-screen h-screen z-50">
      <div
        className="w-screen h-screen bg-black opacity-75"
        onClick={toggleMenu}
      />
      <div className="absolute left-0 top-0 w-[300px] h-full bg-zinc-900">
        <button className="absolute top-5 right-5" onClick={toggleMenu}>
          <IoCloseOutline size={30} />
        </button>
        <div className="bg-gradient-to-r from-sky-400 to-blue-400 p-5 flex gap-2">
          <img
            src={userData.photoURL}
            alt="profile"
            className="h-16 aspect-square object-cover rounded-2xl"
          />
          <p className="text-2xl font-bold">
            Welcome <br />
            {userData.firstName}!
          </p>
        </div>
        <div className="h-full p-5">
          <div></div>
          <button
            className="absolute bottom-5 w-full flex gap-2 items-center"
            onClick={logOut}
          >
            <IoLogOutOutline size={30} />
            <p>Log out</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
