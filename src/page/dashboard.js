import { useEffect } from "react";
import Header from "../components/header";

function Dashboard() {
  return (
    <div>
      <Header />
      <div className="dashboard">
        <div className="row">
          <h3 className="name">DASHBOARD</h3>
          <div className="col-lg-6">
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
                    <div className="col">Số lượng: 12</div>
                    <div className="col text-end">
                      Tổng chi: 120.000<sup>đ</sup>
                    </div>
                  </div>
                  <table class="table table-hover">
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
                        <td>11:11:11 26/01/2003</td>
                        <td>11:11:11 26/01/2003</td>
                        <td>11:11:11 26/01/2003</td>
                        <td>Kết thúc</td>
                        <td>
                          <a href="#">Xem chi tiết</a>
                        </td>
                      </tr>
                      <tr>
                        <td>11:11:11 26/01/2003</td>
                        <td>11:11:11 26/01/2003</td>
                        <td>11:11:11 26/01/2003</td>
                        <td>Kết thúc</td>
                        <td>
                          <a href="#">Xem chi tiết</a>
                        </td>
                      </tr>
                      <tr>
                        <td>11:11:11 26/01/2003</td>
                        <td>11:11:11 26/01/2003</td>
                        <td>11:11:11 26/01/2003</td>
                        <td>Kết thúc</td>
                        <td>
                          <a href="#">Xem chi tiết</a>
                        </td>
                      </tr>
                      <tr>
                        <td>11:11:11 26/01/2003</td>
                        <td>11:11:11 26/01/2003</td>
                        <td>11:11:11 26/01/2003</td>
                        <td>Kết thúc</td>
                        <td>
                          <a href="#">Xem chi tiết</a>
                        </td>
                      </tr>
                      <tr>
                        <td>11:11:11 26/01/2003</td>
                        <td>11:11:11 26/01/2003</td>
                        <td>11:11:11 26/01/2003</td>
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
          </div>
          <div className="col-lg-6">
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
                    <div className="col">Lần nạp: 10</div>
                    <div className="col text-end">
                      Số dư: 120.000<sup>đ</sup>
                    </div>
                  </div>
                  <table class="table table-hover">
                    <thead>
                      <tr>
                        <th scope="col">Thời gian nạp</th>
                        <th scope="col">Số tiền nạp</th>
                        <th scope="col">Trạng thái</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>11:11:11 27/01/2003</td>
                        <td>
                          20.000<sup>đ</sup>
                        </td>
                        <td>OK</td>
                      </tr>
                      <tr>
                        <td>11:11:11 27/01/2003</td>
                        <td>
                          20.000<sup>đ</sup>
                        </td>
                        <td>OK</td>
                      </tr>
                      <tr>
                        <td>11:11:11 27/01/2003</td>
                        <td>
                          20.000<sup>đ</sup>
                        </td>
                        <td>OK</td>
                      </tr>
                      <tr>
                        <td>11:11:11 27/01/2003</td>
                        <td>
                          20.000<sup>đ</sup>
                        </td>
                        <td>OK</td>
                      </tr>
                      <tr>
                        <td>11:11:11 27/01/2003</td>
                        <td>
                          20.000<sup>đ</sup>
                        </td>
                        <td>OK</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
