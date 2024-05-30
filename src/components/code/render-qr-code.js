import QRCode from "qrcode.react";
import { renderNewQr } from "../../helper/canvas";
import { useEffect, useState } from "react";
import { LoadingCircle } from "../loading/loading-circle";

function RenderQr({ qrid }) {
  const [loaded, setLoaded] = useState(false);
  const [errorQr, setErrorQr] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [content, setContent] = useState("");
  useEffect(() => {
    fetch(`${process.env.REACT_APP_BE}/customer/code/qr/${qrid}`, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((dataRes) => {
        if (dataRes.success) {
          setContent(dataRes.data);
          return;
        }

        let message = "";
        if (dataRes.message.error === "expired") {
          message = "Mã đã hết hạn";
        } else if (dataRes.message.error === "Checkouted") {
          message = "Mã đã hết lượt sử dụng";
        } else if (dataRes.message.error === "Cancled") {
          message = "Mã đã huỷ";
        } else if (
          dataRes.message.error === "Not found" ||
          dataRes.message.error === "Invalid qr"
        ) {
          message = "Mã không tồn tại";
        } else {
          message = dataRes.message.error;
        }

        throw new Error(message);
      })
      .catch((err) => {
        setErrorQr(true);
        window.toastError(err);
      })
      .finally(() => {
        setLoaded(true);
      });
  }, []);

  const handleDownloadQr = () => {
    if (downloaded) {
      window.toastSuccess("Qr đã được tải");
      return;
    }
    setDownloaded(true);
    const canvas = document.getElementById("qr-code");
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = qrid + ".png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };
  return (
    <>
      <h4>QR quét tại bot</h4>
      {!loaded ? (
        <LoadingCircle width="30px" />
      ) : (
        <>
          {errorQr ? (
            "Không thể lấy mã"
          ) : (
            <>
              <QRCode
                value={content}
                id="qr-code"
                size={300}
                level={"H"}
                includeMargin={true}
              />
              <div>
                <button className="btn btn-success" onClick={handleDownloadQr}>
                  <i class="bi bi-arrow-bar-down"></i>&nbsp;Tải xuống
                </button>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}

export default RenderQr;
