import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { formatMoney } from "../helper/number";
let myHost = process.env.REACT_APP_HOST;

function InfoAccount() {
  const [remaining, setRemaining] = useState(formatMoney(0));
  useEffect(() => {
    const hostBE = process.env.REACT_APP_BE;
    const handleRemaining = () => {
      fetch(`${hostBE}/customer/cash/remaining`, {
        method: "GET",
        credentials: "include",
      })
        .then((response) => response.json())
        .then((dataRes) => {
          if (dataRes.success == true) {
            setRemaining(formatMoney(dataRes.data.remaining));
          }
        })
        .catch((error) => {
          setRemaining("null");
        });
    };
    handleRemaining();
  }, []);
  const handleLogout = () => {
    document.cookie = "logout=true;Max-Age=10;path=/";
    console.log("object");
  };
  return (
    <div className="info-account">
      <div className="money">
        | Số dư: {remaining}
        <sup>đ</sup> |
      </div>
      <div>
        <div className="btn-group">
          <div
            type="button"
            className="btn dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img src={`${myHost}/img/avt.jpg`} alt="avatar" />
          </div>
          <ul className="dropdown-menu">
            <li>
              <a className="dropdown-item text-white" href="#">
                Thông tin tài khoản
              </a>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <Link
                to={`${myHost}/login`}
                onClick={handleLogout}
                className="dropdown-item text-white"
              >
                Đăng xuất
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default InfoAccount;
