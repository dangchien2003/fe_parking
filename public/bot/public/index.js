var openCamIn = false;
var openCamOut = false;
var camInId;
var camOutId;
const tagMessageIn = $("#bienso-in");
const tagMessageOut = $("#bienso-out");
const resultQrIn = $("#result-in");
const resultQrOut = $("#result-out");
const videoIn = document.getElementById("video-in");
const videoOut = document.getElementById("video-out");
const canvasIn = document.getElementById("canvas-in");
const canvasOut = document.getElementById("canvas-out");
const statusIn = $("#status-in");
const statusOut = $("#status-out");
var scanningIn = false;
var scanningOut = false;
$(document).ready(function () {
  startScanQr();
});
