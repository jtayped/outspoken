import React from "react";
import { BsFillPencilFill } from "react-icons/bs";
import { BsFillPersonFill, BsKeyFill } from "react-icons/bs";

const SignUp = () => {
  const iconSize = 30;
  return (
    <div className="w-full p-10">
      <div>
        <h1 className="font-poppins text-3xl font-bold">
          Welcome to <span className="blue-text-gradient">Outspoken</span>!
        </h1>
        <p className="text-lg font-poppins">
          Fill in these fields and you'll be able to share a bit of you with the
          world!
        </p>

        <form action="">
          <div className="input-field p-2 text-white">
            <BsFillPersonFill size={iconSize} />
            <input type="email" className="input" placeholder="Email" />
          </div>
          <div className="input-field p-2 text-white">
            <BsKeyFill size={iconSize} />
            <input type="password" className="input" placeholder="Password" />
          </div>
          <div className="input-field p-2 text-white">
            <BsKeyFill size={iconSize} />
            <input
              type="password"
              className="input"
              placeholder="Confirm Password"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
