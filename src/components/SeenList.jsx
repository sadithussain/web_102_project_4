import React from "react";
import "./SeenList.css";

const SeenList = ({ seenDogs }) => {
  return (
    <div className="list-container">
      <h2>What dogs have I seen?</h2>
      {seenDogs.map((dog) => (
        <div className="list-item">
          <img src={dog.url} />
          <p>
            A {dog.breeds[0].name} dog in breed group{" "}
            {dog.breeds[0].breed_group}
          </p>
        </div>
      ))}
    </div>
  );
};

export default SeenList;
