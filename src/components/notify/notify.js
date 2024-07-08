import { useState } from "react";

const loadNotify = () => {
  return "Duyệt tiền tự động đã dừng hoạt động vì ngân hàng chặn IP máy chủ";
};
function Notify() {
  const [notifis, setNotifis] = useState(loadNotify);
  return (
    <marquee>
      {notifis.length > 0 && (
        <div className="text-danger fw-bold">{notifis}</div>
      )}
    </marquee>
  );
}

export default Notify;
