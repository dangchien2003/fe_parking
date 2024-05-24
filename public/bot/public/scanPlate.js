$("#action-cam-in").click(() => {
  if (openCamIn) {
    openCamIn = false;
    closeVideo(videoIn);
  } else {
    openCamIn = true;
    camera(camInId, videoIn);
  }
});

$("#action-cam-out").click(() => {
  if (openCamOut) {
    openCamOut = false;
    closeVideo(videoOut);
  } else {
    openCamOut = true;
    camera(camOutId, videoOut);
  }
});

getListCam();
function getListCam() {
  if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
    navigator.mediaDevices
      .enumerateDevices()
      .then(function (devices) {
        // Lọc ra các thiết bị video
        var videoDevices = devices.filter(function (device) {
          return device.kind === "videoinput";
        });
        genarateSelectCam(videoDevices);
      })
      .catch(function (err) {
        console.error("Lỗi khi liệt kê các thiết bị video: ", err);
      });
  }
}

function genarateSelectCam(cams) {
  let selectCamIn = $("#select-cam-in");
  let selectCamOut = $("#select-cam-out");
  cams.forEach(function (cam) {
    let option = $("<option></option>")
      .attr("value", cam.deviceId)
      .text(cam.label);
    option.value = cam.deviceId;
    option.text = cam.label;
    selectCamOut.append(option.clone());
    selectCamIn.append(option);
  });
}

$("#select-cam-in").on("change", () => {
  camInId = $("#select-cam-in").val();
  console.log(camInId);
  camera(camInId, videoIn);
  openCamIn = true;
});

$("#select-cam-out").on("change", () => {
  camOutId = $("#select-cam-out").val();
  camera(camOutId, videoOut);
  openCamOut = true;
});

function camera(camId, video) {
  const constraints = {
    video: {
      facingMode: "user",
      flipHorizontal: true,
      deviceId: { exact: camId },
    },
  };
  navigator.mediaDevices
    .getUserMedia(constraints)
    .then((stream) => {
      video.srcObject = stream;
      video.onloadedmetadata = () => {
        video.play();
      };
      mediaStream = stream; // Lưu trữ luồng video
      console.log("Kết nối với camera thành công.");
    })
    .catch((error) => {
      console.error("Không thể kết nối camera", error);
    });
}

function closeVideo(video) {
  if (video.srcObject) {
    const tracks = video.srcObject.getVideoTracks(); // Lấy danh sách các track video của luồng media
    tracks.forEach((track) => {
      track.stop(); // Dừng mọi track video
    });
    video.srcObject = null; // Xóa đối tượng nguồn của video
    console.log("Ngắt kết nối với camera.");
  } else {
    console.log("Không có kết nối camera nào đang chạy.");
  }
}
function takeSnapshot(video, canvas) {
  const context = canvas.getContext("2d");
  canvas.width = 1280;
  canvas.height = 720;
  context.drawImage(video, 0, 0, canvas.width, canvas.height);

  const imgData = canvas.toDataURL("image/png");

  const img = new Image();
  img.src = imgData;

  img.onload = function () {
    context.clearRect(0, 0, canvas.width, canvas.height); // Xóa canvas để vẽ lại hình ảnh

    // // Lật hình ảnh theo chiều ngang (hoặc dọc) trước khi vẽ lại lên canvas
    // context.translate(canvas.width, 0);
    // context.scale(-1, 1); // Lật theo chiều ngang

    context.drawImage(img, 0, 0, canvas.width, canvas.height); // Vẽ hình ảnh đã được lật lên canvas

    // Đoạn code còn lại tương tự như trước để hiển thị ảnh trong một phần tử khác
    canvas.toBlob(function (blob) {
      const imgUrl = URL.createObjectURL(blob);
      const imgElement = new Image();
      imgElement.src = imgUrl;
      canvas.appendChild(imgElement);
    });
  };

  canvas.innerHTML = "";
  canvas.appendChild(img);
}

// Chuyển base64 thành Blob
function base64ToBlob(base64String) {
  const byteString = atob(base64String.split(",")[1]);
  const mimeString = base64String.split(",")[0].split(":")[1].split(";")[0];
  const arrayBuffer = new ArrayBuffer(byteString.length);
  const uintArray = new Uint8Array(arrayBuffer);

  for (let i = 0; i < byteString.length; i++) {
    uintArray[i] = byteString.charCodeAt(i);
  }

  return new Blob([arrayBuffer], { type: mimeString });
}

