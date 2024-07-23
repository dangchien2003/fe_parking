import { useState, useEffect } from "react";
import isEmail from "../valid/email";
import { LoadingCircle } from "../components/loading/loading-circle";
import { getParameterByName } from "../helper/url";
import api from "../config/axiosConfig";
function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [heightPage, setHeightPage] = useState(window.innerHeight);
  const [heightForm, setHeightForm] = useState(0);
  const [forget, setForget] = useState(false);

  useEffect(() => {
    setHeightForm(document.getElementById("form").offsetHeight);
  }, [heightForm]);

  useEffect(() => {
    const handleResize = () => {
      setHeightPage(window.innerHeight);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [heightPage]);

  useEffect(() => {
    const run = async () => {
      if (count > 0 && !errorEmail) {
        setLoading(true);
        try {
          const response = await api.post("/customer/forget", {
            email: email,
          });

          setLoading(false);

          const data = response.data;
          if (response.status !== 200) {
            let errorMessage = "";
            switch (data.message.error) {
              case "Incorrect password":
                errorMessage = "Tài khoản hoặc mật khẩu không chính xác";
                break;
              case "Email not exist":
                errorMessage = "Email không tồn tại";
                break;
              default:
                errorMessage = "Lỗi không xác định";
            }
            if (!!data.message.password) {
              errorMessage = data.message.password;
            }
            if (!!data.message.email) {
              errorMessage = data.message.email;
            }
            setErrorEmail(errorMessage);
          } else {
            setForget(true);
          }
        } catch (error) {
          setLoading(false);
          setErrorEmail("Yêu cầu thất bại");
        }
      }
    };

    run();
  }, [count]);

  const handleSetEmail = () => {
    if (email === "") {
      const currentUrl = window.location.href;
      const emailForget = getParameterByName("email", currentUrl);
      if (emailForget !== null && emailForget.trim() !== "") {
        setEmail(emailForget);
      }
    }
  };

  handleSetEmail();

  const handleForget = () => {
    if (!isEmail(email)) {
      setErrorEmail("Email không hợp lệ");
    } else {
      setErrorEmail("");
    }
    setCount((pre) => pre + 1);
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const margin = Math.floor(heightPage / 2 - heightForm / 2 - 100);
  return (
    <div className="d-flex justify-content-center align-items-center">
      <div
        className="form-login"
        style={{
          marginTop: margin > 0 && margin + "px",
        }}
      >
        <div className="logo">
          <div>
            <img src={`/img/logo.png`} className="size-logo" alt="logo" />
            <span className="logo-text">arking</span>
          </div>
        </div>
        <form id="form">
          {!forget ? (
            <div>
              <div className="d-block group-input">
                <label>Email</label>
                <br />
                <input
                  type="email"
                  className="input input-1"
                  value={email}
                  id="email"
                  onChange={handleChangeEmail}
                />
                {errorEmail && <div className="text-danger">{errorEmail}</div>}
              </div>
              <button
                type="button"
                className="btn btn-primary w-100 mt-3"
                onClick={handleForget}
              >
                Gửi mail
              </button>
            </div>
          ) : (
            <p style={{ padding: "20px 0" }}>
              <span style={{ color: "#20c997" }}>Đã xác nhận yêu cầu.</span>
              Vui lòng kiểm tra hòm thư và làm theo hướng dẫn
            </p>
          )}
        </form>
        {loading && <LoadingCircle width="50px" center />}
      </div>
    </div>
  );
}

export default ForgetPassword;
