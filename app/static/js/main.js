function loadFile(event) {
  let blob = new Blob([event.target.files[0]], { type: "image/jpeg" });
  let fname = event.target.files[0].name;
  process(blob, fname);
}

function process(blob, fname, isDrop) {
  const image = document.getElementById("showUploadImage");
  const upload = document.getElementById("myUploadImage");
  const result = document.getElementById("result");
  const welcome = document.getElementById("welcome");
  const uploadview = document.getElementById("uploadview");
  let srcBlobImg = URL.createObjectURL(blob);
  image.src = srcBlobImg;
  upload.addEventListener("input", function () {
    original.classList.add("tab-active");
    hsv.classList.remove("tab-active");
    detection.classList.remove("tab-active");
    thresholding.classList.remove("tab-active");
    gray.classList.remove("tab-active");
    sobelX.classList.remove("tab-active");
    sobelY.classList.remove("tab-active");
    laplace.classList.remove("tab-active");
    new_hsv.classList.remove("tab-active");
    new_detection.classList.remove("tab-active");
    new_gray.classList.remove("tab-active");
    new_thresholding.classList.remove("tab-active");
    new_sobelX.classList.remove("tab-active");
    new_sobelY.classList.remove("tab-active");
    new_laplace.classList.remove("tab-active");
  });
  result.style.display = "block";
  welcome.style.display = "none";
  uploadview.style.paddingTop = "130px";
  result.scrollIntoView(true);
  let scrolledY = window.scrollY;

  if (scrolledY) {
    window.scroll(0, scrolledY - 130);
  }

  const original = document.getElementById("original");
  const gray = document.getElementById("gray");
  const hsv = document.getElementById("hsv");
  const detection = document.getElementById("detection");
  const thresholding = document.getElementById("thresholding");
  const sobelX = document.getElementById("sobel-x");
  const sobelY = document.getElementById("sobel-y");
  const laplace = document.getElementById("laplace");

  var $ = jQuery;
  // =================================================================================================================
  // Rgb
  // =================================================================================================================
  original.addEventListener("click", function (event) {
    original.classList.add("tab-active");
    new_hsv.classList.remove("tab-active");
    new_detection.classList.remove("tab-active");
    new_gray.classList.remove("tab-active");
    new_thresholding.classList.remove("tab-active");
    new_sobelX.classList.remove("tab-active");
    new_sobelY.classList.remove("tab-active");
    new_laplace.classList.remove("tab-active");
    image.src = srcBlobImg;
    event.preventDefault();
  });
  // =================================================================================================================
  // Rgb To Gray
  // =================================================================================================================
  const new_gray = gray.cloneNode(true);
  gray.parentNode.replaceChild(new_gray, gray);
  new_gray.addEventListener("click", function () {
    new_gray.classList.add("tab-active");
    new_hsv.classList.remove("tab-active");
    new_detection.classList.remove("tab-active");
    original.classList.remove("tab-active");
    new_thresholding.classList.remove("tab-active");
    new_sobelX.classList.remove("tab-active");
    new_sobelY.classList.remove("tab-active");
    new_laplace.classList.remove("tab-active");
    const data = new FormData();
    data.append("file", blob, fname);
    $.ajax({
      url: "/gray",
      type: "POST",
      processData: false,
      contentType: false,
      data: data,
      success: (ret) => {
        var srcNewImg = ret.data;
        $("#showUploadImage").attr("src", srcNewImg);
      },
    });
  });
  // =================================================================================================================
  // Rgb To Hsv
  // =================================================================================================================
  const new_hsv = hsv.cloneNode(true);
  hsv.parentNode.replaceChild(new_hsv, hsv);
  new_hsv.addEventListener("click", function (event) {
    new_hsv.classList.add("tab-active");
    new_gray.classList.remove("tab-active");
    new_detection.classList.remove("tab-active");
    original.classList.remove("tab-active");
    new_thresholding.classList.remove("tab-active");
    new_sobelX.classList.remove("tab-active");
    new_sobelY.classList.remove("tab-active");
    new_laplace.classList.remove("tab-active");
    const data = new FormData();
    data.append("file", blob, fname);
    $.ajax({
      url: "/hsv",
      type: "POST",
      processData: false,
      contentType: false,
      data: data,
      success: (ret) => {
        var srcNewImg = ret.data;
        $("#showUploadImage").attr("src", srcNewImg);
      },
    });
  });
  // =================================================================================================================
  // Rgb Detected
  // =================================================================================================================
  const new_detection = detection.cloneNode(true);
  detection.parentNode.replaceChild(new_detection, detection);
  new_detection.addEventListener("click", function (event) {
    new_detection.classList.add("tab-active");
    new_hsv.classList.remove("tab-active");
    new_gray.classList.remove("tab-active");
    original.classList.remove("tab-active");
    new_thresholding.classList.remove("tab-active");
    new_sobelX.classList.remove("tab-active");
    new_sobelY.classList.remove("tab-active");
    new_laplace.classList.remove("tab-active");
    const data = new FormData();
    data.append("file", blob, fname);
    $.ajax({
      url: "/detection",
      type: "POST",
      processData: false,
      contentType: false,
      data: data,
      success: (ret) => {
        var srcNewImg = ret.data;
        $("#showUploadImage").attr("src", srcNewImg);
      },
    });
  });

  // =================================================================================================================
  // Thresholding
  // =================================================================================================================
  const new_thresholding = thresholding.cloneNode(true);
  thresholding.parentNode.replaceChild(new_thresholding, thresholding);
  new_thresholding.addEventListener("click", function (event) {
    new_thresholding.classList.add("tab-active");
    new_hsv.classList.remove("tab-active");
    new_gray.classList.remove("tab-active");
    new_detection.classList.remove("tab-active");
    original.classList.remove("tab-active");
    new_sobelX.classList.remove("tab-active");
    new_sobelY.classList.remove("tab-active");
    new_laplace.classList.remove("tab-active");
    const data = new FormData();
    data.append("file", blob, fname);
    $.ajax({
      url: "/thresholding",
      type: "POST",
      processData: false,
      contentType: false,
      data: data,
      success: (ret) => {
        var srcNewImg = ret.data;
        $("#showUploadImage").attr("src", srcNewImg);
      },
    });
  });

  // =================================================================================================================
  // Sobel X
  // =================================================================================================================
  const new_sobelX = sobelX.cloneNode(true);
  sobelX.parentNode.replaceChild(new_sobelX, sobelX);
  new_sobelX.addEventListener("click", function (event) {
    new_sobelX.classList.add("tab-active");
    new_hsv.classList.remove("tab-active");
    new_gray.classList.remove("tab-active");
    new_detection.classList.remove("tab-active");
    original.classList.remove("tab-active");
    new_thresholding.classList.remove("tab-active");
    new_sobelY.classList.remove("tab-active");
    new_laplace.classList.remove("tab-active");
    const data = new FormData();
    data.append("file", blob, fname);
    $.ajax({
      url: "/sobelX",
      type: "POST",
      processData: false,
      contentType: false,
      data: data,
      success: (ret) => {
        var srcNewImg = ret.data;
        $("#showUploadImage").attr("src", srcNewImg);
      },
    });
  });

  // =================================================================================================================
  // Sobel Y
  // =================================================================================================================
  const new_sobelY = sobelY.cloneNode(true);
  sobelY.parentNode.replaceChild(new_sobelY, sobelY);
  new_sobelY.addEventListener("click", function (event) {
    new_sobelY.classList.add("tab-active");
    new_hsv.classList.remove("tab-active");
    new_gray.classList.remove("tab-active");
    new_detection.classList.remove("tab-active");
    original.classList.remove("tab-active");
    new_thresholding.classList.remove("tab-active");
    new_sobelX.classList.remove("tab-active");
    new_laplace.classList.remove("tab-active");
    const data = new FormData();
    data.append("file", blob, fname);
    $.ajax({
      url: "/sobelY",
      type: "POST",
      processData: false,
      contentType: false,
      data: data,
      success: (ret) => {
        var srcNewImg = ret.data;
        $("#showUploadImage").attr("src", srcNewImg);
      },
    });
  });

  // =================================================================================================================
  // Laplace
  // =================================================================================================================
  const new_laplace = laplace.cloneNode(true);
  laplace.parentNode.replaceChild(new_laplace, laplace);
  new_laplace.addEventListener("click", function (event) {
    new_laplace.classList.add("tab-active");
    new_hsv.classList.remove("tab-active");
    new_gray.classList.remove("tab-active");
    new_detection.classList.remove("tab-active");
    original.classList.remove("tab-active");
    new_thresholding.classList.remove("tab-active");
    new_sobelX.classList.remove("tab-active");
    new_sobelY.classList.remove("tab-active");
    const data = new FormData();
    data.append("file", blob, fname);
    $.ajax({
      url: "/laplace",
      type: "POST",
      processData: false,
      contentType: false,
      data: data,
      success: (ret) => {
        var srcNewImg = ret.data;
        $("#showUploadImage").attr("src", srcNewImg);
      },
    });
  });

  if (isDrop) {
    original.classList.add("tab-active");
    hsv.classList.remove("tab-active");
    detection.classList.remove("tab-active");
    gray.classList.remove("tab-active");
    thresholding.classList.remove("tab-active");
    sobelX.classList.remove("tab-active");
    sobelY.classList.remove("tab-active");
    new_hsv.classList.remove("tab-active");
    new_detection.classList.remove("tab-active");
    new_gray.classList.remove("tab-active");
    new_thresholding.classList.remove("tab-active");
    new_sobelX.classList.remove("tab-active");
    new_sobelY.classList.remove("tab-active");
    new_laplace.classList.remove("tab-active");
    laplace.classList.remove("tab-active");
  }
}

