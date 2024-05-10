import { convertTimeStamp, getNowTimestamp } from "../../helper/time";
function RenderListBougthQr({ list }) {
  const now = getNowTimestamp();
  const handleStatus = (element) => {
    let status = "";
    if (
      element.checkoutAt ||
      element.cancleAt !== null ||
      element.expireAt < now
    ) {
      status = "Kết thúc";
    } else if (element.checkinAt) {
      status = "Vào";
    } else {
      status = "Chờ";
    }
    return status;
  };
  return (
    <tbody>
      {list.map((element) => {
        return (
          <tr key={Math.random()}>
            <td>
              {convertTimeStamp(element.buyAt, "hh:mm:ss")}
              <br />
              {convertTimeStamp(element.buyAt, "DD/MM/yyy")}
            </td>
            <td>
              {element.checkinAt && (
                <>
                  {convertTimeStamp(element.checkinAt, "hh:mm:ss")}
                  <br />
                  {convertTimeStamp(element.checkinAt, "DD/MM/yyy")}
                </>
              )}
            </td>
            <td>
              {element.checkoutAt && (
                <>
                  {convertTimeStamp(element.checkoutAt, "hh:mm:ss")}
                  <br />
                  {convertTimeStamp(element.checkoutAt, "DD/MM/yyy")}
                </>
              )}
            </td>
            <td>{handleStatus(element)}</td>
            <td>
              <a href="#">Xem chi tiết</a>
            </td>
          </tr>
        );
      })}
    </tbody>
  );
}

export default RenderListBougthQr;
