import key from "../config/key";

function setNextRefresh(age) {
  const date = new Date();
  document.cookie = `${key.refesh_token}=${
    date.getTime() + age * 1000
  }; max-age=${age}; path=/`;
}

export { setNextRefresh };
