import { useState, useEffect, useRef, memo, useCallback } from "react";
import Notify from "../notify/notify";
import InfoAccount from "./info-account";
import { isPageLogin } from "../../helper/url";
import { Link } from "react-router-dom";
import Logo from "./logo";

function Header() {
  const [toggle, SetToggle] = useState({ left: 0 });
  const [pageLogin] = useState(isPageLogin());
  const [widthPage, setWidthPage] = useState(window.innerWidth);
  const [hideText, setHideText] = useState(false);
  const ulRef = useRef();
  const aRef = useRef();

  const handleSetWidthLogo = useCallback(() => {
    if (aRef.current.offsetWidth < 127) {
      setHideText(true);
    }
  }, []);

  useEffect(() => {
    const handleSetHeightUl = () => {
      if (window.innerWidth <= 700) {
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
        <Link
          to={`/`}
          className="text-decoration-none"
          ref={aRef}
          style={{
            margin: "auto 0px",
          }}
        >
          <Logo hideText={hideText} />
        </Link>
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
