async function callRemaining() {
  const hostBE = process.env.REACT_APP_BE;
  try {
    const response = await fetch(`${hostBE}/customer/cash/remaining`, {
      method: "GET",
      credentials: "include",
    });
    const dataRes = await response.json();
    if (dataRes.success === true) {
      document.cookie = `remaining=${dataRes.data.remaining};3600;Path=/`;
      return dataRes.data.remaining;
    }
  } catch (error) {
    console.log("error call " + error);
    return 0;
  }
}

export { callRemaining };
