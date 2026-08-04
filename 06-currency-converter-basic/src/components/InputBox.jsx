import React from "react";

function InputBox({
  label,
  currencyOptions = [],
  amount,
  onAmountChange,
  isInputDisable,
  selectedCurrency = "usd",
  onCurrencyChange,
}) {
  return (
    <div className="bg-gray-700 p-4 w-fit h-fit rounded-sm">
      <div className="flex justify-between">
        <p className="text-gray-300">{label}</p>
        <p className="text-gray-300">Currency type</p>
      </div>
      <div className="flex justify-between">
        <input
          type="text"
          placeholder="Amount"
          value={amount}
          disabled={isInputDisable}
          onChange={(e) => onAmountChange?.(Number(e.target.value))}
        />
        <select
          name=""
          id=""
          value={selectedCurrency}
          onChange={(e) => onCurrencyChange?.(e.target.value)}
        >
          {currencyOptions.map((opt) => (
            <option value={opt} key={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default InputBox;
