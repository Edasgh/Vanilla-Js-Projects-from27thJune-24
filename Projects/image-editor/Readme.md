# Image Editor Project with Vanilla JS (Fully Responsive)

- Live Link : https://image-editor-with-html-css-js-rspn.netlify.app/

## My learnings from this project

- css transform property = scale(1) for setting content (image content in this case) alignment to left , scale(-1) to right

- css transform property = scale(1,1) for left,top ; scale(1,-1) for left, bottom; scale(-1,1) fro right,top ; scale(-1,-1) for right,bottom alignment of content (image content in this case) // 1 for left , 1 for top //-1 for right, -1 for bottom

- css transform property = rotate(120 deg) for rotating the content 120 degree

- css filter property =

  Syntaxes :

  - brightness(value %) //[in percentage]
  - contrast(value %)
  - saturate(value %)
  - invert(value %)
  - grayscale(value %)
  - sepia(value %)
  - hue-rotate(value deg) //[in degree]
  - blur(value px) //[in pixels]

- At left rotation add another 90 deg (rotate+=90) to the rotate value and at right rotation subtract 90 deg (rotate-=90) from the original rotate value

//for canvas

- const ctx = canvas.getContext("2d") method to get a canvas context or a new element which will be drawn in canvas

- ctx.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%) sepia(${sepia}%) hue-rotate(${hueRotate}deg) blur(${Blur}px) ` for applying all the filters to the context applied to the image

- ctx.rotate((rotateValue \* Math.PI) / 180);
  //CanvasTransform.rotate(angle: number)

  ctx.scale(flipHorizontalVal, flipVerticalVal);
  //CanvasTransform.scale(x: number, y: number)

- naturalHeight & naturalWidth is the property of height & width of an image (only used for HTML img element)
