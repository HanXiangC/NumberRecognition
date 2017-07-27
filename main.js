

var neuralNet = {};

activate = () => {

  neuralNet = new NeuralNet();
  neuralNet.activateNetwork();
  console.log(neuralNet);

}

train = () => {

  neuralNet.trainNetwork();
  console.log(neuralNet);

}

test = () => {
  neuralNet.testDrawing();
}

loadDrawing = () => {
  neuralNet.loadDrawing();
}

testDrawing = () => {
  neuralNet.testDrawing();
}

prepareFiles = () => {
  //neuralNet.trainingImages = [];
  processFiles(submitToProcessing);
}

testUpload = () => {
  neuralNet.image = [];
  processFiles2(submitToProcessing2);
}

shuffleTrainingImages = () => {
  neuralNet.shuffleTrainingImages();
}
