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

export { convertTimeStamp, getNowTimestamp };
