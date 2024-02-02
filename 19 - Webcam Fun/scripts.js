const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo() {
  navigator.mediaDevices.getUserMedia({video: true, audio: false})

    .then(localMediaStream => {
      console.log(localMediaStream)
      video.srcObject = localMediaStream;
      video.play()
    })
    .catch(err => {
      console.error(`Oh NO`, err);
    })
}

function paintToCanvas(){
  const width = video.videoWidth;
  const height = video.videoHeight;
  canvas.width = width;
  canvas.height = height;

  return setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height);

    let pixels = ctx.getImageData(0, 0, width, height);

    let asciiImage = pixelsToAscii(pixels);

    ctx.font = "10px monospace";

    asciiImage.forEach((row, y)=>{
      row.forEach((char, x) => {
        ctx.fillText(char, x * 6, y * 6)
      });
    });

    // pixels = redEffect(pixels);
    // pixels = rgbSplit(pixels)
    // ctx.globalAlpha = 0.1
    // ctx.putImageData(pixels, 0, 0);
    // console.log(pixels)
  }, 16);

}

function pixelsToAscii(pixels) {
  const asciiChar = "@%/=+*:.";
  const asciiImage =[];

  for (let y = 0; y < pixels.height; y += 8 ){
    let row = [];
    for(x = 0; x < pixels.width; x += 6){
      const i = (y * pixels.width + x) * 4;
      const gray = 0.1 * pixels.data[i] + 0.4 * pixels.data[i + 1];
      const char = asciiChar[Math.floor((gray/255) * (asciiChar.length - 1))];
      row.push(char);
    }
    asciiImage.push(row)
  }
  return asciiImage
}

function redEffect(pixels) {
  for (let i = 0; i < pixels.data.length; i+=4){
    pixels.data[i + 0] = pixels.data[i + 0] - 50;
    pixels.data[i + 1] = pixels.data[i + 1] - 70;
    pixels.data[i + 2] = pixels.data[i + 2] * 0.5;
  }
  return pixels
}

function rgbSplit(pixels) {
  for (let i = 0; i < pixels.data.length; i+=4){
    pixels.data[i - 150] = pixels.data[i + 0];
    pixels.data[i + 100] = pixels.data[i + 1];
    pixels.data[i - 150] = pixels.data[i + 2];
  }
  return pixels
}


function takePhoto() {
  snap.currentTime = 0;
  snap.play()

  const data = canvas.toDataURL('image/jpeg');
  const link = document.createElement('a');
  link.href = data;
  link.setAttribute('download', 'handsome')
  link.innerHTML = `  <img src="${data}" alt="Handsome Guy" />`
  strip.insertBefore(link, strip.firstChild)
}
getVideo()
video.addEventListener('canplay', paintToCanvas);
