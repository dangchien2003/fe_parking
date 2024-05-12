import { convertTimeStamp } from "../../helper/time";
import { formatMoney } from "../../helper/number";
function RenderReposit({ list }) {
  const handleStatus = (element) => {
    if (element.cancleAt !== null) {
      return <span className="fw-bolder text-danger">Huỷ</span>;
    } else if (element.recashAt != null) {
      return <span className="fw-bolder text-danger">Thu hồi</span>;
    } else if (element.acceptAt == null) {
      return (
        <span className="fw-bolder" style={{ color: "#fd7e14" }}>
          Chờ
        </span>
      );
    } else {
      return <span className="fw-bolder text-success">Ok</span>;
    }
  };
  return (
    <tbody>
      {list.map((element, index) => (
        <tr key={index}>
          <td>
            {convertTimeStamp(element.cashAt, "hh:mm:ss")}
            <br />
            {convertTimeStamp(element.cashAt, "DD/MM/yyyy")}
          </td>
          <td>{formatMoney(element.money)}</td>
          <td>{handleStatus(element)}</td>
        </tr>
      ))}
    </tbody>
  );
}
export default RenderReposit;
