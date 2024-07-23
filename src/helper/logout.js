import key from "../config/key";
import { delCookie } from "./cookie";
import { removeSession } from "./sessionStorage";

function handleLogout() {
  removeSession(key.access_token);
  delCookie(key.refesh_token);
}

export { handleLogout };
