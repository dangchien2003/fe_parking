import axios from "axios";
import { useEffect, useState } from "react";

function RenderAddress({ botId }) {
  const [address, setAddress] = useState("");
  useEffect(() => {
    if (!botId) return;
    axios
      .get(`${process.env.REACT_APP_BE}/customer/bot/i?bot=${botId}`, {
        withCredentials: true,
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
