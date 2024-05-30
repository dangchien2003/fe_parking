function renderNewQr(canvas, parent) {
  console.log(1);
  const ctx = canvas.getContext("2d");
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

  const size = 20;

  const newCanvas = document.createElement("canvas");
  newCanvas.setAttribute("id", "qr-code");

  newCanvas.width = canvas.width + size * 2;
  newCanvas.height = canvas.height + size * 2;
  const newCtx = newCanvas.getContext("2d");

  // Vẽ viền trắng
  newCtx.fillStyle = "white";
  newCtx.fillRect(0, 0, newCanvas.width, newCanvas.height);

  // Vẽ mã QR lên canvas mới
  newCtx.putImageData(imageData, size, size);

  // Thay thế canvas cũ bằng canvas mới
  canvas.parentNode.replaceChild(newCanvas, canvas);
}

export { renderNewQr };
