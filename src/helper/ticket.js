import { getNowTimestamp } from "./time";

const handleStatus = (element) => {
  const now = getNowTimestamp();
  let status = "";
  if (element.checkoutAt || element.cancleAt !== 0 || element.expireAt < now) {
    status = "Kết thúc";
  } else if (element.checkinAt) {
    status = "Vào";
  } else {
    status = "Chờ";
  }
  return status;
};
export { handleStatus };
