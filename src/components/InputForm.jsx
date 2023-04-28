import React from "react";

const InputForm = ({
  type,
  placeHolder,
  icon,
  setFunction,
  isincorrect,
  autoComplete,
}) => {
  return (
    <div
      className={`input-field p-2 text-white w-full ${
        isincorrect ? "border-[1px] border-red-600" : null
      }`}
    >
      {icon}
      <input
        type={type}
        className="input w-full"
        onChange={(e) => setFunction(e.target.value)}
        placeholder={placeHolder}
        autoComplete={autoComplete}
        required
      />
    </div>
  );
};

export default InputForm;
