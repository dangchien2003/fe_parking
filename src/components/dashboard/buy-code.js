import { useState, useEffect } from "react";
import { formatMoney } from "../../helper/number";
import RenderListBougthQr from "./render-list-bougth-qr";
import LoadingLineRun from "../loading/loading-line-run";
function HistoryBuyCode() {
  const [quantityBought, setQuantityBought] = useState(0);

  const [totalInvested, setTotalInvested] = useState(formatMoney(0));

  const [loaded, setLoaded] = useState(false);

  const [history, setHistory] = useState([]);

  useEffect(() => {
    // const loadQuantityBought = async () => {
    //   await fetch(`${process.env.BE}/`);
    // };
    setTimeout(() => {
      setHistory([
        {
          buyAt: 1712484956356,
          checkinAt: 1712484956356,
          checkoutAt: null,
        },
      ]);
      setLoaded(true);
    }, 3000);
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
            {loaded ? (
              <RenderListBougthQr list={history} />
            ) : (
              <LoadingLineRun />
            )}
          </table>
        </div>
      </div>
    </div>
  );
}

export default HistoryBuyCode;
