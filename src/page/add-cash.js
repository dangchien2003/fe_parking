import { useEffect, useState } from "react";
import Header from "../components/header/header";
import { formatMoney } from "../helper/number";
import { LoadingCircle } from "../components/loading/loading-circle";
import { randomString } from "../helper/random";

function AddCash() {
  const [denominationsStr, setDenominationsStr] = useState("");
  const [denominationsNum, setDenominationsNum] = useState(0);
  const [loading, setLoading] = useState(false);
  const [contentQr, setContentQr] = useState("");
  useEffect(() => {
    setContentQr(randomString(15));
  }, []);

  const handleChangeFaceValue = (e) => {
    const value = e.target.innerText.replace(/\D/g, "");
    handlleValue(parseInt(value));
  };

  const handleChangeInput = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    handlleValue(parseInt(value));
  };

  const handlleValue = (value) => {
    if (value > 1000000) {
      return;
    }
    if (isNaN(value)) {
      setDenominationsStr("");
      setDenominationsNum(0);
      return;
    }
    setDenominationsStr(formatMoney(value).trim());
    setDenominationsNum(value);
  };

  const handleBankOk = () => {
    if (denominationsNum < 10000) {
      window.toastError("Mệnh giá nạp phải trên 10.000đ");
      return;
    }
    setLoading(true);
    fetch(`${process.env.REACT_APP_BE}/customer/cash/input-money`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        money: denominationsNum,
        stringCode: contentQr,
      }),
    })
      .then((response) => response.json())
      .then((dataRes) => {
        if (!dataRes.success) {
          if (dataRes.message.money) {
            window.toastError("Mệnh giá nạp phải trên 10.000đ");
            return;
          }
          throw new Error("Lỗi không xác định");
        }
        window.toastSuccess("Số dư sẽ được cộng sau ít phút");
        setDenominationsNum(0);
        setDenominationsStr("");
        setContentQr(randomString(15));
      })
      .catch((error) => {
        console.log(error);
        window.toastError("Có lỗi xảy ra hãy liên hệ với chúng tôi");
      })
      .finally(() => {
        setLoading(false);
      });
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
                <div>B2: Quét mã QR chuyển khoản với nội dung điền sẵn</div>
                <div>B3: Chọn nút đã chuyển khoản phía dưới</div>
                <div>
                  B4: Bạn sẽ được cộng tiền chỉ sau vài phút, cố gắng đợi nhé
                </div>
              </div>
              <div className="tittle text-danger">⚠️Lưu ý</div>
              <div className="m-1 mt-0">
                <div>
                  - Không thay đổi mệnh giá sau khi đã chuyển khoản thành công
                </div>
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
                <button
                  className="btn btn-primary m-2"
                  onClick={handleChangeFaceValue}
                >
                  200.000<sup>đ</sup>
                </button>
                <button
                  className="btn btn-primary m-2"
                  onClick={handleChangeFaceValue}
                >
                  500.000<sup>đ</sup>
                </button>
              </div>
              <div>
                <label>Số tiền nạp:&nbsp; </label>
                <input
                  className="input mb-1 so-tien"
                  onChange={handleChangeInput}
                  value={denominationsStr}
                />
              </div>
              {loading ? (
                <LoadingCircle width="30px" />
              ) : (
                <button
                  className="btn btn-success m-2 mt-0"
                  onClick={handleBankOk}
                >
                  Đã chuyển khoản
                </button>
              )}
            </div>
          </div>
          <div className="col-lg-5" id="qr">
            <div>
              <div className="tittle text-center fs-3 pt-2">Quét tôi đi</div>
              <div className="img-qr">
                {denominationsNum >= 10000 && contentQr.length > 0 && (
                  <img
                    src={`https://img.vietqr.io/image/tpbank-04289426001-qr_only.png?amount=${denominationsNum}&addInfo=${contentQr}`}
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
