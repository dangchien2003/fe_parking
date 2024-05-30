import { useParams } from "react-router-dom";
import Header from "../components/header/header";
import { useEffect, useState } from "react";
import LoadingLineRun from "../components/loading/loading-line-run";
import { formatMoney } from "../helper/number";
import { convertTimeStamp, getNowTimestamp } from "../helper/time";
import RenderQr from "../components/code/render-qr-code";

function InfoQr() {
  const { qrid } = useParams();
  const [showQr, setShowQr] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [info, setInfo] = useState({});

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BE}/customer/code/i?qrid=${qrid}`, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((dataRes) => {
        if (dataRes.success) {
          setInfo(dataRes.data);
          return;
        }
        window.toastError("Có lỗi xảy ra");
      })
      .catch((error) => {
        setLoadError(true);
      })
      .finally(() => {
        setLoaded(true);
      });
  }, []);

  const handleRenderQr = () => {
    if (loadError || info.checkoutAt || info.cancleAt || !loaded) {
      window.toastError("Không thể tạo QR");
      return;
    }
    setShowQr(true);
  };

  const getExpireAt = (info) => {
    if (info.checkinAt !== null) {
      return info.checkinAt + 24 * 60 * 60 * 1000;
    }
    return info.expireAt;
  };
  return (
    <>
      <Header />
      <div className="margin-distance" id="i-qr">
        <h3 className="name">Thông tin: {qrid}</h3>
        <a href="#qr" onClick={handleRenderQr} className="fs-5" id="move-qr">
          Lấy mã code
        </a>
        <div id="info" className="row">
          {!loaded ? (
            <LoadingLineRun quantity={1} />
          ) : (
            <>
              <div className="col-sm-4 group">
                <div>
                  <span>Loại vé: </span>
                  <span>{info.qrCategory}</span>
                </div>
                <div>
                  <span>Số lần: </span>
                  <span>{info.qrCategory === "MA1LAN" ? 1 : "?"}</span>
                </div>
                <div>
                  <span>Giá vé: </span>
                  <span>{formatMoney(info.price)}đ</span>
                </div>
              </div>
              <div className="col-sm-4 group">
                <div>
                  <span>Mua lúc: </span>
                  <span>
                    {convertTimeStamp(info.buyAt, "HH:mm:ss DD/MM/yyy")}
                  </span>
                </div>
                <div>
                  <span>Hết hạn: </span>
                  <span>
                    {convertTimeStamp(getExpireAt(info), "HH:mm:ss DD/MM/yyy")}
                  </span>
                </div>
              </div>
              <div className="col-sm-4 group">
                <div>
                  <span>
                    <input
                      type="checkbox"
                      checked={info.acceptBy === "1" ? true : false}
                    />
                  </span>
                  <span>Hỗ trợ nhập bãi</span>
                </div>
                <div>
                  <span>
                    <input
                      type="checkbox"
                      checked={info.cancleAt ? true : false}
                    />
                  </span>
                  <span>Huỷ vé</span>
                </div>
                <div>
                  <span>
                    <input
                      type="checkbox"
                      checked={
                        getExpireAt(info) <= getNowTimestamp() ||
                        info.checkoutAt
                          ? true
                          : false
                      }
                    />
                  </span>
                  <span>Đã hết hạn</span>
                </div>
              </div>
            </>
          )}
        </div>
        <div id="plate">
          <div>
            <div className="show">
              <h5 className="text-center">Biển nhập</h5>
              {info.checkinAt ? (
                <div>
                  <div>
                    {convertTimeStamp(info.checkinAt, "HH:mm:ss DD/MM/yyy")}
                  </div>
                  <img
                    alt="Plate-In"
                    src={`https://res.cloudinary.com/dis2ybh5i/image/upload/${info.imageIn}`}
                  />
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
          <div>
            <div className="show">
              <h5 className="text-center">Biển xuất</h5>
              {info.checkoutAt ? (
                <div>
                  <div>
                    {convertTimeStamp(info.checkoutAt, "HH:mm:ss DD/MM/yyy")}
                  </div>
                  <img
                    alt="Plate-Out"
                    src={`https://res.cloudinary.com/dis2ybh5i/image/upload/${info.imageOut}`}
                  />
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
        <div id="qr">{showQr && <RenderQr qrid={qrid} />}</div>
      </div>
    </>
  );
}

export default InfoQr;
