async function authen() {
  const hostBe = process.env.REACT_APP_BE;
  const myHost = process.env.REACT_APP_HOST;
  try {
    const response = await fetch(`${hostBe}/authentication`, {
      method: "POST",
      credentials: "include",
      headers: {
        contentType: "application/json",
      },
    });

    const dataRes = await response.json();

    if (!dataRes || dataRes.success !== true) {
      window.location.href = `${myHost}/login`;
    }
  } catch (error) {
    window.location.href = `${myHost}/login`;
  }
}
export default authen;
