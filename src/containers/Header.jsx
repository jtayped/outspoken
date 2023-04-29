import React, { useState } from "react";
import { BsList } from "react-icons/bs";
import { IoNotifications } from "react-icons/io5";
import { RiMessageFill } from "react-icons/ri";
import { SideBar } from "../components";

const Header = ({ userData, isLoading }) => {
  const [isMenu, setMenu] = useState(true);
  function toggleMenu() {
    setMenu(!isMenu);
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
      {isMenu ? <SideBar userData={userData} /> : null}
    </header>
  );
};

export default Header;
