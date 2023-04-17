import React from "react";

export default function SectionTitle({ title }) {
  return (
    <h1 className="text-center text-gray-700 font-bold text-2xl md:text-4xl p-4">
      {title}
    </h1>
  );
}
