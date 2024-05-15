import { useEffect, useState } from "react";
import {
  checkAcceptPassword,
  checkNewPassword,
  checkOldPassword,
} from "../../helper/password";

function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [errorOldPassword, setErrorOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [errorNewPassword, setErrorNewPassword] = useState("");
  const [acceptPassword, setAcceptPassword] = useState("");
  const [errorAcceptPassword, setErrorAcceptPassword] = useState("");
  // const [checkOK, setCheckOk] = useState(false);
  const [message, setMessage] = useState("");
  const [called, setCalled] = useState(false);
  const [changeOk, setChangeOK] = useState(false);
  const callApiChangePassword = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BE}/customer/change-password`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            oldPassword,
            newPassword,
            confirmPassword: acceptPassword,
          }),
        }
      );
      const dataRes = await response.json();

      if (dataRes.success) {
        // set default data
        setOldPassword("");
        setNewPassword("");
        setAcceptPassword("");
        setMessage("Đã thay đổi thành công");
        setChangeOK(true);
        return;
      }

      if (
        dataRes.message.newPassword ||
        dataRes.message.confirmPassword ||
        dataRes.message.oldPassword
      ) {
        setMessage(
          dataRes.message.oldPassword ??
            dataRes.message.newPassword ??
            dataRes.message.confirmPassword
        );
        return;
      }
      setMessage(dataRes.message.error);
    } catch (error) {
      console.log(error);
      setMessage("Có lỗi xảy ra");
    }

    setCalled(true);
  };

  const handleChangeOldPassword = (e) => {
    setOldPassword(e.target.value);
  };
  const handleChangeNewPassword = (e) => {
    setNewPassword(e.target.value);
  };
  const handleChangeAcceptPassword = (e) => {
    setAcceptPassword(e.target.value);
  };

  const handleChangePassword = () => {
    // default error
    setErrorOldPassword("");
    setErrorNewPassword("");
    setErrorAcceptPassword("");

    let error = "";
    error = checkOldPassword(oldPassword);
    if (error) {
      setErrorOldPassword(error);
      return;
    }

    error = checkNewPassword(newPassword);
    if (error) {
      setErrorNewPassword(error);
      return;
    }

    error = checkAcceptPassword(newPassword, acceptPassword);
    if (error) {
      setErrorAcceptPassword(error);
      return;
    }
    callApiChangePassword();
  };

  return (
    <form className="p-3 position-relative" id="change-password">
      {called && <div className="position-absolute">{message}</div>}
      <div>
        <label>Mật khẩu hiện tại:</label>
        <input type="password" onChange={handleChangeOldPassword} />
        {errorOldPassword && <p className="text-danger">{errorOldPassword}</p>}
      </div>
      <div>
        <label>Mật khẩu mới:</label>
        <input type="password" onChange={handleChangeNewPassword} />
        {errorNewPassword && <p className="text-danger">{errorNewPassword}</p>}
      </div>
      <div>
        <label>Xác nhận mật khẩu:</label>
        <input type="password" onChange={handleChangeAcceptPassword} />
        {errorAcceptPassword && (
          <p className="text-danger">{errorAcceptPassword}</p>
        )}
      </div>
      <button
        type="button"
        className="btn btn-success mt-2"
        onClick={handleChangePassword}
      >
        Đổi
      </button>
    </form>
  );
}
export default ChangePassword;
