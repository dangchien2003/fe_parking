import { Link } from "react-router-dom";
import Header from "../components/header/header";
import ChangePassword from "../components/me/change-password";
import { useEffect, useState } from "react";
import LoadingLineRun from "../components/loading/loading-line-run";
import { convertTimeStamp } from "../helper/time";

function MyInfo() {
  const [info, setInfo] = useState(null);
  const [errorFetch, setErrorFetch] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const myInfo = async () => {
      try {
        const response = await fetch(
          process.env.REACT_APP_BE + "/customer/me",
          {
            method: "GET",
            credentials: "include",
          }
        );

        const dataRes = await response.json();
        if (!dataRes.success) {
          throw new Error(dataRes.message.error);
        }
        setInfo(dataRes.data);
      } catch (error) {
        setErrorFetch(error);
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    myInfo();
  }, []);
  return (
    <div>
      <Header />
      <div className="mt-2 margin-distance" id="my-info">
        <h3 className="name">Thông tin tài khoản</h3>
        <div className="row content">
          <div className="col-md-8 account">
            {errorFetch && (
              <div className="text-danger h-100 d-flex justify-content-center align-items-center fs-3 p-3">
                <img
                  style={{ width: "50px" }}
                  className="m-2"
                  src="/img/error.png"
                />
                Lỗi tải thông tin
              </div>
            )}
            {loading && <LoadingLineRun />}
            {!loading && !errorFetch && (
              <div className="row">
                <div className="col-md-6">
                  <div className="p-3">
                    <p className="group-info">
                      <span className="topic">Mã khách hàng: </span>
                      <span className="text">{info.uid}</span>
                    </p>
                    <p className="group-info">
                      <span className="topic">Email: </span>
                      <span className="text">{info.email}</span>
                      <Link className="d-block" to="/me/change-email">
                        Thay đổi email
                      </Link>
                    </p>
                    <p className="group-info ">
                      <span className="topic">Trạng thái: </span>
                      {info.block === "0" ? (
                        <span className="text">
                          <i className="bi bi-circle-fill p-1 ok"></i>
                          Bình thường
                        </span>
                      ) : (
                        <span className="text">
                          <i className="bi bi-circle-fill p-1 error"></i>
                          Tạm khoá
                        </span>
                      )}
                    </p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="p-3">
                    <p className="group-info ">
                      <span className="topic">Ngày kích hoạt: </span>
                      <span className="text">
                        {convertTimeStamp(parseInt(info.createAt), "DD/MM/yyy")}
                      </span>
                      <span className="d-block ok">
                        Chúng ta đã gắn bó được 25 ngày rồi đó
                        <img src="/img/thanks1.png" />
                      </span>
                    </p>
                    <p className="group-info ">
                      <span className="topic">Thứ hạng: </span>
                      <span className="text">
                        Đồng
                        <img src="/img/rank-cu.png" />
                      </span>
                    </p>
                    <p className="group-info ">
                      <span className="topic">Tiêu dùng của tôi: </span>
                      <Link to="/">Đi tới dashboard</Link>
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="col-md-4 password">
            <ChangePassword />
          </div>
        </div>
      </div>
    </div>
  );
}
export default MyInfo;
