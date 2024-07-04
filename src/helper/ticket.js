import { getNowTimestamp } from "./time";

const handleStatus = (element) => {
  const now = getNowTimestamp();
  let status = "";
  if (
    element.checkoutAt ||
    element.cancleAt !== 0 ||
    (element.expireAt < now && element.checkinAt === 0) ||
    (element.checkinAt + 24 * 60 * 60 * 1000 < now && element.checkinAt !== 0)
  ) {
    status = "Kết thúc";
  } else if (element.checkinAt) {
    status = "Vào";
  } else {
    status = "Chờ";
  }
  return status;
};
export { handleStatus };
