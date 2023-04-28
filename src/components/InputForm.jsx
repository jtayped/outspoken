import React from "react";

const InputForm = ({ type, placeHolder, icon, setFunction, isincorrect }) => {
  return (
    <div
      className={`input-field p-2 text-white w-full ${
        isincorrect ? "border-1 border-red-600" : null
      }`}
    >
      {icon}
      <input
        type={type}
        className="input w-full"
        onChange={(e) => setFunction(e.target.value)}
        placeholder={placeHolder}
      />
    </div>
  );
};

export default InputForm;
