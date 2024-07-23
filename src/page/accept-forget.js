import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { LoadingCircle } from "../components/loading/loading-circle";
import { acceptForget } from "../helper/convert-error";
import api from "../config/axiosConfig";
function AcceptForget() {
  const { token } = useParams();
  const [loading, setLoading] = useState(false);
  const [errorAccept, setErrorAccept] = useState("");
  const [acceptOK, setAcceptOK] = useState(false);
  const [heightPage, setHeightPage] = useState(window.innerHeight);
  const [heightForm, setHeightForm] = useState(0);

  useEffect(() => {
    setHeightForm(document.getElementById("form").offsetHeight);
  }, [heightForm]);

  useEffect(() => {
    const handleResize = () => {
      setHeightPage(window.innerHeight);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [heightPage]);

  useEffect(() => {
    setLoading(true);

    api
      .get(`/customer/forget/${token}`)
      .then((response) => {
        setLoading(false);
        const dataRes = response.data;
        if (dataRes.status !== 200) {
          let message = acceptForget[dataRes.message] || "Lỗi không xác định";
          setErrorAccept(message);
        } else {
          setAcceptOK(true);
          setErrorAccept("");
        }
      })
      .catch((error) => {
        setLoading(false);
        setErrorAccept("Lỗi không xác định");
        console.log(error);
      });
  }, []);

  const margin = Math.floor(heightPage / 2 - heightForm / 2 - 100);
  return (
    <div className="d-flex justify-content-center align-items-center">
      <div
        className="form-login"
        style={{
          marginTop: margin > 0 && margin + "px",
        }}
      >
        <div className="logo">
          <div>
            <img src={`/img/logo.png`} className="size-logo" alt="logo" />
            <span className="logo-text">arking</span>
          </div>
        </div>
        <form id="form">
          {errorAccept !== "" && (
            <div style={{ padding: "20px", color: "red" }}>{errorAccept}</div>
          )}
          {acceptOK && errorAccept === "" && (
            <div style={{ padding: "20px", color: "#20c997" }}>
              Mật khẩu sẽ được gửi trong ít phút nữa. Vui lòng kiểm kiểm tra hòm
              thư của bạn.
              <p className="text-center">
                <Link to="/login">Quay về đăng nhập</Link>
              </p>
            </div>
          )}
        </form>
        {loading && <LoadingCircle width="50px" center />}
      </div>
    </div>
  );
}
export default AcceptForget;