function getFormData(canvas, qr) {
  // Lấy dữ liệu ảnh từ canvas dưới dạng base64
  const base64String = canvas.toDataURL("image/png");

  // Chuyển base64 thành File
  const file = blobToFile(base64ToBlob(base64String), "image.png");

  // Giả lập sử dụng input file để upload ảnh
  const formData = new FormData();
  formData.append("image", file);
  formData.append("qr", qr);
  return formData;
}

// Chuyển Blob thành File
function blobToFile(blob, fileName) {
  const file = new File([blob], fileName, { type: blob.type });
  return file;
}

document.getElementById("video-in").addEventListener("click", (event) => {
  scanPlateIn();
});

async function scanPlateIn(qr) {
  takeSnapshot(videoIn, canvasIn);
  const formData = getFormData(canvasIn, qr);
  callRequestIn(formData);
}
function scanPlateOut(qr) {
  takeSnapshot(videoOut, canvasOut);
  const formData = getFormData(canvasOut, qr);
  callRequestOut(formData);
}

function convertFLoat(number) {
  let integerPart = Math.floor(number); // Lấy phần nguyên
  let decimalPart = (number - integerPart).toFixed(2); // Lấy 2 chữ số sau dấu chấm
  let result = integerPart + parseFloat(decimalPart);
  return result;
}

function printPlate(data, tagMessage, tagStatus) {
  text = data.plate;
  let color = "green";
  if (data.error) {
    color = "red";
    text = data.message;
  }
  tagMessage.html(
    `<span style="color: ${color}">${text}</span> - ${convertFLoat(data.time)}s`
  );
  tagStatus.css("background-color", color);
}

function showMessageIn(data) {
  printPlate(data, tagMessageIn, statusIn);
  reStartScan(resultQrIn, html5QrCodeIn);
  scanningIn = false;
}

function showMessageOut(data) {
  printPlate(data, tagMessageOut, statusOut);
  reStartScan(resultQrOut, html5QrCodeOut);
  scanningOut = false;
}

function callRequestIn(formData) {
  // reset status
  statusIn.css("background", "transparent");
  // Gửi dữ liệu formData đến server
  fetch("https://doc-bien-so.onrender.com/read-text", {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      showMessageIn(data);
    })
    .catch((error) => {
      // console.error("Lỗi gọi server:" + error);
      // statusIn.css("background", "transparent");
      // const data = {
      //   message: "Lỗi gọi server",
      //   error: true,
      // };
      // showMessageIn(data);
    });
}

function callRequestOut(formData) {
  // reset status
  statusOut.css("background", "transparent");
  // Gửi dữ liệu formData đến server
  fetch("http://localhost:5000/read-text", {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      showMessageOut(data);
    })
    .catch((error) => {
      console.error("Lỗi gọi server:", error);
      statusOut.css("background", "transparent");
      const data = {
        message: "Lỗi gọi server",
        error: true,
      };
      showMessageOut(data);
    });
}

// lấy ảnh từ input file
document.getElementById("image-in").addEventListener("input", function (event) {
  var file = event.target.files[0];
  // Kiểm tra nếu file là ảnh
  if (file && file.type.match("image.*")) {
    var reader = new FileReader();

    reader.onload = function (readerEvent) {
      var img = new Image();

      img.onload = function () {
        // Đặt kích thước của canvas theo kích thước ảnh
        canvasIn.width = img.width;
        canvasIn.height = img.height;
        const ctx = canvasIn.getContext("2d");
        // Vẽ ảnh lên canvas
        ctx.drawImage(img, 0, 0);

        // Có thể thực hiện các thao tác khác với ảnh tại đây
      };

      img.src = readerEvent.target.result;
    };

    reader.readAsDataURL(file);
  }
});

document
  .getElementById("image-out")
  .addEventListener("input", function (event) {
    var file = event.target.files[0];
    // Kiểm tra nếu file là ảnh
    if (file && file.type.match("image.*")) {
      var reader = new FileReader();

      reader.onload = function (readerEvent) {
        var img = new Image();

        img.onload = function () {
          // Đặt kích thước của canvas theo kích thước ảnh
          canvasOut.width = img.width;
          canvasOut.height = img.height;
          const ctx = canvasOut.getContext("2d");
          // Vẽ ảnh lên canvas
          ctx.drawImage(img, 0, 0);

          // Có thể thực hiện các thao tác khác với ảnh tại đây
        };

        img.src = readerEvent.target.result;
      };

      reader.readAsDataURL(file);
    }
  });
