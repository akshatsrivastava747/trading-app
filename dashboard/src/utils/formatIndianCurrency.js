export const formatIndianCurrency = (amount) => {
    if (!amount && amount !== 0) return "₹0";
  
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(amount);
  };