import { useState } from "react";

const loadNotify = () => {
  return "56.4M bài đăng. Hãy khám phá video liên quan đến Fake Text Audio trên TikTok. Xem thêm video về Fake Audio Sound, Fake Call Audio Sound, Fake Text Messages, ...";
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
