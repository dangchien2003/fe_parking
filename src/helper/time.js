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

export { convertTimeStamp };
