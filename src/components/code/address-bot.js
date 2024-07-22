import axios from "axios";
import { useEffect, useState } from "react";
import { getItem } from "../../helper/sessionStorage";

function RenderAddress({ botId }) {
  const [address, setAddress] = useState("");
  useEffect(() => {
    if (!botId) return;
    axios
      .get(`${process.env.REACT_APP_BE}/api/customer/bot/i`, {
        withCredentials: true,
        params: {
          bot: botId,
        },
        headers: {
          Authorization: getItem("CToken"),
        },
      })
      .then((response) => {
        setAddress(response.data.data.bot.address);
      })
      .catch((error) => {
        console.log(error);
        setAddress("Có lỗi xảy ra");
        return;
      });
  }, []);
  return (
    <div>
      <span>Địa điểm: </span>
      <span>{address}</span>
    </div>
  );
}
export default RenderAddress;
