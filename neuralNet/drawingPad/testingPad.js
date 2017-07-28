

var canvas = document.getElementById('paint');
var ctx = canvas.getContext('2d');


var sketch = document.getElementById('sketch');
var sketch_style = getComputedStyle(sketch);

canvas.width = 280;
canvas.height = 280;


var brush = {x: 0, y: 0};
var rect = canvas.getBoundingClientRect();

/* Mouse coordinates */
canvas.addEventListener('mousemove', function(e) {
  brush.x = e.clientX - rect.left;
  brush.y = e.clientY  - rect.top;
}, false);

/* These are the pen settings */

ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 20;
ctx.strokeStyle = "white";

/* This clears the testing pad */

function clearCanvas(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

/* These submits the number on the canvas into the network for testing */

function submitCanvas(sendToNeuralNet){

  var dataURL = canvas.toDataURL();
  console.log(dataURL);
  var image = new Image;
  image.src = canvas.toDataURL();

  image.onload = function(){
    ctx.scale(0.1, 0.1);
    ctx.drawImage(image, 0, 0);

    var data = ctx.getImageData(2, 2, 24, 24);

    var pixelDensity = [];

    for(var i = 0; i < data.data.length; i++){
      if((i + 1) % 4 == 0){
        var pixelDensityFloat = data.data[i - 1] / 255.0;
        pixelDensity.push(pixelDensityFloat);
      }
    }
    console.log(pixelDensity);
    sendToNeuralNet(pixelDensity);
    ctx.scale(10, 10);
  };

}


/* These are the pen mechanical settings */

canvas.addEventListener('mousedown', function(e) {
    ctx.beginPath();
    ctx.moveTo(brush.x, brush.y);

    canvas.addEventListener('mousemove', onPaint, false);
}, false);

canvas.addEventListener('mouseup', function() {
    canvas.removeEventListener('mousemove', onPaint, false);
}, false);

var onPaint = function() {
    ctx.lineTo(brush.x, brush.y);
    ctx.stroke();
};
