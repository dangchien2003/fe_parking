import { useState } from "react";
import { getNowTimestamp, convertTimeStamp } from "../../helper/time";
import { LoadingCircle } from "../loading/loading-circle";
import { extendCodeError } from "../../helper/convert-error";
import { formatMoney } from "../../helper/number";
const today = () => {
  const now = getNowTimestamp();
  return convertTimeStamp(now, "yyyy-MM-DD");
};
function ActionCode({ info, onCancleOk }) {
  const [cancled, setCancled] = useState(false);
  const [showExtend, setShowExtend] = useState(false);
  const [date, setDate] = useState(undefined);
  const [valueInputDate, setValueInputDate] = useState(undefined);
  const [valueSelectTime, setValueSelectTime] = useState(1);
  const [totalExtend, setTotalExtend] = useState("0");
  const [getPrice, setGetPrice] = useState(false);
  const [message, setMessage] = useState("");
  const [calling, setCalling] = useState(false);
  const [callingExtend, setCallingExtend] = useState(false);

  const handleCancleCode = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BE}/customer/code/cancle?id=${info.qrid}`,
        {
          method: "PATCH",
          credentials: "include",
        }
      );

      const dataRes = await response.json();
      if (dataRes.success) {
        window.toastSuccess("Huỷ thành công");
        setCancled(true);
        onCancleOk();
        return;
      }

      let message = "";
      switch (dataRes.message.error) {
        case "Invalid code":
          message = "Mã vé không đúng";
          break;
        case "Code not exist":
          message = "Mã không tồn tại";
          break;
        case "Cannot cancle":
          message = "Không thể huỷ";
          break;
        default:
          message = "Lỗi không xác định";
      }
      window.toastError(message);
    } catch (error) {
      //   setLoaded(true);
    }
  };

  const clickExtend = () => {
    setShowExtend(true);
  };

  const handleChangeDate = (e) => {
    let value = e.target.value;
    let splitDate = value.split("-");
    let date = `${splitDate[2]}-${splitDate[1]}-${splitDate[0]}`;
    setDate(date);
    setValueInputDate(value);
  };

  const handleChangeTime = (e) => {
    setValueSelectTime(e.target.value);
  };

  const handleClearData = () => {
    setMessage("");
    setGetPrice(false);
  };

  const handleGetPriceExtend = () => {
    if (callingExtend) {
      window.toastError("Thao tác chậm lại");
      return;
    }
    handleClearData();
    setCallingExtend(true);
    fetch(
      `${process.env.REACT_APP_BE}/customer/code/extend/price/${info.qrid}?date=${date}&time=${valueSelectTime}`,
      {
        method: "GET",
        credentials: "include",
      }
    )
      .then((response) => response.json())
      .then((dataRes) => {
        if (dataRes.success) {
          setTotalExtend(formatMoney(dataRes.data.price));
          setGetPrice(true);
          return;
        }
        let message = extendCodeError[dataRes.message.error];
        if (!message) {
          message = "Lỗi không xác định";
        }
        setMessage(message);
      })
      .catch(() => {
        setMessage("Có lỗi xảy ra");
      })
      .finally(() => {
        setCallingExtend(false);
      });
  };

  const handleBuyTicket = () => {
    if (calling) {
      window.toastError("Thao tác chậm lại");
      return;
    }

    setCalling(true);
    setMessage("");
    fetch(
      `${process.env.REACT_APP_BE}/customer/code/extend/${info.qrid}?date=${date}&time=${valueSelectTime}`,
      {
        method: "PATCH",
        credentials: "include",
      }
    )
      .then((response) => response.json())
      .then((dataRes) => {
        if (dataRes.success) {
          window.toastSuccess("Gia hạn thành công");
          setTimeout(() => {
            window.location.reload();
          }, 2000);
          return;
        }
        let message = extendCodeError[dataRes.message.error];
        if (!message) {
          message = "Lỗi không xác định";
        }
        setMessage(message);
        setCalling(false);
      })
      .catch(() => {
        setMessage("Có lỗi xảy ra");
        setCalling(false);
      });
  };

  return (
    <>
      {info.checkinAt === 0 && info.cancleAt === 0 && !cancled && (
        <button
          type="button"
          className="btn btn-danger"
          onClick={handleCancleCode}
        >
          Huỷ mã
        </button>
      )}
      {!showExtend &&
        info.checkoutAt == 0 &&
        info.checkinAt != 0 &&
        info.expireAt < getNowTimestamp() &&
        info.cancleAt === 0 && (
          <button
            type="button"
            className="btn btn-primary"
            onClick={clickExtend}
          >
            Gia hạn
          </button>
        )}
      {showExtend && (
        <div className="" id="form_extend_code">
          <input
            type="date"
            min={today()}
            value={valueInputDate}
            id="date"
            className="m-1 input"
            onChange={handleChangeDate}
          />
          <select id="time" className="m-1 p-1" onChange={handleChangeTime}>
            <option value={1}>06:00</option>
            <option value={2}>12:00</option>
            <option value={3}>18:00</option>
            <option value={4}>23:59</option>
          </select>
          <button
            type="button"
            class="btn btn-primary"
            onClick={handleGetPriceExtend}
          >
            Tính giá vé
          </button>
          <br />
          {getPrice && (
            <div>
              <span>
                Số tiền ước tính: {totalExtend}
                <sup>đ</sup>
              </span>
              <button
                type="button"
                class="btn btn-success"
                onClick={handleBuyTicket}
              >
                Mua vé
              </button>
            </div>
          )}

          {message.length > 0 && <div className="text-danger">{message}</div>}
        </div>
      )}
    </>
  );
}
export default ActionCode;
