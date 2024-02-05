// Get necessary elements from HTML
let customFileInput = document.getElementById("custom-file");
let customImage = document.getElementById("custom-image");
let customDownloadButton = document.getElementById("custom-download");
let customAspectRatio = document.querySelectorAll(
  ".custom-aspect-ratio-button"
);
const customPreviewButton = document.getElementById("custom-preview");
const customPreviewImage = document.getElementById("custom-preview-image");
const customOptions = document.querySelector(".custom-options");
const customWidthInput = document.getElementById("custom-width-input");
const customHeightInput = document.getElementById("custom-height-input");
let customCropper = "";
let customFileName = "";

// Function triggered when file selector changes
customFileInput.onchange = () => {
  customPreviewImage.src = "";
  customHeightInput.value = 0;
  customWidthInput.value = 0;
  customDownloadButton.classList.add("custom-hide");

  // Read the file using FileReader and add to preview
  let customReader = new FileReader();
  customReader.readAsDataURL(customFileInput.files[0]);

  // Function to execute after file is read
  customReader.onload = () => {
    customImage.setAttribute("src", customReader.result);
    if (customCropper) {
      customCropper.destroy();
    }
    // Create new Cropper object
    customCropper = new Cropper(customImage);
    // Show options and preview button
    customOptions.classList.remove("custom-hide");
    customPreviewButton.classList.remove("custom-hide");
  };
  // Store the file name
  customFileName = customFileInput.files[0].name.split(".")[0];
};
// Update settings when aspect ratio buttons are clicked
customAspectRatio.forEach((element) => {
  element.addEventListener("click", () => {
    if (element.innerText == "Free") {
      customCropper.setAspectRatio(NaN);
    } else {
      customCropper.setAspectRatio(eval(element.innerText.replace(":", "/")));
    }
  });
});
// Function triggered when height input changes
customHeightInput.addEventListener("input", () => {
  const { height } = customCropper.getImageData();
  if (parseInt(customHeightInput.value) > Math.round(height)) {
    customHeightInput.value = Math.round(height);
  }
  let newHeight = parseInt(customHeightInput.value);
  customCropper.setCropBoxData({ height: newHeight });
});

// Function triggered when width input changes
customWidthInput.addEventListener("input", () => {
  const { width } = customCropper.getImageData();
  if (parseInt(customWidthInput.value) > Math.round(width)) {
    customWidthInput.value = Math.round(width);
  }
  let newWidth = parseInt(customWidthInput.value);
  customCropper.setCropBoxData({ width: newWidth });
});

// Function triggered when preview button is clicked
customPreviewButton.addEventListener("click", (e) => {
  e.preventDefault();
  customDownloadButton.classList.remove("custom-hide");
  let imgSrc = customCropper.getCroppedCanvas({}).toDataURL();
  customPreviewImage.src = imgSrc;
  customDownloadButton.download = `cropped_${customFileName}.png`;
  customDownloadButton.setAttribute("href", imgSrc);
});

// Hide hidden fields when the window is loaded
window.onload = () => {
  customDownload.classList.add("custom-hide");
  customOptions.classList.add("custom-hide");
  customPreviewButton.classList.add("custom-hide");
};