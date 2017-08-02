
class ImagingTrainer {

  constructor() {


  }

/* This function is used to load pixel density arrays together with their intended outputs */

  sendToNeuralNetTraining(pixelDensity) {
    var imageType = document.getElementById('trainingImageType');

    var trainingOutput = [];

    for(var i = 0; i < 10; i++){
      trainingOutput.push(0);
    }

    console.log(parseInt(imageType.value));
    trainingOutput[parseInt(imageType.value)] = 1;

    var trainingSample = [pixelDensity, trainingOutput];
    neuralNet.trainingImages.push(trainingSample);
    console.log(neuralNet.trainingImages);
  }


/* This function is used to load a single pixel density array for testing, with no ideal output */

  sendToNeuralNet(pixelDensity) {
    neuralNet.image = pixelDensity;
    console.log(neuralNet.image);
  }

  /* This feeds a single testing image into the forward propagation cycle. */

  testDrawing() {
    this.feedTestInput(neuralNet.image);
    neuralNet.feedForwardCycle();
    this.displayCurrentOutput(this.findOutputNode());
    console.log(this.findOutputNode());
    console.log(neuralNet);
  }

  /* This function displays the node with the highest activation value after a test. */

  findOutputNode(){

    var firedNode = 0;
    var currentVal = 0;

    for(var i = 0; i < neuralNet.layers[2].neurons.length; i++){
      if(neuralNet.layers[2].neurons[i].finalOutput > currentVal){
        currentVal = neuralNet.layers[2].neurons[i].finalOutput;
        firedNode = i;

      }
    }
    return firedNode;
  }

  /* This function appends the node with the highest activation value to an indicator
     onscreen. */

  displayCurrentOutput(input) {
    var intendedBlock = document.getElementById('testOutputIndicator');
    intendedBlock.innerHTML = "";
    intendedBlock.append(input);
  }

  /* This function shuffles an array randomly. */

  shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      console.log(currentIndex);

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  /* This function shuffles the training images currently loaded. */

  shuffleTrainingImages(){
    var shuffledArray = this.shuffle(neuralNet.trainingImages);
    neuralNet.trainingImages = shuffledArray;
    console.log(neuralNet.trainingImages);
  }

  /* Training - for each training sample, run forward propagation, then backpropagation */

  trainNetwork(){

    for(var i = 0; i < neuralNet.trainingImages.length; i++){

      this.prepareTrainingSample(neuralNet.trainingImages[i]);
      neuralNet.feedForwardCycle();
      neuralNet.backpropagationCycle();
      console.log(this.findOutputNode());
      this.displayCurrentOutput(this.findOutputNode());
    }
      console.log(neuralNet);
  }

  /* Preparation divides second-level array into two single-level arrays for feeding*/

  prepareTrainingSample(trainingSample){
    this.feedTrainingInput(trainingSample[0]);
    this.feedTrainingOutput(trainingSample[1]);
  }

  /* Feeding functions take in single-level arrays and feed into input and output */

  feedTrainingInput(trainingInput){
    for(var i = 0; i < neuralNet.layers[0].neurons.length; i++){
      neuralNet.layers[0].neurons[i].input = trainingInput[i];
    }
  }

  feedTrainingOutput(trainingOutput){
    for(var i = 0; i < neuralNet.layers[2].neurons.length; i++){
      neuralNet.layers[2].neurons[i].targetOutput = trainingOutput[i];
    }
  }

/* This function is used for custom drawing tests. Currently snowballed */
    loadDrawing(){
      submitCanvas(this.sendToNeuralNet);
    }

    feedTestInput(testInput){

      for(var i = 0; i < neuralNet.layers[0].neurons.length; i++){
        neuralNet.layers[0].neurons[i].input = neuralNet.image[i];
      }
    }


}
