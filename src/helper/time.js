import moment from "moment";
function convertTimeStamp(timestamp, format) {
  let date = "";
  if (!isNaN(timestamp)) {
    date = moment(timestamp).format(format);
  } else {
    date = timestamp;
  }
  return date;
}

function getNowTimestamp() {
  const date = new Date();
  return date.getTime();
}

function diffTime(timestamp) {
  const now = moment(); // Lấy thời điểm hiện tại
  if (!isNaN(timestamp)) {
    try {
      timestamp = parseInt(timestamp);
    } catch (error) {
      return 0;
    }
  }
  const date = moment(timestamp);
  const daysDifference = now.diff(date, "days");
  return daysDifference;
}

function formatDays(days) {
  if (days > 30) {
    const month = Math.floor(days / 30);
    return `hơn ${month} tháng`;
  }
  return `${days} ngày`;
}

function formatSeconds(seconds) {
  if (seconds > 60 * 60) {
    return `${Math.floor(seconds / 60 / 60)} giờ`;
  }
  return `${Math.floor(seconds / 60)} phút`;
}

export {
  convertTimeStamp,
  getNowTimestamp,
  diffTime,
  formatDays,
  formatSeconds,
};
