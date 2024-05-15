import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { formatMoney } from "../../helper/number";
import { callRemaining } from "../../helper/remaing";
function InfoAccount() {
  const [remaining, setRemaining] = useState(0);

  useEffect(() => {
    const data = async () => {
      const data = await callRemaining();
      setRemaining(formatMoney(data));
    };
    data();
  }, []);

  const handleLogout = () => {
    document.cookie = "logout=true;Max-Age=10;path=/";
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
            className="btn dropdown-toggle "
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img src={`/img/avt.jpg`} alt="avatar" />
          </div>
          <ul className="dropdown-menu">
            <li>
              <Link to="/me" className="dropdown-item text-white">
                Thông tin tài khoản
              </Link>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <Link
                to={`/login`}
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
