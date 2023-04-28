import React, { useState } from "react";
import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Header = ({ userData, isLoading }) => {
  const navigate = useNavigate();
  const [isDropdown, setDropdown] = useState(true);
  function toggleDropdown() {
    setDropdown(!isDropdown);
  }

  function logOut () {
    signOut(auth).then(navigate("/"));
  }

  return (
    <header className="fixed top-0 w-full text-white flex justify-between items-center pt-10 px-10">
      <div></div>
      <div className="relative">
        {isLoading || userData.photoURL === undefined ? null : (
          <img
            src={userData.photoURL}
            alt="profile"
            className="w-[40px] aspect-square object-cover rounded-full"
            onClick={toggleDropdown}
          />
        )}
        {isDropdown ? (
          <nav className="bg-zinc-800 absolute right-0 w-[150px] p-3 rounded-xl">
            <ul>
              <li>
                <button>Switch Accounts</button>
              </li>
              <li>
                <button onClick={logOut}>Log Out</button>
              </li>
            </ul>
          </nav>
        ) : null}
      </div>
    </header>
  );
};

export default Header;
