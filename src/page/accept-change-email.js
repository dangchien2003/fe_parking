import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { LoadingCircle } from "../components/loading/loading-circle";
import { acceptChangeEmail } from "../helper/convert-error";
import api from "../config/axiosConfig";

function AcceptChangeEmail() {
  const { token } = useParams();
  const [loaded, setLoaded] = useState(false);
  const [message, setMessage] = useState("");
  useEffect(() => {
    api
      .patch("/customer/accept-change-email", {
        tokenChange: token,
      })
      .then((response) => {
        const dataRes = response.data;
        if (dataRes.status !== 200) {
          let message =
            acceptChangeEmail[dataRes.message] || "Lỗi không xác định";
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
