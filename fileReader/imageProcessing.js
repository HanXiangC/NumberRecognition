
var canvas2 = document.getElementById('submission');
var ctx2 = canvas2.getContext('2d');

canvas2.width = 28;
canvas2.height = 28;

/*
This processes a data URL into a pixel density array
and sends it to the neural net using the callback function provided
by fileReader for use as a training sample.
*/

function submitToProcessing(dataURL, sendToNeuralNetTraining){

  var image = new Image;
  image.src = dataURL;

  image.onload = function(){
    ctx2.drawImage(image, 0, 0);
    var data = ctx2.getImageData(2, 2, 24, 24);
    console.log(dataURL);
    var pixelDensity = [];

    for(var i = 0; i < data.data.length; i++){
      if((i + 1) % 4 == 0){
        var pixelDensityFloat = ((255 - data.data[i - 1]) / 255.0);
        if(data.data[i - 1] == 0){
          pixelDensity.push(0);
        }else{
          pixelDensity.push(pixelDensityFloat);
        }
      }
    }
    //console.log(pixelDensity);
    imagingTrainer.sendToNeuralNetTraining(pixelDensity);
  };

}

/*
This processes a data URL into a pixel density array
and sends it to the neural net using the callback function provided
by fileReader for use as a test sample.
*/

function submitToProcessing2(dataURL, sendToNeuralNet){

  var image = new Image;
  image.src = dataURL;

  image.onload = function(){
    ctx2.drawImage(image, 0, 0);

    var data = ctx2.getImageData(2, 2, 24, 24);
    var pixelDensity = [];

    for(var i = 0; i < data.data.length; i++){
      if((i + 1) % 4 == 0){
        var pixelDensityFloat = ((255 - data.data[i - 1]) / 255.0);
        if(data.data[i - 1] == 0){
          pixelDensity.push(0);
        }else{
          pixelDensity.push(pixelDensityFloat);
        }
        /*
        var pixelDensityFloat = (data.data[i - 1] / 255.0);
        pixelDensity.push(pixelDensityFloat);
        */
      }
    }
    sendToNeuralNet(pixelDensity);
  };

}
