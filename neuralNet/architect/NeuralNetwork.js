
/*
This constructs a neural network by generating all of its nodes and connections,
and contains of all its helper functions.
*/

class NeuralNet {

  constructor() {

    /* This array contains the layers of the neural network */

    this.layers = [];

    /* This array was used for basic tests */

    this.testInput = [];

    /* This array was used for a single image test */

    this.image = [];

    /* This array was used for image training */

    this.trainingImages = [];

  }

/* This function is used to load pixel density arrays together with their intended outputs */

  sendToNeuralNetTraining(pixelDensity) {
    var imageType = document.getElementById('imageType');

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
    this.feedTestInput(this.image);
    this.feedForwardCycle();
    this.displayCurrentOutput(this.findOutputNode());
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
    var intendedBlock = document.getElementById('currentOutput');
    intendedBlock.innerHTML = "";
    intendedBlock.append(input);
  }

  displayTrainingStatus(current, total) {
    var intendedBlock = document.getElementById('intended');
    intendedBlock.innerHTML = "";

    var status = "" + current + " / " + total;
    intendedBlock.append(status);
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
    var shuffledArray = this.shuffle(this.trainingImages);
    this.trainingImages = shuffledArray;
    console.log(this.trainingImages);
  }

  /* Training - for each training sample, run forward propagation, then backpropagation */

  trainNetwork(){

    for(var i = 0; i < this.trainingImages.length; i++){

      this.prepareTrainingSample(this.trainingImages[i]);
      this.feedForwardCycle();
      this.backpropagationCycle();
      console.log(this.findOutputNode());
      this.displayCurrentOutput(this.findOutputNode());
      this.displayTrainingStatus(i, this.trainingImages.length);
    }
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

  generateTrainingSamples(size){
    return generateXORTraining(size);
  }

  /* Propagation functions */
  /**/
  /**/

  feedForwardCycle(){
    this.layers[0].dispatchInputsForward();
    this.layers[1].dispatchSignalForward();
    this.layers[2].produceOutput();
  }

  backpropagationCycle(){
    this.layers[2].dispatchErrorBackward();
    this.layers[1].dispatchErrorBackward();
    this.layers[0].processErrorsAndReset();
  }

  /* Network generation functions */
  /**/
  /**/

  /* This function is called from main via event listener. It generates
     all of the layers and the connections between them */

  activateNetwork(){
    this.generateNetwork();
  }

  /* Call all generation functions in order */

  generateNetwork(){
    this.generateInputLayer(784);
    this.generateHiddenLayer(2);
    this.generateOutputLayer(10);

    this.generateConnections();
  }

  /* Generate Connections */
  /* These connections are generated in input and hidden layers */

  generateConnections(){
    this.layers[0].generateConnections();
    this.layers[1].generateConnections();
  }

  /* Generate layers */

  generateInputLayer(size){

    var inputLayer = new InputLayer();
    inputLayer.generateNeurons(size);

    this.layers[0] = inputLayer;

  }

  generateHiddenLayer(size){

    var hiddenLayer = new HiddenLayer();
    hiddenLayer.generateNeurons(size);

    this.layers[1] = hiddenLayer;

  }

  generateOutputLayer(size){

    var outputLayer = new OutputLayer();
    outputLayer.generateNeurons(size);

    this.layers[2] = outputLayer;

  }


  /* This function is used for basic tests. Currently snowballed */

    testNetwork(){
      var input1 = document.getElementById('testingInput1');
  //  console.log(input1.value);

      var testInput = [];
      testInput[0] = parseInt(input1.value[0]);
      testInput[1] = parseInt(input1.value[1]);
      testInput[2] = parseInt(input1.value[2]);
      testInput[3] = parseInt(input1.value[3]);

      this.feedTrainingInput(testInput);

      this.feedForwardCycle();

      this.displayCurrentOutput(this.findOutputNode());


    }

/* This function is used for custom drawing tests. Currently snowballed */


    loadDrawing(){
      submitCanvas(this.sendToNeuralNet);
    }

    feedTestInput(testInput){

      for(var i = 0; i < neuralNet.layers[0].neurons.length; i++){
        neuralNet.layers[0].neurons[i].input = this.image[i];
      }
    }

}
