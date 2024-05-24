var html5QrCodeIn;
var html5QrCodeOut;
var audio = new Audio("./public/scan.mp3");

function startScanQr() {
  html5QrCodeIn = new Html5QrcodeScanner("reader-in", {
    fps: 5,
    qrbox: 250,
  });

  html5QrCodeOut = new Html5QrcodeScanner("reader-out", {
    fps: 5,
    qrbox: 250,
  });

  html5QrCodeIn.render(printResultIn);
  html5QrCodeOut.render(printResultOut);
}

function printResultIn(qr) {
  audio.play();
  if (openCamIn && !scanningIn) {
    scanningIn = true;
    html5QrCodeIn.pause();
    resultQrIn.text(qr);
    scanPlateIn(qr);
  } else {
    alert("Cần mở camera biển số vào");
  }
}
function printResultOut(qr) {
  audio.play();
  if (openCamOut && !scanningOut) {
    scanningOut = true;
    html5QrCodeOut.pause();
    resultQrOut.text(qr);
    scanPlateOut(qr);
  } else {
    alert("Cần mở camera biển số râ");
  }
}

function reStartScan(resultElementJquery, html5QrCode) {
  resultElementJquery.text("");
  html5QrCode.resume();
}
