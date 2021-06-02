function loadFile(event) {
  let blob = new Blob([event.target.files[0]], { type: "image/jpeg" });
  let fname = event.target.files[0].name;
  process(blob, fname);
}

function process(blob, fname) {
  const image = document.getElementById("showUploadImage");
  const upload = document.getElementById("myUploadImage");
  const result = document.getElementById("result");
  let srcBlobImg = URL.createObjectURL(blob);
  image.src = srcBlobImg;
  upload.addEventListener("input", function () {
    original.classList.add("tab-active");
    hsv.classList.remove("tab-active");
    detection.classList.remove("tab-active");
    gray.classList.remove("tab-active");
  });
  result.style.display = "block";

  var $ = jQuery;

  // =================================================================================================================
  // init button
  // =================================================================================================================
  const original = document.getElementById("original");
  const gray = document.getElementById("gray");
  const hsv = document.getElementById("hsv");
  const detection = document.getElementById("detection");
  // =================================================================================================================
  // Rgb
  // =================================================================================================================
  original.addEventListener("click", function (event) {
    original.classList.add("tab-active");
    hsv.classList.remove("tab-active");
    detection.classList.remove("tab-active");
    gray.classList.remove("tab-active");
    image.src = srcBlobImg;
  });
  // =================================================================================================================
  // Rgb To Gray
  // =================================================================================================================
  gray.addEventListener("click", function (event) {
    gray.classList.add("tab-active");
    hsv.classList.remove("tab-active");
    detection.classList.remove("tab-active");
    original.classList.remove("tab-active");
    var data = new FormData();
    data.append("Img_RGB_To_Gray", blob, fname);
    $.ajax({
      url: "/",
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
  hsv.addEventListener("click", function (event) {
    hsv.classList.add("tab-active");
    gray.classList.remove("tab-active");
    detection.classList.remove("tab-active");
    original.classList.remove("tab-active");
    var data = new FormData();
    data.append("Img_RGB_To_HSV", blob, fname);
    $.ajax({
      url: "/",
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
  detection.addEventListener("click", function (event) {
    detection.classList.add("tab-active");
    hsv.classList.remove("tab-active");
    gray.classList.remove("tab-active");
    original.classList.remove("tab-active");
    var data = new FormData();
    data.append("Img_Face_Detection", blob, fname);
    $.ajax({
      url: "/",
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

  dropContainer.ondragover = function (e) {
    e.preventDefault();
    dropContainer.style.border = "3px dashed green";
    return false;
  };

  dropContainer.ondragend = function (e) {
    e.preventDefault();
    dropContainer.style.border = "3px dashed #4e7efe";
    return false;
  };

  dropContainer.ondrop = function (e) {
    e.preventDefault();
    dropContainer.style.border = "3px dashed #4e7efe";
    let blob = new Blob([e.dataTransfer.files[0]], { type: "image/jpeg" });
    let fname = e.dataTransfer.files[0].name;
    process(blob, fname);
  };
});
