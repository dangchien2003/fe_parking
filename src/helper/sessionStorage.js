function getExpiry(seconds) {
  const now = new Date();
  return Math.floor(now.getTime() / 1000) + seconds;
}

function setItem(key, value, ttlInSeconds) {
  const item = {
    value: value,
    expiry: getExpiry(ttlInSeconds),
  };

  sessionStorage.setItem(key, JSON.stringify(item));
}

function getItem(key) {
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

export { setItem, getItem };
