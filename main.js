
var neuralNet = {};
var imagingTrainer = {};

activateImages = () => {

  neuralNet = new NeuralNet("images");
  imagingTrainer = new ImagingTrainer();

  neuralNet.activateNetwork();
  console.log("Images");
  console.log(neuralNet);

}


trainImages = () => {
  imagingTrainer.trainNetwork();
}

testImage = () => {
  imagingTrainer.testImage();
}

loadDrawing = () => {
  imagingTrainer.loadDrawing();
}

testDrawing = () => {
  imagingTrainer.testDrawing();
}
clearImages = () => {
  neuralNet.trainingImages = [];
}

prepareFiles = () => {
  //neuralNet.trainingImages = [];
  /* This function called from fileReader.js using callback from imageProcessing.js*/
  processFiles(submitToProcessing);
}

testUpload = () => {
  neuralNet.image = [];
  processFiles2(submitToProcessing2);
}

shuffleTrainingImages = () => {
  imagingTrainer.shuffleTrainingImages();
}
