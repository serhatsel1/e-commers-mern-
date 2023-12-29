import React from "react";

const Button = ({ name, onClick }) => {
  console.log("onclick -->", onClick);
  return (
    <button
      className="w-[200px] h-10 flex items-center justify-center text-lg bg-black text-white rounded-md"
      onClick={onClick}
    >
      {name}
    </button>
  );
};

export default Button;
