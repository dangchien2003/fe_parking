import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import isEmail from "../valid/email";
import { LoadingCircle } from "../components/loading/loading-circle";
import { delToken, getCookie } from "../helper/cookie";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { login } from "../helper/convert-error";

function Login() {
  const [email, setEmail] = useState("chienboy03@gmail.com");
  const [password, setPassword] = useState("Chienkoi123.");
  const [remember, setRemember] = useState(false);
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [countLogin, setCountLogin] = useState(0);
  const [loading, setLoading] = useState(false);
  const [heightPage, setHeightPage] = useState(window.innerHeight);
  const [heightForm, setHeightForm] = useState(0);
  const [typePasword, setTypePasword] = useState("password");
  const clientId = process.env.REACT_APP_CLIENTID;
  const host = process.env.REACT_APP_BE;
  useEffect(() => {
    if (getCookie("logout") === "true") {
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

        fetch(`${host}/customer/login`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
            memorize: remember,
          }),
        })
          .then((response) => {
            setLoading(false);
            return response.json();
          })
          .then((data) => {
            if (data.status !== 200) {
              let message = login[data.message] || "Lỗi không xác định";
              setErrorPassword(message);
              return;
            }

            // client set cookie
            handleLoginOK(data);
          })
          .catch(() => {
            setErrorPassword("Yêu cầu thất bại");
          })
          .finally(() => {
            setLoading(false);
          });
      }
    };
    run();
  }, [countLogin]);

  const handleLoginOK = (data) => {
    if (data.cookies) {
      for (var key in data.cookies) {
        if (!data.cookies[key]) {
          continue;
        }
        const value = data.cookies[key].split("->MA");
        if (value.length < 2 || isNaN(value[1])) {
          continue;
        }
        document.cookie = `${key}=${value[0]}; path=/; max-age=${value[1]}`;
      }
    }
    // ok
    window.location.href = "/";
  };

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

  const onLoginSuccess = (credentialResponse) => {
    const token = credentialResponse.credential;
    axios
      .post(
        `${host}/customer/login/google`,
        { googleToken: token },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        if (response.status !== 200) {
          let message = login[response.message] || "Lỗi không xác định";
          setErrorPassword(message);
        }
        handleLoginOK(response.data);
      })
      .catch((error) => {
        setErrorPassword("Có lỗi xảy ra");
      });
  };
  const onLoginError = (e) => {
    console.log(e);
  };

  const click = (e) => {
    console.log("object");
    document.querySelectorAll(".g-signin2").forEach((element) => {
      element.addEventListener("click", () => {
        console.log("GoogleLogin button clicked.");
      });
    });
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
        <div className="fs-6 text-center action-account p-2">
          <div>
            <Link
              to={`/forget-password?email=${email}`}
              className="forget text-cyan-400 text-decoration-none"
            >
              Tôi quên mật khẩu
            </Link>
            <span>&nbsp;|&nbsp;</span>
          </div>

          <div className="action">
            <Link
              to="/register"
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
          <div
            className="login-side-three"
            style={{ margin: "0 auto" }}
            onClick={login}
          >
            <GoogleLogin
              onChange={click}
              onSuccess={onLoginSuccess}
              onError={onLoginError}
              clientId={clientId}
              style={{ width: "100%" }}
              render={(renderProps) => (
                <button
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  className="custom-google-button"
                >
                  <img
                    src="https://developers.google.com/identity/images/g-logo.png"
                    alt="Google logo"
                    className="google-logo"
                    style={{ width: "24px", height: "24px" }}
                  />
                </button>
              )}
            />
          </div>
        </form>
        {loading && <LoadingCircle width="50px" center />}
      </div>
    </div>
  );
}

export default Login;
