async function authen() {
  const hostBe = process.env.REACT_APP_BE;
  try {
    const response = await fetch(`${hostBe}/customer/authentication`, {
      method: "POST",
      credentials: "include",
    });

    const dataRes = await response.json();
    if (!dataRes || dataRes.status !== 200) {
      window.location.href = `/login`;
    }
  } catch (error) {
    window.location.href = `/login`;
  }
}
export default authen;
