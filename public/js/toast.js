function toasts({
  title = "Cảnh báo",
  message = "Thận trọng với những gì bạn đang thực hiện",
  type = "error",
}) {
  var main = document.getElementById("toast");
  const icon = {
    success: '<i class="fa-solid fa-circle-check"></i>',
    error: '<i class="fa-solid fa-triangle-exclamation"></i>',
    info: ' <i class="fa-solid fa-circle-exclamation"></i>',
  };

  if (main) {
    const toast = document.createElement("div");
    toast.classList.add("notification", `${type}`);
    var autoClear = setTimeout(function () {
      main.removeChild(toast);
    }, 3500);
    toast.addEventListener("click", function (e) {
      if (e.target.closest(".close")) {
        main.removeChild(toast);
        clearTimeout(autoClear);
      }
    });
    toast.innerHTML = `
        <div class="icon">
            ${icon[`${type}`]}
        </div>
        <div class="noti">
            <div class="title">
                <span>${title}</span>
            </div>
            <div class="message">
                <span>${message}</span>
            </div>
        </div>
        <div class="close" >
            <i class="fa-solid fa-xmark"></i>
        </div>
        `;
    main.appendChild(toast);
  }
}

function toastSuccess(message) {
  toasts({
    title: "Thành công",
    message,
    type: "success",
  });
}

function toastError(message) {
  toasts({
    title: "Lỗi",
    message,
    type: "error",
  });
}

function toastInfo(message) {
  toasts({
    title: "Thông báo",
    message,
    type: "info",
  });
}
