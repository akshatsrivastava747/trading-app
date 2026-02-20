import React, { useState } from "react";
import BuyActionWindow from "../components/BuyActionWindow";

const GeneralContext = React.createContext({
  openBuyWindow: (symbol, name, mode, price) => {},
  closeBuyWindow: () => {},
});

export const GeneralContextProvider = (props) => {
  const [isBuyWindowOpen, setIsBuyWindowOpen] = useState(false);

  // ⭐ renamed uid → symbol
  const [selectedSymbol, setSelectedSymbol] = useState("");

  const [selectedStockPrice, setSelectedStockPrice] = useState(0);
  const [selectedStockName, setSelectedStockName] = useState("");
  const [mode, setMode] = useState("buy");

  // ⭐ open buy/sell window
  const handleOpenBuyWindow = (symbol, name, mode, price) => {
    setIsBuyWindowOpen(true);
    setMode(mode);
    setSelectedSymbol(symbol);
    setSelectedStockName(name);
    setSelectedStockPrice(price);
  };

  // ⭐ close window + reset state
  const handleCloseBuyWindow = () => {
    setIsBuyWindowOpen(false);
    setSelectedSymbol("");
    setSelectedStockName("");
    setSelectedStockPrice(0);
    setMode("buy");
  };

  return (
    <GeneralContext.Provider
      value={{
        openBuyWindow: handleOpenBuyWindow,
        closeBuyWindow: handleCloseBuyWindow,
      }}
    >
      {props.children}

      {/* show order window */}
      {isBuyWindowOpen && (
        <BuyActionWindow
          symbol={selectedSymbol}   // ⭐ changed from uid
          name={selectedStockName}
          mode={mode}
          price={selectedStockPrice}
        />
      )}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;
