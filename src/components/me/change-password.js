import { useEffect, useState } from "react";
import {
  checkAcceptPassword,
  checkNewPassword,
  checkOldPassword,
  checkSamePassword,
} from "../../helper/password";
import { LoadingCircle } from "../loading/loading-circle";
import { changePassword } from "../../helper/convert-error";
import api from "../../config/axiosConfig";

function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [errorOldPassword, setErrorOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [errorNewPassword, setErrorNewPassword] = useState("");
  const [acceptPassword, setAcceptPassword] = useState("");
  const [errorAcceptPassword, setErrorAcceptPassword] = useState("");
  const [message, setMessage] = useState("");
  const [called, setCalled] = useState(false);
  const [changeOk, setChangeOK] = useState(false);
  const [calling, setCalling] = useState(false);

  useEffect(() => {
    const callApiChangePassword = async () => {
      try {
        const response = await api.patch("/customer/change-password", {
          oldPassword,
          newPassword,
          confirmPassword: acceptPassword,
        });

        const dataRes = response.data;

        if (response.status === 200) {
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

        let message = changePassword[dataRes.message] || "Lỗi không xác định";
        setMessage(message);
        setChangeOK(false);
      } catch (error) {
        setMessage("Có lỗi xảy ra");
      } finally {
        setCalled(true);
        setCalling(false);
      }
    };
    if (calling) {
      callApiChangePassword();
    }
  }, [calling]);

  const handleChangeOldPassword = (e) => {
    setCalled(false);
    setOldPassword(e.target.value);
  };
  const handleChangeNewPassword = (e) => {
    setCalled(false);
    setNewPassword(e.target.value);
  };
  const handleChangeAcceptPassword = (e) => {
    setCalled(false);
    setAcceptPassword(e.target.value);
  };

  const handleChangePassword = () => {
    if (!calling) {
      setCalled(false);
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

      error = checkSamePassword(oldPassword, newPassword);
      if (error) {
        setErrorNewPassword(error);
        return;
      }

      setCalling(true);
    }
  };

  return (
    <div>
      {called && (
        <div
          className="message"
          style={
            changeOk ? { background: "#79dfc1" } : { background: "#e35d6a" }
          }
        >
          {message}
        </div>
      )}
      <form className="p-3" id="change-password">
        <div>
          <label>Mật khẩu hiện tại:</label>
          <input
            type="password"
            onChange={handleChangeOldPassword}
            value={oldPassword}
          />
          {errorOldPassword && (
            <p className="text-danger">{errorOldPassword}</p>
          )}
        </div>
        <div>
          <label>Mật khẩu mới:</label>
          <input
            type="password"
            onChange={handleChangeNewPassword}
            value={newPassword}
          />
          {errorNewPassword && (
            <p className="text-danger">{errorNewPassword}</p>
          )}
        </div>
        <div>
          <label>Xác nhận mật khẩu:</label>
          <input
            type="password"
            onChange={handleChangeAcceptPassword}
            value={acceptPassword}
          />
          {errorAcceptPassword && (
            <p className="text-danger">{errorAcceptPassword}</p>
          )}
        </div>
        <div className="password-binding">
          <div>
            <i class="bi bi-check2-circle p-1"></i>Mật khẩu có độ dài tối thiểu
            8 ký tự
          </div>
          <div>
            <i class="bi bi-check2-circle p-1"></i>Bao gồm tối thiểu 1 ký tự
            viết hoa
          </div>
          <div>
            <i class="bi bi-check2-circle p-1"></i>Bao gồm tối thiểu 1 ký tự số
          </div>
          <div>
            <i class="bi bi-check2-circle p-1"></i>Bao gồm tối thiểu 1 ký tự đặc
            biệt
          </div>
        </div>
        {calling ? (
          <LoadingCircle width="30px" />
        ) : (
          <button
            type="button"
            className="btn btn-success mt-2"
            onClick={handleChangePassword}
          >
            Đổi
          </button>
        )}
      </form>
    </div>
  );
}
export default ChangePassword;
