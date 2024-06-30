// getting the filepicker, choose image button and the chosen image element
const filePicker = document.querySelector(".file-picker"),
  chooseImageBtn = document.querySelector("#selectImg"),
  chosenImg = document.querySelector("#chosenImg");

// getting all the filter buttons and transform buttons ; slider, option text holders

const filterOptions = document.querySelectorAll(".filters>button");
const transformOptions = document.querySelectorAll(".transform-options>button");
const slider = document.querySelector(".slider");
const sliderVal = document.querySelector(".filterVal");
const sliderText = document.querySelector(".filterOption");

//getting the select filter button, the cross icon and the right filters div
// The select filter button and the cross-icon is only visible at smaller screen sizes (in mobiles specially)
const selectFilterBtn = document.querySelector(".select-filter-btn");
const crossBtn = document.querySelector(".cross-icon");
const rightFilters = document.querySelector(".right-filters");

// for mobile-screens only
selectFilterBtn.addEventListener("click", () => {
  rightFilters.classList.toggle("display-f");
});
crossBtn.addEventListener("click", () => {
  rightFilters.classList.toggle("display-f");
});

window.addEventListener("resize", () => {
  if (this.document.body.clientWidth >= 649) {
    rightFilters.classList.toggle("display-f");
  }
});
window.addEventListener("reload", () => {
  if (this.document.body.clientWidth >= 649) {
    rightFilters.classList.toggle("display-f");
  }
});

// getting the save image and reset button
const saveImgBtn = document.querySelector("#saveImg"),
  resetFiltersBtn = document.querySelector("#reset");

// defining the default values of the filters
let rotate = 0,
  flipHorizontal = 1,
  flipVertical = 1;
let brightness = 100,
  contrast = 100,
  saturation = 100,
  inversion = 0,
  grayscale = 0,
  sepia = 0,
  hueRotate = 0,
  Blur = 0;

//disable all the buttons and the slider before choosing any image
slider.setAttribute("disabled", "true");
filterOptions.forEach((button) => {
  button.setAttribute("disabled", "true");
});
transformOptions.forEach((button) => {
  button.setAttribute("disabled", "true");
});
saveImgBtn.setAttribute("disabled", "true");
resetFiltersBtn.setAttribute("disabled", "true");

