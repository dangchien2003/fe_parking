import { useEffect, useState } from "react";
import isEmail from "../../valid/email";
import { LoadingCircle } from "../loading/loading-circle";
import { changeEmail } from "../../helper/convert-error";
import api from "../../config/axiosConfig";

function Email({ email }) {
  const [change, setChange] = useState(false);
  const [errorChangeEmail, setErrorChangeEmail] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [checkOk, setCheckOk] = useState(false);
  const [loading, setLoading] = useState(false);
  const [changeOk, setChangeOK] = useState(false);

  useEffect(() => {
    if (checkOk) {
      api
        .post("/customer/change-email", {
          newEmail: newEmail,
        })
        .then((response) => {
          const dataRes = response.data;
          if (response.status !== 200) {
            let message = changeEmail[dataRes.message] || "Lỗi không xác định";
            setErrorChangeEmail(message);
            return;
          }
          // ok
          setNewEmail("");
          setChangeOK(true);
        })
        .catch((error) => {
          console.log(error);
          setErrorChangeEmail("Có lỗi xảy ra");
        })
        .finally(() => {
          setLoading(false);
          setCheckOk(false);
        });

      setLoading(true);
    }
  }, [checkOk]);

  const handleClickChangeEmail = () => {
    setChange(true);
  };

  const handleChangeEmail = (e) => {
    setNewEmail(e.target.value);
  };

  const checkEmail = () => {
    if (loading === true) {
      return;
    }

    if (!isEmail(newEmail)) {
      setErrorChangeEmail("Email không đúng");
      return;
    }

    if (newEmail === email) {
      setErrorChangeEmail("Email không được trùng nhau");
      return;
    }

    setErrorChangeEmail("");
    setCheckOk(true);
  };
  return (
    <div className="group-info">
      <span className="topic">Email: </span>
      <span className="text">{email}</span>
      {!change ? (
        <span
          className="d-block text-decoration-underline"
          style={{ color: "#1c77fd" }}
          onClick={handleClickChangeEmail}
        >
          Thay đổi email
        </span>
      ) : (
        <div>
          {loading ? (
            <div className="border rounded mt-1 p-1" id="change-email">
              <LoadingCircle width="40px" center />
            </div>
          ) : (
            <div className="border rounded mt-1 p-1" id="change-email">
              {changeOk ? (
                <div className="success text-center">
                  <span className="text-success d-block  fw-bold tittle">
                    <i class="bi bi-check-circle-fill"></i> Đã gửi yêu cầu
                  </span>
                  <span>Hãy chấp nhận trong hòm thư của</span>
                  <br />
                  <span>{email}</span>
                </div>
              ) : (
                <>
                  <label className="d-block label">Nhập email mới:</label>
                  <input
                    type="email"
                    onChange={handleChangeEmail}
                    value={newEmail}
                    className="input"
                  />
                  <button className="btn btn-success" onClick={checkEmail}>
                    <i class="bi bi-pencil-fill"></i>
                  </button>

                  {errorChangeEmail && (
                    <p className="text-danger p-1 m-0">{errorChangeEmail}</p>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
export default Email;