// download
function downloadImage() {
  const download = document.getElementById("download");
  const image = document.getElementById("showUploadImage");
  download.href = image.src;
  download.click();
}

// drag and drop
$(document).ready(function () {
  const dropContainer = document.getElementById("dropContainer");
  const error = document.getElementById("err");

  dropContainer.ondragover = function (e) {
    e.preventDefault();
    dropContainer.style.border = "3px dashed green";
    return false;
  };

  dropContainer.ondragleave = function (e) {
    e.preventDefault();
    dropContainer.style.border = "3px dashed #4e7efe";
    return false;
  };

  dropContainer.ondrop = function (e) {
    e.preventDefault();
    dropContainer.style.border = "3px dashed #4e7efe";
    let link = e.dataTransfer.getData("text/html");
    let dropContext = $("<div>").append(link);
    let imgURL = $(dropContext).find("img").attr("src");
    if (imgURL) {
      fetch(imgURL)
        .then((res) => res.blob())
        .then((blob) => {
          error.style.display = "none";
          let index = imgURL.lastIndexOf("/") + 1;
          let filename = imgURL.substr(index);
          let allowedName = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
          if (imgURL.includes("base64")) {
            error.innerText = "⚠️ Không thể kéo ảnh này, hãy mở nó ra rồi kéo";
            error.style.display = "block";
            return;
          }
          if (!allowedName.exec(filename)) {
            error.innerText =
              "⚠️ Không thể upload file này, vui lòng upload file khác";
            error.style.display = "block";
            return;
          }
          if (!filename.includes(".")) {
            error.innerText =
              "⚠️ Không thể upload file này, vui lòng upload file khác";
            error.style.display = "block";
            return;
          }
          process(blob, filename, true);
        })
        .catch(() => {
          error.innerText =
            "⚠️ Không thể upload file này, vui lòng upload file khác";
          error.style.display = "block";
        });
    } else {
      const file = e.dataTransfer.files[0];
      const fileType = file["type"];
      const validImageTypes = ["image/gif", "image/jpeg", "image/png"];
      if (!validImageTypes.includes(fileType)) {
        error.innerText =
          "⚠️ Không thể upload file này, vui lòng upload file khác";
        error.style.display = "block";
      } else {
        error.style.display = "none";
        let blob = new Blob([file], { type: "image/jpeg" });
        let fname = file.name;
        process(blob, fname, true);
      }
    }
  };
});
