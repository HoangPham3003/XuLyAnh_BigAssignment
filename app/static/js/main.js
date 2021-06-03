function loadFile(event) {
  let blob = new Blob([event.target.files[0]], { type: "image/jpeg" });
  let fname = event.target.files[0].name;
  process(blob, fname);
}

function process(blob, fname, isDrop) {
  const image = document.getElementById("showUploadImage");
  const upload = document.getElementById("myUploadImage");
  const result = document.getElementById("result");
  let srcBlobImg = URL.createObjectURL(blob);
  image.src = srcBlobImg;
  upload.addEventListener("input", function () {
    original.classList.add("tab-active");
    new_hsv.classList.remove("tab-active");
    hsv.classList.remove("tab-active");
    detection.classList.remove("tab-active");
    gray.classList.remove("tab-active");
    new_detection.classList.remove("tab-active");
    new_gray.classList.remove("tab-active");
  });
  result.style.display = "block";

  const original = document.getElementById("original");
  const gray = document.getElementById("gray");
  const hsv = document.getElementById("hsv");
  const detection = document.getElementById("detection");

  var $ = jQuery;
  // =================================================================================================================
  // Rgb
  // =================================================================================================================
  original.addEventListener("click", function (event) {
    original.classList.add("tab-active");
    new_hsv.classList.remove("tab-active");
    new_detection.classList.remove("tab-active");
    new_gray.classList.remove("tab-active");
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
  if (isDrop) {
    original.classList.add("tab-active");
    new_hsv.classList.remove("tab-active");
    hsv.classList.remove("tab-active");
    detection.classList.remove("tab-active");
    gray.classList.remove("tab-active");
    new_detection.classList.remove("tab-active");
    new_gray.classList.remove("tab-active");
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
    let link = e.dataTransfer.getData("text/html");
    let dropContext = $("<div>").append(link);
    let imgURL = $(dropContext).find("img").attr("src");
    if (imgURL) {
      fetch(imgURL)
        .then((res) => res.blob())
        .then((blob) => {
          let index = imgURL.lastIndexOf("/") + 1;
          let filename = imgURL.substr(index);
          process(blob, filename, true);
        });
    } else {
      let blob = new Blob([e.dataTransfer.files[0]], { type: "image/jpeg" });
      let fname = e.dataTransfer.files[0].name;
      process(blob, fname, true);
    }
  };
});
