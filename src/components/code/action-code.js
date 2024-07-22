import { useState } from "react";
import { getNowTimestamp, convertTimeStamp } from "../../helper/time";
import { cancleCode, extendCodeError } from "../../helper/convert-error";
import { formatMoney } from "../../helper/number";
import { getItem } from "../../helper/sessionStorage";
import axios from "axios";
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
    if (calling) {
      window.toastError("Thao tác chậm lại");
      return;
    }
    setCalling(true);
    setMessage("");
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_BE}/api/customer/code/cancle`,
        null,
        {
          params: {
            id: info.qrid,
          },
          withCredentials: true,
          headers: {
            Authorization: getItem("CToken"),
          },
        }
      );

      if (response.status === 200) {
        window.toastSuccess("Huỷ thành công");
        setCancled(true);
        onCancleOk();
      } else {
        let message = cancleCode[response.data.message] || "Lỗi không xác định";
        setMessage(message);
      }
    } catch (error) {
      setMessage("Có lỗi xảy ra");
      setCalling(false);
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

  const handleGetPriceExtend = async () => {
    if (callingExtend) {
      window.toastError("Thao tác chậm lại");
      return;
    }
    handleClearData();
    setCallingExtend(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BE}/api/customer/code/extend/price/${info.qrid}`,
        {
          params: {
            date: date,
            time: valueSelectTime,
          },
          withCredentials: true,
          headers: {
            Authorization: getItem("CToken"),
          },
        }
      );

      if (response.status === 200) {
        setTotalExtend(formatMoney(response.data.price));
        setGetPrice(true);
      } else {
        let message =
          extendCodeError[response.data.message] || "Lỗi không xác định";
        setMessage(message);
      }
    } catch (error) {
      setMessage("Có lỗi xảy ra");
    } finally {
      setCallingExtend(false);
    }
  };

  const handleExtendTicket = async () => {
    if (calling) {
      window.toastError("Thao tác chậm lại");
      return;
    }

    setCalling(true);
    setMessage("");

    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_BE}/api/customer/code/extend/${info.qrid}`,
        null,
        {
          params: {
            date: date,
            time: valueSelectTime,
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        window.toastSuccess("Gia hạn thành công");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        let message = cancleCode[response.data.message] || "Lỗi không xác định";
        setMessage(message);
        setCalling(false);
      }
    } catch (error) {
      setMessage("Có lỗi xảy ra");
      setCalling(false);
    }
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
                onClick={handleExtendTicket}
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
