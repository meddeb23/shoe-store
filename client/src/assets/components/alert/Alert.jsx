import React from "react";
import { useEffect } from "react";

export default function Alert({ type, msg, setAlert }) {
  useEffect(() => {
    setTimeout(() => setAlert(null), 5000);
  });
  return (
    <div className="fixed top-16 w-full">
      <div className=" bg-green-300 text-white font-bold  rounded-md  mx-3 md:mx-auto md:max-w-sm py-2 px-4 flex flex-row items-center justify-between">
        <p>{msg}</p>
        <svg
          onClick={() => setAlert(null)}
          className="w-5 h-5 cursor-pointer"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
    </div>
  );
}
