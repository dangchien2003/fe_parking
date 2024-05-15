const checkOldPassword = (password) => {
  if (password === "") {
    return "Mật khẩu không được để trống";
  }
};

const checkNewPassword = (password) => {
  if (password === "") {
    return "Mật khẩu không được để trống";
  }

  if (password.length < 8) {
    return "Mật khẩu mới phải lớn hơn 8 ký tự";
  }
};

const checkAcceptPassword = (newPassword, acceptPassword) => {
  if (newPassword !== acceptPassword) {
    return "Mật khẩu Không khớp";
  }
};

export { checkOldPassword, checkNewPassword, checkAcceptPassword };
