import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { LoadingCircle } from "../components/loading/loading-circle";

function AcceptAccount() {
  const { token } = useParams();
  const [loaded, setLoaded] = useState(false);
  const [message, setMessage] = useState("");
  useEffect(() => {
    fetch(`${process.env.REACT_APP_BE}/customer/accept-account`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        token: token,
      }),
    })
      .then((response) => response.json())
      .then((dataRes) => {
        if (!dataRes.success) {
          let logMessage = "";
          switch (dataRes.message.error) {
            case "Token is null":
              logMessage = "Không tồn tại mã xác thực";
              break;
            case "Invalid token":
              logMessage = "Mã xác thực hết hiệu lực hoặc chính xác";
              break;
            case "Account not exist":
              logMessage = "Tài khoản không tồn tại";
              break;
            case "Account accepted":
              logMessage = "Tài khoản đã được xác thực trước đó";
              break;
            default:
              logMessage = "Lỗi không xác định";
          }
          setMessage(logMessage);
        }
      })
      .catch((error) => {
        console.log(error);
        setMessage("Có lỗi xảy ra");
      })
      .finally(() => {
        setLoaded(true);
      });
  }, []);

  return (
    <div>
      {!loaded ? (
        <LoadingCircle center width="50px" />
      ) : (
        <div>
          {message == "" ? (
            <div className="text-center">
              <h2 className=" text-success">Xác thực thành công</h2>
              <Link to="/login">Quay trở về đăng nhập</Link>
            </div>
          ) : (
            <div className="text-center">
              <h2 className=" text-danger">Xác thực thất bại</h2>
              <span>{message}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default AcceptAccount;
