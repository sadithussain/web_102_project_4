import "./App.css";
import React from "react";
import { useState } from "react";
import SeenList from "./components/SeenList";
import DogGenerator from "./components/DogGenerator";
import BanList from "./components/BanList";

const App = () => {
  const [seenDogs, setSeenDogs] = useState([]);
  const [seenDogIds, setSeenDogIds] = useState(new Set());
  const [bannedAttributes, setBannedAttributes] = useState([]);

  return (
    <div className="app-layout">
      <div className="left-column">
        <SeenList seenDogs={seenDogs} />
      </div>
      <div className="middle-column">
        <DogGenerator
          setSeenDogs={setSeenDogs}
          seenDogIds={seenDogIds}
          setSeenDogIds={setSeenDogIds}
          bannedAttributes={bannedAttributes}
          setBannedAttributes={setBannedAttributes}
        />
      </div>
      <div className="right-column">
        <BanList
          bannedAttributes={bannedAttributes}
          setBannedAttributes={setBannedAttributes}
        />
      </div>
    </div>
  );
};

export default App;
