import React from "react";
import "./_loader.css";

export default function Loader({ msg, color }) {
  const setColor = () => {
    if (color) {
      return {
        boxShadow: `0 3.3000000000000003px 0 0 ${color}`,
      };
    }
    return {};
  };

  return (
    <div className="loading">
      <div className="loadingio-spinner-eclipse-tl18qrapo1f">
        <div className="ldio-u6wmgzlxuh9">
          <div style={setColor()}></div>
        </div>
      </div>
      {msg && <h1>{msg}</h1>}
    </div>
  );
}
