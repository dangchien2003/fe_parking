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

function getParameterByName(name, url = window.location.href) {
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

export { isPageLogin, getParameterByName };
