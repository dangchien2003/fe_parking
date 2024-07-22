import axios from "axios";
import { getItem } from "../helper/sessionStorage";

async function authen() {
  const hostBe = process.env.REACT_APP_BE;
  try {
    const response = await axios.post(
      `${hostBe}/api/customer/authentication`,
      null,
      {
        withCredentials: true,
        headers: {
          Authorization: getItem("CToken"),
        },
      }
    );

    if (!response.data || response.data.status !== 200) {
      window.location.href = `/login`;
    }
  } catch (error) {
    window.location.href = `/login`;
  }
}
export default authen;
