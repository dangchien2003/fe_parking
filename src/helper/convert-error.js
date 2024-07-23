const extendCodeError = {
  "Invalid date": "Sai dữ liệu ngày",
  "Invalid time": "Sai dữ liệu thời gian",
  "Invalid code": "Mã không tồn tại",
  "Code cannot be renewed": "Không thể gia hạn",
  "The time must be at least 15 minutes greater than the current time":
    "Hạn sử dụng quá ngắn",
  "Not enough money": "Số dư không đủ",
};

const cancleCode = {
  "Invalid code": "Mã không hợp lệ",
  "Code not exist": "Mã không tồn tại",
  "Cannot cancle": "Không thể huỷ",
};

const extendCode = {
  "Not enough money": "Số dư không đủ",
  "Invalid date": "Thời gian không hợp lệ",
  "Invalid time": "Thời gian không hợp lệ",
  "Code cannot be renewed": "Mã không đủ điều kiện",
  "The time must be at least 15 minutes greater than the current time":
    "Hạn sử dụng quá ngắn",
};

const getContentQr = {
  "Invalid qr": "Mã không hợp lệ",
  "Not found": "Không tìm thấy thông tin",
  Cancled: "Mã đã bị huỷ",
  Checkouted: "Mã đã hết hạn",
  expired: "Mã đã hết hạn",
};

const getInfoCode = {
  "Invalid qr": "Mã không hợp lệ",
};

const buyCode = {
  "Not found": "Mã không tồn tại",
  "The balance is not enough, please add more money": "Số dư không đủ",
};

const changePassword = {
  "Password must not same": "Trùng mật khẩu hiện tại",
  "Confirm password not same": "Mật khẩu không khớp",
  "Invalid password": "Mật khẩu không đúng",
};

const changeEmail = {
  "Email must not same": "Trùng email hiện tại",
  "Email already exists": "Email đã tồn tại trên hệ thống",
};

const acceptChangeEmail = {
  "Invalid change token": "Yêu cầu không hợp lệ",
  "Account not exist": "Tài khoản không xác định",
  "Session has ended": "Yêu cầu hết hạn",
  "Email already exist": "Tài khoản đã tồn tại",
};

const acceptAccount = {
  "Invalid accept token": "Yêu cầu không hợp lệ",
  "Account not exist": "Tài khoản không xác định",
  "Account accepted": "Tài khoản đang hoạt động",
};

const acceptForget = {
  "Invalid change token": "Yêu cầu không hợp lệ",
  "Invalid email": "Sai địa chỉ email",
  "Email not exist": "Tài khoản không xác định",
  "Token has expired": "Yêu cầu hết hạn",
};

const login = {
  "Invalid google token": "Đăng nhập thất bại",
  "Email cannot be empty": "Email không đúng",
  "Invalid email": "Email không đúng",
  "Password cannot be empty": "Nhập password",
  "Email not exist": "Tài khoản hoặc mật khẩu không chính xác",
  "Incorrect password": "Tài khoản hoặc mật khẩu không chính xác",
  "Unverified account": "Tài khoản chưa được xác thực",
  "Account has been locked": "Tài khoản đã bị khoá",
};

// const aaaa = {
//   "": "aaa",
// };

export {
  extendCodeError,
  cancleCode,
  extendCode,
  getContentQr,
  getInfoCode,
  buyCode,
  changePassword,
  changeEmail,
  acceptAccount,
  acceptChangeEmail,
  acceptForget,
  login,
};
