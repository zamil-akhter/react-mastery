import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "~!@#$%^&*_+-";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  // useRef for copy
  const passwordRef = useRef(null);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <div className="bg-gray-900 h-screen w-full flex justify-center items-center">
      <div className="w-lg h-auto bg-gray-800 flex flex-col justify-center items-center p-10 rounded-lg text-orange-500">
        <h1 className="font-bold text-2xl text-white">Password Generator</h1>
        <div className="my-4 w-full flex overflow-hidden rounded-md shadow">
          <input type="text" placeholder={password} value={password} ref={passwordRef} readOnly className="px-2 py-2 bg-white flex-1" />
          <button className="bg-blue-500 px-3 py-2 text-md text-white active:bg-blue-700" onClick={copyPasswordToClipboard}>
            copy
          </button>
        </div>
        <div className="flex w-full justify-around">
          <div className="flex items-center gap-x-1">
            <input type="range" min={6} max={30} value={length} className="cursor-pointer" onChange={(e) => setLength(e.target.value)} />
            <label> length : {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="charInput"
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="charInput">Character</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
