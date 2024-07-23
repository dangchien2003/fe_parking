import { getSession } from "./sessionStorage";

function getCustomerAuthorization() {
  return `Bearer ${getSession("CToken")}`;
}

export { getCustomerAuthorization };
