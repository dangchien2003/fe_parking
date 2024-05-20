import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { LoadingCircle } from "../components/loading/loading-circle";

function AcceptChangeEmail() {
  const { token } = useParams();
  const [loaded, setLoaded] = useState(false);
  const [message, setMessage] = useState("");
  useEffect(() => {
    fetch(`${process.env.REACT_APP_BE}/customer/accept-change-email`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        tokenChange: token,
      }),
    })
      .then((response) => response.json())
      .then((dataRes) => {
        if (!dataRes.success) {
          let logMessage = "";
          switch (dataRes.message.error) {
            case "Invalid token":
              logMessage = "Phiên đã hết hạn hoặc không tồn tại";
              break;
            case "Account not exist":
              logMessage = "Tài khoản không tồn tại";
              break;
            case "Session has ended":
              logMessage = "Phiên không còn hiệu lực";
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
              <h2 className=" text-success">Thay đổi thành công</h2>
              <Link to="/login">Quay trở về đăng nhập</Link>
            </div>
          ) : (
            <div className="text-center">
              <h2 className=" text-danger">Thay đổi thất bại</h2>
              <span>{message}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default AcceptChangeEmail;
