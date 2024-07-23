import { useEffect, useRef, useState } from "react";
import Header from "../components/header/header";
import { formatMoney } from "../helper/number";
import LoadingShop from "../components/loading/loading-shop";
import { formatSeconds } from "../helper/time";
import { buyCode } from "../helper/convert-error";
import api from "../config/axiosConfig";

function Shop() {
  const [shop, setShop] = useState([]);
  const [renderOK, setRenderOK] = useState(false);
  const calling = useRef(false);
  const buyTicket = async (e) => {
    if (!calling.current) {
      calling.current = true;
      const qrCategory = e.target.getAttribute("id");
      if (!qrCategory.trim()) {
        window.toastError("Lỗi lấy mã vé");
        return;
      }
      window.toastInfo("Đang tiến hành mua");
      try {
        const response = await api.post("/customer/code/buy", { qrCategory });

        if (response.status === 201) {
          window.toastSuccess("Mua vé thành công");
          window.diffRemaining(response.data.data.price);
        } else {
          let message = buyCode[response.data.message] || "Lỗi không xác định";
          window.toastError(message);
        }
      } catch (err) {
        console.log(err);
        window.toastError("Có lỗi xảy ra");
      } finally {
        calling.current = false;
      }
    }
  };

  useEffect(() => {
    const renderShop = (data) => {
      if (!Array.isArray(data)) {
        throw new Error("data not array");
      }

      const items = [];
      data.map((element, index) =>
        items.push(
          <div className="col-lg-3 item" key={index}>
            <img src="/img/ticket.png" alt="ticket" />
            <div className="info-ticket">
              <p className="id-ticket">Mã vé: {element.qrCategory}</p>
              <p className="price">
                Giá vé: {formatMoney(element.price)}
                <sup>đ</sup>
              </p>
              <p>Giá trị sử dụng: 1 lần</p>
              <p>Tự động huỷ: {formatSeconds(element.maxAge)}</p>
              <button
                className="btn btn-success"
                id={element.qrCategory}
                onClick={buyTicket}
              >
                Mua ngay
              </button>
            </div>
          </div>
        )
      );

      setShop(items);
    };
    const getShop = async () => {
      try {
        const response = await api.get("/customer/shop-qr/all");

        if (response.status === 200) {
          renderShop(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching shop data:", error);
      } finally {
        setRenderOK(true);
      }
    };

    getShop();
  }, []);
  return (
    <div>
      <Header />
      <div className="margin-distance">
        <h3 className="name">Cửa hàng</h3>
        <div className="content-shop container " id="shop">
          {!renderOK ? (
            <LoadingShop quantity={5} />
          ) : (
            <div className="row">{shop}</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Shop;
