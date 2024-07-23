import { useState, useEffect, memo } from "react";
import { Link } from "react-router-dom";
import { formatMoney } from "../../helper/number";
import { setSession } from "../../helper/sessionStorage";
import api from "../../config/axiosConfig";
function InfoAccount({ onLoad }) {
  const [remaining, setRemaining] = useState(0);

  useEffect(() => {
    const data = async () => {
      async function callRemaining() {
        try {
          const response = await api.get("/customer/cash/remaining");
          if (response.status === 200) {
            return response.data.data.remaining;
          }
        } catch (error) {
          console.log(error);
          return 0;
        }
      }

      const data = await callRemaining();
      setRemaining(formatMoney(data));

      // set logo
      setTimeout(() => {
        onLoad();
      }, 1);
    };
    data();
  }, []);

  const handleLogout = () => {
    setSession("CToken", "", 0);
  };
  return (
    <div className="info-account">
      <div className="money">
        | Số dư: <span id="remaining">{remaining}</span>
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

export default memo(InfoAccount);
