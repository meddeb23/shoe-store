import React from "react";

export default function Counter({ setQuantity, quantity, className }) {
  return (
    <div
      className={
        className
          ? className
          : `flex flex-row items-center space-x-4 border-2 font-bold px-2 h-10 rounded-full `
      }
    >
      <svg
        className="w-6 h-6 cursor-pointer"
        onClick={() => {
          if (quantity - 1 > 0) {
            setQuantity(quantity - 1);
          }
        }}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
          clipRule="evenodd"
        />
      </svg>
      <div>{quantity}</div>
      <svg
        className="w-6 h-6 cursor-pointer"
        onClick={() => setQuantity(quantity + 1)}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  );
}
