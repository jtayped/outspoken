import React, { useState } from "react";
import { BsFillPersonFill, BsKeyFill } from "react-icons/bs";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { db, auth, googleProvider } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithRedirect,
} from "firebase/auth";
import { collection, doc, setDoc } from "firebase/firestore";
import { InputForm } from "../components";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const iconSize = 30;
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [isLoading, setLoading] = useState(false);

  const [confirmPasswordIncorrect, setConfirmPasswordIncorrect] =
    useState(false);

  const signInWithGoogle = async (e) => {
    try {
      await signInWithRedirect(auth, googleProvider);
    } catch (err) {
      console.log(err);
    }
  };

  async function uploadUser(userId) {
    const userCollection = collection(db, "users");
    await setDoc(doc(userCollection, userId), {
      firstName: name,
      lastName: lastName,
      photoURL: photoURL,
    });
  }

  async function createUser(e) {
    e.preventDefault();
    if (password !== confirmPassword) {
      setConfirmPasswordIncorrect(true);
      return;
    }

    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const { user } = userCredential;
      await uploadUser(user.uid);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setConfirmPasswordIncorrect(true);
      setLoading(false);
    }
  }

  return (
    <div className="w-full p-10 flex flex-col gap-6">
      <div>
        <h1 className="font-poppins text-3xl font-bold">
          Welcome to <span className="blue-text-gradient">Outspoken</span>!
        </h1>
        <p className="text-lg font-poppins">
          Fill in these fields and you'll be able to share a bit of you with the
          world!
        </p>
      </div>

      <form className="flex flex-col items-center gap-2" onSubmit={createUser}>
        <div className="grid grid-cols-2 gap-2">
          <InputForm
            type="text"
            placeHolder="Name"
            icon={<BsFillPersonFill size={iconSize} />}
            setFunction={setName}
            autoComplete="given-name"
          />
          <InputForm
            type="text"
            placeHolder="Last Name"
            icon={<BsFillPersonFill size={iconSize} />}
            setFunction={setLastName}
            isincorrect={false}
            autoComplete="family-name"
          />
        </div>
        <InputForm
          type="email"
          placeHolder="Email"
          icon={<MdOutlineAlternateEmail size={iconSize} />}
          setFunction={setEmail}
          isincorrect={confirmPasswordIncorrect}
          autoComplete="email"
        />
        <InputForm
          type="password"
          placeHolder="Password"
          icon={<BsKeyFill size={iconSize} />}
          setFunction={setPassword}
          isincorrect={confirmPasswordIncorrect}
          autoComplete="new-password"
        />
        <AnimatePresence>
          {password ? (
            <motion.div
              initial={{ y: -25, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full"
            >
              <InputForm
                type="password"
                placeHolder="Confirm Password"
                icon={<BsKeyFill size={iconSize} />}
                setFunction={setConfirmPassword}
                isincorrect={confirmPasswordIncorrect}
                autoComplete=""
              />
            </motion.div>
          ) : null}
        </AnimatePresence>
        <button
          type="submit"
          className="text-white font-poppins font-bold text-lg p-2 rounded-md mt-1 w-full bg-gradient-to-r from-sky-400 to-blue-400"
        >
          {isLoading ? "Thinking..." : "Submit"}
        </button>
      </form>

      <div className="w-full flex justify-center font-poppins text-lg mb-[-10px]">
        <p>Or</p>
      </div>

      <div className="flex flex-col">
        {" "}
        <button
          type="button"
          onClick={signInWithGoogle}
          className="text-white w-full  bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg px-5 py-2.5 text-center inline-flex items-center justify-between dark:focus:ring-[#4285F4]/55 mr-2 mb-2"
        >
          <svg
            className="mr-2 -ml-1 w-4 h-4"
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
      </div>
    </div>
  );
};

export default SignUp;
