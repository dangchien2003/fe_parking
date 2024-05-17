function diffRemaining(diffMoneys) {
  if (!diffMoneys || isNaN(diffMoneys)) {
    console.log("Tham số diffRemaining không phải là số");
    return;
  }
  const remainingElement = document.getElementById("remaining");
  const content = remainingElement.textContent.trim();
  const oldRemaining = getNumberFromMoney(content);
  const newRemaining = oldRemaining - parseInt(diffMoneys);
  remainingElement.innerText = newRemaining.toLocaleString("vi-VN", {
    currency: "VND",
  });

  // effect reload remaining
  remainingElement.classList.add("changed");
  setTimeout(() => {
    remainingElement.classList.remove("changed");
  }, 2000);
}

function getNumberFromMoney(money) {
  const moneyString = money.split(".").join("");
  return parseInt(moneyString);
}
