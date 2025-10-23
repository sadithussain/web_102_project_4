import React from "react";
import "./BanList.css";

const BanList = ({ bannedAttributes, setBannedAttributes }) => {
  const unbanAttribute = (attribute) => {
    setBannedAttributes((prev) => prev.filter((attr) => attr != attribute));
  };

  return (
    <div className="ban-list-container">
      <h2>Banned Attributes</h2>
      <ul className="banned-attributes-list">
        {bannedAttributes.map((attribute) => (
          <button
            className="banned-attribute-tag"
            onClick={() => unbanAttribute(attribute)}
          >
            {attribute}
          </button>
        ))}
      </ul>
    </div>
  );
};

export default BanList;
