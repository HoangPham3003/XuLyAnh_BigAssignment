function loadFile(event) {
	// Show uploaded image
	var image = document.getElementById('showUploadImage');
	var blob = new Blob([event.target.files[0]], {type: 'image/jpeg'});
	var fname = event.target.files[0].name;
	srcBlobImg = URL.createObjectURL(blob);
	image.src = srcBlobImg;
    image.style.display = "block";

    var $ = jQuery

	// =================================================================================================================
	// Rgb To Gray
	// =================================================================================================================
    var buttonEvent = document.getElementById("buttonEvent");
	var btRgbToGray = document.createElement('a');
	btRgbToGray.href = '#';
	btRgbToGray.innerHTML = "RBG To Gray";
	btRgbToGray.addEventListener("click", function (event){
		var data = new FormData();
		data.append("Img_RGB_To_Gray", blob, fname);
		$.ajax({
			url: '/',
			type: 'POST',
			processData: false,
			contentType: false,
			data: data,
			success: (ret) => {
				var srcNewImg = ret.data;
				$('#result').html('<img src="' + srcNewImg + '"/>');
			}
		})
	})
	// =================================================================================================================
	// =================================================================================================================
	buttonEvent.appendChild(btRgbToGray)
}
