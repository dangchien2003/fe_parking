import moment from "moment";
function covertTimeStamp(timestamp, format) {
  let date = "";
  if (!isNaN(timestamp)) {
    date = moment(timestamp).format(format);
  } else {
    date = timestamp;
  }
  return date;
}

export { covertTimeStamp };
