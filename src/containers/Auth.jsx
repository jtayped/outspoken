import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BsFillPersonFill, BsKeyFill } from "react-icons/bs";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth, googleProvider } from "../config/firebase";

const Auth = () => {
  const iconSize = 30;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error(err);
    }
  };

  const signInWithGoogle = async (e) => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.log(err);
    }
  };

  const logOut = async (e) => {
    try {
      await signOut(auth, googleProvider);
    } catch (err) {
      console.log(err);
    }
  };

  //console.log(auth.currentUser);

  return (
    <div className="fixed z-10 top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] p-6 bg-zinc-800 text-white flex flex-col gap-5 items-center font-poppins rounded-lg">
      <div className="text-center">
        <h2 className="text-3xl font-bold">Log in</h2>
        <p>
          Don't have an account? <Link to="/SignUp">Sign Up</Link>
        </p>
      </div>

      <form className="flex flex-col gap-4" onSubmit={handleSignIn}>
        <div className="flex flex-col gap-2">
          <div className="flex flex-row items-center gap-1 bg-zinc-900 p-2 rounded-md">
            <BsFillPersonFill size={iconSize} />
            <input
              type="email"
              className="bg-transparent focus:outline-none"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-row items-center gap-1 bg-zinc-900 p-2 rounded-md">
            <BsKeyFill size={iconSize} />
            <input
              type="password"
              className="bg-transparent focus:outline-none"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex justify-between">
            <Link to="/ForgotPassword" className="text-sm self-end">
              Forgot Password
            </Link>
          </div>
          <button
            className="bg-gradient-to-r from-sky-400 to-blue-400 p-2 rounded-xl font-semibold"
            type="submit"
          >
            Log In
          </button>
        </div>
      </form>
      <div className="flex justify-between items-center gap-2">
        <div className="w-[100px] h-[1px] bg-white" />
        <p>or</p>
        <div className="w-[100px] h-[1px] bg-white" />
      </div>
      <button
        type="button"
        onClick={signInWithGoogle}
        class="text-white w-full  bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between dark:focus:ring-[#4285F4]/55 mr-2 mb-2"
      >
        <svg
          class="mr-2 -ml-1 w-4 h-4"
          aria-hidden="true"
          focusable="false"
          data-prefix="fab"
          data-icon="google"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 488 512"
        >
          <path
            fill="currentColor"
            d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
          ></path>
        </svg>
        Sign up with Google<div></div>
      </button>

      <button onClick={logOut}>Log out</button>
    </div>
  );
};

export default Auth;
