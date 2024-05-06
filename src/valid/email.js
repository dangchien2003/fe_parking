const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
function isEmail(email) {
  return regexEmail.test(String(email).toLowerCase());
}

export default isEmail;
