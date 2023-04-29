import React, { useState } from "react";
import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { BsList, BsSearch } from "react-icons/bs";
import { IoNotifications } from "react-icons/io5";
import { RiMessageFill } from "react-icons/ri";

const Header = ({ userData, isLoading }) => {
  const navigate = useNavigate();
  const [isMenu, setMenu] = useState(true);
  function toggleMenu() {
    setMenu(!isMenu);
  }

  function logOut() {
    signOut(auth).then(navigate("/"));
  }

  return (
    <header className="fixed top-0 w-full flex justify-between items-center h-20 text-white p-5 gap-4 bg-black">
      <div className="h-full">
        <button onClick={toggleMenu}>
          <BsList size={35} />
        </button>
      </div>
      <div className="h-full flex items-center">
        <h1 className="text-xl font-bold">Outspoken</h1>
      </div>
      <div className="h-full flex items-center gap-4">
        <button>
          <IoNotifications size={26} />
        </button>
        <button>
          <RiMessageFill size={26} />
        </button>
        <img
          src={userData.photoURL}
          alt="Profile"
          className="h-full aspect-square rounded-full"
        />
      </div>
    </header>
  );
};

export default Header;
