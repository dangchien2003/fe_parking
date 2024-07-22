import axios from "axios";
import { getItem } from "./sessionStorage";

async function callRemaining() {
  const hostBE = process.env.REACT_APP_BE;
  try {
    const response = await axios.get(`${hostBE}/api/customer/cash/remaining`, {
      withCredentials: true,
      headers: {
        Authorization: getItem("CToken"),
      },
    });

    if (response.status === 200) {
      document.cookie = `remaining=${response.data.data.remaining}; max-age=3600; path=/`;
      return response.data.data.remaining;
    }
  } catch (error) {
    console.log("error call " + error);
    return 0;
  }
}

export { callRemaining };
