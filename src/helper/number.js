function formatMoney(number) {
  if (isNaN(number)) {
    return "Invalid input";
  }
  let currencyString = number.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  currencyString = currencyString.replace("₫", "");
  return currencyString;
}

export { formatMoney };
