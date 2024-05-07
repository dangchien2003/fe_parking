import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Notify from "./notify";
import InfoAccount from "./info-account";
import authen from "../valid/authen";
import { isPageLogin } from "../helper/url";
let myHost = process.env.REACT_APP_HOST;
myHost = "http://192.168.1.11:3000";

function Header() {
  useEffect(() => {
    authen();
  }, []);

  const [toggle, SetToggle] = useState({ left: 0 });
  const [pageLogin, setPageLogin] = useState(isPageLogin());

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
    if (toggle.left != 0) {
      SetToggle({ left: 0 });
    } else {
      SetToggle({ left: 199 });
    }
  };

  return (
    <header>
      <div className="bg-header">
        <a href={`${myHost}/`} className="text-decoration-none">
          <div>
            <img
              src={`${myHost}/img/logo.png`}
              className="size-logo"
              alt="logo"
            />
            <span className="logo-text text-white">arking</span>
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
            <ul className={toggle.left == 0 ? "hide parent" : "show parent"}>
              <li className="object">Ví tiền</li>
              <ul className="sub-menu">
                <li>Nạp tiền</li>
                <li>Lịch sử nạp</li>
              </ul>
              <li className="object">Mã code</li>
              <ul className="sub-menu">
                <li>Mua code</li>
                <li>Code đã mua</li>
              </ul>
            </ul>
          </nav>
          <InfoAccount />
        </div>
      </div>
      <Notify />
    </header>
  );
}

export default Header;
