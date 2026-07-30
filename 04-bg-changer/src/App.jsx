import { useState } from "react";
import { BgChangerBar } from "./components/bg-changer-bar";

function App() {
  const [bgColour, setBgColour] = useState("olive");

  const setValue = (c) => {
    setBgColour(c);
  };

  return (
    <div className="w-full h-screen" style={{ backgroundColor: bgColour }}>
      <BgChangerBar onSelectColor={setValue} />
    </div>
  );
}

export default App;
