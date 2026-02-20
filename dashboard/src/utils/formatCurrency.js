export const formatCurrency = (amount) => {
  if (!amount && amount !== 0) return "₹0";

  const formatted = new Intl.NumberFormat("en-IN", {
    notation: "compact",
    maximumFractionDigits: 2,
  }).format(amount);

  return `₹${formatted}`;
};
