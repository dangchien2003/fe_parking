import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import isEmail from "../valid/email";
import { LoadingCircle } from "../components/loading/loading-circle";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorConfirmPassword, setErrorConfirmPassword] = useState("");
  const [countRegister, setCountRegister] = useState(0);
  const [loading, setLoading] = useState(false);
  const [heightPage, setHeightPage] = useState(window.innerHeight);
  const [heightForm, setHeightForm] = useState(0);
  const [typePasword, setTypePasword] = useState("password");

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
      if (
        countRegister > 0 &&
        !errorEmail &&
        !errorPassword &&
        !errorConfirmPassword
      ) {
        setLoading(true);
        let host = process.env.REACT_APP_BE;
        fetch(`${host}/customer/register`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        })
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            if (data.success === false) {
              let errorMessage = "";
              switch (data.message.error) {
                case "Email already exist":
                  errorMessage = "Tài khoản email đã tồn tại";
                  break;
                case "must be a well-formed email address":
                  errorMessage = "Email nhập không đúng";
                  break;
                case "size must be between 8 and 30":
                  errorMessage = "Mật khẩu quá ngắn";
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
              setErrorConfirmPassword(errorMessage);
            } else {
              setRegisterSuccess(true);
              setPassword("");
              setConfirmPassword("");
            }
          })
          .catch(() => {
            setErrorConfirmPassword("Yêu cầu thất bại");
          })
          .finally(() => {
            setLoading(false);
          });
      }
    };
    run();
  }, [countRegister]);

  const handleRegister = () => {
    if (!isEmail(email)) {
      setErrorEmail("Email không hợp lệ");
    } else {
      setErrorEmail("");
    }
    if (password.length < 8) {
      setErrorPassword("Mật khẩu lớn hơn 8 ký tự");
    } else {
      if (confirmPassword !== password) {
        setErrorConfirmPassword("Mật khẩu không đúng");
      } else {
        setErrorConfirmPassword("");
      }
      setErrorPassword("");
    }

    setCountRegister((pre) => pre + 1);
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleClickEye = () => {
    if (typePasword === "password") {
      setTypePasword("text");
      handleChangeTypePassword();
    } else {
      setTypePasword("password");
    }
  };

  const handleChangeTypePassword = () => {
    const idTimeOut = setTimeout(() => {
      setTypePasword("password");
      clearTimeout(idTimeOut);
    }, 3000);
  };
  const handleChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const margin = Math.floor(heightPage / 2 - heightForm / 2 - 100);
  return (
    <div className="d-flex justify-content-center align-items-center">
      <div
        className="form-login position-relative"
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

        <form id="form" class="form-register ">
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
            {errorEmail && (
              <div className="text-danger">Địa chỉ email không đúng</div>
            )}
          </div>
          <div className="d-block group-input">
            <label>Mật khẩu</label>
            <br />
            <div id="password">
              <input
                type={typePasword}
                className="input input-1"
                value={password}
                onChange={handleChangePassword}
              />
              <div className="eye" onClick={handleClickEye}>
                {typePasword === "password" ? (
                  <i className="bi bi-eye-slash"></i>
                ) : (
                  <i className="bi bi-eye-fill"></i>
                )}
              </div>
            </div>
            {errorPassword && (
              <div className="text-danger">{errorPassword}</div>
            )}
          </div>
          <div className="d-block group-input">
            <label>Nhập lại mật khẩu</label>
            <br />
            <div id="password">
              <input
                type={typePasword}
                className="input input-1"
                value={confirmPassword}
                onChange={handleChangeConfirmPassword}
              />
              <div className="eye" onClick={handleClickEye}>
                {typePasword === "password" ? (
                  <i className="bi bi-eye-slash"></i>
                ) : (
                  <i className="bi bi-eye-fill"></i>
                )}
              </div>
            </div>
            {errorConfirmPassword && (
              <div className="text-danger">{errorConfirmPassword}</div>
            )}
            {registerSuccess && (
              <i class="bi bi-check-lg text-success p-1">Tạo thành công</i>
            )}
          </div>
          <button
            type="button"
            className="btn btn-primary w-100 mt-3 position-relative"
            onClick={handleRegister}
          >
            Đăng ký
          </button>
          <Link to="/login" className="login">
            <i className="bi bi-box-arrow-right"></i>
            <div className="detail-icon">Đi tới đăng nhập</div>
          </Link>
        </form>
        {loading && <LoadingCircle width="50px" center />}
      </div>
    </div>
  );
}

export default Register;