// applying the default values of filters to the image
function applyFilters() {
  chosenImg.style.transform = `rotate(${rotate}deg) scale(${flipHorizontal}, ${flipVertical})`;
  chosenImg.style.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%) sepia(${sepia}%) hue-rotate(${hueRotate}deg) blur(${Blur}px) `;
}

//on a specific button click of filters, trigger an action

filterOptions.forEach((option) => {
  option.onclick = function () {
    // only make slider enabled whenever any of the button get clicked
    slider.removeAttribute("disabled");
    // if any of the buttons get clicked, make the display to none or hide the right-filters div (in mobile screens)
    if (document.body.clientWidth <= 649) {
      rightFilters.classList.toggle("display-f");
    }
    switch (option.id) {
      case "Brightness":
        slider.max = 200;
        slider.value = brightness;
        sliderText.textContent = option.id;
        sliderVal.textContent = `${brightness}%`;

        break;

      case "Contrast":
        slider.max = 200;
        slider.value = contrast;
        sliderText.textContent = option.id;
        sliderVal.textContent = `${contrast}%`;

        break;

      case "Saturation":
        slider.max = 200;
        slider.value = saturation;
        sliderText.textContent = option.id;
        sliderVal.textContent = `${saturation}%`;

        break;
      case "Inversion":
        slider.max = 100;
        slider.value = inversion;
        sliderText.textContent = option.id;
        sliderVal.textContent = `${inversion}%`;

        break;
      case "GrayScale":
        slider.max = 100;
        slider.value = grayscale;
        sliderText.textContent = option.id;
        sliderVal.textContent = `${grayscale}%`;

        break;
      case "Sepia":
        slider.max = 100;
        slider.value = sepia;
        sliderText.textContent = option.id;
        sliderVal.textContent = `${sepia}%`;

        break;
      case "Hue-Rotate":
        slider.max = 360;
        slider.value = hueRotate;
        sliderText.textContent = option.id;
        sliderVal.textContent = `${hueRotate} deg`;

        break;
      case "Blur":
        slider.max = 100;
        slider.value = Blur;
        sliderText.textContent = option.id;
        sliderVal.textContent = `${Blur} px`;

        break;

      default:
        break;
    }
  };
});

// trigger an action on slider input, whenever any button of the filters get clicked
slider.addEventListener("input", function updateFilters() {
  // check if the slider text is the following , which is also the id of the buttons
  let idOfBtn = sliderText.textContent;
  switch (idOfBtn) {
    case "Brightness":
      brightness = slider.value;
      sliderText.textContent = idOfBtn;
      sliderVal.textContent = `${brightness}%`;
      applyFilters();
      break;
    case "Contrast":
      contrast = slider.value;
      sliderText.textContent = idOfBtn;
      sliderVal.textContent = `${contrast}%`;
      applyFilters();
      break;
    case "Saturation":
      saturation = slider.value;
      sliderText.textContent = idOfBtn;
      sliderVal.textContent = `${saturation}%`;
      applyFilters();
      break;
    case "Inversion":
      inversion = slider.value;
      sliderText.textContent = idOfBtn;
      sliderVal.textContent = `${inversion}%`;
      applyFilters();
      break;
    case "GrayScale":
      grayscale = slider.value;
      sliderText.textContent = idOfBtn;
      sliderVal.textContent = `${grayscale}%`;
      applyFilters();
      break;
    case "Sepia":
      sepia = slider.value;
      sliderText.textContent = idOfBtn;
      sliderVal.textContent = `${sepia}%`;
      applyFilters();
      break;
    case "Hue-Rotate":
      hueRotate = slider.value;
      sliderText.textContent = idOfBtn;
      sliderVal.textContent = `${hueRotate} deg`;
      applyFilters();
      break;
    case "Blur":
      Blur = slider.value;
      sliderText.textContent = idOfBtn;
      sliderVal.textContent = `${Blur} px`;
      applyFilters();
      break;

    default:
      break;
  }
});

//on clicking of any of the button of the transform options , trigger the requested action
transformOptions.forEach((option) => {
  option.addEventListener("click", () => {
    switch (option.id) {
      case "left":
        rotate += 90;
        applyFilters();
        break;
      case "right":
        rotate -= 90;
        applyFilters();
        break;
      case "horizontal":
        flipHorizontal = flipHorizontal === 1 ? -1 : 1;
        applyFilters();
        break;
      case "vertical":
        flipVertical = flipVertical === 1 ? -1 : 1;
        applyFilters();
        break;

      default:
        applyFilters();
        break;
    }
  });
});

// reset the filters and transform values to default , on clicking of the reset button
resetFiltersBtn.onclick = function resetFilters() {
  rotate = 0;
  flipHorizontal = 1;
  flipVertical = 1;
  brightness = 100;
  contrast = 100;
  saturation = 100;
  inversion = 0;
  grayscale = 0;
  sepia = 0;
  hueRotate = 0;
  Blur = 0;
  filterOptions[0].click();
  applyFilters();
};

// on clicking the file picker
filePicker.onchange = function () {
  let file = filePicker.files[0];
  if (!file) {
    return;
  } else {
    chosenImg.src = URL.createObjectURL(file);
    // reset the filters when new file is chosen
    resetFiltersBtn.click();
    // apply all the filters after chossing the image
    applyFilters();
    // enable all buttons after choosing the image except the choose image button
    filterOptions.forEach((button) => {
      button.removeAttribute("disabled");
    });
    transformOptions.forEach((button) => {
      button.removeAttribute("disabled");
      if (button.id == "horizontal") {
        let prevBoxIcon = document.querySelector(".horizontal-span");
        let boxIcon = document.createElement("span");
        boxIcon.classList.add("horizontal-span");
        boxIcon.innerHTML = ` <box-icon
                name="reflect-vertical"
                color="#000000"
                style="width: 1.2rem"
                class="box-icon-icon-horizontal"
              ></box-icon>`;
        button.appendChild(boxIcon);
        button.removeChild(prevBoxIcon);
      }
      if (button.id == "vertical") {
        let prevBoxIcon = document.querySelector(".vertical-span");
        let boxIcon = document.createElement("span");
        boxIcon.classList.add("vertical-span");
        boxIcon.innerHTML = ` 
              <box-icon
                name="reflect-horizontal"
                color="#000000"
                style="width: 1.2rem"
                class="box-icon-icon-vertical"
              ></box-icon>`;
        button.appendChild(boxIcon);
        button.removeChild(prevBoxIcon);
      }
    });

    saveImgBtn.removeAttribute("disabled");
    resetFiltersBtn.removeAttribute("disabled");
  }
};

// on clicking of the choose image button , trigger file picker click
chooseImageBtn.onclick = function () {
  filePicker.click();
};

// create a canvas and draw the image on the canvas , after clicking the save-image button
saveImgBtn.onclick = function saveImg() {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = chosenImg.naturalWidth;
  canvas.height = chosenImg.naturalHeight;
  ctx.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%) sepia(${sepia}%) hue-rotate(${hueRotate}deg) blur(${Blur}px) `;
  ctx.translate(canvas.width / 2, canvas.height / 2);
  //CanvasTransform.translate(x: number, y: number)

  if (rotate !== 0) {
    ctx.rotate((rotate * Math.PI) / 180);
    //CanvasTransform.rotate(angle: number)
  }

  ctx.scale(flipHorizontal, flipVertical);
  //CanvasTransform.scale(x: number, y: number)

  ctx.drawImage(
    chosenImg,
    -canvas.width / 2,
    -canvas.height / 2,
    canvas.width,
    canvas.height
  );
  //.drawImage(imageSource, dx, dy, dWidth, dHeight)

  // create a download link
  const link = document.createElement("a");
  link.download = "image.jpg";
  link.href = canvas.toDataURL();
  /*
  
link.href=string(the url of an element)


  HTMLCanvasElement.toDataURL(type?: string | undefined, quality?: any): string
Returns the content of the current canvas as an image that you can use as a source for another canvas or an HTML element.

@param type
The standard MIME type for the image format to return. If you do not specify this parameter, the default value is a PNG format image.
  
  */

  link.click(); //download the image
};
