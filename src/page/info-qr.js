import { useParams } from "react-router-dom";
import Header from "../components/header/header";
import { useEffect, useState } from "react";
import LoadingLineRun from "../components/loading/loading-line-run";
import { formatMoney } from "../helper/number";
import { convertTimeStamp, getNowTimestamp } from "../helper/time";
import RenderQr from "../components/code/render-qr-code";
import ActionCode from "../components/code/action-code";
import axios from "axios";
import { getCustomerAuthorization } from "../helper/authorization";
import api from "../config/axiosConfig";

function InfoQr() {
  const { qrid } = useParams();
  const [showQr, setShowQr] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [info, setInfo] = useState({});
  const [ticketCancled, setTicketCancled] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/customer/code/i", {
          params: { qrid },
        });

        if (response.status === 200) {
          setInfo(response.data.data);
        } else {
          window.toastError("Có lỗi xảy ra");
        }
      } catch (error) {
        setLoadError(true);
      } finally {
        setLoaded(true);
      }
    };

    fetchData();
  }, []);

  const handleRenderQr = () => {
    if (loadError || info.checkoutAt || info.cancleAt || !loaded) {
      window.toastError("Không thể tạo QR");
      return;
    }
    setShowQr(true);
  };

  const handleCancleCode = () => {
    setTicketCancled(1);
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
                    {convertTimeStamp(info.expireAt, "HH:mm:ss DD/MM/yyy")}
                  </span>
                </div>
                <div>
                  <span>Địa điểm: </span>
                  <span>{info.bot && info.bot.address}</span>
                </div>
                {/* <RenderAddress botId={info.botId} /> */}
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
                      checked={info.cancleAt || ticketCancled ? true : false}
                    />
                  </span>
                  <span>Huỷ vé</span>
                </div>
                <div>
                  <span>
                    <input
                      type="checkbox"
                      checked={
                        info.expireAt <= getNowTimestamp() || info.checkoutAt
                          ? true
                          : false
                      }
                    />
                  </span>
                  <span>Đã hết hạn</span>
                </div>
              </div>

              <div className="d-flex justify-content-end" id="action_code">
                {loaded && (
                  <ActionCode info={info} onCancleOk={handleCancleCode} />
                )}
              </div>
            </>
          )}
        </div>
        <div id="plate">
          <div>
            <div className="show">
              <h5 className="text-center">Biển vào</h5>
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
              <h5 className="text-center">Biển ra</h5>
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
