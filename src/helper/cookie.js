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

function setCookie(data) {
  data.forEach((cookie) => {
    document.cookie = `${cookie.name}=${cookie.value}; path=/; max-age=${cookie.age}`;
  });
}

export { getCookie, delCookie, setCookie };
