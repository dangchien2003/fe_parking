import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import isEmail from "../valid/email";
import { LoadingCircle } from "../components/loading";
import { delToken, getCookie } from "../helper/cookie";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [countLogin, setCountLogin] = useState(0);
  const [loading, setLoading] = useState(false);
  const [heightPage, setHeightPage] = useState(window.innerHeight);
  const [heightForm, setHeightForm] = useState(0);

  useEffect(() => {
    if (getCookie("logout") == "true") {
      delToken("customer");
    }
  }, []);

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
      if (countLogin > 0 && !errorEmail && !errorPassword) {
        setLoading(true);
        let host = process.env.REACT_APP_BE;
        fetch(`${host}/customer/login`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: email, password: password }),
        })
          .then((response) => {
            setLoading(false);
            return response.json();
          })
          .then((data) => {
            if (data.success === false) {
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
              setErrorPassword(errorMessage);
            } else {
              window.location.href = `${process.env.REACT_APP_HOST}/`;
            }
          })
          .catch(() => {
            setErrorPassword("Yêu cầu thất bại");
          });
      }
    };
    run();
  }, [countLogin]);

  const handleLogin = () => {
    if (!isEmail(email)) {
      setErrorEmail("Email không hợp lệ");
    } else {
      setErrorEmail("");
    }
    if (!password.length > 0) {
      setErrorPassword("Nhập mật khẩu");
    } else {
      setErrorPassword("");
    }
    setCountLogin((pre) => pre + 1);
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleChangeRemember = () => {
    setRemember(!remember);
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
            <img
              src={`${process.env.REACT_APP_HOST}/img/logo.png`}
              className="size-logo"
              alt="logo"
            />
            <span className="logo-text">arking</span>
          </div>
        </div>
        <div className="fs-6 text-center action-account p-2">
          <div>
            <Link
              to="/forget"
              className="forget text-cyan-400 text-decoration-none"
            >
              Tôi quên mật khẩu
            </Link>
            <span>&nbsp;|&nbsp;</span>
          </div>

          <div className="action">
            <Link
              to="/create-account"
              className="create-account text-decoration-none text-cyan-400"
            >
              Đăng ký thành viên
            </Link>
          </div>
        </div>
        <form id="form">
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
            <input
              type="text"
              className="input input-1"
              value={password}
              onChange={handleChangePassword}
            />
            {errorPassword && (
              <div className="text-danger">{errorPassword}</div>
            )}
          </div>
          <div>
            <input
              type="checkbox"
              checked={remember}
              onChange={handleChangeRemember}
            />
            <span>Nhớ mật khẩu</span>
          </div>
          <button
            type="button"
            className="btn btn-primary w-100 mt-3"
            onClick={handleLogin}
          >
            Đăng nhập
          </button>
        </form>
        {loading && <LoadingCircle width="50px" />}
      </div>
    </div>
  );
}

export default Login;
