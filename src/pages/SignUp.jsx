import React, { useState } from "react";
import { BsFillPersonFill, BsKeyFill } from "react-icons/bs";
import { auth } from "../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const SignUp = () => {
  const iconSize = 30;
  const [selectedForm, setSelectedForm] = useState([false, false, false]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function handleSelectedForm(index) {
    setSelectedForm([index === 0, index === 1, index === 2]);
  }

  function createUser() {
    try {
      if (password === confirmPassword) {
        createUserWithEmailAndPassword(auth, email, password);
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="w-full p-10 flex flex-col gap-4">
      <div>
        <h1 className="font-poppins text-3xl font-bold">
          Welcome to <span className="blue-text-gradient">Outspoken</span>!
        </h1>
        <p className="text-lg font-poppins">
          Fill in these fields and you'll be able to share a bit of you with the
          world!
        </p>
      </div>

      <form className="flex flex-col gap-2" onSubmit={createUser}>
        <div className="flex flex-col">
          <p className="font-poppins">Email</p>
          <div
            className={`input-field p-2 text-white ${
              selectedForm[0] ? "border-[1px] border-sky-500" : null
            }`}
          >
            <BsFillPersonFill size={iconSize} />
            <input
              type="email"
              className="input"
              placeholder="johndoe93@gmail.com"
              onFocus={() => handleSelectedForm(0)}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-col">
          <p className="font-poppins">Password</p>
          <div
            className={`input-field p-2 text-white ${
              selectedForm[1] ? "border-[1px] border-sky-500" : null
            }`}
          >
            <BsKeyFill size={iconSize} />
            <input
              type="password"
              className="input"
              placeholder="password123"
              onFocus={() => handleSelectedForm(1)}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-col">
          <p className="font-poppins">Confirm Password</p>
          <div
            className={`input-field p-2 text-white ${
              selectedForm[2] ? "border-[1px] border-sky-500" : null
            }`}
          >
            <BsKeyFill size={iconSize} />
            <input
              type="password"
              className="input"
              placeholder="password123"
              onFocus={() => handleSelectedForm(2)}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </div>
        <button
          type="submit"
          className="blue-gradient text-white font-poppins text-lg p-2 bg-blue-500 rounded-md mt-3 w-1/2"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
