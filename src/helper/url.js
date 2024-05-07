function isPageLogin() {
  const url = window.location.pathname;
  const parts = url.split("/");
  for (let i = parts.length - 1; i >= 0; i--) {
    if (parts[i] === "#") {
      continue;
    }
    if (parts[i] === "login") {
      return true;
    }
  }
  return false;
}

export { isPageLogin };
