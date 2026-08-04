import { useState } from "react";
import "./App.css";
import { InputBox } from "./components";
import useCurrencyInfo from "./hooks/useCurrencyInfo";
function App() {
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [amount, setAmount] = useState(0);
  const [result, setResult] = useState(0);

  const currencyInfo = useCurrencyInfo("usd");
  console.log("currencyInfo -------->> ", currencyInfo);

  const currencyOptions = Object.keys(currencyInfo);
  console.log("currencyOptions -->> ", currencyOptions);

  const swap = () => {
    setTo(from);
    setFrom(to);
    setAmount(result);
    setResult(amount);
  };

  const convert = () => {
    setResult(amount * currencyInfo[to]);
  };

  return (
    <div className="bg-gray-900 h-screen w-screen flex flex-col items-center justify-center text-white gap-3">
      <h2>Currency Converter</h2>
      <InputBox label="From" currencyOptions={currencyOptions} amount={amount} onAmountChange={(value) => setAmount(value)} isInputDisable={false} selectedCurrency={from} onCurrencyChange={(value) => setFrom(value)} />
      <InputBox label="To" currencyOptions={currencyOptions} amount={result} isInputDisable={true} selectedCurrency={to} onCurrencyChange={(value) => setTo(value)} />
      <div className="flex justify-between gap-4">
        <button type="button" className="bg-gray-500 py-1 px-4 rounded-4xl outline" onClick={swap}>
          swap
        </button>
        <button type="button" className="bg-gray-500 py-1 px-4 rounded-4xl outline" onClick={convert}>
          Convert {from.toUpperCase()} to {to.toUpperCase()}
        </button>
      </div>
    </div>
  );
}

export default App;
