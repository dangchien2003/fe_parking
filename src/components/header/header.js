import { useState, useEffect, useRef, memo, useCallback } from "react";
import Notify from "../notify/notify";
import InfoAccount from "./info-account";
import authen from "../../valid/authen";
import { isPageLogin } from "../../helper/url";
import { Link } from "react-router-dom";
import { getCookie } from "../../helper/cookie";
import { getNowTimestamp } from "../../helper/time";

function Header() {
  const [toggle, SetToggle] = useState({ left: 0 });
  const [pageLogin] = useState(isPageLogin());
  const [widthPage, setWidthPage] = useState(window.innerWidth);
  const [hideText, setHideText] = useState(false);
  const ulRef = useRef();
  const aRef = useRef();

  useEffect(() => {
    const handleRefreshToken = () => {
      const timeEndToken = getCookie("ETok");
      if (!timeEndToken || isNaN(timeEndToken)) {
        return;
      }
      const TimeRemaining = timeEndToken - getNowTimestamp();
      if (TimeRemaining < 60 * 1000 && TimeRemaining > 0) {
        fetch(`${process.env.REACT_APP_BE}/customer/refresh/tok`, {
          method: "GET",
          credentials: "include",
        })
          .then((response) => response.json())
          .then((dataRes) => {
            if (!dataRes.success) {
              throw new Error("Success is false");
            }
            // client set cookie
            if (dataRes.cookies) {
              for (var key in dataRes.cookies) {
                if (!dataRes.cookies[key]) {
                  continue;
                }
                const value = dataRes.cookies[key].split("->MA");
                if (value.length < 2 || isNaN(value[1])) {
                  continue;
                }
                document.cookie = `${key}=${value[0]}; path=/; max-age=${value[1]}`;
              }
            }
          })
          .catch((error) => console.log(error));
      }
    };

    handleRefreshToken();

    const intervalId = setInterval(handleRefreshToken, 30 * 1000);

    return () => clearInterval(intervalId);
  }, []);

  const handleSetWidthLogo = useCallback(() => {
    if (aRef.current.offsetWidth < 127) {
      setHideText(true);
    }
  }, []);

  useEffect(() => {
    const handleSetHeightUl = () => {
      if (window.innerWidth <= 550) {
        ulRef.current.style.height = document.body.clientHeight + "px";
      } else {
        ulRef.current.style.height = "auto";
      }
    };
    setWidthPage(window.innerWidth);
    window.addEventListener("scroll" || "resize", handleSetHeightUl);
    return () => {
      window.removeEventListener("scroll" || "resize", handleSetHeightUl);
    };
  }, [widthPage]);

  useEffect(() => {
    authen();
  }, [pageLogin]);
  const handleResize = () => {
    if (window.innerWidth > 550) {
      SetToggle({ left: 199 });
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleToggle = () => {
    if (toggle.left !== 0) {
      SetToggle({ left: 0 });
    } else {
      SetToggle({ left: 199 });
    }
  };

  return (
    <header>
      <div className="bg-header">
        <a
          href={`/`}
          className="text-decoration-none"
          ref={aRef}
          style={{
            margin: "auto 0px",
          }}
        >
          <div>
            <img src={`/img/logo.png`} className="size-logo" alt="logo" />
            <span
              className="logo-text text-white hide"
              style={
                hideText
                  ? { animation: "resize-logo 1s ease", fontSize: "18px" }
                  : {}
              }
            >
              arking
            </span>
          </div>
        </a>
        <div className="nav-bar">
          <nav>
            <div
              className="toggle"
              style={{ left: toggle.left + "px" }}
              onClick={handleToggle}
            >
              <i className="bi bi-chevron-double-left"></i>
            </div>
            <ul
              ref={ulRef}
              className={toggle.left === 0 ? "hide parent" : "show parent"}
            >
              <li className="object">Ví tiền</li>
              <ul className="sub-menu">
                <Link to="/cash/add">
                  <li>Nạp tiền</li>
                </Link>
                <li>Lịch sử nạp</li>
              </ul>
              <li className="object">Mã code</li>
              <ul className="sub-menu">
                <Link to="/shop/qr">
                  <li>Mua code</li>
                </Link>
                <li>Code đã mua</li>
              </ul>
            </ul>
          </nav>
          <InfoAccount onLoad={handleSetWidthLogo} />
        </div>
      </div>
      <Notify />
    </header>
  );
}

export default memo(Header);
