import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { LoadingCircle } from "../components/loading/loading-circle";
import { acceptAccount } from "../helper/convert-error";

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
        if (!dataRes.status === 200) {
          let message = acceptAccount[dataRes.message] || "Lỗi không xác định";
          setMessage(message);
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
