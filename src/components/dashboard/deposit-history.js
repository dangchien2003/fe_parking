import { useState, useEffect } from "react";
import { formatMoney } from "../../helper/number";
import RenderReposit from "./render-list-deposit";
import LoadingLineRun from "../loading/loading-line-run";
import axios from "axios";
import { getCustomerAuthorization } from "../../helper/authorization";
import api from "../../config/axiosConfig";
function HistoryDeposit() {
  const [history, setHistory] = useState([]);
  const [loaded, setLoading] = useState(false);
  const [totalDeposited, setTotalDeposited] = useState(formatMoney(0));
  useEffect(() => {
    const callHistory = async () => {
      try {
        const response = await api.get("/customer/cash/all");

        if (response.status === 200) {
          setHistory(response.data.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(true);
      }
    };

    callHistory();
  }, []);

  useEffect(() => {
    const total = history
      .filter(
        (element) =>
          element.acceptAt !== null &&
          element.cancleAt === null &&
          element.recashAt === null
      )
      .map((element) => element.money)
      .reduce((total, money) => total + money, 0);
    setTotalDeposited(formatMoney(total));
  }, [history]);

  return (
    <div className="d-flex justify-content-center tk ">
      <div className="row w-100 ">
        <div className="col">
          <h5>Thống kê nạp tiền</h5>
        </div>
        <div className="col text-end">
          <a href="#">Xem tất cả</a>
        </div>
        <div>
          <div className="row w-100">
            <div className="col">Lần nạp: {history.length}</div>
            <div className="col text-end">
              Đã nạp: {totalDeposited}
              <sup>đ</sup>
            </div>
          </div>
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">Thời gian nạp</th>
                <th scope="col">Số tiền nạp</th>
                <th scope="col">Trạng thái</th>
              </tr>
            </thead>
            {loaded ? <RenderReposit list={history} /> : <LoadingLineRun />}
          </table>
        </div>
      </div>
    </div>
  );
}

export default HistoryDeposit;
