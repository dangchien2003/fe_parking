import QRCode from "qrcode.react";
import { useEffect, useState } from "react";
import { LoadingCircle } from "../loading/loading-circle";
import { getContentQr } from "../../helper/convert-error";
import api from "../../config/axiosConfig";

function RenderQr({ qrid }) {
  const [loaded, setLoaded] = useState(false);
  const [errorQr, setErrorQr] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [content, setContent] = useState("");
  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await api.get(`/customer/code/qr/${qrid}`);

        if (response.status === 200) {
          setContent(response.data.data);
        } else {
          let message =
            getContentQr[response.data.message] || "Lỗi không xác định";
          throw new Error(message);
        }
      } catch (error) {
        setErrorQr(true);
        window.toastError(error.message);
      } finally {
        setLoaded(true);
      }
    };

    fetchContent();
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
