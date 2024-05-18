const regexPasswords =
  /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z0-9!@#$%^&*(),.?":{}|<>]{8,}$/;

const checkOldPassword = (password) => {
  if (password === "") {
    return "Mật khẩu không được để trống";
  }
};

const checkNewPassword = (password) => {
  if (!regexPasswords.test(password)) {
    return "Mật khẩu hông hợp lệ";
  }
};

const checkSamePassword = (oldPassword, newPassword) => {
  if (oldPassword === newPassword) {
    return "Trùng mật khẩu hiện tại";
  }
};

const checkAcceptPassword = (newPassword, acceptPassword) => {
  if (newPassword !== acceptPassword) {
    return "Mật khẩu Không khớp";
  }
};

export {
  checkOldPassword,
  checkNewPassword,
  checkAcceptPassword,
  checkSamePassword,
};
