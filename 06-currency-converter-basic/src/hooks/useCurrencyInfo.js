import { useEffect, useState } from "react";

function useCurrencyInfo(currency) {
  const [currencyData, setCurrencyData] = useState({});
  useEffect(() => {
    fetch(
      `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`,
    )
      .then((res) => res.json())
      .then((res) => setCurrencyData(res[currency]));
  }, [currency]);
  return currencyData;
}

export default useCurrencyInfo;
