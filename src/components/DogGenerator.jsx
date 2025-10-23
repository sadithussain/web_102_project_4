import React from "react";
import { useState } from "react";
import "./DogGenerator.css";

const DogGenerator = ({
  setSeenDogs,
  seenDogIds,
  setSeenDogIds,
  bannedAttributes,
  setBannedAttributes,
}) => {
  const [dogData, setDogData] = useState(null);

  const getDogData = async () => {
    let dogToDisplay = null;
    let isBanned = true;
    let attempts = 0;

    while (isBanned && attempts < 10) {
      const response = await fetch(
        "https://api.thedogapi.com/v1/images/search?has_breeds=true",
        {
          headers: {
            "x-api-key":
              "live_F2VZksuEX9iHBa43xNa5ffVRLmFIkWlokpjPdEAxHpILkpjlJfGl9ov4CN1FJFTp",
          },
        }
      );
      const data = await response.json();
      const newDog = data[0];

      if (!newDog) {
        attempts++;
        continue;
      }

      const dogAttributes = [
        newDog.breeds[0].name,
        newDog.breeds[0].weight.metric,
        newDog.breeds[0].breed_group,
        newDog.breeds[0].life_span,
      ];

      isBanned = false;
      for (let i = 0; i < bannedAttributes.length; i++) {
        for (let j = 0; j < dogAttributes.length; j++) {
          if (bannedAttributes[i] == dogAttributes[j]) {
            isBanned = true;
            break;
          }
        }
        if (isBanned) break;
      }

      if (!isBanned) {
        dogToDisplay = newDog;
      }
      attempts++;
    }

    if (dogToDisplay) {
      setDogData(dogToDisplay);

      if (!seenDogIds.has(dogToDisplay.id)) {
        setSeenDogs((prev) => [...prev, dogToDisplay]);
        setSeenDogIds((prev) => new Set([...prev, dogToDisplay.id]));
      }
    }
  };

  const addBannedAttributes = (attribute) => {
    setBannedAttributes((prev) => {
      if (!prev.includes(attribute)) {
        return [...prev, attribute];
      }
      return prev;
    });
  };

  return (
    <div className="dog-generator">
      <h1>Random Dog Generator!</h1>
      <h3>Discover adorable dogs from around the world 🐕🌍</h3>
      <p>
        🐶 🐾 🦴 🐕 🐩 🐕‍🦺 🦮 🐾 🐶 🐾 🐕 🦴 🐩 🐾 🐕‍🦺 🦮 🐾 🐶 🐾 🦴 🐕 🐩 🐕‍🦺
      </p>
      {dogData && (
        <div className="dog-container">
          <div className="dog-attributes">
            <button
              className="attribute-button"
              onClick={() => addBannedAttributes(dogData.breeds[0].name)}
            >
              {dogData.breeds[0].name}
            </button>
            <button
              className="attribute-button"
              onClick={() =>
                addBannedAttributes(dogData.breeds[0].weight.metric)
              }
            >
              {dogData.breeds[0].weight.metric} lbs
            </button>
            <button
              className="attribute-button"
              onClick={() => addBannedAttributes(dogData.breeds[0].breed_group)}
            >
              {dogData.breeds[0].breed_group}
            </button>
            <button
              className="attribute-button"
              onClick={() => addBannedAttributes(dogData.breeds[0].life_span)}
            >
              {dogData.breeds[0].life_span}
            </button>
          </div>
          <img src={dogData.url} />
        </div>
      )}
      <button className="discover-button" onClick={getDogData} type="button">
        🔀 Discover
      </button>
    </div>
  );
};

export default DogGenerator;
