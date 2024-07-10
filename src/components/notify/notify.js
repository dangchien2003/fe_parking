import { useState } from "react";

const loadNotify = () => {
  return "Tính năng duyệt tiền tự động chỉ hoạt động vào ban ngày";
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
