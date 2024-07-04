import { Link } from "react-router-dom";
import { handleStatus } from "../../helper/ticket";
import { convertTimeStamp } from "../../helper/time";
function RenderListBougthQr({ list }) {
  return (
    <tbody>
      {list.map((element) => {
        return (
          <tr key={Math.random()}>
            <td>
              {convertTimeStamp(element.buyAt, "HH:mm:ss")}
              <br />
              {convertTimeStamp(element.buyAt, "DD/MM/yyy")}
            </td>
            <td>
              {element.checkinAt ? (
                <>
                  {convertTimeStamp(element.checkinAt, "HH:mm:ss")}
                  <br />
                  {convertTimeStamp(element.checkinAt, "DD/MM/yyy")}
                </>
              ) : (
                ""
              )}
            </td>
            <td>
              {element.checkoutAt ? (
                <>
                  {convertTimeStamp(element.checkoutAt, "HH:mm:ss")}
                  <br />
                  {convertTimeStamp(element.checkoutAt, "DD/MM/yyy")}
                </>
              ) : (
                ""
              )}
            </td>
            <td>{handleStatus(element)}</td>
            <td>
              <Link to={`/qr/info/${element.qrid}`}>Xem chi tiết</Link>
            </td>
          </tr>
        );
      })}
    </tbody>
  );
}

export default RenderListBougthQr;
