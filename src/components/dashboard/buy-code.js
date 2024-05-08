import { useState, useEffect } from "react";
import { formatMoney } from "../../helper/number";
function HistoryBuyCode() {
  const [quantityBought, setQuantityBought] = useState(0);
  const [totalInvested, setTotalInvested] = useState(formatMoney(0));
  const [loadHistory, setLoadHistory] = useState(false);
  useEffect(() => {
    // const loadQuantityBought = async () => {
    //   await fetch(`${process.env.BE}/`);
    // };
  }, []);
  return (
    <div className="d-flex justify-content-center tk">
      <div className="row w-100 ">
        <div className="col">
          <h5>QR đã mua</h5>
        </div>
        <div className="col text-end">
          <a href="#">Xem tất cả</a>
        </div>
        <div>
          <div className="row w-100">
            <div className="col">Số lượng: {quantityBought}</div>
            <div className="col text-end">
              Tổng chi: {totalInvested}
              <sup>đ</sup>
            </div>
          </div>
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">Thời gian mua</th>
                <th scope="col">Thời gian vào</th>
                <th scope="col">Thời gian ra</th>
                <th scope="col">Trạng thái</th>
                <th scope="col">Xem</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  11:11:11
                  <br />
                  26/01/2003
                </td>
                <td>
                  11:11:11
                  <br />
                  26/01/2003
                </td>
                <td>
                  11:11:11
                  <br />
                  26/01/2003
                </td>
                <td>Kết thúc</td>
                <td>
                  <a href="#">Xem chi tiết</a>
                </td>
              </tr>
              <tr>
                <td>
                  11:11:11
                  <br />
                  26/01/2003
                </td>
                <td>
                  11:11:11
                  <br />
                  26/01/2003
                </td>
                <td>
                  11:11:11
                  <br />
                  26/01/2003
                </td>
                <td>Kết thúc</td>
                <td>
                  <a href="#">Xem chi tiết</a>
                </td>
              </tr>
              <tr>
                <td>
                  11:11:11
                  <br />
                  26/01/2003
                </td>
                <td>
                  11:11:11
                  <br />
                  26/01/2003
                </td>
                <td>
                  11:11:11
                  <br />
                  26/01/2003
                </td>
                <td>Kết thúc</td>
                <td>
                  <a href="#">Xem chi tiết</a>
                </td>
              </tr>
              <tr>
                <td>
                  11:11:11
                  <br />
                  26/01/2003
                </td>
                <td>
                  11:11:11
                  <br />
                  26/01/2003
                </td>
                <td>
                  11:11:11
                  <br />
                  26/01/2003
                </td>
                <td>Kết thúc</td>
                <td>
                  <a href="#">Xem chi tiết</a>
                </td>
              </tr>
              <tr>
                <td>
                  11:11:11
                  <br />
                  26/01/2003
                </td>
                <td>
                  11:11:11
                  <br />
                  26/01/2003
                </td>
                <td>
                  11:11:11
                  <br />
                  26/01/2003
                </td>
                <td>Kết thúc</td>
                <td>
                  <a href="#">Xem chi tiết</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default HistoryBuyCode;
