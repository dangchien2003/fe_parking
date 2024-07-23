function getExpiry(seconds) {
  const now = new Date();
  return Math.floor(now.getTime() / 1000) + seconds;
}

function setSession(key, value, ttlInSeconds) {
  const item = {
    value: value,
    expiry: getExpiry(ttlInSeconds),
  };

  sessionStorage.setItem(key, JSON.stringify(item));
}

function getSession(key) {
  const itemStr = sessionStorage.getItem(key);

  if (!itemStr) {
    return null;
  }

  const item = JSON.parse(itemStr);
  const now = new Date().getTime() / 1000;
  if (now > item.expiry) {
    sessionStorage.removeItem(key);
    return null;
  }

  return item.value;
}

function removeSession(key) {
  sessionStorage.removeItem(key);
}

export { setSession, getSession, removeSession };
