import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { LoadingCircle } from "../components/loading/loading-circle";
import { acceptAccount } from "../helper/convert-error";
import axios from "axios";

function AcceptAccount() {
  const { token } = useParams();
  const [loaded, setLoaded] = useState(false);
  const [message, setMessage] = useState("");
  useEffect(() => {
    axios
      .patch(
        `${process.env.REACT_APP_BE}/api/customer/accept-account`,
        {
          token: token,
        },
        {
          headers: {
            "Content-type": "application/json",
          },
        }
      )
      .then((response) => {
        const dataRes = response.data;
        if (dataRes.status !== 200) {
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
