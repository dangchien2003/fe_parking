import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { LoadingCircle } from "../components/loading/loading-circle";
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
    fetch(`${process.env.REACT_APP_BE}/customer/forget/${token}`, {
      method: "GET",
    })
      .then(async (response) => await response.json())
      .then((dataRes) => {
        setLoading(false);
        if (!dataRes.success) {
          switch (dataRes.message.error) {
            case "Invalid token":
              setErrorAccept("Phiên không hợp lệ hoặc đã hết hạn");
              break;
            default:
              setErrorAccept(dataRes.message.error);
          }
        } else {
          setAcceptOK(true);
        }
      })
      .catch((error) => {
        setErrorAccept("Lỗi không xác định");
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
          {errorAccept && (
            <div style={{ padding: "20px", color: "red" }}>{errorAccept}</div>
          )}
          {!acceptOK && (
            <div style={{ padding: "20px", color: "#20c997" }}>
              Mật khẩu sẽ được gửi trong ít phút nữa. Vui lòng kiểm kiểm tra hòm
              thư của bạn.
              <p className="text-center">
                <Link to="/login">Quay về đăng nhập</Link>
              </p>
            </div>
          )}
        </form>
        {loading && <LoadingCircle width="50px" />}
      </div>
    </div>
  );
}
export default AcceptForget;
