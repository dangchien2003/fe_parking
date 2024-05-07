function getCookie(name) {
  const cookieString = document.cookie;
  const cookies = cookieString.split("; ");
  for (let cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split("=");
    if (cookieName === name) {
      return decodeURIComponent(cookieValue);
    }
  }
  return null;
}

function delCookie(name) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

async function callLogout(api) {
  await fetch(api, { method: "POST", credentials: "include" });
}

function delToken(person) {
  let error = false;
  let api;
  switch (person.toLowerCase()) {
    case "staff":
      api = `${process.env.REACT_APP_HOST}/staff/logout`;
      break;
    case "customer":
      api = `${process.env.REACT_APP_HOST}/customer/logout`;
      break;
    default:
      error = true;
  }
  if (!error && api) {
    callLogout(api);
  }
}

export { getCookie, delCookie, delToken };
