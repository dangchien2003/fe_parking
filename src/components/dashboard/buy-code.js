import { useState, useEffect } from "react";
import { formatMoney } from "../../helper/number";
import RenderListBougthQr from "./render-list-bougth-qr";
import LoadingLineRun from "../loading/loading-line-run";
import { getNowTimestamp } from "../../helper/time";

function HistoryBuyCode() {
  const [quantityBought, setQuantityBought] = useState(0);

  const [totalInvested, setTotalInvested] = useState(formatMoney(0));

  const [loaded, setLoaded] = useState(false);

  const [history, setHistory] = useState([]);

  useEffect(() => {
    const loadQuantityBought = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BE}/customer/code/bought?quantity=10`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (response.ok) {
          const dataRes = await response.json();
          if (dataRes.success) {
            setHistory(dataRes.data);
            setQuantityBought(dataRes.data.length);
          }
          setLoaded(true);
        }
      } catch (error) {
        setLoaded(true);
      }
    };
    loadQuantityBought();
  }, []);

  useEffect(() => {
    if (loaded === true) {
      let calculaterTotalSpent = 0;
      const now = getNowTimestamp();

      history.map((element) => {
        if (
          !(
            element.cancleAt !== null ||
            (element.expireAt < now &&
              element.checkinAt === null &&
              element.checkoutAt === null)
          )
        ) {
          calculaterTotalSpent += element.price;
        }
      });

      if (history.length > 0) {
        setTotalInvested(formatMoney(calculaterTotalSpent));
      }
    }
  }, [loaded]);

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
