import { useEffect, useState } from "react";
import Header from "../components/header/header";

function AddCash() {
  const [denominations, setDenominations] = useState(false);

  const handleChangeFaceValue = (e) => {
    const value = e.target.innerText.replace(/[.đ]/g, "");
    setDenominations(value);
  };

  return (
    <div>
      <Header />
      <div className="margin-distance" id="cash">
        <h3 className="name">Nạp tiền</h3>
        <div className="row">
          <div className="col-lg-7" id="option">
            <div className="hd">
              <div className="tittle">Hướng dẫn</div>
              <div className="m-1 mt-0">
                <div>B1: Chọn mệnh giá nạp</div>
                <div>
                  B2: Quét mã QR chuyển khoản với nội dung là ID tài khoản (Đã
                  tự động điền)
                </div>
                <div>B3: Chọn nút đã chuyển khoản phía dưới</div>
                <div>
                  B4: Bạn sẽ được cộng tiền chỉ sau vài phút, cố gắng đợi nhé
                </div>
              </div>
              <div className="tittle text-danger">⚠️Lưu ý</div>
              <div className="m-1 mt-0">
                <div>- Nếu có vấn đề phát sinh hãy liên hệ với chúng tôi</div>
                <div>
                  - Mọi vấn đề phát sinh do bạn không tuân thủ các bước trên sẽ
                  không được giải quyết
                </div>
                <div>
                  - Các trường hợp cố tình gian lận sẽ bị khoá tài khoản vĩnh
                  viễn
                </div>
              </div>
            </div>
            <br />
            <div className="menh-gia">
              <div className="tittle">Chọn mệnh giá:</div>
              <div>
                <button
                  className="btn btn-primary m-2"
                  onClick={handleChangeFaceValue}
                >
                  10.000<sup>đ</sup>
                </button>
                <button
                  className="btn btn-primary m-2"
                  onClick={handleChangeFaceValue}
                >
                  20.000<sup>đ</sup>
                </button>
                <button
                  className="btn btn-primary m-2"
                  onClick={handleChangeFaceValue}
                >
                  50.000<sup>đ</sup>
                </button>
                <button
                  className="btn btn-primary m-2"
                  onClick={handleChangeFaceValue}
                >
                  100.000<sup>đ</sup>
                </button>
              </div>
              <button className="btn btn-success m-2 mt-0">
                Đã chuyển khoản
              </button>
            </div>
          </div>
          <div className="col-lg-5" id="qr">
            <div>
              <div className="tittle text-center fs-3 pt-2">Quét tôi đi</div>
              <div className="img-qr">
                {denominations && (
                  <img
                    src={`https://img.vietqr.io/image/vietinbank-113366668888-qr_only.png?amount=${denominations}&addInfo=dong%20qop%20quy%20vac%20xin&accountName=Quy%20Vac%20Xin%20Covid`}
                    alt="qr"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default AddCash;
