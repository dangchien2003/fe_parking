<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="../public/bootstrap.min.css">
    <link rel="stylesheet" href="../public/style.css">
    <script src="../public/bootstrap.min.js"></script>
    <script src="../public/jquery.js"></script>
    <script src="../public/html5-qrcode.min.js"></script>
</head>

<body>
    <div class="row">
        <div class="col-lg-6" id="in">
            <h3 class="text-center">Vào bãi</h3>
            <div class="row">
                <div class="col-lg-5">
                    <h4 class="text-center">Biển số</h4>
                    <video id="video-in" class="plate"></video>
                    <div class="row">
                        <select id="select-cam-in">
                            <option value="">Chọn cam</option>
                        </select>
                        <button id="action-cam-in">open/close</button>
                    </div>
                </div>
                <div class="col-lg-5">
                    <h4 class="text-center">QR</h4>
                    <div id="reader-in" class="qr"></div>
                </div>
                <div class="col-lg-2" style="margin: 0 auto">
                    <div class="status" id="status-in"></div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-5">
                    <h5 class="text-center">Biển vào</h5>
                    <canvas id="canvas-in" class="plate"></canvas>
                    <div id="bienso-in"></div>
                    <input type="file" name="image" id="image-in">
                    <div id="result-in"></div>
                </div>
            </div>
            <div class="row">
                <div class="message-in"></div>
            </div>
        </div>
        <div class="col-lg-6" id="out">
            <h3 class="text-center">Ra bãi</h3>
            <div class="row">
                <div class="col-lg-5">
                    <h4 class="text-center">Biển số</h4>
                    <video id="video-out" class="plate"></video>
                    <div class="row">
                        <select id="select-cam-out">
                            <option value="">Chọn cam</option>
                        </select>
                        <button id="action-cam-out">open/close</button>
                    </div>
                </div>
                <div class="col-lg-5">
                    <h4 class="text-center">QR</h4>
                    <div id="reader-out" class="qr"></div>
                </div>
                <div class="col-lg-2" style="margin: 0 auto">
                    <div class="status" id="status-out"></div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-5">
                    <h5 class="text-center">Biển ra</h5>
                    <canvas id="canvas-out" class="plate"></canvas>
                    <div id="bienso-out"></div>
                    <input type="file" name="image" id="image-out">
                    <div id="result-out"></div>
                </div>
                <div class="col-lg-5">
                    <h5 class="text-center">Biển vào</h5>
                    <canvas id="canvas-out" class="plate"></canvas>
                </div>
            </div>
            <div class="row">
                <div class="message-out"></div>
            </div>
        </div>
    </div>
    <script src="../public/scanPlate.js"></script>
    <script src="../public/scanQr.js"></script>
    <script src="../public/index.js"></script>
</body>

</html>