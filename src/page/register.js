import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import isEmail from "../valid/email";
import { LoadingCircle } from "../components/loading/loading-circle";
import api from "../config/axiosConfig";

const regexPasswords =
  /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z0-9!@#$%^&*(),.?":{}|<>]{8,}$/;

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
        try {
          const response = await api.post("/customer/register", {
            email: email,
            password: password,
          });

          const data = response.data;

          if (response.status !== 201) {
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
            if (data.message.password) {
              errorMessage = data.message.password;
            }
            if (data.message.email) {
              errorMessage = data.message.email;
            }
            setErrorConfirmPassword(errorMessage);
          } else {
            setRegisterSuccess(true);
            setPassword("");
            setConfirmPassword("");
          }
        } catch (error) {
          setErrorConfirmPassword("Yêu cầu thất bại");
        } finally {
          setLoading(false);
        }
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

    if (!regexPasswords.test(password)) {
      setErrorPassword("Mật khẩu không hợp lệ");
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
          </div>

          <div className="password-binding">
            <div>
              <i class="bi bi-check2-circle p-1"></i>Mật khẩu có độ dài tối
              thiểu 8 ký tự
            </div>
            <div>
              <i class="bi bi-check2-circle p-1"></i>Bao gồm tối thiểu 1 ký tự
              viết hoa
            </div>
            <div>
              <i class="bi bi-check2-circle p-1"></i>Bao gồm tối thiểu 1 ký tự
              số
            </div>
            <div>
              <i class="bi bi-check2-circle p-1"></i>Bao gồm tối thiểu 1 ký tự
              đặc biệt
            </div>
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
        {!loading && registerSuccess && (
          <div className="text-center p-2 create-success">
            <h4 className="text-success">
              Đăng ký thành công <i class="bi bi-check-circle-fill"></i>
            </h4>
            <p style={{ fontSize: "18px" }}>
              Tiến hành xác thực tài khoản tại hòm thư
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Register;
