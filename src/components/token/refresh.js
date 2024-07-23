import { useEffect } from "react";
import { getCookie } from "../../helper/cookie";
import key from "../../config/key";
import api from "../../config/axiosConfig";
import { setSession } from "../../helper/sessionStorage";
import { setNextRefresh } from "../../helper/token";

const patchNoCall = ["/login"];

function RefreshToken() {
  const refresh = async () => {
    const nextRefesh = getCookie(key.refesh_token);
    if (
      nextRefesh &&
      new Date().getTime() > parseInt(nextRefesh, 10) - 2 * 60 * 1000 &&
      !patchNoCall.includes(window.location.pathname)
    ) {
      try {
        const response = await api.get("/customer/refresh");
        if (response.status === 200) {
          setSession(
            key.access_token,
            response.data.data.access_token,
            response.data.data.expires_in
          );
          setNextRefresh(response.data.data.expires_in);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    const intervalId = setInterval(() => {
      refresh();
    }, 60 * 1000);
    return () => clearInterval(intervalId);
  }, []);
}

export default RefreshToken;
