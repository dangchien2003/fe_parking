import { useState, useEffect, useRef } from "react";
import Notify from "../notify/notify";
import InfoAccount from "./info-account";
import authen from "../../valid/authen";
import { isPageLogin } from "../../helper/url";
import { Link } from "react-router-dom";

function Header() {
  const [toggle, SetToggle] = useState({ left: 0 });
  const [pageLogin] = useState(isPageLogin());
  const [widthPage, setWidthPage] = useState(window.innerWidth);
  const ulRef = useRef();

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
        <a href={`/`} className="text-decoration-none">
          <div>
            <img src={`/img/logo.png`} className="size-logo" alt="logo" />
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
            <ul
              ref={ulRef}
              className={toggle.left === 0 ? "hide parent" : "show parent"}
            >
              <li className="object">Ví tiền</li>
              <ul className="sub-menu">
                <li>Nạp tiền</li>
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
          <InfoAccount />
        </div>
      </div>
      <Notify />
    </header>
  );
}

export default Header;
